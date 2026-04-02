"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_OPTIONS = exports.TOKEN_NAME = void 0;
exports.TOKEN_NAME = 'authorization-token';
exports.TOKEN_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
};
