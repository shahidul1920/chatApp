import {create} from "zustand";
import {axiosIns} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],

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
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosIns.post("/auth/login", data);
          set({ authUser: res.data });
          toast.success("Logged in successfully");
    
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
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

    updateProfile: async (data) => {
        set({isUpdateingProfile: true});
        try {
            const res = await axiosIns.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("profile Updated")
        } catch (error) {
            //toast.error(error.response.data.message);
            toast.error("Internal server fucked up", error);
        }finally{
            set({isUpdateingProfile: false})
        }

    }
}))