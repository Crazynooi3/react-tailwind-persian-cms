const express = require("express");
const CMSDB = require("./../db/CMS");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const productsRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../src/assets/uploads/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const safeFileName = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + safeFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: فقط فایل‌های تصویری (jpeg, jpg, png, gif) مجازند!");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // حداکثر 5MB
});

// routes

productsRouter.get("/", (req, res) => {
  console.log("get products");
  let selectAllProductsQuery = `SELECT * FROM Products`;
  CMSDB.query(selectAllProductsQuery, (err, result) => {
    console.log("get products query");
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      console.log("get products query result");
      res.send(result);
    }
  });
});

productsRouter.delete("/:productID", (req, res) => {
  let productID = req.params.productID;
  let deleteProductQuery = `DELETE FROM Products WHERE id = ${productID}`;

  CMSDB.query(deleteProductQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.put("/:productID", (req, res) => {
  let body = req.body;
  let productID = req.params.productID;

  let updateProductQuery = `UPDATE Products SET title="${body.title}", price=${body.price}, count=${body.count} ,img="${body.img}",popularity=${body.popularity},sale=${body.sale},colors=${body.colors} WHERE id = ${productID}`;
  CMSDB.query(updateProductQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.post("/", (req, res) => {
  let body = req.body;
  console.log(body);

  let addNewProductQuery = `
    INSERT INTO products (title, price, count, img, popularity, sale, colors, productDesc, url, categoryID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    body.title,
    body.price,
    body.count,
    body.img,
    body.popularity,
    body.sale,
    body.colors,
    body.productDesc || "",
    body.url || "",
    body.categoryID || 1,
  ];

  CMSDB.query(addNewProductQuery, values, (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      res.status(500).send(null);
    } else {
      res.send(result);
    }
  });
});

productsRouter.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "هیچ فایلی آپلود نشد!" });
    }
    const filePath = `/uploads/${req.file.filename}`; // مسیر فایل
    res.status(200).json({
      message: "فایل با موفقیت آپلود شد!",
      filePath: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "خطا در آپلود!", error: error.message });
    console.error(error);
  }
});

module.exports = productsRouter;
