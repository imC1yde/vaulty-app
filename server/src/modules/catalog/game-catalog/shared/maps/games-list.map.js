"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGamesList = void 0;
var mapGamesList = function (inventory) {
    return inventory.map(function (_a) {
        var isCompleted = _a.isCompleted, game = _a.game;
        return ({
            id: game.id,
            name: game.name,
            backgroundImage: game.background_image,
            isCompleted: isCompleted,
            rating: game.rating,
            platforms: game.platforms,
            genres: game.genres,
            esrbRating: game.esrbRating
        });
    });
};
exports.mapGamesList = mapGamesList;
