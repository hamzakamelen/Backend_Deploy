const sendResponse = require("../helper/helper");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
//npm i jsonwebtoken
var jwt = require("jsonwebtoken");

const AuthControllers = {
  Login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };
    //validation khud krni h
    let ReqArr = ["email", "password"];
    let errArr = [];
    ReqArr.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });
    if (errArr.length > 0) {
      res
        .send(
          sendResponse(
            false,
            null,
            "Please Filled Required Fields First",
            errArr
          )
        )
        .status(400);
    } else {
      let result = await UserModel.findOne({ email });
      if (result) {
        let isConfirm = await bcrypt.compare(obj.password, result.password);
        if (isConfirm) {
          const token = jwt.sign({ ...result }, process.env.SECURE_KEY, {
            expiresIn: "14h",
          });
          res.send(
            sendResponse(true, { user: result, token }, "Login SuccessFul")
          );
        } else {
          res.send(sendResponse(false, null, "Credential Error"));
        }
      } else {
        res.send(sendResponse(false, null, "User Doesn't Exist")).status(404);
      }
    }
  },
  SignUp:  async (req, res) => {
    const { userName, email, password } = req.body;
    const obj = { userName, email, password };
    let ReqArr = ["userName", "email", "password"];
    let errArr = [];
    ReqArr.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });
    if (errArr.length > 0) {
      res
        .send(
          sendResponse(false, null, "Please Filled Required Fields First", errArr)
        )
        .status(400);
    } else {
      let hashPassword = await bcrypt.hash(obj.password, 10);
      obj.password = hashPassword;
  
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.send(sendResponse(false, null, "Email Already Exist")).status(401);
      } else {
        // Dusra Tareeqa Post krny ka
        UserModel.create(obj)
          .then((result) => {
            res
              .send(sendResponse(true, result, "User Saved Successfully"))
              .status(200);
          })
          .catch((err) => {
            res
              .send(sendResponse(false, err, "Internal Server Error"))
              .status(400);
          });
      }
    }
  },
  //localStorage.setItem('Testingtoken,res?.data?.data?.token)
  protected: async (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        token = token.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.SECURE_KEY, function (err, decoded) {
            if (err) {
                res.send(sendResponse(false, null, "Unauthorized", err)).status(403);
            } else {
                console.log(decoded);
            }
        });
        next();
    }else{

    }
  },
  adminProtected: async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECURE_KEY, function (err, decoded) {
      if (err) {
        res.send(sendResponse(false, null, "Unauthorized", err)).status(403);
      } else {
        if (decoded._doc.isAdmin) {
          next();
        } else {
          res.send(false, null, "You have No Rights");
        }
      }
    });
  },
};
module.exports = AuthControllers;
