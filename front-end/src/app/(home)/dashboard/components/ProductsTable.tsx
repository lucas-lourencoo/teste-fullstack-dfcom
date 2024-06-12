"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/product/getAll";
import Link from "next/link";
import { SkeletonTableRow } from "./SkeletonTableRow";
import { useProductStore } from "@/store/productStore";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { useState } from "react";

export function ProductsTable() {
  const { add } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["get-products"],
    queryFn: getAllProducts,
  });

  function handleDeleteFunction(product: Product) {
    add(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Table className="max-w-[1080px] m-auto">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <>
              <SkeletonTableRow />
              <SkeletonTableRow />
            </>
          )}

          {data?.map((product) => (
            <TableRow key={product._id} className="hover:bg-zinc-800/70">
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                {Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                }).format(product.price / 100)}
              </TableCell>
              <TableCell className="capitalize">{product.category}</TableCell>
              <TableCell>{product.stock} item(s)</TableCell>
              <TableCell className="text-center inline-flex items-center justify-center gap-2 w-full">
                <Link href={`/dashboard/edit-product/${product._id}`} passHref>
                  <Button size="icon" className="bg-zinc-700/60">
                    <FaPencilAlt size={18} />
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteFunction(product)}
                >
                  <FaTrash size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}
