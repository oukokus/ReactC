"use strict";
import axios from "axios";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");

const Infoadd: React.FC = () => {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h = (0, react_hook_form_1.useForm)({
        criteriaMode: "all"
    }), register = _h.register, handleSubmit = _h.handleSubmit, errors = _h.formState.errors;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Form data:", data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.default.post("/api/info", data)];
                case 2:
                    response = _a.sent();
                    console.log("Response data:", response.data);
                    console.log("Data sent successfully");
                    window.location.href = "/";
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error sending data:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { id: "addh1" }, "\u60C5\u5831\u8FFD\u52A0"),
        react_1.default.createElement("form", { id: "form", onSubmit: handleSubmit(onSubmit), action: "/", method: "post" },
            react_1.default.createElement("p", { className: "pclass" },
                "\u6CE8\u6587\u8005\u540D:",
                react_1.default.createElement("input", __assign({ id: "newname1", type: "text", placeholder: "\u6CE8\u6587\u8005\u540D" }, register("注文者名", {
                    required: {
                        value: true,
                        message: "注文者名が未入力です。"
                    },
                    pattern: /^[^]*$/,
                })))),
            ((_a = errors.注文者名) === null || _a === void 0 ? void 0 : _a.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.注文者名.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u6CE8\u6587\u8005\u96FB\u8A71\u756A\u53F7 :",
                react_1.default.createElement("input", __assign({ id: "newname2", type: "tel", placeholder: "\u6CE8\u6587\u8005\u96FB\u8A71" }, register("注文者電話", {
                    required: {
                        value: true,
                        message: "電話番号が未入力です。"
                    },
                    pattern: {
                        value: /^[0-9!-/:-@¥[-`{-~]*$/,
                        message: "半角数字で入力してください。"
                    }
                })))),
            ((_b = errors.注文者電話) === null || _b === void 0 ? void 0 : _b.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.注文者電話.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u6CE8\u6587\u8005\u4F4F\u6240 :",
                react_1.default.createElement("input", __assign({ id: "newname3", type: "text", placeholder: "\u6CE8\u6587\u8005\u4F4F\u6240" }, register("注文者住所", {
                    required: {
                        value: true,
                        message: "住所が未入力です"
                    },
                    pattern: /^[^]*$/,
                })))),
            ((_c = errors.注文者住所) === null || _c === void 0 ? void 0 : _c.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.注文者住所.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u6CE8\u6587\u65E5\u4ED8 :",
                react_1.default.createElement("input", __assign({ id: "newname4", type: "date" }, register("注文日付", {
                    required: {
                        value: true,
                        message: "日付が未入力です"
                    },
                    pattern: /^[^]*$/,
                })))),
            ((_d = errors.注文日付) === null || _d === void 0 ? void 0 : _d.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.注文日付.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u6CE8\u6587\u5546\u54C1 :",
                react_1.default.createElement("input", __assign({ id: "newname5", type: "text", placeholder: "\u6CE8\u6587\u5546\u54C1" }, register("注文商品", {
                    required: {
                        value: true,
                        message: "注文商品が未入力です"
                    },
                    pattern: /^[^]*$/,
                })))),
            ((_e = errors.注文商品) === null || _e === void 0 ? void 0 : _e.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.注文商品.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u500B\u6570 :",
                react_1.default.createElement("input", __assign({ id: "newname6", type: "number", placeholder: "\u500B\u6570" }, register("個数", {
                    required: {
                        value: true,
                        message: "個数が未入力です。"
                    },
                    pattern: {
                        value: /^[0-9!-/:-@¥[-`{-~]*$/,
                        message: "半角数字で入力してください。"
                    }
                })))),
            ((_f = errors.個数) === null || _f === void 0 ? void 0 : _f.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.個数.message)),
            react_1.default.createElement("p", { className: "pclass" },
                "\u4FA1\u683C :",
                react_1.default.createElement("input", __assign({ id: "newname7", type: "price", placeholder: "\u4FA1\u683C" }, register("価格", {
                    required: {
                        value: true,
                        message: "価格が未入力です。"
                    },
                    pattern: {
                        value: /^[0-9!-/:-@¥[-`{-~]*$/,
                        message: "半角数字で入力してください。"
                    }
                })))),
            ((_g = errors.価格) === null || _g === void 0 ? void 0 : _g.message) && (react_1.default.createElement("div", { className: "errorColor" }, errors.価格.message)),
            react_1.default.createElement("p", { className: "pclass" },
                react_1.default.createElement("button", { type: "submit", id: "submit-button" }, "\u9001\u4FE1")))));
};
export default Infoadd;
