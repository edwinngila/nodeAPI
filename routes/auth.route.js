const express = require('express');
const Users = require('../models/user')
const httpErrors= require('http-errors')

const routes = express.Router();

routes.post('/register',async(res,req,next)=>{
    try{
        // const body = req.body;
        // const email= body.email || 'defaltemail@gmail.com';
        // const password = body.password || 'kyalo074';
        const {email,password}=req.body;
        if(!email || !password)throw httpErrors.BadRequest();

        const Exists = await Users.findOne({email:email})

        if(Exists)throw httpErrors.Conflict(`${email} is already been registered`)
        const user = new Users({email,password})
        const saveUser = await user.save()
        res.send(saveUser)
    }
    catch(error){
        console.log(error)
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
