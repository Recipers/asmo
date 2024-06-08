package com.recipers.asmo.game.repository.dsl;

import com.recipers.asmo.game.dto.GameInformation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GameRepositorySupport {

    Page<GameInformation> findGames(Pageable pageable);

}
