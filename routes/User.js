const express = require('express');
// const isAuthenticated = require('../Middleware/auth.js');
// const {signup} = require('../Controllers/User.js');

const userRouter = express.Router();
const User =require('../models/users.js')
const asyncHandler =require('express-async-handler')

userRouter.post(
  "/register",
  asyncHandler(async(req,res)=>{
      const {name,phoneNumber,password}=req.body
      const userExists=await User.findOne({phoneNumber})
      if(userExists){
          res.status(400)
          throw new Error("User already exists")
      }
      const user=await User.create({name,phoneNumber,password})
      if (user) {
          res.status(201).json({
              _id:user._id,
              name:user.name,
              phoneNumber:user.phoneNumber,
              isAdmin:user.isAdmin,
              token: generateToken(user._id) ,
              createdAt:user.createdAt,
          })
          
      } else {
          res.status(400)
          throw new Error("Invalid User Data")
          
      }
  })
)

// userRoute.post("/verify", isAuthenticated, verify);
// userRoute.post("/login", login);
// userRoute.get("/logout", logout);

// Uncomment and use this route if addTask is defined in the User.js controller.
// userRoute.post("/newtask", isAuthenticated, addTask);

// userRoute.get("/getProfile", isAuthenticated, getMyProfile);



// router
  // .route("/task/:taskId")
  // .get(isAuthenticated, updateTask)
  // .delete(isAuthenticated, removeTask);

// router.userRoute("/updateprofile").put(isAuthenticated, updateProfile);
// router.userRoute("/updatepassword").put(isAuthenticated, updatePassword);

// router.userRoute("/forgetpassword").post(forgetPassword);
// router.userRoute("/resetpassword").put(resetPassword);

module.exports = userRouter;
