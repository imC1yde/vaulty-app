"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGameInput = void 0;
var common_1 = require("@app/common");
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var CreateGameInput = function () {
    var _a;
    var _rawgId_decorators;
    var _rawgId_initializers = [];
    var _rawgId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _backgroundImage_decorators;
    var _backgroundImage_initializers = [];
    var _backgroundImage_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _released_decorators;
    var _released_initializers = [];
    var _released_extraInitializers = [];
    var _esrbRating_decorators;
    var _esrbRating_initializers = [];
    var _esrbRating_extraInitializers = [];
    var _platforms_decorators;
    var _platforms_initializers = [];
    var _platforms_extraInitializers = [];
    var _genres_decorators;
    var _genres_initializers = [];
    var _genres_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateGameInput() {
                this.rawgId = __runInitializers(this, _rawgId_initializers, void 0);
                this.name = (__runInitializers(this, _rawgId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.backgroundImage = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _backgroundImage_initializers, void 0));
                this.rating = (__runInitializers(this, _backgroundImage_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
                this.released = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _released_initializers, void 0));
                this.esrbRating = (__runInitializers(this, _released_extraInitializers), __runInitializers(this, _esrbRating_initializers, void 0));
                this.platforms = (__runInitializers(this, _esrbRating_extraInitializers), __runInitializers(this, _platforms_initializers, void 0));
                this.genres = (__runInitializers(this, _platforms_extraInitializers), __runInitializers(this, _genres_initializers, void 0));
                __runInitializers(this, _genres_extraInitializers);
            }
            return CreateGameInput;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _rawgId_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.IsNotEmpty)(), (0, graphql_1.Field)(function () { return graphql_1.Int; })];
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, graphql_1.Field)(function () { return String; })];
            _slug_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, graphql_1.Field)(function () { return String; })];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return String; }, { nullable: true })];
            _backgroundImage_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return String; }, { nullable: true })];
            _rating_decorators = [(0, class_validator_1.IsNumber)(), (0, graphql_1.Field)(function () { return graphql_1.Float; }, { defaultValue: 0 })];
            _released_decorators = [(0, class_validator_1.IsDate)(), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return Date; }, { nullable: true })];
            _esrbRating_decorators = [(0, class_validator_1.IsEnum)(common_1.EsrbRating), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return common_1.EsrbRating; }, { nullable: true })];
            _platforms_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, graphql_1.Field)(function () { return [String]; })];
            _genres_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, graphql_1.Field)(function () { return [String]; })];
            __esDecorate(null, null, _rawgId_decorators, { kind: "field", name: "rawgId", static: false, private: false, access: { has: function (obj) { return "rawgId" in obj; }, get: function (obj) { return obj.rawgId; }, set: function (obj, value) { obj.rawgId = value; } }, metadata: _metadata }, _rawgId_initializers, _rawgId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _backgroundImage_decorators, { kind: "field", name: "backgroundImage", static: false, private: false, access: { has: function (obj) { return "backgroundImage" in obj; }, get: function (obj) { return obj.backgroundImage; }, set: function (obj, value) { obj.backgroundImage = value; } }, metadata: _metadata }, _backgroundImage_initializers, _backgroundImage_extraInitializers);
            __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
            __esDecorate(null, null, _released_decorators, { kind: "field", name: "released", static: false, private: false, access: { has: function (obj) { return "released" in obj; }, get: function (obj) { return obj.released; }, set: function (obj, value) { obj.released = value; } }, metadata: _metadata }, _released_initializers, _released_extraInitializers);
            __esDecorate(null, null, _esrbRating_decorators, { kind: "field", name: "esrbRating", static: false, private: false, access: { has: function (obj) { return "esrbRating" in obj; }, get: function (obj) { return obj.esrbRating; }, set: function (obj, value) { obj.esrbRating = value; } }, metadata: _metadata }, _esrbRating_initializers, _esrbRating_extraInitializers);
            __esDecorate(null, null, _platforms_decorators, { kind: "field", name: "platforms", static: false, private: false, access: { has: function (obj) { return "platforms" in obj; }, get: function (obj) { return obj.platforms; }, set: function (obj, value) { obj.platforms = value; } }, metadata: _metadata }, _platforms_initializers, _platforms_extraInitializers);
            __esDecorate(null, null, _genres_decorators, { kind: "field", name: "genres", static: false, private: false, access: { has: function (obj) { return "genres" in obj; }, get: function (obj) { return obj.genres; }, set: function (obj, value) { obj.genres = value; } }, metadata: _metadata }, _genres_initializers, _genres_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateGameInput = CreateGameInput;
