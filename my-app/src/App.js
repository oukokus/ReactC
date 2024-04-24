"use strict";
import axios from "axios";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./App.css");
var react_router_dom_1 = require("react-router-dom");


function App() {
    var _a = (0, react_1.useState)([]), categoryList = _a[0], setCategoryList = _a[1];
    var _b = (0, react_1.useState)(null), modalContent = _b[0], setModalContent = _b[1];
    var _c = (0, react_1.useState)(false), show = _c[0], setShow = _c[1];
    var _d = (0, react_1.useState)(new Date().getFullYear()), year = _d[0], setYear = _d[1];
    var _e = (0, react_1.useState)(new Date().getMonth() + 1), month = _e[0], setMonth = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    var _g = (0, react_1.useState)(null), error = _g[0], setError = _g[1];
    (0, react_1.useEffect)(function () {
        axios.default.get("http://localhost:3001/api/get/category")
            .then(function (response) {
            setCategoryList(response.data);
            setLoading(false);
        })
            .catch(function (error) {
            setLoading(false);
            setError("データの取得中にエラーが発生しました。");
            console.error("データの取得中にエラーが発生しました。", error);
        });
    }, []);
    if (loading) {
        return react_1.default.createElement("div", null, "\u30C7\u30FC\u30BF\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u3044\u307E\u3059...");
    }
    if (error) {
        return react_1.default.createElement("div", null,
            "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F: ",
            error);
    }
    var openModal = function (index) {
        setShow(true);
        setModalContent(categoryList[index]);
    };
    var prevMonth = function () {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        }
        else {
            setMonth(month - 1);
        }
    };
    var nextMonth = function () {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        }
        else {
            setMonth(month + 1);
        }
    };
    var createCalendarTable = function () {
        var week = ["日", "月", "火", "水", "木", "金", "土"];
        var countDay = 0;
        var monthOfEndDay = new Date(year, month, 0).getDate();
        var tableRows = [];
        var withDateClassName = "with_date";
        var startDayOfWeek = new Date(year, month - 1, 1).getDay();
        for (var i = 0; i < 6; i++) {
            var cells = [];
            for (var j = 0; j < week.length; j++) {
                if (i === 0 && j === startDayOfWeek) {
                    countDay++;
                    cells.push(react_1.default.createElement("td", { key: countDay, className: withDateClassName }, countDay));
                }
                else if (countDay !== 0 && countDay < monthOfEndDay) {
                    countDay++;
                    var buttons = categoryList.map(function (category, index) {
                        var month1 = category.注文日付.slice(0, 7);
                        var month2 = "".concat(year, "-").concat(("0" + month).slice(-2));
                        var days = parseInt(category.注文日付.slice(-2));
                        if (month1 === month2 && days === countDay) {
                            return (react_1.default.createElement("p", { className: "pbtn", key: index },
                                react_1.default.createElement("button", { onClick: function () { return openModal(index); }, className: "clBtn", id: index.toString() }, category.注文者名)));
                        }
                        else {
                            return null;
                        }
                    });
                    cells.push(react_1.default.createElement("td", { key: countDay, className: withDateClassName },
                        countDay,
                        buttons));
                }
                else {
                    cells.push(react_1.default.createElement("td", { key: j, className: "no_date" }));
                }
            }
            tableRows.push(react_1.default.createElement("tr", { key: i }, cells));
        }
        return react_1.default.createElement(react_1.default.Fragment, null, tableRows);
    };
    var renderCategoryList = function () {
        return (react_1.default.createElement("table", { id: "tableList" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u540D"),
                    react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u96FB\u8A71"),
                    react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u4F4F\u6240"),
                    react_1.default.createElement("th", null, "\u6CE8\u6587\u5546\u54C1"),
                    react_1.default.createElement("th", null, "\u6CE8\u6587\u65E5\u4ED8"),
                    react_1.default.createElement("th", null, "\u500B\u6570"),
                    react_1.default.createElement("th", null, "\u4FA1\u683C"))),
            react_1.default.createElement("tbody", { className: "tbodyTr" }, categoryList.map(function (category, index) { return (react_1.default.createElement("tr", { key: index },
                react_1.default.createElement("td", { className: "name" }, category.注文者名),
                react_1.default.createElement("td", null, category.注文者電話),
                react_1.default.createElement("td", null, category.注文者住所),
                react_1.default.createElement("td", null, category.注文商品),
                react_1.default.createElement("td", { className: "time" }, category.注文日付),
                react_1.default.createElement("td", null, category.個数),
                react_1.default.createElement("td", null, category.価格))); }))));
    };
    var Modal = function (_a) {
        var show = _a.show, setShow = _a.setShow;
        var closeModal = function () {
            setShow(false);
        };
        if (show) {
            return (react_1.default.createElement("div", { id: "overlay", onClick: closeModal },
                react_1.default.createElement("div", { id: "content" },
                    react_1.default.createElement("table", { className: "table" },
                        react_1.default.createElement("thead", { id: "reviewArea" },
                            react_1.default.createElement("tr", { className: "trClass" },
                                react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u540D"),
                                react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u96FB\u8A71"),
                                react_1.default.createElement("th", null, "\u6CE8\u6587\u8005\u4F4F\u6240"),
                                react_1.default.createElement("th", null, "\u6CE8\u6587\u5546\u54C1"),
                                react_1.default.createElement("th", null, "\u500B\u6570"),
                                react_1.default.createElement("th", null, "\u4FA1\u683C"))),
                        react_1.default.createElement("tbody", { id: "tbodymodal" }, modalContent && (react_1.default.createElement("tr", null,
                            react_1.default.createElement("td", { className: "name" }, modalContent.注文者名),
                            react_1.default.createElement("td", null, modalContent.注文者電話),
                            react_1.default.createElement("td", null, modalContent.注文者住所),
                            react_1.default.createElement("td", null, modalContent.注文商品),
                            react_1.default.createElement("td", null, modalContent.個数),
                            react_1.default.createElement("td", null, modalContent.価格))))))));
        }
        else {
            return null;
        }
    };
    return (react_1.default.createElement("div", { className: "calendar_area" },
        react_1.default.createElement("div", { className: "calendar_header" },
            react_1.default.createElement("p", { id: "year_month_label" }, "".concat(year, "\u5E74").concat(month, "\u6708")),
            react_1.default.createElement("button", { onClick: prevMonth, id: "prev_month_btn" },
                react_1.default.createElement("i", { className: "fas fa-angle-left" })),
            react_1.default.createElement("button", { onClick: nextMonth, id: "next_month_btn" },
                react_1.default.createElement("i", { className: "fas fa-angle-right" }))),
        react_1.default.createElement("div", { id: "calendar_body" },
            react_1.default.createElement("table", { className: "calendar_tbl" },
                react_1.default.createElement("tbody", null, createCalendarTable()))),
        react_1.default.createElement("div", { id: "modal", className: "modal" }, renderCategoryList()),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Modal, { show: show, setShow: setShow })),
        react_1.default.createElement("div", { id: "list" },
            react_1.default.createElement("h2", null, "\u5546\u54C1\u6CE8\u6587\u9867\u5BA2\u7BA1\u7406\u30EA\u30B9\u30C8"),
            react_1.default.createElement("button", { id: "addBtn" },
                react_1.default.createElement(react_router_dom_1.Link, { to: "/Infoadd" }, "\u60C5\u5831\u8FFD\u52A0")),
            renderCategoryList())));
}
export default App;
