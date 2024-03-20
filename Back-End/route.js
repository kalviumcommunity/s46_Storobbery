const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { authSchema, signupSchema } = require("./validate");
const { User, Data } = require("./model");
const app = express();
app.use(express.json());

// middleware/authenticate.js

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token is present or not
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user information in the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

router.get("/read", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get data
router.get("/data", authenticate, async (req, res) => {
  try {
    const datas = await Data.find();
    res.json(datas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/upload",authenticate, async (req, res) => {
  try {
    const {
      dateTime,
      location,
      description,
      robberyType,
      amountStolen,
      securityMeasures,
      suspectInformation,
      youtubeLink,
      username,
    } = req.body;
    const newData = new Data({
      dateTime,
      location,
      description,
      robberyType,
      amountStolen,
      securityMeasures,
      suspectInformation,
      youtubeLink,
      username,
    });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

//post user
router.post("/user", async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    const { name, user_id, email, password } = req.body;
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "error" });
    }
    const doesExist = await User.findOne({ user_id: user_id });
    if (doesExist) {
      return res
        .status(401)
        .json({ message: "username or email already exists" });
      // console.log("hi")
    }
    console.log(1);
    const newUser = new User({
      name,
      user_id,
      email,
      password,
    });
    const savedUser = await newUser.save();
    console.log(2);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
//delete data
router.delete("/d-delete/:id", async (req, res) => {
  try {
    const user = await Data.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
//edit user
router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Item updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//edit data
router.put("/d-update/:id", async (req, res) => {
  try {
    const {
      dateTime,
      location,
      description,
      robberyType,
      amountStolen,
      securityMeasures,
      suspectInformation,
      youtubeLink,
      username,
    } = req.body;
    const newData = {
      dateTime,
      location,
      description,
      robberyType,
      amountStolen,
      securityMeasures,
      suspectInformation,
      youtubeLink,
      username,
    };

    const updatedData = await Data.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data updated successfully", updatedData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("hi");
    const { user_id, password } = req.body;
    const result = await authSchema.validateAsync(req.body);
    console.log(result);
    const user = await User.findOne({ user_id: user_id });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate token
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ message: "Login Successful", token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, user_id, email, password } = req.body;
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "error" });
    }
    const doesExist = await User.findOne({ user_id: user_id });
    if (doesExist) {
      return res
        .status(401)
        .json({ message: "username or email already exists" });
      // console.log("hi")
    }
    const newUser = new User({
      name,
      user_id,
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
