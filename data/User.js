const bcrypt = require('bcryptjs')
const users =[
    {
name:"Admin",
phoneNumber:99999999,
password:bcrypt.hashSync("123456",10),
isAdmin:true
},
{

    name:"farmer",
    phoneNumber:22222222,
    password:bcrypt.hashSync("123456",10),
    isAdmin:false
},
{
    name:"buyer",
phoneNumber:55555555,
password:bcrypt.hashSync("123456",10),
isAdmin:false

}]

module.exports= users