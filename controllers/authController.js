const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.send("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    res.redirect("/");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Wrong password");

    req.session.user = user;
    res.redirect("/dashboard");
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};