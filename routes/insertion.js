var express=require('express');
var router=express.Router();
const connection=require('../controller/connection');
var bcrypt=require('bcrypt');
var {check,body,validationResult}=require('express-validator');
router.post('/create',body('name').notEmpty().withMessage("please enter the name").isAlpha().withMessage("name should be alphabatic"),
                    body('age').notEmpty().withMessage("please enter the age").isNumeric().withMessage("age should be in numbers"),
                    body('password').notEmpty().withMessage("please enter the password"),async(req,res,next)=>{
                        try{
                            let errors=validationResult(req);
                            if(!errors.isEmpty()){
                                return res.status(401).json({errors:errors.array()});
                            }else{
                                let data=req.body;
                                let salt=await bcrypt.genSalt(10);
                                let password=await bcrypt.hash(req.body.password,salt);
                                connection.query(`INSERT INTO curd1(id, name, age, password) VALUES (0,'${data.name}',${data.age},'${password}')`,(err,result)=>{
                                    console.log(result);
                                    if(result.affectedRows>0){
                                        res.send({error:false,message:"data inserted"});
                                    }else{
                                    
                                        res.send({error:true,err:err,message:"data not inserted"});
                                    }
                                })
                            }
                        }catch(err){
                            res.send({error:true,message:"validation not perfome well"});
                        }

});
router.post('/find',body('id').notEmpty().withMessage("please enter the id whoes record you want to search"),(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            return res.status(401).json({errors:errors.array()});

        }else{
            let id=req.body.id;
            connection.query(`select * from curd1 where id=${id}`,(err,result)=>{
                console.log(result);
                if(err){
                    res.send({error:true,message:"record not found"});
                }else{
                    console.log("hi");
                    console.log(result);
                    res.send({error:false,data:result});
                }
            })

        }
    }catch(err){
        res.send({error:true,message:"you did mistake in validation"});
    }
});
router.post('/delete',body('id').notEmpty().withMessage("please enter the id whoes detail you want to delete"),(req,res,next)=>{
    try{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors.array()});
        }else{
            let id=req.body.id;
            connection.query(`delete from curd1 where id=${id}`,(err,result)=>{
                if(err){
                    res.send({error:true,message:"record not deleted"});
                }else{
                    res.send({error:false,message:"record deleted"});
                }
            })
        }
    }catch(err){
        res.send({error:true,err:err,message:"you did wrong in validation"});
    }
});
router.post('/update',body('id').notEmpty().withMessage("please enter the id").isNumeric().withMessage("id should be numeric"),
                      body('name').notEmpty().withMessage("please enter the name").isAlpha().withMessage("name shouild be alphabaic"),
                       body('age').notEmpty().withMessage("please enter the age line").isNumeric().withMessage(">age should be numeric"),
                       body('password').notEmpty().withMessage("please enter the password"),async(req,res,next)=>{
                           try{
                               let errors=validationResult(req);
                               if(!errors.isEmpty()){
                                   return res.status(401).json({errors:errors.array()});
                               }else{
                                   let data=req.body;
                                   connection.query(`UPDATE curd1 SET name='${data.name}',age=${age},password='${data.password}' WHERE id=${data.id}`,(err,result)=>{
                                       console.log(result);
                                       if(result.affectedRows>0){
                                           res.send({error:false,message:"row updated"});
                                       }else{
                                           res.send({error:true,message:"row not updated"});
                                       }
                                   })
                               }
                           }catch(err){
                               res.send({error:true,message:"problem in validation"});
                           }




                       });

                       
module.exports=router;