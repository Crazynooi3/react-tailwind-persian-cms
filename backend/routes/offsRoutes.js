const express = require("express");
const CMSDB = require("./../db/CMS");

const offsRouter = express.Router();

// routes

offsRouter.get("/", (req, res) => {
  let selectAllOffsQuery = `SELECT Offs.id, Offs.code, Offs.date, Offs.isActive, Offs.percent, Admins.firstname as adminID, Products.title as productID FROM Offs INNER JOIN Admins ON Admins.id = Offs.adminID INNER JOIN Products ON Products.id = Offs.productID`;

  CMSDB.query(selectAllOffsQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

offsRouter.delete("/:offID", (req, res) => {
  let offID = req.params.offID;
  let deleteOffQuery = `DELETE FROM Offs WHERE id = ${offID}`;

  CMSDB.query(deleteOffQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

offsRouter.put("/active-off/:offID/:isActive", (req, res) => {
  let offID = req.params.offID;
  let isActive = req.params.isActive;
  let activeOffQuery = `UPDATE Offs SET isActive=${isActive} WHERE id = ${offID}`;

  CMSDB.query(activeOffQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = offsRouter;
