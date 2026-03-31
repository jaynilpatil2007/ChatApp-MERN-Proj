import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckAuth: true,
    isSigningCheck: false,
    isLoggedInCheck: false,
    isUploadIn: false,

    check: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in auth: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningCheck: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningCheck: false })
        }
    },

    login: async (data) => {
        set({ isLoggedInCheck: true })
        try {
            const res = await axiosInstance.post("/auth/login", data, { withCredentials: true });
            console.log(res.data);
            set({ authUser: res.data });

            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggedInCheck: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUploadIn: true })
        try {
            const res = await axiosInstance.put("/auth/update", data);
            set({ authUser: res.data });
            toast.success("Profile picture upload successfully");
        } catch (error) {
            console.log("Error in updating profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUploadIn: false });
        }
    }
}))