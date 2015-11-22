"use strict";

$(document).ready(function() {
    var game = new Game();
    var solver = new Solver(game, $(".game"));

    $(".start-button").click(function() {
        $(".menu-screen").hide();
        $(".game-screen").show();
        // solver.solve();
    });

    $(".menu-button").click(function() {
        $(".game-screen").hide();
        $(".menu-screen").show();
    });

    $(".restart-button").click(function() {
        solver.restart();
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                solver.move("left");
                break;

            case 38: // up
                solver.move("up");
                break;

            case 39: // right
                solver.move("right");
                break;

            case 40: // down
                solver.move("down");
                break;

            default: 
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
});
