import {create} from "zustand";
import {axiosIns} from "../lib/axios.js"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosIns.get("/api/auth/check");

            set({authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
            
        }finally{
            set({isCheckingAuth: false})
        }
    }
}))