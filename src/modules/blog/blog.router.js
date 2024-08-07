import { Router } from "express";
import blogModel from "../../../DB/model/blog.model.js";
import jwt from "jsonwebtoken";
import userModel from "../../../DB/model/user.model.js";
const app = Router();
app.get("/",async(req, res) => {
   try {
    const blog=await blogModel.findAll();
    return res.status(200).json({message:"success",data:blog});
}
    catch(error){
        
        return res.status(500).json({message:"server error",error});
    }
}
);
app.post("/:id",async(req, res) => {
    const {token}=req.headers;
    const decoded = jwt.verify(token, 'alaa');
    if(decoded.userType !="admin"){
      return res.status(401).json({message:"unauthorized"});
    }
    const {id} =req.params;
    const {tittle,description} = req.body;
   const user = await userModel.findOne({
        where:{id:id}
    })
    console.log(user)
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    blogModel.create({tittle:tittle,description:description,UserId:id},);
    
    return res.status(201).json({message:"success"});

});
app.put('/:blogid',async(req,res)=>{
    const {token}=req.headers;
    const decoded = jwt.verify(token, 'alaa');
    if(decoded.userType !="admin"){
      return res.status(401).json({message:"unauthorized"});
    }
    const {blogid}=req.params;
    const {description}=req.body;
    const blog=await blogModel.update({description:description},{
      where:{id:blogid}
    })
    if(!blog[0]){
      return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({message:"blog successfully updated"});
  });
app.delete('/:blogid',async(req,res)=>{
    const {token}=req.headers;
    const decoded = jwt.verify(token, 'alaa');
    if(decoded.userType !="admin"){
      return res.status(401).json({message:"unauthorized"});
    }
    const {blogid}=req.params;
    const blog = await blogModel.destroy({
      where:{id:blogid}
    })
    if(!blog){
      return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({message:"blog successfully deleted",data:blog});
  });
export default app;