import { api } from "@/lib/axios";
import { cookies } from "next/headers";

interface GetProductParams {
  productId: string;
}

export async function getProductById({ productId }: GetProductParams) {
  const cookieStore = cookies();

  try {
    const token = cookieStore.get("access_token")?.value;

    const { data } = await api.get<Product>(`/products/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
}
