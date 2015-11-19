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