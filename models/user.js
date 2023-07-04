const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type:String,
        lowercase:true,
        unique:true,        
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }
});
const Users = mongoose.model('user',userSchema)
module.exports=Users;