import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signoup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
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

    }catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

export const login = (req, res) => {
    res.send("log in");
}

export const logout = (req, res) => {
    res.send("log out");
}