const express = require("express");
const asyncHandler = require("express-async-handler");
const Production = require("../models/UserModels");
const User = require("../models/UserModels");
const generateToken=require('../utils/GenerateTokem');
const protect = require("../Middleware/ProfileMiddleware");
const userRouter = express.Router();

  // Login
userRouter.post("/login",
  asyncHandler(async (req, res) => {
    const {phoneNumber,password}=req.body
    const user = await User.findOne({phoneNumber})
    if(user && (await user.matchPassword(password))){
res.json({
    _id: user._id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    password: user.password,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
    createdAt: user.createdAt,

})
    }
    else{
        res.status(401)
        res.send("invalid phoneNumber or Password ")

    }
  })
);


// REGISTRE



userRouter.post(
  "/add_user",
  asyncHandler(async(req,res)=>{
      const {name,email,password}=req.body
      const userExists=await User.findOne({email})
      if(userExists){
          res.status(400)
          throw new Error("User already exists")
      }
      const user=await user.create({name,email,password})
      if (user) {
          res.status(201).json({
              _id:User._id,
              name:User.name,
              phoneNumber:User.phoneNumber,
              isAdmin:User.isAdmin,
              token: generateToken(User._id) ,
              createdAt:User.createdAt,
          })
          
      } else {
          res.status(400)
          throw new Error("Invalid User Data")
          
      }
  })
)


//    get users

userRouter.get("/users", async (req, res) => {
    const user = await User.find({}) 
    if (user) {
      res.json({_id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        password: user.password,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,})
      res.send(user);
    }
     else {
      res.status(404)
      throw new Error("user not found ")

      
    }
  })



   
module.exports = userRouter;
