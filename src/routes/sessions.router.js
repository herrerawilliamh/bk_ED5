const express = require('express');
const User = require("../dao/models/users.model")

/*VARS*/
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const user = new User({ first_name, last_name, email, age, password })
        await user.save
        res.redirect("/login")
    } catch (error) {
        res.status(500).send("Error de registro")
    }
})

module.exports = router