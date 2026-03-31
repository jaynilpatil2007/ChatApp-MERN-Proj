import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    message: [],
    activeTab: 'chats',
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
    isSoundgetAllContactsEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnable", !get().isSoundEnable);
        set({ isSoundEnable: !get().isSoundEnable });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data.data })
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false })
        }
    },
    getAllChatParteners: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessageByUserId: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ message: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, message } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
        const currentMessage = Array.isArray(message) ? message : [];

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            recieverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true
        }

        set({ message: [...currentMessage, optimisticMessage] })

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ message: currentMessage.concat(res.data.data) });
        } catch (error) {
            set({ message: currentMessage });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
}))