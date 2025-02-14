import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized - token not found"})          
        }

        const decoded = jwt.verify(token, process.env.MY_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in protection auth", error.message);
        return res.status(500).json({message: "Invalid action"})
    }
}