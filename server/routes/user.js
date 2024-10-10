const { Router } = require("express")
const route = Router()
const bcrypt = require('bcrypt');
const { User, Todo } = require("../db");
const jwt = require('jsonwebtoken');
const { USER_JWT_PASSWORD } = require("../config");
const { auth, corsMiddl } = require("../middleware");


route.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existUser = await User.findOne({
            username: username,
            email: email
        })
        if (existUser) {
            return res.json({
                message: "User already exist please login"
            })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const signUser = await User.create({
            username: username,
            email: email,
            password: hashPassword
        })
        res.json({
            message: "User sign up successfully",
            user: signUser
        })

    } catch (error) {
        res.status(404).json({
            message: "Something error",
            error: error.message
        })
    }
})
route.post("/signin", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const findUser = await User.findOne({
            username,
            email
        })
        const comparePass = await bcrypt.compare(password, findUser.password)
        if (!findUser && !comparePass) {
            return res.json({
                message: "User or password not found please sign up",
                error: error.message
            })
        }
        const token = jwt.sign({
            username: findUser.username,
            email: findUser.email,
            id: findUser._id
        }, USER_JWT_PASSWORD)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        })
        res.json({
            message: "User sign in successfully",
            token: token
        })
    } catch (error) {
        res.status(404).json({
            message: "Something error occured",
            error: error.message
        })
    }
})
route.get("/profile", auth, async (req, res) => {
    const user = req.user;
    if (!req.user) {
        return res.status(404).json({
            message: "User not authenticated"
        })
    }
    const { username, email } = req.user
    res.json({
        username: username,
        email: email
    })
})
route.post("/todo", auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const addTodo = await Todo.create({
            title,
            content
        })
        return res.json({
            message: "Todo added",
            todo: addTodo
        })
    } catch (error) {
        res.status(404).json({
            message: "Something error",
            error: error.message
        })
    }
})
route.get("/todos", async (req, res) => {
    try {
        const allTodo = await Todo.find({})

        res.json({
            todos: allTodo
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})
route.delete("/todo/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
        const dlt = await Todo.findByIdAndDelete(id)
        res.json({
            message: "Todo deleted",
            dltTodo: dlt
        })
    } catch (error) {
        res.status(404).json({
            message: "Error while deleting",
            error: error.message
        })

    }

})
route.post("/logout", async (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Loged out"
    })
})


module.exports = {
    route
}