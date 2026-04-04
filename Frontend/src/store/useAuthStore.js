import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://syncspace-c05l.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckAuth: true,
    isSigningCheck: false,
    isLoggedInCheck: false,
    isUploadIn: false,
    socket: null,
    onlineUsers: [],

    check: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().socketConnect();
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

            get().socketConnect();
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
            set({ authUser: res.data });

            toast.success("Login successfully");

            get().socketConnect();
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
            toast.success("Log Out successfully");

            get().disconnectSocket();
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
    },

    socketConnect: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, { withCredentials: true });

        socket.connect();

        set({ socket });

        //listen for online users:
        socket.on("getOnlineUsers", (userId) => {
            set({ onlineUsers: userId });
        })
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
}))