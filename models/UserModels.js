// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true, trim: true, },
//     email: { type: String,required: [true, "Please provide an Email!"],unique: [true, "Email Exist"], trim: true},
//     password: { type: String, required: [true, "Please provide a password!"],   unique: false, min: 6, max: 64, },
//     role: {
//       type: String,
//       default: "Subscriber",
//       },
//       },
//       { timestamps: true }
// );

// module.exports = mongoose.model("users", userSchema);