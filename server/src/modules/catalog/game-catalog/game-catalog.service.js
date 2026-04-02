"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCatalogService = void 0;
var common_1 = require("@nestjs/common");
var array_map_1 = require("@src/common/maps/array.map");
var esrb_map_1 = require("@src/common/maps/esrb.map");
var game_map_1 = require("@src/modules/catalog/game-catalog/shared/maps/game.map");
var games_list_map_1 = require("@src/modules/catalog/game-catalog/shared/maps/games-list.map");
var redis_service_1 = require("@src/modules/infrastructure/redis/redis.service");
var GameCatalogService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GameCatalogService = _classThis = /** @class */ (function () {
        function GameCatalogService_1(prisma, redis) {
            this.prisma = prisma;
            this.redis = redis;
        }
        GameCatalogService_1.prototype.create = function (userId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var platforms, genres, released, esrbRating, game, inventory;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            platforms = (0, array_map_1.mapArray)(input.platforms);
                            genres = (0, array_map_1.mapArray)(input.genres);
                            released = input.released ? input.released + 'T00:00:00.000Z' : null;
                            esrbRating = (0, esrb_map_1.mapEsrbToPrisma)(input.esrbRating);
                            return [4 /*yield*/, this.prisma.game.upsert({
                                    where: {
                                        rawgId: input.rawgId
                                    },
                                    update: {},
                                    create: {
                                        rawgId: input.rawgId,
                                        name: input.name,
                                        slug: input.slug,
                                        description: (_a = input.description) !== null && _a !== void 0 ? _a : null,
                                        backgroundImage: (_b = input.backgroundImage) !== null && _b !== void 0 ? _b : null,
                                        rating: input.rating,
                                        released: released,
                                        esrbRating: esrbRating,
                                        platforms: platforms,
                                        genres: genres
                                    }
                                })];
                        case 1:
                            game = _c.sent();
                            return [4 /*yield*/, this.prisma.gameInventory.upsert({
                                    where: {
                                        gameId_userId: {
                                            userId: userId,
                                            gameId: game.id
                                        }
                                    },
                                    update: {},
                                    create: {
                                        userId: userId,
                                        gameId: game.id,
                                        isCompleted: false
                                    },
                                    select: {
                                        isCompleted: true
                                    }
                                })];
                        case 2:
                            inventory = _c.sent();
                            return [2 /*return*/, (0, game_map_1.mapGame)({
                                    data: game,
                                    isCompleted: inventory.isCompleted
                                })];
                    }
                });
            });
        };
        GameCatalogService_1.prototype.getAll = function (userId, input, filter) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redis.wrap(redis_service_1.RedisService.Keys.GAME.ALL(__assign(__assign({}, input), filter)), function () { return __awaiter(_this, void 0, void 0, function () {
                                var page, pageSize, skip, _a, inventory, count, totalPages, mappedGame;
                                var _b, _c, _d, _e;
                                return __generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            page = input.page, pageSize = input.pageSize;
                                            skip = pageSize * (page - 1);
                                            return [4 /*yield*/, Promise.all([
                                                    this.prisma.gameInventory.findMany({
                                                        where: {
                                                            userId: userId,
                                                            game: {
                                                                slug: (filter === null || filter === void 0 ? void 0 : filter.name) ? { contains: filter.name, mode: 'insensitive' } : undefined,
                                                                rating: (filter === null || filter === void 0 ? void 0 : filter.rating) ? { gte: filter.rating } : undefined,
                                                                esrbRating: (filter === null || filter === void 0 ? void 0 : filter.esrbRating) ? { equals: filter.esrbRating } : undefined,
                                                                genres: ((_b = filter === null || filter === void 0 ? void 0 : filter.genres) === null || _b === void 0 ? void 0 : _b.length) ? { hasSome: filter.genres } : undefined,
                                                                platforms: ((_c = filter === null || filter === void 0 ? void 0 : filter.platforms) === null || _c === void 0 ? void 0 : _c.length) ? { hasSome: filter.platforms } : undefined
                                                            }
                                                        },
                                                        include: {
                                                            game: true
                                                        },
                                                        take: pageSize,
                                                        skip: skip,
                                                        orderBy: {
                                                            game: {
                                                                name: 'asc'
                                                            }
                                                        }
                                                    }),
                                                    this.prisma.gameInventory.count({
                                                        where: {
                                                            userId: userId,
                                                            game: {
                                                                slug: (filter === null || filter === void 0 ? void 0 : filter.name) ? { contains: filter.name, mode: 'insensitive' } : undefined,
                                                                rating: (filter === null || filter === void 0 ? void 0 : filter.rating) ? { gte: filter.rating } : undefined,
                                                                esrbRating: (filter === null || filter === void 0 ? void 0 : filter.esrbRating) ? { equals: filter.esrbRating } : undefined,
                                                                genres: ((_d = filter === null || filter === void 0 ? void 0 : filter.genres) === null || _d === void 0 ? void 0 : _d.length) ? { hasSome: filter.genres } : undefined,
                                                                platforms: ((_e = filter === null || filter === void 0 ? void 0 : filter.platforms) === null || _e === void 0 ? void 0 : _e.length) ? { hasSome: filter.platforms } : undefined
                                                            }
                                                        }
                                                    })
                                                ])];
                                        case 1:
                                            _a = _f.sent(), inventory = _a[0], count = _a[1];
                                            totalPages = Math.ceil(count / pageSize);
                                            mappedGame = (0, games_list_map_1.mapGamesList)(inventory);
                                            return [2 /*return*/, {
                                                    data: mappedGame,
                                                    totalPages: totalPages,
                                                    totalCount: count,
                                                    hasNextPage: page < totalPages
                                                }];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        GameCatalogService_1.prototype.getById = function (userId, id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redis.wrap(redis_service_1.RedisService.Keys.GAME.SINGLE(id), function () { return __awaiter(_this, void 0, void 0, function () {
                                var inventory;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.prisma.gameInventory.findUnique({
                                                where: {
                                                    gameId_userId: {
                                                        gameId: id,
                                                        userId: userId
                                                    }
                                                },
                                                include: {
                                                    game: true
                                                }
                                            })];
                                        case 1:
                                            inventory = _a.sent();
                                            if (!inventory)
                                                throw new common_1.NotFoundException('Game not found');
                                            return [2 /*return*/, (0, game_map_1.mapGame)({
                                                    data: inventory.game,
                                                    isCompleted: inventory.isCompleted
                                                })];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        GameCatalogService_1.prototype.update = function (userId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var id, isCompleted, inventory, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = input.id, isCompleted = input.isCompleted;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.prisma.gameInventory.update({
                                    where: {
                                        gameId_userId: {
                                            gameId: id,
                                            userId: userId
                                        }
                                    },
                                    data: {
                                        isCompleted: isCompleted
                                    },
                                    include: {
                                        game: true
                                    }
                                })];
                        case 2:
                            inventory = _a.sent();
                            return [4 /*yield*/, this.redis.delete(redis_service_1.RedisService.Keys.GAME.SINGLE(id))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.redis.deleteByPattern(redis_service_1.RedisService.Patterns.GAMES)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, (0, game_map_1.mapGame)({
                                    data: inventory.game,
                                    isCompleted: inventory.isCompleted
                                })];
                        case 5:
                            error_1 = _a.sent();
                            throw new common_1.InternalServerErrorException("Game updating failed. ".concat(error_1));
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        GameCatalogService_1.prototype.delete = function (userId, id) {
            return __awaiter(this, void 0, void 0, function () {
                var inventory, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.prisma.gameInventory.delete({
                                    where: {
                                        gameId_userId: {
                                            gameId: id,
                                            userId: userId
                                        }
                                    },
                                    include: {
                                        game: true
                                    }
                                })];
                        case 1:
                            inventory = _a.sent();
                            return [4 /*yield*/, this.redis.delete(redis_service_1.RedisService.Keys.GAME.SINGLE(id))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, (0, game_map_1.mapGame)({
                                    data: inventory.game,
                                    isCompleted: inventory.isCompleted
                                })];
                        case 3:
                            error_2 = _a.sent();
                            throw new common_1.InternalServerErrorException("Game deleting failed. ".concat(error_2));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return GameCatalogService_1;
    }());
    __setFunctionName(_classThis, "GameCatalogService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GameCatalogService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GameCatalogService = _classThis;
}();
exports.GameCatalogService = GameCatalogService;
