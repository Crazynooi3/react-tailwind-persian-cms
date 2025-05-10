const express = require("express");
const CMSDB = require("../db/CMS");

const productsRouter = express.Router();

productsRouter.post("/", (req, res) => {
  let body = req.body;

  let addNewUserQuery = `
      INSERT INTO admin (firsname, lastname, username, password, task, img, token)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const values = [
    body.firsname || "ثبت نشده",
    body.lastname || "",
    body.username,
    body.password,
    body.task,
    body.img || "/images/empty.png",
    body.token || "",
  ];

  CMSDB.query(addNewUserQuery, values, (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      res.status(500).send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = productsRouter;
