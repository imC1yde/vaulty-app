"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRawgResponse = void 0;
var mapRawgResponse = function (data, key, pageSize) {
    var totalPages = Math.ceil(data.count / pageSize);
    return {
        data: data.results.map(function (obj) { return obj[key]; }),
        totalCount: data.count,
        totalPages: totalPages <= 1000 ? totalPages : 1000,
        hasNextPage: !!data.next && totalPages <= 1000
    };
};
exports.mapRawgResponse = mapRawgResponse;
