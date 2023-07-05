const express = require('express');
const Users = require('../models/user')
const routes = express.Router();
const httpErrors= require('http-errors');

routes.post('/register',async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password)throw httpErrors.BadRequest();

        const Exists =await Users.findOne({email:email})

    if(Exists)throw httpErrors.Conflict(`${email}is already been used`)

    const user = new Users({email,password})
    const saveUser=await user.save()
    res.send(saveUser)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
   
});
routes.get('/login',(res,req,next)=>{
    req.send({type:"login is successful"})
});
routes.delete('/userDelete',(req,res,next)=>{
    res.send({type:"user has been deleted"})
});
routes.delete('/logout',(req,res,next)=>{
    res.send({type:"logout route"})
});
routes.post('/refresh-toke',async(req,res)=>{
    res.send('refresh-token route')
})
module.exports=routes;
