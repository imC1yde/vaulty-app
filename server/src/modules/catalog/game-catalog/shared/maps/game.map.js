"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGame = void 0;
var mapGame = function (_a) {
    var data = _a.data, isCompleted = _a.isCompleted;
    return {
        id: data.id,
        rawgId: data.rawgId,
        name: data.name,
        isCompleted: isCompleted,
        description: data === null || data === void 0 ? void 0 : data.description_raw,
        backgroundImage: data === null || data === void 0 ? void 0 : data.background_image,
        rating: data.rating,
        released: data === null || data === void 0 ? void 0 : data.released,
        esrbRating: data === null || data === void 0 ? void 0 : data.esrbRating,
        genres: data.genres,
        platforms: data.platforms
    };
};
exports.mapGame = mapGame;
