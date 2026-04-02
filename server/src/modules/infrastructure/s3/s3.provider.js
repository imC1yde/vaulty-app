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
exports.S3Provider = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var lib_storage_1 = require("@aws-sdk/lib-storage");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var S3Provider = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var S3Provider = _classThis = /** @class */ (function () {
        function S3Provider_1(s3Config, appConfig) {
            this.s3Config = s3Config;
            this.appConfig = appConfig;
            this.bucket = this.s3Config.bucket;
            this.client = new client_s3_1.S3Client({
                region: this.s3Config.region,
                endpoint: this.s3Config.endpoint,
                forcePathStyle: true,
                credentials: {
                    accessKeyId: this.s3Config.accessKey,
                    secretAccessKey: this.s3Config.secretKey
                }
            });
        }
        // @Use Only for module initialization
        S3Provider_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createBucket(this.bucket)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.setPolicy()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // @returns A unique filename key for stored file
        S3Provider_1.prototype.upload = function (userId, stream, filename) {
            return __awaiter(this, void 0, void 0, function () {
                var key, process, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = "".concat((0, uuid_1.v4)(), "-").concat(Date.now());
                            process = new lib_storage_1.Upload({
                                client: this.client,
                                params: {
                                    Bucket: this.bucket,
                                    Key: key,
                                    Body: stream,
                                    ContentType: 'image',
                                    Metadata: {
                                        userId: userId,
                                        originFilename: filename
                                    }
                                },
                                queueSize: 5,
                                partSize: 5 * 1024 * 1024,
                                leavePartsOnError: false
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, process.done()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, key];
                        case 3:
                            error_1 = _a.sent();
                            throw new common_1.BadRequestException("[Error]:[S3] File has not uploaded! ".concat(error_1.message));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // @returns A temporal url for file
        S3Provider_1.prototype.get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var command, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            command = new client_s3_1.GetObjectCommand({
                                Bucket: this.bucket,
                                Key: key
                            });
                            return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn: 3600 })];
                        case 1:
                            url = _a.sent();
                            return [2 /*return*/, url];
                    }
                });
            });
        };
        // Update file by key
        // @returns True if updated successfully
        S3Provider_1.prototype.update = function (stream, key) {
            return __awaiter(this, void 0, void 0, function () {
                var process, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process = new lib_storage_1.Upload({
                                client: this.client,
                                params: {
                                    Bucket: this.bucket,
                                    Key: key,
                                    Body: stream,
                                    ContentType: 'image'
                                },
                                queueSize: 5,
                                partSize: 5 * 1024 * 1024,
                                leavePartsOnError: false
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, process.done()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_2 = _a.sent();
                            throw new common_1.NotFoundException("[Error]:[S3] File has not found to update! ".concat(error_2.message));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Delete file by key
        S3Provider_1.prototype.delete = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var command, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            command = new client_s3_1.DeleteObjectCommand({
                                Bucket: this.bucket,
                                Key: key
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.send(command)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_3 = _a.sent();
                            throw new common_1.NotFoundException("[Error]:[S3] File has not found to delete! ".concat(error_3.message));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Checks for existing bucket neither create it
        S3Provider_1.prototype.createBucket = function (bucketName) {
            return __awaiter(this, void 0, void 0, function () {
                var checkCommand, error_4, createCommand;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            checkCommand = new client_s3_1.HeadBucketCommand({
                                Bucket: bucketName
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 7]);
                            return [4 /*yield*/, this.client.send(checkCommand)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            error_4 = _a.sent();
                            if (!(error_4.$metadata.httpStatusCode == 404)) return [3 /*break*/, 5];
                            createCommand = new client_s3_1.CreateBucketCommand({
                                Bucket: bucketName
                            });
                            return [4 /*yield*/, this.client.send(createCommand)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5: throw error_4;
                        case 6: return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        // Set public policy for presigned urls
        S3Provider_1.prototype.setPolicy = function () {
            return __awaiter(this, void 0, void 0, function () {
                var command, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            command = new client_s3_1.PutBucketPolicyCommand({
                                Bucket: this.bucket,
                                Policy: JSON.stringify({
                                    Version: "2012-10-17",
                                    Statement: [
                                        {
                                            Sid: "AllowOnlyFromOurApp",
                                            Effect: "Allow",
                                            Principal: "*",
                                            Action: ["s3:GetObject"],
                                            Resource: ["arn:aws:s3:::".concat(this.bucket, "/*")],
                                            Condition: {
                                                StringLike: {
                                                    "aws:Referer": this.appConfig.webUrl
                                                }
                                            }
                                        }
                                    ]
                                })
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.send(command)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_5 = _a.sent();
                            throw new common_1.InternalServerErrorException("[Log]:[S3] Policy has not been sent! ".concat(error_5, " [Error]"));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return S3Provider_1;
    }());
    __setFunctionName(_classThis, "S3Provider");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        S3Provider = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return S3Provider = _classThis;
}();
exports.S3Provider = S3Provider;
