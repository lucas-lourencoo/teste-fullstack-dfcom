import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface DeleteProductData {
  productId: string;
}

export async function deleteProduct({ productId }: DeleteProductData) {
  try {
    const token = Cookies.get("access_token");

    return await api
      .delete(`/products/${productId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Produto removido com sucesso.");
      })
      .catch(() => toast.error("Erro ao remover produto."));
  } catch (err) {
    toast.error("Erro desconhecido.");
  }
}
