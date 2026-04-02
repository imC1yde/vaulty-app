"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapArray = void 0;
// Clears array from nullable or undefined values
var mapArray = function (array) {
    return (array !== null && array !== void 0 ? array : []).filter(function (item) { return item != null; });
};
exports.mapArray = mapArray;
