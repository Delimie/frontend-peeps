import { io } from "socket.io-client";
import useAuthStore from "../stores/authStore";

const URL = "http://localhost:8000/"

export const socket = io(URL, {
    auth: {
        token: useAuthStore.getState().token,
    }
});