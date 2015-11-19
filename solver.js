"use strict";

class Solver {
    constructor(game, gameDiv) {
        this.game = game;
        this.gameDiv = gameDiv;
    }

    solve() {

    }

    scoreState() {
        let stateScore = 0;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cellValue = this.game.state[i][j]
                if (cellValue >= 3) {
                    stateScore += Math.pow(SCORE_ORDER.indexOf(cellValue), 3)
                }
            }
        }

        return stateScore;
    }

    renderBoard() {

    }
}