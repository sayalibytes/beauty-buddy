const express = require("express");
const router = express.Router();
const moment = require("moment");
const path = require("path");
const { readJsonFile, writeJsonFile } = require('../utility/utils');

const PRODUCTS_FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "trackProducts.json"
);

const formatDate = (date) => moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

const calculateExpiryStatus = (product) => {
  const startDate = moment(product.startDate, "YYYY-MM-DD");
  const lifeAfterOpening = parseInt(product.LifeAfterOpening.split(" ")[0]);

  const useBeforeDate = startDate.clone().add(lifeAfterOpening, "months");
  const formattedUseBeforeDate = useBeforeDate.format("YYYY-MM-DD");

  const expiryDate = moment(product.expiryDate, "YYYY-MM-DD");
  const formattedExpiryDate = expiryDate.format("YYYY-MM-DD");

  // Determine the earlier date
  const displayDate = useBeforeDate.isBefore(expiryDate)
    ? formattedUseBeforeDate
    : formattedExpiryDate;
  const currentDate = moment();
  const timeLeft = moment(displayDate, "YYYY-MM-DD").diff(
    currentDate,
    "months",
    true
  );
  const isExpiringSoon = timeLeft <= 1;

  return {
    ...product,
    startDate: formatDate(product.startDate),
    displayDate,
    isExpiringSoon,
  };
};

router.get("/", (req, res) => {
  const products = readJsonFile(PRODUCTS_FILE_PATH);
  const productsWithExpiryStatus = products.map(calculateExpiryStatus);
  res.json(productsWithExpiryStatus);
});

router.post("/", (req, res) => {
  const { name, startDate, LifeAfterOpening, expiryDate } = req.body;
  if (!name || !startDate || !LifeAfterOpening || !expiryDate) {
    return res
      .status(400)
      .json({
        message:
          "Name, start date, LifeAfterOpening, and expiry date are required.",
      });
  }

  const products = readJsonFile(PRODUCTS_FILE_PATH);
  const formattedStartDate = formatDate(startDate);
  const formattedExpiryDate = formatDate(expiryDate);

  const newProduct = {
    id: products.length + 1,
    name,
    startDate: formattedStartDate,
    LifeAfterOpening,
    expiryDate: formattedExpiryDate,
  };

  products.push(newProduct);
  writeJsonFile(PRODUCTS_FILE_PATH, products);
  res
    .status(201)
    .json({ message: "Product tracking added", product: newProduct });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, startDate, LifeAfterOpening, expiryDate } = req.body;

  if (!name || !startDate || !LifeAfterOpening || !expiryDate) {
    return res
      .status(400)
      .json({
        message:
          "Name, start date, LifeAfterOpening, and expiry date are required.",
      });
  }

  const products = readJsonFile(PRODUCTS_FILE_PATH);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex !== -1) {
    const formattedStartDate = formatDate(startDate);
    const formattedExpiryDate = formatDate(expiryDate);

    products[productIndex] = {
      id,
      name,
      startDate: formattedStartDate,
      LifeAfterOpening,
      expiryDate: formattedExpiryDate,
    };

    writeJsonFile(PRODUCTS_FILE_PATH, products);
    res.json({
      message: "Product tracking updated",
      product: products[productIndex],
    });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  let products = readJsonFile(PRODUCTS_FILE_PATH);
  products = products.filter((p) => p.id !== id);
  writeJsonFile(PRODUCTS_FILE_PATH, products);
  res.json({ message: "Product tracking deleted" });
});

module.exports = router;
