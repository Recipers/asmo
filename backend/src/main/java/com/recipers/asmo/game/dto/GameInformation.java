package com.recipers.asmo.game.dto;

import com.recipers.asmo.game.entity.Game;
import com.recipers.asmo.team.entity.Team;
import lombok.Data;

@Data
public class GameInformation {

    private Game game;
    private Team team;

    public GameInformation(Game game, Team team) {
        this.game = game;
        this.team = team;
    }

}
