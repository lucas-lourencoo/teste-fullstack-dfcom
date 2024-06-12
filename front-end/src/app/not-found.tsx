import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-zinc-900 h-screen text-white flex items-center justify-center flex-col">
      <h2 className="text-5xl font-extrabold uppercase leading-normal">
        404 | Not Found
      </h2>
      <p className="text-zinc-500 mt-2">Esta página não foi encontrada. :c</p>
      <Link href="/" className="mt-10" passHref>
        <Button variant="secondary">Voltar para Home</Button>
      </Link>
    </div>
  );
}
