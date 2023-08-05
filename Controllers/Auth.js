const express = require("express");
const router = express.Router();
const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");

router.post("/signup", async function (req, res) {
  const { username, email, mobile, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashingPassword = await bcrypt.hashSync(password, salt);

  try {
    const createUser = await User.create({
      username,
      email,
      mobile,
      password: hashingPassword,
    });
    res.status(201).json({ success: true, createUser });
  } catch (error) {
    res.status(403).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/Userlogin", async (req, res) => {
  const { email, password } = req.body;
try {
  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(403).json({ message: "User cannot found" });
  }
  const isPasswordMatch = await bcrypt.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordMatch) {
    return res.status(403).json({ message: "Invalid Credentials" });
  }
  return res
    .status(201)
    .json({ message: "Login Successful", user: existingUser });
} catch (error) {
  return res.status(403).json({ message: "OOPs" });
  
}
 
});

module.exports = router;
