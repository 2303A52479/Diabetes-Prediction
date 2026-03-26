require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const app = express();

/* ================= DATABASE ================= */
mongoose.connect("mongodb://127.0.0.1:27017/diabetes_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

/* ================= MIDDLEWARE ================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* STATIC FILES (CSS, images) */
app.use(express.static(path.join(__dirname, "public")));

/* ================= SESSION ================= */
app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/diabetes_app"
    })
}));

/* ================= VIEW ENGINE ================= */
app.set("view engine", "ejs");

/* ================= ROUTES ================= */
const authRoutes = require("./routes/auth");
const predictionRoutes = require("./routes/prediction");
const paperRoutes = require("./routes/papers");

/* USE ROUTES */
app.use("/", authRoutes);          // login/register
app.use("/", predictionRoutes);    // prediction routes
app.use("/papers", paperRoutes);   // papers page

/* ================= DASHBOARD ================= */
app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("dashboard/index", {
        user: req.session.user
    });
});

/* ================= DEFAULT ROUTE ================= */
app.get("/", (req, res) => {
    res.redirect("/login");
});

/* ================= SERVER ================= */
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});