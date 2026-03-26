const { spawn } = require("child_process");

/* SHOW FORM */
exports.showForm = (req, res) => {
    res.render("prediction/form");
};

/* PREDICT */
exports.predict = (req, res) => {
    const { glucose, bmi, age } = req.body;

    const python = spawn("python", [
        "python_model/predict.py",
        JSON.stringify([glucose, bmi, age])
    ]);

    let result = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (err) => {
        console.error(err.toString());
    });

    python.on("close", () => {
        res.render("prediction/result", {
            result: result.trim() || "Not Diabetic"
        });
    });
};