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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllGamesFilterInput = void 0;
var common_1 = require("@app/common");
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var GetAllGamesFilterInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _genres_decorators;
    var _genres_initializers = [];
    var _genres_extraInitializers = [];
    var _platforms_decorators;
    var _platforms_initializers = [];
    var _platforms_extraInitializers = [];
    var _esrbRating_decorators;
    var _esrbRating_initializers = [];
    var _esrbRating_extraInitializers = [];
    var GetAllGamesFilterInput = _classThis = /** @class */ (function () {
        function GetAllGamesFilterInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.rating = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _rating_initializers, void 0));
            this.genres = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _genres_initializers, void 0));
            this.platforms = (__runInitializers(this, _genres_extraInitializers), __runInitializers(this, _platforms_initializers, void 0));
            this.esrbRating = (__runInitializers(this, _platforms_extraInitializers), __runInitializers(this, _esrbRating_initializers, void 0));
            __runInitializers(this, _esrbRating_extraInitializers);
        }
        return GetAllGamesFilterInput_1;
    }());
    __setFunctionName(_classThis, "GetAllGamesFilterInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return String; }, { nullable: true })];
        _rating_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        _genres_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return [String]; }, { nullable: true })];
        _platforms_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return [String]; }, { nullable: true })];
        _esrbRating_decorators = [(0, class_validator_1.IsEnum)(common_1.EsrbRating), (0, class_validator_1.IsOptional)(), (0, graphql_1.Field)(function () { return common_1.EsrbRating; }, { nullable: true })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _genres_decorators, { kind: "field", name: "genres", static: false, private: false, access: { has: function (obj) { return "genres" in obj; }, get: function (obj) { return obj.genres; }, set: function (obj, value) { obj.genres = value; } }, metadata: _metadata }, _genres_initializers, _genres_extraInitializers);
        __esDecorate(null, null, _platforms_decorators, { kind: "field", name: "platforms", static: false, private: false, access: { has: function (obj) { return "platforms" in obj; }, get: function (obj) { return obj.platforms; }, set: function (obj, value) { obj.platforms = value; } }, metadata: _metadata }, _platforms_initializers, _platforms_extraInitializers);
        __esDecorate(null, null, _esrbRating_decorators, { kind: "field", name: "esrbRating", static: false, private: false, access: { has: function (obj) { return "esrbRating" in obj; }, get: function (obj) { return obj.esrbRating; }, set: function (obj, value) { obj.esrbRating = value; } }, metadata: _metadata }, _esrbRating_initializers, _esrbRating_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GetAllGamesFilterInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GetAllGamesFilterInput = _classThis;
}();
exports.GetAllGamesFilterInput = GetAllGamesFilterInput;
