import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: "limpeza" | "estetica" | "eletronico" | "alimenticio";
  stock: number;
}

export async function createProduct({
  name,
  category,
  description,
  price,
  stock,
}: CreateProductData) {
  try {
    const token = Cookies.get("access_token");

    return await api
      .post(
        "/products",
        { name, category, description, price, stock },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Produto criado com sucesso!");
      })
      .catch(() => toast.error("Erro ao cadastrar o produto."));
  } catch (err) {
    toast.error("Erro desconhecido.");
  }
}
