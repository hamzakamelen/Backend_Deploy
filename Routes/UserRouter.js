const express = require("express");
const { sendResponse } = require("../helper/helper");
const UserModel = require("../models/UserModel");
const AuthControllers = require("../Controllers/AuthCont");
const route = express.Router();
// npm i bcrypt
const bcrypt = require("bcrypt");
// route.get('/')

// Signup
route.post("/signup", AuthControllers.SignUp);

// Login
route.post("/login", AuthControllers.Login);
route.get("/test", AuthControllers.protected, (req, res) => {
  res.send("/User Valid");
});

// route.post('/')
// route.put('/')
// route.delete('/')

module.exports = route;
