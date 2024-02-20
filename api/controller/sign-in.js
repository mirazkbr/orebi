const bcrypt = require("bcrypt");
const emailValidation = require("../helpers/email.validation");
const userSchema = require("../models/userSchema");
const emailVerify = require("./email.verify");

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !emailValidation(email)) {
      return res.json({
        error: "Invalid email format",
      });
    } else if (!password) {
      return res.json({
        error: "Password is required",
      });
    } else {
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res.json({
          error: "Email is not registered",
        });
      }
      if (user.emailVerify == false) {
        return res.json({
          error: "Email is not verified",
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.json({
          success: "Login successful",
        });
      } else {
        return res.json({
          error: "Invalid password",
        });
      }
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

module.exports = signIn;
