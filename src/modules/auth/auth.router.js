import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = Router();
app.post('/',(req,res)=>{
    try{
        // const {token}=req.headers;
        // const decoded = jwt.verify(token, 'alaa');
        // if(decoded.userType !="admin"){
        //   return res.status(401).json({message:"unauthorized"});
        // }
        const {name,email,password,userType} =req.body;
        const  hashedPassword = bcrypt.hashSync(password,4);
        userModel.create({name:name,email:email,password:hashedPassword,userType:userType},(err,result)=>{
            if(err)
                 return res.status(404).json({message:err.message});
        });
        
        return res.status(201).json({message:"success"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
});
app.post('/login',async(req,res)=>{
   
    const {email,password}=req.body;

    const user=await userModel.findOne({
        where:{email:email}
    });
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const checkUser = await bcrypt.compare(password,user.password)
    if(!checkUser){
        return res.status(404).json({message:"invalid password"});
    }
    const token = jwt.sign({id:user.id,name:user.name,userType:user.userType }, 'alaa');
    return res.status(200).json({message:"success",token});
});
export default app;