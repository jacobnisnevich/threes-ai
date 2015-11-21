"use strict";

class Solver {
    constructor(game, gameDiv) {
        this.game = game;
        this.gameDiv = gameDiv;
        this.renderState();
    }

    move(direction) {
        let move = this.game.getMove(direction);

        if (move.canMove) {
            this.game.state = move.nextState;
            this.game.next = this.game.getNext();
        }

        this.renderState();
    }

    solve() {
        while (!isBoardFilled()) {
            let possibleNextStates = getNextStates();

            let maxScore = 0;
            let maxState;

            possibleNextStates.forEach(function(possibleNextState) {
                let stateScore = this.scoreState(possibleNextState);

                if (stateScore > maxScore) {
                    maxScore = stateScore;
                    maxState = possibleNextState;
                }
            });

            this.game.state = maxState;
            this.game.next = this.game.getNext();

            this.renderState();
        }

        alert(this.scoreState(this.game.state));
    }

    isBoardFilled() {
        let boardFilled = true;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.game.state[i][j] != 0) {
                    boardFilled = false;
                }
            }
        }

        return boardFilled;
    }

    getNextStates() {
        let nextStates = [];

        return nextStates;
    }

    scoreState(state) {
        let stateScore = 0;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cellValue = state[i][j]
                if (cellValue >= 3) {
                    stateScore += Math.pow(SCORE_ORDER.indexOf(cellValue), 3)
                }
            }
        }

        return stateScore;
    }

    renderState() {
        // Render next
        let nextElement = $(this.gameDiv).find(".game-next-icon")[0];

        $(nextElement).removeClass("next-icon-blue");
        $(nextElement).removeClass("next-icon-red");
        $(nextElement).removeClass("next-icon-white");

        if (this.game.next == 1) {
            $(nextElement).addClass("next-icon-blue");
        } else if (this.game.next == 2) {
            $(nextElement).addClass("next-icon-red");
        } else {
            $(nextElement).addClass("next-icon-white");
        }

        // Render tiles
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let cellElement = $(this.gameDiv).find(`.row-${i} .col-${j}`)[0];
                let cellValue = this.game.state[i][j];
                if (cellValue != 0) {
                    $(cellElement).removeClass("blue-cell");
                    $(cellElement).removeClass("red-cell");
                    $(cellElement).removeClass("white-cell");

                    if (cellValue == 1) {
                        $(cellElement).addClass("blue-cell");
                    } else if (cellValue == 2) {
                        $(cellElement).addClass("red-cell");
                    } else {
                        $(cellElement).addClass("white-cell");
                    }

                    $($(cellElement).find(".cell-text")[0]).text(cellValue);
                } else {
                    $(cellElement).removeClass("blue-cell");
                    $(cellElement).removeClass("red-cell");
                    $(cellElement).removeClass("white-cell");
                    $($(cellElement).find(".cell-text")[0]).text("");
                }
            }
        }
    }
}