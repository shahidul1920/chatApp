import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message: "Password is at least 6 characters long"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password is at least 6 characters long"});
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email already exist"})

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPass
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json({message: "signup error"})
        }

    }catch(err){
        console.error("signup error",err.message);
        res.status(500).json({message: 'internal server error'});
    }
}

export const login = async (req, res) => {

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: "Please Enter valid info"})
        }

        const isPasswordCurrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCurrect){
            return res.status(400).json({message: "Please Enter valid info"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("login error", error.message);
        return res.status(500).json({message: "server issue"})
        
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "user logged out"})
    } catch (error) {
        console.log("Error in log out", error.message);
        res.status(500).json({message: "server fucked up"});
    }
}

export const updateProfile = async (req, res) =>{
   return console.log('ff');
    
}