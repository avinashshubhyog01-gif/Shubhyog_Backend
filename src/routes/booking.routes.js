// booking.routes.js
const express = require("express");
const { createBooking } = require("../controllers/booking.controller");

const router = express.Router();

router.post("/", createBooking);

module.exports = router;
