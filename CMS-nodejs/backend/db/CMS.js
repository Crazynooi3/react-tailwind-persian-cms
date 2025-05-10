const mysql = require("mysql");

const SabzlearnShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "CMS",
});

module.exports = SabzlearnShopDB;
