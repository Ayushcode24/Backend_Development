import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const singUp=async (req,res) =>{
    try {
        const{firstName,lastName,email,password,userName}=req.body

        if(!firstName ||!lastName||!email ||!password||!userName){
            return res.status(400).json({message:"Upload full details"})
        }

        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User Already Exist"})
        }
        const hassedPassword=await bcrypt.hash(password,10)

        const user=await User.create({
            firstName,
            lastName,
            email,
            password : hassedPassword,
            userName
        })

        let token; 
        try {
         token =   generateToken(user._id)

        } catch (error) {
            console.log(error)
        }
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

    return res.status(201).json({user:{
           firstName,
            lastName,
            email,
            userName
    }})

    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}


export const login = async(req,res) =>{
    try {
         const{email,password}=req.body
         let existUser=await User.findOne({email})
         if(!existUser){
            return res.status(400).json({message:"user does not exist"})
         }
         let match = await bcrypt.compare(password,existUser.password)
         if(!match){
            return res.status(400).json({message:"Incorrect Password"})
         }
          let token; 
        try {
         token =   generateToken(existUser._id)

        } catch (error) {
            console.log(error)
        }
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT == "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
       return res.status(200).json({user:{
           firstName:existUser.firstName,
            lastName:existUser.lastName,
            email:existUser.email,
            userName:existUser.userName
    }})

    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}


export const logout=async (req,res) =>{
    try {
         res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
         return res.status(500).json({message:"internal server error"})
      
    }
}