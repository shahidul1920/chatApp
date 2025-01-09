import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in users sidebar :", error.message);
        res.status(500).json({error: "Server fucked up"})
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:myId, receiverId: userToChatId},
                {senderId:userToChatId, receiverId: myId}
            ],
        })
        res.status(200).json(message)
    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500), json({error: "server fucked up"})
    }
}

export const sendMessages = async (req, res) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        //web socket

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("send message error", error.message);
        res.status(500), json({error: "server fucked up"})
    }
}