import {create} from "zustand";
import {axiosIns} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosIns.get("/auth/check");

            set({authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
            
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosIns.post("/auth/signup", data);
            set({authUser: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false})
        }
    },

    logout: async () => {
        try {
            await axiosIns.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out Successfully");

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async () => {
        
    }
}))