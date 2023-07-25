// const jwt =require('jsonwebtoken')
// const asyncHandler=require('express-async-handler')
// const User=require('../models/UserModels')


// const protect = asyncHandler(async (req, res, next) => {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       try {
//         token = req.headers.authorization.split(" ")[1];
  
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select("-password");
//         next();
//       } catch (error) {
      
//         res.status(401);
//         throw new Error("Not autorized, token failed");
//       }
//     }
//     if (!token) {
//       res.status(401);
//       throw new Error("Not autorized, no token");
//     }
//   });
//   const admin =(req,res,naxt)=>{
//     if (req.user && req.user.isAdmin) {
//       naxt()
      
//     } else {
//       res.status(401)
//       throw new Error("Not authorized as an Admin")
      
//     }
//   }
module.exports = protect 