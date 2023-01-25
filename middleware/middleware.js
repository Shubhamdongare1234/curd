var jwt=require('jsonwebtoken');
const checktoken=(req,res,next)=>{
    const token=req.headers.token;
    if(token){
    jwt.verify(token,"secretKey",(err,decoded)=>{
        if(err){
            res.send({error:true,message:"token invalid"});
        }else{
            req.user=decoded;
            console.log(decoded);
            next();
        }
    })
}else{
    res.send({error:true,message:"enter the token"});
}
};
module.exports={checktoken:checktoken};