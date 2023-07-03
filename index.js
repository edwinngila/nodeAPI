const express= require ("express");
require('dotenv').config();
require('./helpers/init_mongodb')
const app =express();
const routes =require('./routes/student.routes')
const routes2=require('./routes/auth.route')
app.use(express.json())
app.use('/auth',routes2)
app.use('/student',routes);
app.use((req,res,next)=>{
    const err =new Error("not found"); 
    err.status=404; 
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status ||500,
            message: err.message
        }
    })
})
app.listen(process.env.port||4000,()=>{console.log("now listening on : http://localhost:4000");
});
