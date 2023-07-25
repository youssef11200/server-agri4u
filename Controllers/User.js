
const User =require('../models/users.js')
// const sendMail =require('../utils/sendMail.js')
// const sendToken =require('../utils/sendToken.js')
const asyncHandler =require('express-async-handler')

// const cloudinary =require('cloudinary')
// const fs=require('fs')


  
const signup = asyncHandler (async(req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // const otp = Math.floor(Math.random() * 1000000);

    user = await User.create({
      name,
      email,
      password,
      // otp,
      // otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    // await sendMail(email, "Verify your account", `Your OTP is ${otp}`);

    // sendToken(
    //   res,
    //   user,
    //   201,
    //   "OTP sent to your email, please verify your account"
    // );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
console.log('fff')

// const verify = async (req, res) => {
//   try {
//     const otp = Number(req.body.otp);

//     const user = await User.findById(req.user._id);

//     if (user.otp !== otp || user.otp_expiry < Date.now()) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid OTP or has been Expired" });
//     }

//     user.verified = true;
//     user.otp = null;
//     user.otp_expiry = null;

//     await user.save();

//     sendToken(res, user, 200, "Account Verified");
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please enter all fields" });
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email or Password" });
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Email or Password" });
//     }

//     sendToken(res, user, 200, "Login Successful");
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     res
//       .status(200)
//       .cookie("token", null, {
//         expires: new Date(Date.now()),
//       })
//       .json({ success: true, message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getMyProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     sendToken(res, user, 200, `Welcome back ${user.name}`);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

module.exports = {
  signup,
  // login,
  // verify,
  // logout,
  // getMyProfile,
};

