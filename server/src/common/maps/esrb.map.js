"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEsrbToPrisma = void 0;
var common_1 = require("@app/common");
// Maps Esrb rating from visual to Prisma format
var mapEsrbToPrisma = function (displayValue) {
    var entry = Object.entries(common_1.EsrbRating).find(function (_a) {
        var _ = _a[0], value = _a[1];
        return value === displayValue;
    });
    if (!entry) {
        throw new Error("Invalid ESRB display value: ".concat(displayValue));
    }
    return entry[0];
};
exports.mapEsrbToPrisma = mapEsrbToPrisma;
