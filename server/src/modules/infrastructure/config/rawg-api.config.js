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
exports.RawgConfig = void 0;
var configify_1 = require("@itgorillaz/configify");
var RawgConfig = function () {
    var _classDecorators = [(0, configify_1.Configuration)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _accessKey_decorators;
    var _accessKey_initializers = [];
    var _accessKey_extraInitializers = [];
    var RawgConfig = _classThis = /** @class */ (function () {
        function RawgConfig_1() {
            this.url = __runInitializers(this, _url_initializers, void 0);
            this.accessKey = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _accessKey_initializers, void 0));
            __runInitializers(this, _accessKey_extraInitializers);
        }
        return RawgConfig_1;
    }());
    __setFunctionName(_classThis, "RawgConfig");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _url_decorators = [(0, configify_1.Value)('RAWG_API_URL')];
        _accessKey_decorators = [(0, configify_1.Value)('RAWG_API_KEY')];
        __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
        __esDecorate(null, null, _accessKey_decorators, { kind: "field", name: "accessKey", static: false, private: false, access: { has: function (obj) { return "accessKey" in obj; }, get: function (obj) { return obj.accessKey; }, set: function (obj, value) { obj.accessKey = value; } }, metadata: _metadata }, _accessKey_initializers, _accessKey_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RawgConfig = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RawgConfig = _classThis;
}();
exports.RawgConfig = RawgConfig;
