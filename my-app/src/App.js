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


  const prev_month = () => {
    setShowDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });
  };

  const next_month = () => {
    setShowDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });
  };

  const createCalendarTable = (year, month) => {
    let _html = "";
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    let countDay = 0;
    let monthOfEndDay = new Date(year, month, 0).getDate();

    _html += '<table class="calendar_tbl">';
    _html += "<tr>";
    for (let i = 0; i < week.length; i++) {
      _html += "<th>" + week[i] + "</th>";
    }
    _html += "</tr>";

    let startDayOfWeek = new Date(year, month - 1, 1).getDay();
    for (let i = 0; i < 6; i++) {
      _html += "<tr>";
      for (let j = 0; j < week.length; j++) {
        if (i === 0 && j === startDayOfWeek) {
          countDay++;
          _html += '<td class="with_date">' + countDay + "</td>";
        } else if (countDay !== 0 && countDay < monthOfEndDay) {
          countDay++;
          _html += '<td class="with_date">' + countDay + "</td>";
        } else {
          _html += '<td class="no_date"></td>';
        }
      }
      _html += "</tr>";
    }

    _html += "</table>";
    return _html;
  };

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



  let tbodyTr = document.querySelectorAll(".tbodyTr")
  let time = document.querySelectorAll(".time")
  let modal = document.getElementById('modal')
  console.log(tbodyTr)
  console.log(time)
  console.log(modal)
  const handleBtnClick = (btn) => {
    for (let i = 0; i < tbodyTr.length; i++) {
      time[i].style.display = 'none';
      modal.style.display = 'block';
      tbodyTr[i].style.display = 'none';
      tbodyTr[btn].style.display = 'table-row'
    }
  }


  useEffect(() => {
    showCalendar(showDate);
  }, [showDate, categoryList]);
  
  const showCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const showDateStr = year + "年 " + month + "月";
    document.querySelector("#year_month_label").innerHTML = showDateStr;
    const calendarTable = createCalendarTable(year, month);
    document.querySelector("#calendar_body").innerHTML = calendarTable;

    let time = document.querySelectorAll(".time");
    let name = document.querySelectorAll(".name");
    let day = document.querySelectorAll(".with_date");
    for (let i = 0; i < name.length / 2; i++) {
      let month1 = time[i].innerHTML.slice(0, 7);
      let month2 = year + "-" + ("0" + month).slice(-2);
      let days = time[i].innerHTML.slice(-2) - 1;
      if (month1 === month2) {
        day[days].insertAdjacentHTML(
          "beforeend",
          `<br><button onclick="${openModal}" id="${i}" class="clBtn"'>${name[i].innerText}</button>`
      );
        //    `<br><button onclick="handleBtnClick(${i})" id="${i}" class="clBtn">${name[i].innerText}</button>`
      }
    }
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
                index === 2 && (
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
        <p id="year_month_label">{`${showDate.getFullYear()}年 ${
          showDate.getMonth() + 1
        }月`}</p>
        <button id="prev_month_btn" onClick={prev_month}>
          <i className="fas fa-angle-left"></i>
        </button>
        <button id="next_month_btn" onClick={next_month}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div id="calendar_body"></div>
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



