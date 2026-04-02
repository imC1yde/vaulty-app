"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResultToInput = void 0;
var mapResultToInput = function (data) {
    var _a;
    return {
        rawgId: data.id,
        name: data.name,
        slug: data.slug,
        description: (data === null || data === void 0 ? void 0 : data.description_raw) || null,
        backgroundImage: (data === null || data === void 0 ? void 0 : data.background_image) || null,
        rating: data.rating || 0,
        released: (data === null || data === void 0 ? void 0 : data.released) || null,
        esrbRating: ((_a = data === null || data === void 0 ? void 0 : data.esrb_rating) === null || _a === void 0 ? void 0 : _a.name) || null,
        genres: data.genres.map(function (genre) { return genre.name; }),
        platforms: data.platforms.map(function (_a) {
            var platform = _a.platform;
            return platform === null || platform === void 0 ? void 0 : platform.name;
        })
    };
};
exports.mapResultToInput = mapResultToInput;
