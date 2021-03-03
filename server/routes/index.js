const CONSTANTS = require("../constants");
const express = require("express");
const mongoService = require("../mongo/mongoService");
const sampleData = require("../sampleData");
const portdata = require("../portdata");


const router = express.Router();

//List Items
router.get(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
  mongoService.get(req, res, next);
});

router.post(CONSTANTS.ENDPOINT.LIST, function(req, res, next) {
  mongoService.create(req, res, next);
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", function(req, res, next) {
  mongoService.destroy(req, res, next);
});

// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
  res.json(sampleData.textAssets);
});

// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, (req, res) => {
  res.json(portdata.textAssets);
});

//visitor counter
router.get(CONSTANTS.ENDPOINT.VISITCOUNTER, function(req, res, next) {
  mongoService.getAndUpdateCounter(req, res, next);
});


module.exports = router;
