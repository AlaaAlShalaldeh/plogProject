import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import jwt from "jsonwebtoken";
const app = Router();
app.delete('/:id',async(req,res)=>{
  const {id}=req.params;
  const user=await userModel.destroy({
    where:{id:id}
  })
  if(!user){
    return res.status(404).json({message:"user not found"});
  }
  return res.status(200).json({message:"user successfully updated",data:user});
});
app.get('/',async(req,res)=>{
  const {token}=req.headers;
  const decoded = jwt.verify(token, 'alaa');
  if(decoded.name !="alaa"){
    return res.status(401).json({message:"unauthorized"});
  }
  const user=await userModel.findAll({
    attributes:['id','name','email']  
  });

  return res.status(200).json({message:"success",data:user});
});
app.put('/:id',async(req,res)=>{
  const {id}=req.params;
  const {name}=req.body;
  const user=await userModel.update({name:name},{
    where:{id:id}
  })
  if(!user[0]){
    return res.status(404).json({message:"user not found"});
  }
  return res.status(200).json({message:"user successfully deleted"});
});
export default app;