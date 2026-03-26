const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");

/* SHOW FORM PAGE */
router.get("/dashboard/predict", predictionController.showForm);

/* HANDLE FORM SUBMIT */
router.post("/predict", predictionController.predict);

module.exports = router;