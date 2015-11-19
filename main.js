"use strict";

$(document).ready(function() {
    var game = new Game();
    var solver = new Solver(game);

    $(".start-button").click(function() {
        $(".menu-screen").hide();
        $(".game-screen").show();
    });

    $(".menu-button").click(function() {
        $(".game-screen").hide();
        $(".menu-screen").show();
    });
});
