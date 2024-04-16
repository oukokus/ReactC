import './App.css';
import { useState, useEffect ,useRef } from 'react'
import { Link, Route, Routes,Outlet } from 'react-router-dom';
import Axios from "axios";

function App() {
 // const [message, setMessage] = useState('');
 // useEffect(() =>{
 //   fetch('/api')
 //     .then((res) => res.json())
 //     .then((data) => setMessage(data.message));
 // }, [])
  const [categoryList, setCategoryList] = useState([]);
 useEffect(() => {
   Axios.get("http://localhost:3001/api/get/category").then((response) => {
    setCategoryList(response.data);
   });
 }, []);

      // 曜日の定義
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      // 今日の日付
      let today = new Date();
      // 表示用の日付
      let showDate = new Date(today.getFullYear(), today.getMonth(), 1);
      // 表示された時
      window.onload = function () {
          // カレンダーの表示（引数には表示用の日付を設定）
          showCalendar(showDate);
      };
  
      /**
       * カレンダーの表示
       */
      function showCalendar(date) {
          // 年
          let year = date.getFullYear();
          // 月
          let month = date.getMonth() + 1;
          // ヘッダーの年月に表示する文字列
          let showDateStr = year + "年 " + month + "月";
          // ヘッダーの年月部分に埋め込み
          document.querySelector('#year_month_label').innerHTML = showDateStr;
          // カレンダーテーブルを作成する（HTMLが返却される）
          let calendarTable = createCalendarTable(year, month);
          // カレンダー表示部分に埋め込み
          document.querySelector('#calendar_body').innerHTML = calendarTable;
  
  
          //商品注文顧客管理リスト
       
          let getTrList = document.querySelectorAll(".trList")
          //空の行を削除
          for (let i = 0; i < getTrList.length; i++) {
              if (getTrList[i].childNodes.item(1).innerText == "") {
                  getTrList[i].remove()
              }
          }
  
          //カレンダーに表示
          let time = document.querySelectorAll(".time")
          let name = document.querySelectorAll(".name")
          let day = document.querySelectorAll(".with_date")
          for (let i = 0; i < time.length; i++) {
              let month1 = time[i].innerHTML.slice(0, 7)
              let month2 = year + "-" + ("0" + (month))
              let days = time[i].innerHTML.slice(-2) - 1
              if (month1 == month2)
                  day[days].insertAdjacentHTML("beforeend", "<br>" + "<button onclick='btnClick(" + [i] + ")'  id='" + [i] + "' class='clBtn'>" + name[i].innerText + "</button>")
          }
      }
  
      //ポップアップの表示
      let tbodyTr = document.querySelectorAll(".tbodyTr")
      let time = document.querySelectorAll(".time")
      let modal = document.getElementById('modal')
      function btnClick(btn) {
          for (let i = 0; i < tbodyTr.length; i++) {
              time[i].style.display = 'none';
              modal.style.display = 'block';
              tbodyTr[i].style.display = 'none';
              tbodyTr[btn].style.display = 'table-row'
          }
      }

  
      /**
       * カレンダーテーブルの作成
       */
      function createCalendarTable(year, month) {
          // HTML用の変数
          let _html = '';
          // tableタグ
          _html += '<table class="calendar_tbl">';
          // テーブルのヘッダー（曜日）
          _html += '<tr>';
          for (let i = 0; i < week.length; i++) {
              _html += "<th>" + week[i] + "</th>";
          }
          _html += '</tr>';
          // ---------------------
          // 表示するカレンダー年月の1日の曜日を取得
          let startDayOfWeek = new Date(year, month - 1, 1).getDay();
          // 日付
          let countDay = 0;
          // 月の末日
          let monthOfEndDay = new Date(year, month, 0).getDate()
          // 6行分繰り返し
          for (let i = 0; i < 6; i++) {
              _html += '<tr>';
              // 7列（曜日の数）分繰り返し
              for (let j = 0; j < week.length; j++) {
                  // １行目で開始曜日と同じ場合
                  if (i == 0 && j == startDayOfWeek) {
                      // 日付+1
                      countDay++;
                      // tdタグ（日付有りが分かるようにクラス属性に"with_date"を設定）
                      _html += '<td class="with_date">' + countDay + '</td>';
                  }
                  // 日付が0以外で、日付が末日より小さい場合
                  else if (countDay != 0 && countDay < monthOfEndDay) {
                      // 日付+1
                      countDay++;
                      // tdタグ（日付有りが分かるようにクラス属性に"with_date"を設定）
                      _html += '<td class="with_date">' + countDay + '</td>';
                  }
                  else {
                      // tdタグ（日付無しが分かるようにクラス属性に"no_date"を設定）
                      _html += '<td class="no_date"></td>';
                  }
              }
              _html += '</tr>';
          }
          _html += '</table>';
          // 組み立てたHTMLを返却
          return _html;
      }

      function prev_month() {
          showDate.setMonth(showDate.getMonth() - 1);
          showCalendar(showDate);
      }
      function now_month() {
          showDate = new Date();
          showCalendar(showDate);
      }
      function next_month() {
          showDate.setMonth(showDate.getMonth() + 1);
          showCalendar(showDate);
      }
  
  return (
    <div className="App"> 
          <div class="calendar_area">
                <div class="calendar_header">
                    <p id="year_month_label"></p>
                    <button id="prev_month_btn" onClick={prev_month}><i class="fas fa-angle-left"></i></button>
                    <button id="next_month_btn" onClick={next_month}><i class="fas fa-angle-right"></i></button>
                </div>
                <div id="calendar_body"></div>
                <div id="modal" class="modal">
                    <div class="modal-content">
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
                        </table>
                    </div>
        </div>
        </div>
      <div id="list">
        <h2>商品注文顧客管理リスト</h2>
        <button id="addBtn"><Link to="/Infoadd">情報追加</Link></button>
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
        <tbody id="tbodyList">
      
            {categoryList.map((val, index) => {
       
              return (  <tr class="trList">
                <td key={index}>{val.注文者名}</td> 
                <td key={index}>{val.注文者電話}</td> 
                <td key={index}>{val.注文者住所}</td> 
                <td key={index}>{val.注文商品}</td> 
                <td key={index}>{val.注文日付}</td> 
                <td key={index}>{val.価格}</td> 
                <td key={index}>{val.個数}</td> 
                </tr>
       )
      })}
         
        </tbody>
  </table>
            </div>
    </div>
  );
}

export default App;

