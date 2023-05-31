const router = require('express').Router()
const userController = require("../controllers/user")

const userRoutes = (app) => {
    router.get("/all", userController.allUsers)
    router.get("/:id", userController.getUserById)
    router.post("/register", userController.register)
    router.post("/login", userController.login)
    router.patch("/:id", userController.updateUser)
    router.delete("/delete/:id", userController.deleteUser)
    router.get("/changePermission/:monitorId/:userId/:permission", userController.changePermission)

    return app.use("/user", router)
}

module.exports = {
    userRoutes
}