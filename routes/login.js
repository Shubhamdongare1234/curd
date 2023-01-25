var express=require('express');
var router=express.Router();
const connection=require('../controller/connection');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { response } = require('express');
router.post('/',(req,res,next)=>{
    let name=req.body.name;
    let password=req.body.password;
    connection.query(`select * from curd1 where name='${name}'`,async(err,result)=>{
         if(err){
             res.send({error:true,message:"error in record finding"});
         }else{
             const iSame=await bcrypt.compare(password,result[0].password);
             console.log(iSame);
             if(iSame){
                 let token=jwt.sign({id:result[0].id,age:result[0].age},"secretKey",{expiresIn:60*60});
                 res.send({error:false,token:token,message:"you ;logging successflly"});
             }else{
                 res.send({error:true,message:"invalid password"});
             }
         }
    })
});
module.exports=router;
