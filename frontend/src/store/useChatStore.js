import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosIns } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    message:[],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosIns.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try {
            const res = await axiosIns.get(`/messages/${userId}`)
            set({message: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading: false}); 
        }
    },
    sendMessages: async (messageData)=>{
        const {selectedUser, message} = get();
        try {
            const res = await axiosIns.post(`/messages/send/${selectedUser._id}`, messageData);
            set({message: [...message, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))