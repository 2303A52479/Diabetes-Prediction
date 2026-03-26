const express = require("express");
const router = express.Router();

/* SHOW PAPERS PAGE */
router.get("/", (req, res) => {
    res.render("papers/index", {
        recentPapers: []   // ✅ FIX: pass empty array
    });
});

module.exports = router;