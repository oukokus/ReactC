import React, { useState, useEffect , Fragment } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse, AxiosError } from "axios";

interface Category {
  注文者名: string;
  注文者電話: string;
  注文者住所: string;
  注文商品: string;
  注文日付: string;
  個数: number;
  価格: number;
}

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [modalContent, setModalContent] = useState<Category | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Axios.get<Category[]>("http://localhost:3001/api/get/category")
      .then((response: AxiosResponse<Category[]>) => {
        setCategoryList(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        setError("データの取得中にエラーが発生しました。");
        console.error("データの取得中にエラーが発生しました。", error);
      });
  }, []);


  if (loading) {
    return <div>データを読み込んでいます...</div>;
  }

  if (error) {
    return <div>エラーが発生しました: {error}</div>;
  }
  

  const openModal = (index: number) => {
    setShow(true);
    setModalContent(categoryList[index]);
  };

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

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
    let countDay: number = 0;
    let monthOfEndDay = new Date(year, month, 0).getDate();
    let tableRows = [];
    const withDateClassName = "with_date";

    let startDayOfWeek = new Date(year, month - 1, 1).getDay();
    for (let i = 0; i < 6; i++) {
      let cells = [];
      for (let j = 0; j < week.length; j++) {
        if (i === 0 && j === startDayOfWeek) {
          countDay++;
          cells.push(
            <td key={countDay} className={withDateClassName}>
              {countDay}
            </td>
          );
        } else if (countDay !== 0 && countDay < monthOfEndDay) {
          countDay++;
          const buttons = categoryList.map((category, index) => {
            const month1 = category.注文日付.slice(0, 7);
            const month2 = `${year}-${("0" + month).slice(-2)}`;
            const days = parseInt(category.注文日付.slice(-2));
            if (month1 === month2 && days === countDay) {
              return (
                <p className="pbtn" key={index}>
                  <button
                    onClick={() => openModal(index)}
                    className="clBtn"
                    id={index.toString()}
                  >
                    {category.注文者名}
                  </button>
                </p>
              );
            } else {
              return null;
            }
          });
          cells.push(
            <td key={countDay} className={withDateClassName}>
              {countDay}
              {buttons}
            </td>
          );
        } else {
          cells.push(<td key={j} className="no_date"></td>);
        }
      }
      tableRows.push(<tr key={i}>{cells}</tr>);
    }

    return <React.Fragment>{tableRows}</React.Fragment>;
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
        <tbody className="tbodyTr">
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

  const Modal: React.FC<{ show: boolean; setShow: React.Dispatch<boolean> }> =
    ({ show, setShow }) => {
      const closeModal = () => {
        setShow(false);
      };
      if (show) {
        return (
          <div id="overlay" onClick={closeModal}>
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
                  {modalContent && (
                    <tr>
                      <td className="name">{modalContent.注文者名}</td>
                      <td>{modalContent.注文者電話}</td>
                      <td>{modalContent.注文者住所}</td>
                      <td>{modalContent.注文商品}</td>
                      <td>{modalContent.個数}</td>
                      <td>{modalContent.価格}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        return null;
      }
    };

  return (
    <div className="calendar_area">
      <div className="calendar_header">
        <p id="year_month_label">{`${year}年${month}月`}</p>
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
