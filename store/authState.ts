import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { API } from "@/lib/action/API";

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string; userId: string };
  login: (user: { phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: { name: "", email: "", userId: "" },
      async login(user: { phone: string; password: string }) {
        try {
          const response = await API.post(
            "/login",
            { patient: user },
            { headers: { "Content-Type": "application/json" } }
          );
          const { token, userId, name, email } = response.data;
          set({ isLoggedIn: true, user: { userId, name, email } });
          localStorage.setItem("token",token)
          return true;
        } catch (error) {
          console.error("Login failed:", error);
          return false;
        }
      },
      logout: () => {
        set({ 
          isLoggedIn: false, 
          user: { name: "", email: "", userId: "" } 
        });
        localStorage.setItem("token", "")
      },
    }),
    {
      name: "auth-storage", // 存储名称
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 存储
    }
  )
);