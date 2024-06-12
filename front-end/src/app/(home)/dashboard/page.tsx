import { ProductsTable } from "./components/ProductsTable";
import { Title } from "@/components/ui/title";

export default async function Home() {
  return (
    <div className="flex items-center justify-center flex-col w-full max-w-[1080px] p-10 border border-zinc-700 rounded-lg">
      <Title>Listagem de produtos</Title>

      <ProductsTable />
    </div>
  );
}
