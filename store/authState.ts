import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { API } from "@/lib/action/API";

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string; userId: string, role: string };
  login: (user: { phone: string; password: string }) => Promise<{status: boolean, role?: string, userId?: string}>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: { name: "", email: "", userId: "", role: "" },
      async login(user: { phone: string; password: string }) {
        try {
          const response = await API.post(
            "/login",
            { user },
            { headers: { "Content-Type": "application/json" } }
          );
          const { token, userId, name, email, role } = response.data;
          set({ isLoggedIn: true, user: { userId, name, email, role } });
          localStorage.setItem("token",token)
          return {status: true, role, userId};
        } catch (error) {
          console.error("Login failed:", error);
          return {status: false };
        }
      },
      logout: () => {
        set({ 
          isLoggedIn: false, 
          user: { name: "", email: "", userId: "", role: "" } 
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