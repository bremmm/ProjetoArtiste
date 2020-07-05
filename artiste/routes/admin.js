const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/user")
const User = mongoose.model("users")

router.get('/', (req, res) => {
    res.render("admin/index")

})


router.get('/home', (req, res) => {
    res.render("admin/homepage")
})

router.post("/add/user", (req, res) => {
    var errors = []

    if (!req.body.name || typeof req.body.name == undefined || req.body.nome == null) {
        errors.push({
            text: "Nome de usuário inválido"
        })
    }

    if (req.body.name.length < 2) {
        errors.push({
            text: "Nome de usuário muito curto"
        })
    }

    if (errors.length > 0) {
        res.redirect("admin/home", {
            errors: errors
        })
    } else {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }


        new User(newUser).save().then(() => {
            console.log("cadastrado com sucesso")
            res.redirect("admin/home")
        }).catch((error) => {
            console.log("erro ao salvar o usuario", +error)
            res.redirect("admin/home")
        })
    }
})
module.exports = router;