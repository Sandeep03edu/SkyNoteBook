const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWD_SECRET_KEY = "Hello$@nDEE&";
const fetchuser = require("../middleware/fetchuser");

// Creating a user using:  POST "/api/auth/createUser"
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email  id").isEmail(),
    body("password", "Password should have min length of 5").isLength({
      min: 5,
    }),
    body("name", "Name should have a min length of 5").isLength({ min: 5 }),
  ],

  async (req, res) => {
    // Checking data vaildation and sending bad req for errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // User already exist in database
        return res.status(400).json({  success, errors: "Mail id already registered!!" });
      }

      const salt = await bcrypt.genSalt(10);

      let securedPass = await bcrypt.hash(req.body.password, salt);

      // Creating user from req
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      }).then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };

        // jwt.sign({DATA}, JWD_SECRET_KEY);
        const authtoken = jwt.sign(data, JWD_SECRET_KEY);
        success = true;
        res.json({success, authtoken });
        //   res.json(user)
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send( success, "An error occurred!!");
    }
  }
);

// Authenticating a user using:  POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email  id").isEmail(),
    body("password", "Password cannot be empty!!").exists(),
  ],
  async (req, res) => {
    // Checking data vaildation and sending bad req for errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,  errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        // User doesn't exist!
        return res.status(400).json({ success, errors: "Invalid credentials" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        // Password doesn't match
        return res.status(400).json({success,  errors: "Invalid credentials" });
      }

      // Sending data
      const data = {
        user: {
          id: user.id,
        },
      };

      // jwt.sign({DATA}, JWD_SECRET_KEY);
      const authtoken = jwt.sign(data, JWD_SECRET_KEY);
      console.log("Token", authtoken);
      success = true;
      res.json({ success, authtoken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(success, "An error occurred!!");
    }
  }
);



// Get logged in user details using POST "api/auth/getuser", Login Required
router.post(
  "/getuser", fetchuser,  async (req, res) => {
    // Checking data vaildation and sending bad req for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.status(200).send({user})
    } catch (err) {
      console.log(err.message);
      res.status(500).send("An error occurred!!");
    }
  }
);
module.exports = router;
