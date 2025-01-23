import { create } from "zustand";
import axios from "axios";

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user: { name: string; email: string; userId: string };
  login: (user: { name: string; password: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: true,
  token: "",
  user: { name: "", email: "", userId: "" },
  login: (user) =>
    set({
      isLoggedIn: true,
      user: {
        ...user,
        email: "",
        userId: "xx",
      },
    }),
  logout: () => set({ isLoggedIn: false }),
  // login: (user) =>
  //   axios.post("/api/login", user).then((res) => {
  //     set({ isLoggedIn: true, token: res.data.token, user: res.data.user });
  //   }),
  // logout: () =>
  //   axios.delete("/api/logout").then(() => {
  //     set({ isLoggedIn: false, token: "" });
  //   }),
}));
