"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
function App() {
    var _a = (0, react_1.useState)([]), categoryList = _a[0], setCategoryList = _a[1];
    var _b = (0, react_1.useState)(null), modalContent = _b[0], setModalContent = _b[1];
    var _c = (0, react_1.useState)(false), show = _c[0], setShow = _c[1];
    var _d = (0, react_1.useState)(new Date().getFullYear()), year = _d[0], setYear = _d[1];
    var _e = (0, react_1.useState)(new Date().getMonth() + 1), month = _e[0], setMonth = _e[1];
    (0, react_1.useEffect)(function () {
        axios_1.default.get("http://localhost:3001/api/get/category").then(function (response) {
            setCategoryList(response.data);
        });
    }, []);
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
                    cells.push(<td key={countDay} className={withDateClassName}>
              {countDay}
            </td>);
                }
                else if (countDay !== 0 && countDay < monthOfEndDay) {
                    countDay++;
                    var buttons = categoryList.map(function (category, index) {
                        var month1 = category.注文日付.slice(0, 7);
                        var month2 = "".concat(year, "-").concat(("0" + month).slice(-2));
                        var days = parseInt(category.注文日付.slice(-2));
                        if (month1 === month2 && days === countDay) {
                            return (<p className="pbtn" key={index}>
                  <button onClick={function () { return openModal(index); }} className="clBtn" id={index.toString()}>
                    {category.注文者名}
                  </button>
                </p>);
                        }
                        else {
                            return null;
                        }
                    });
                    cells.push(<td key={countDay} className={withDateClassName}>
              {countDay}
              {buttons}
            </td>);
                }
                else {
                    cells.push(<td key={j} className="no_date"></td>);
                }
            }
            tableRows.push(<tr key={i}>{cells}</tr>);
        }
        return <react_1.default.Fragment>{tableRows}</react_1.default.Fragment>;
    };
    var renderCategoryList = function () {
        return (<table id="tableList">
        <thead>
          <tr>
            <th>注文者名</th>
            <th>注文者電話</th>
            <th>注文者住所</th>
            <th>注文商品</th>
            <th>注文日付</th>
            <th>個数</th>
            <th>価格</th>
          </tr>
        </thead>
        <tbody className="tbodyTr">
          {categoryList.map(function (category, index) { return (<tr key={index}>
              <td className="name">{category.注文者名}</td>
              <td>{category.注文者電話}</td>
              <td>{category.注文者住所}</td>
              <td>{category.注文商品}</td>
              <td className="time">{category.注文日付}</td>
              <td>{category.個数}</td>
              <td>{category.価格}</td>
            </tr>); })}
        </tbody>
      </table>);
    };
    var Modal = function (_a) {
        var show = _a.show, setShow = _a.setShow;
        var closeModal = function () {
            setShow(false);
        };
        if (show) {
            return (<div id="overlay" onClick={closeModal}>
            <div id="content">
              <table className="table">
                <thead id="reviewArea">
                  <tr className="trClass">
                    <th>注文者名</th>
                    <th>注文者電話</th>
                    <th>注文者住所</th>
                    <th>注文商品</th>
                    <th>個数</th>
                    <th>価格</th>
                  </tr>
                </thead>
                <tbody id="tbodymodal">
                  {modalContent && (<tr>
                      <td className="name">{modalContent.注文者名}</td>
                      <td>{modalContent.注文者電話}</td>
                      <td>{modalContent.注文者住所}</td>
                      <td>{modalContent.注文商品}</td>
                      <td>{modalContent.個数}</td>
                      <td>{modalContent.価格}</td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>);
        }
        else {
            return null;
        }
    };
    return (<div className="calendar_area">
      <div className="calendar_header">
        <p id="year_month_label">{"".concat(year, "\u5E74").concat(month, "\u6708")}</p>
        <button onClick={prevMonth} id="prev_month_btn">
          <i className="fas fa-angle-left"></i>
        </button>
        <button onClick={nextMonth} id="next_month_btn">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div id="calendar_body">
        <table className="calendar_tbl">
          <tbody>{createCalendarTable()}</tbody>
        </table>
      </div>
      <div id="modal" className="modal">
        {renderCategoryList()}
      </div>
      <div>
        <Modal show={show} setShow={setShow}/>
      </div>
      <div id="list">
        <h2>商品注文顧客管理リスト</h2>
        <button id="addBtn">
          <react_router_dom_1.Link to="/Infoadd">情報追加</react_router_dom_1.Link>
        </button>
        {renderCategoryList()}
      </div>
    </div>);
}
export default  App;
