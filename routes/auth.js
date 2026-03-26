const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.get("/", (req, res) => res.render("auth/login"));
router.get("/register", (req, res) => res.render("auth/register"));

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;