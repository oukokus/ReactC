const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require("mysql2");
const cors = require('cors');


const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootroot",
  database: "world",
  dateStrings: 'date' 
});

app.use(cors());
app.get("/api/get/category", (req, res) => {
     const sqlSelect = "SELECT * FROM sample3";
     con.query(sqlSelect, (err, result) => {
         res.send(result);
     });
});
app.get("/api/get/info", (req, res) => {
  res.send("This is the GET handler for /api/get/info endpoint");
});
  
app.post("/api/info", (req, res) => {
  const data = req.body;
  console.log(data)
  const columns = Object.keys(data).join(', '); // データオブジェクトから列名を抽出してカンマで連結します
const values = Object.values(data).map(value => `'${value}'`).join(', '); // データオブジェクトから値を抽出してクオートで囲んでカンマで連結します
const sql = `INSERT INTO sample3 (${columns}) VALUES (${values})`;

console.log('Columns:', columns);
console.log('Values:', values);
  con.query(sql, data, (error, results, fields) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully:', results);
      res.status(200).send('Data received successfully!');
    }
  });
});

// mysqlからデータを持ってくる
app.get("/", (req, res) => {
  // cssファイルの取得
  app.use(express.static("assets"));
  const sql = "select * from sample3";

  
  // ==========ここまでの範囲で書くようにしましょう。==========
  app.post("/", (req, res) => {
    const sql = 'INSERT INTO sample3 SET ?'
    con.query(sql, req.body, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.redirect("/");
    });
  });

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
      users: result,
      sample3: result,
    });
  });

  app.use(express.json());



 
});
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
