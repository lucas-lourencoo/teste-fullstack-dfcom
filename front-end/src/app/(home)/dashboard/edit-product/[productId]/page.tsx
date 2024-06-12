import { Title } from "@/components/ui/title";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/product/getSingle";
import { EditForm } from "./components/EditForm";

export default async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;

  const product = await getProductById({
    productId,
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center flex-col w-full max-w-[1080px] p-10 border border-zinc-700 rounded-lg">
      <Title>Atualizar produto</Title>

      <EditForm product={product} />
    </div>
  );
}
