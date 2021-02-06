const express = require("express");
const router = express.Router();

const availability = require("../Models/availability");

//This route is to add availability.
router.post("/availability", availability.addAvailability);

//This route is to get availability.
router.get("/availability", availability.getAvailability);

module.exports = router;
