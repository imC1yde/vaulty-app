"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRawgList = void 0;
var mapRawgList = function (result) {
    return result.map(function (item) { return ({
        rawgId: item.id,
        name: item.name,
        backgroundImage: item === null || item === void 0 ? void 0 : item.background_image
    }); });
};
exports.mapRawgList = mapRawgList;
