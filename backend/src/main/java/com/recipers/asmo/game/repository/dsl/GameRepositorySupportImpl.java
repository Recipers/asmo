package com.recipers.asmo.game.repository.dsl;

import static com.recipers.asmo.game.entity.QGame.game;
import static com.recipers.asmo.team.entity.QTeam.team;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.recipers.asmo.game.dto.GameInformation;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class GameRepositorySupportImpl implements GameRepositorySupport {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<GameInformation> findGames(Pageable pageable) {

        final String defaultOrderProperty = "startAt";
        OrderSpecifier orderSpecifier =
            Optional.ofNullable(pageable.getSort().getOrderFor(defaultOrderProperty)).map(order -> {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                return new OrderSpecifier<>(direction, game.startAt);
            }).orElse(new OrderSpecifier<>(Order.ASC, game.startAt));

        List<GameInformation> content =
            queryFactory.select(Projections.constructor(GameInformation.class, game, team))
                .from(game).join(team)
                .on(game.hostTeamId.eq(team.id))
                .where(game.canceled.eq(false).and(game.startAt.after(LocalDateTime.now())))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(orderSpecifier)
                .fetch();

        Long count = queryFactory.select(game.count()).from(game)
            .where(game.canceled.eq(false).and(game.startAt.after(LocalDateTime.now())))
            .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

}
