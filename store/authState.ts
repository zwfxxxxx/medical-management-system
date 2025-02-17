import { create } from "zustand";
import { API } from "@/lib/action/API";
interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user: { name: string; email: string; userId: string };
  login: (user: { phone: string; password: string }) => unknown;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: "",
  user: { name: "", email: "", userId: "" },
  async login(user: { phone: string; password: string }) {
    try {
      const response = await API.post('/login', { "patient": user }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("respose", response)
      const { token, userId, name, email } = response.data;

      set({ user: { userId, name, email }, token, isLoggedIn: true });
      return true
    } catch (error) {
      console.log(error);
      return false;
    }
  },
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
