package com.recipers.asmo.game.repository;

import com.recipers.asmo.game.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

}
