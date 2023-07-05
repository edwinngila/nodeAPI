const express= require ("express");
require('dotenv').config();
require('./helpers/init_mongodb')
const app =express();
app.use(express.json());
const studentRoutes =require('./routes/student.routes')
const authRoutes=require('./routes/auth.route')

app.use('/auth',authRoutes)
app.use('/student',studentRoutes);
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
