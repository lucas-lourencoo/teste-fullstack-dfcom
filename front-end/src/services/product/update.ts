import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface UpdateProductData {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: "limpeza" | "estetica" | "eletronico" | "alimenticio";
  stock: number;
}

export async function updateProduct({
  productId,
  name,
  category,
  description,
  price,
  stock,
}: UpdateProductData) {
  try {
    const token = Cookies.get("access_token");

    return await api
      .put(
        `/products/${productId}`,
        { name, category, description, price, stock },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Produto atualizado com sucesso!");
      })
      .catch(() => toast.error("Erro ao atualizar o produto."));
  } catch (err) {
    toast.error("Erro desconhecido.");
  }
}
