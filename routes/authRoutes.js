const express= require('express')
const Userroutes =express.Router()
// controllers
const {signup, signin, forgotPassword, resetPassword}= require("../controllers/auth");
router.get("/", (req, res)=> {
    return res.json({
        data:"hello word from the API",
    });
});
userRouter.post("/signup", signup);
userRouter.post("/signin", singin);
userRouter.post("forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
export default userRouter;
// const mongoose=require('mongoose')
// const { signup } = require('../Controllers/userController')
// const User = mongoose.model('User')
// router.post('/api/signup',signup),(req,res)=>{
//     console.log(req.body)
//     const {fullname,mobilePhone,password}=req.body
//     const user = new User ({fullname,mobilePhone,password})
//     user.save()
//     res.send('hello')
// }
// module.exports = user