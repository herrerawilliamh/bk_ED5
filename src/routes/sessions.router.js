const express = require('express');
const User = require("../dao/models/users.model")

/*VARS*/
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        let role = "user";
        if (email === "adminCoder@coder.com") {
            role = "admin";
        }
        const user = new User({ first_name, last_name, email, age, password })
        await user.save();
        res.redirect("/login")
    } catch (error) {
        res.status(500).send("Error de registro")
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.send("Usuario no encontrado");
            return;
        }
        const validPassword = await user.isValidPassword(password); // Comparar las contraseñas usando la función del modelo
        if (!validPassword) {
            res.send("Contraseña incorrecta");
            return;
        }
        req.session.user = user;
        res.redirect("/products");
    } catch (error) {
        res.status(500).send("Error de login");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});


module.exports = router;