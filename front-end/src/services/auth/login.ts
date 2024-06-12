import { api } from "@/lib/axios";
import toast from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponseData {
  access_token: string;
}

export async function login({ email, password }: LoginData) {
  try {
    return await api.post<LoginResponseData>("/auth/login", {
      email,
      password,
    });
  } catch (err) {
    toast.error("Login não autorizado, tente novamente.");
  }
}
