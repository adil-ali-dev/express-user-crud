const express = require("express");
const router = express.Router();
const userService = require("../services/users.service");
const userSchema = require("../schemas/user.schema");
const { validate } = require("../../../middlewares/validate");

router.post("/create-user", async (req, res) => {
  console.log("I am herr");
  const userCreated = await userService.createUser(req.user, req.body, res);
  if (userCreated) {
    res.status(200).json({
      statusCode: 200,
      message: "User created successfully and invite email sent",
      data: userCreated,
    });
  }
});

router.get("/get-users", async (req, res) => {
  const users = await userService.getUsers(req, res);
  if (users) {
    res
      .status(200)
      .json({ statusCode: 200, message: "User list is attached", data: users });
  }
});
router.delete("/delete-user", async (req, res) => {
  const users = await userService.deleteUser(req, res);
  if (users) {
    res.status(200).json({
      statusCode: 200,
      message: "User deleted successfully",
      data: users,
    });
  }
});

router.patch("/edit-user", async (req, res) => {
  const users = await userService.editUser(req, res);
  if (users) {
    res.status(200).json({
      statusCode: 200,
      message: "User deleted successfully",
      data: users,
    });
  }
});

module.exports = router;
