const express = require("express");
const CMSDB = require("../db/CMS");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = "${adminToken}"`;

  CMSDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
