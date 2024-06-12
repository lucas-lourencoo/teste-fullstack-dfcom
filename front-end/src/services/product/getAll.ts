import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export async function getAllProducts() {
  try {
    const token = Cookies.get("access_token");

    const { data } = await api.get<Product[]>("/products", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    toast.error("Erro desconhecido.");
  }
}
