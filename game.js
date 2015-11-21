"use strict";

class Game {
    constructor(gameDiv) {
        this.next = this.getNext();
        this.state = this.getInitialState();
    }

    getNext() {
        let randOutput = Math.random();
        let next = 0;

        if (randOutput <= PROBABILITY[1]) {
            next = 1;
        } else if (randOutput <= PROBABILITY[1] + 
                                 PROBABILITY[2]) {
            next = 2;
        } else if (randOutput <= PROBABILITY[1] + 
                                 PROBABILITY[2] + 
                                 PROBABILITY[3]) {
            next = 3;
        } else if (randOutput <= PROBABILITY[1] + 
                                 PROBABILITY[2] + 
                                 PROBABILITY[3] + 
                                 PROBABILITY[6]) {
            next = 6;
        } else if (randOutput <= PROBABILITY[1] + 
                                 PROBABILITY[2] + 
                                 PROBABILITY[3] + 
                                 PROBABILITY[6] + 
                                 PROBABILITY[12]) {
            next = 12;
        } else {
            next = 24;
        } 


        return next;
    }

    getMove(direction) {
        let canMove = false;
        let nextState = this.state;

        if (direction == "right") {          
            for (let i = 2; i >= 0; i--) {
                for (let j = 0; j < 4; j++) {
                    let thisSpace = nextState[j][i];
                    let nextSpace = nextState[j][i + 1];

                    if ((thisSpace == 1 && nextSpace == 2) || 
                        (thisSpace == 2 && nextSpace == 1)) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i + 1] = 3;
                    } else if (thisSpace > 2 && nextSpace && 2 && thisSpace == nextSpace) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i + 1] = thisSpace * 2;
                    } else if (thisSpace != 0 && nextSpace == 0) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i + 1] = thisSpace;
                    }
                }
            }
        } else if (direction == "down") {
            for (let i = 0; i < 4; i++) {
                for (let j = 2; j >= 0; j--) {
                    let thisSpace = nextState[j][i];
                    let nextSpace = nextState[j + 1][i];

                    if ((thisSpace == 1 && nextSpace == 2) || 
                        (thisSpace == 2 && nextSpace == 1)) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j + 1][i] = 3;
                    } else if (thisSpace > 2 && nextSpace && 2 && thisSpace == nextSpace) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j + 1][i] = thisSpace * 2;
                    } else if (thisSpace != 0 && nextSpace == 0) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j + 1][i] = thisSpace;
                    }
                }
            }
        } else if (direction == "left") {
            for (let i = 1; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let thisSpace = nextState[j][i];
                    let nextSpace = nextState[j][i - 1];

                    if ((thisSpace == 1 && nextSpace == 2) || 
                        (thisSpace == 2 && nextSpace == 1)) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i - 1] = 3;
                    } else if (thisSpace > 2 && nextSpace && 2 && thisSpace == nextSpace) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i - 1] = thisSpace * 2;
                    } else if (thisSpace != 0 && nextSpace == 0) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j][i - 1] = thisSpace;
                    }
                }
            }
        } else if (direction == "up") {
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    let thisSpace = nextState[j][i];
                    let nextSpace = nextState[j - 1][i];

                    if ((thisSpace == 1 && nextSpace == 2) || 
                        (thisSpace == 2 && nextSpace == 1)) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j - 1][i] = 3;
                    } else if (thisSpace > 2 && nextSpace && 2 && thisSpace == nextSpace) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j - 1][i] = thisSpace * 2;
                    } else if (thisSpace != 0 && nextSpace == 0) {
                        canMove = true;
                        nextState[j][i] = 0;
                        nextState[j - 1][i] = thisSpace;
                    }
                }
            }
        }

        if (canMove) {
            while (true) {
                let randOut = Math.floor(Math.random() * 4);

                if (direction == "right") {          
                    if (nextState[randOut][0] == 0) {
                        nextState[randOut][0] = this.next;
                        break;
                    }
                } else if (direction == "down") {
                    if (nextState[0][randOut] == 0) {
                        nextState[0][randOut] = this.next;
                        break;
                    }
                } else if (direction == "left") {
                    if (nextState[randOut][3] == 0) {
                        nextState[randOut][3] = this.next;
                        break;
                    }
                } else if (direction == "up") {
                    if (nextState[3][randOut] == 0) {
                        nextState[3][randOut] = this.next;
                        break;
                    }
                }
            }
        }

        return {
            canMove: canMove,
            nextState: nextState
        }
    }

    getInitialState() {
        // 2D grid with 9 random tiles consisting of 0s, 1s, and 2s
        let state = [[0, 0, 0, 0],
                     [0, 0, 0, 0], 
                     [0, 0, 0, 0], 
                     [0, 0, 0, 0]];

        for (let i = 0; i < 9; i++) {
            while (true) {
                let randomTile = this.getRandomTile()

                if (state[randomTile.x][randomTile.y] == 0) {
                    state[randomTile.x][randomTile.y] = this.getRandomValue();
                    break;
                }
            }
        }

        return state;
    }

    getRandomTile() {
        return {
            x: Math.floor(Math.random() * 4),
            y: Math.floor(Math.random() * 4)
        };
    }

    getRandomValue() {
        return Math.floor(Math.random() * 3) + 1;
    }
}