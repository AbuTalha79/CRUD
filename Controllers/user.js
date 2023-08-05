const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");

router.post("/AddUser", async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;

    const AddUser = await User.create({ username, email, mobile, password });
    res.status(201).json({ message: "Successfully created user", AddUser });
  } catch (error) {
    res.status(403).json({ message: "Something went wrong" });
  }
});

router.get("/getAllUser", async (req, res) => {
  try {
    const getAllUser = await User.find();
    res
      .status(200)
      .json({
        message: "Successfully created user",
        getAllUser,
        count: getAllUser.length,
      });
  } catch (error) {
    res.status(403).json({ message: "Something went wrong" });
  }
});

router.get("/getSingleUser/:id", async (req, res) => {
  try {
    const getSingle = await User.findById(req.params.id);
    res.status(200).json({ message: "Successfully created user", getSingle });
  } catch (error) {
    res.status(403).json({ message: "User not found" });
  }
});

router.put("/updateUser/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteUser/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
