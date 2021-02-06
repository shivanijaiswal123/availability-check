const express = require("express");
const router = express.Router();

const availability = require("../Models/availability");

//This route is to create slots of user.
router.post("/availability", availability.addAvailability);

//This route is to view all availabilites filtering with timeOffset and userID
router.get("/availability", availability.getAvailability);

//This route is to get single availability of particular user.
router.get("/getSingleAvailability", availability.getSingleAvailability);

module.exports = router;
