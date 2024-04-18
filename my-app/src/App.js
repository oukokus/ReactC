import "./App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function App() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/category").then((response) => {
      setCategoryList(response.data);
    });
  }, []);
  const openModal = () => {
    setShow(true)
  }
  const [showDate, setShowDate] = useState(new Date());

  // year と month の状態を初期化
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // 前の月を表示する関数
  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  // 次の月を表示する関数
  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const createCalendarTable = () => {
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    let countDay = 0;
    let monthOfEndDay = new Date(year, month, 0).getDate();
    let tableRows = [];

    // ヘッダー行を作成
    let headerCells = week.map((day, index) => <th key={index}>{day}</th>);
    tableRows.push(<tr key="header">{headerCells}</tr>);

    // カレンダーの日付部分を作成
    let startDayOfWeek = new Date(year, month - 1, 1).getDay();
    for (let i = 0; i < 6; i++) {
      let cells = [];
      for (let j = 0; j < week.length; j++) {
        if (i === 0 && j === startDayOfWeek) {
          countDay++;
          cells.push(<td key={countDay} className="with_date">{countDay}</td>);
        } else if (countDay !== 0 && countDay < monthOfEndDay) {
          countDay++;
          cells.push(<td key={countDay} className="with_date">{countDay}</td>);
        } else {
          cells.push(<td key={j} className="no_date"></td>);
        }
      }
      tableRows.push(<tr key={i}>{cells}</tr>);
      
    }
 
   
    return tableRows;

    
  };


 // const createBox = () => {
 //   let time = document.querySelectorAll(".time");
 //   let name = document.querySelectorAll(".name");
 //   let day = document.querySelectorAll(".with_date");
 //   console.log(time)
 //   console.log(name)
 //   console.log(day)
 //
 //   for (let i = 0; i < name.length / 2; i++) {
 //     let month1 = time[i].innerHTML.slice(0, 7);
 //     let month2 = year + "-" + ("0" + month).slice(-2);
 //     let days = time[i].innerHTML.slice(-2) - 1;
 //     if (month1 === month2) {
 //       day[days].insertAdjacentHTML(
 //         "beforeend",
 //         `<br><button onClick="${openModal}" id="${i}" class="clBtn"'>${name[i].innerText}</button>`
 //       );
 //     }
 //   }
 // // }
  const createBox = () => {
    const buttons = categoryList.map((category, index) => {
      const month1 = category.注文日付.slice(0, 7);
      const month2 = `${year}-${("0" + month).slice(-2)}`;
      const days = parseInt(category.注文日付.slice(-2)) - 1;
      
      console.log(month1)
      console.log(month2)
      console.log(days)
      if (month1 === month2) {
        return (
          <button key={index} onClick={openModal} id={index} className="clBtn">
            {category.注文者名}
          </button>
        );
      } else {
        return null;
      }
    });
    return buttons;
  }
  const renderCategoryList = () => {
    return (
      <table id="tableList">
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
        <tbody class="tbodyTr">
          {categoryList.map((category, index) => (
            <tr key={index}>
              <td className="name">{category.注文者名}</td>
              <td>{category.注文者電話}</td>
              <td>{category.注文者住所}</td>
              <td>{category.注文商品}</td>
              <td className="time">{category.注文日付}</td>
              <td>{category.個数}</td>
              <td>{category.価格}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const [show, setShow] = useState(false)
  function Modal({show, setShow}) {
    const closeModal = () => {
      setShow(false)
    }
    if (show) {
      return (
        <div id="overlay" onClick={closeModal}>
          <div id="content">
        <table class="table">
          <thead id="reviewArea">
            <tr class="trClass">
              <th>注文者名</th>
              <th>注文者電話</th>
              <th>注文者住所</th>
              <th>注文商品</th>
              <th>個数</th>
              <th>価格</th>
            </tr>
          </thead>
          <tbody id="tbodymodal">
                {categoryList.map((category, index) => (
                  index === 1  && (
              <tr key={index}>
                <td className="name">{category.注文者名}</td>
                <td>{category.注文者電話}</td>
                <td>{category.注文者住所}</td>
                <td>{category.注文商品}</td>
                <td>{category.個数}</td>
                <td>{category.価格}</td>
                    </tr>
                    )
            ))}
          </tbody>
        </table>
        </div>
      </div >
    )
  } else {
    return null;
  }
}

  return (
    <div className="calendar_area">
      <div className="calendar_header">
        <p id="year_month_label">   {`${year}年${month}月`}</p>
        <button onClick={prevMonth} id="prev_month_btn">
          <i className="fas fa-angle-left"></i>
        </button>
        <button onClick={nextMonth}  id="next_month_btn">
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div id="calendar_body">
      <table className="calendar_tbl">
        <tbody>
            {createCalendarTable()}
        
        </tbody>
      </table>
    </div>
      <div id="modal" class="modal">
      {renderCategoryList()}
      </div>
      <div>
      
        <button onClick={openModal}>Click</button>
        <Modal show={show} setShow={setShow} />
      </div>
      <div id="list">
        <h2>商品注文顧客管理リスト</h2>
        <button id="addBtn">
          <Link to="/Infoadd">情報追加</Link>
        </button>
        {renderCategoryList()}
      </div>
    </div>
  );
}
export default App;
