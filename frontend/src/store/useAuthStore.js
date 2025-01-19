import {create} from "zustand";
import {axiosIns} from "../lib/axios.js"
import toast from "react-hot-toast";
//import { connect } from "http2";
import {io} from "socket.io-client";

const BASE_URL = "http://localhost:3000"

export const useAuthStore = create((set, get ) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosIns.get("/auth/check");

            set({authUser: res.data});
            get().connectSocket()
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
            toast.success("Account created successfully")
            get().connectSocket()
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
    
          get().connectSocket()
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
            get.disconnectSocket()
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

    },
    connectSocket: ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL)
        socket.connect()
    },
    disconnectSocket: ()=>{},
}))