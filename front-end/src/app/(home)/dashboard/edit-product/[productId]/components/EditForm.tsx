"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/services/product/update";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CurrencyInput } from "@/components/ui/currency-input";
import { queryClient } from "@/lib/query";
import { useRouter } from "next/navigation";

const editProductSchema = z.object({
  name: z.string().min(3, "O nome do produto deve ter no mínimo 3 caracteres"),
  description: z
    .string()
    .min(5, "A descrição do produto deve ter no mínimo 5 caracteres"),
  price: z.string({
    required_error: "O preço do produto é obrigatório",
  }),
  category: z.enum(["limpeza", "estetica", "eletronico", "alimenticio"], {
    required_error: "A categoria do produto é obrigatória",
  }),
  stock: z.string().min(1, "A quantidade em estoque deve ser maior que 0"),
});

type EditProductFormData = z.infer<typeof editProductSchema>;

interface EditFormProps {
  product: Product;
}

export function EditForm({ product }: EditFormProps) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-products"] });
      router.push("/dashboard");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: (product.price! / 100).toString(),
      category: product.category,
      stock: product.stock.toString(),
    },
  });

  async function onSubmit(data: EditProductFormData) {
    await mutateAsync({
      productId: product._id,
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price) * 100,
      stock: Number(data.stock),
    });
  }

  return (
    <form method="POST" className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="h-10 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-3"
        errorMessage={errors.name?.message}
        label="Nome do produto"
        {...register("name")}
      />

      <label htmlFor="category" className="font-semibold mb-2 inline-block">
        Categoria
      </label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className="w-full h-10 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-3">
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="limpeza">Limpeza</SelectItem>
              <SelectItem value="estetica">Estética</SelectItem>
              <SelectItem value="eletronico">Eletrônico</SelectItem>
              <SelectItem value="alimenticio">Alimentício</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Textarea
        className="px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-3"
        errorMessage={errors.description?.message}
        label="Descrição"
        {...register("description")}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <CurrencyInput
            name={field.name}
            onValueChange={field.onChange}
            value={field.value}
          />
        )}
      />

      <Input
        className="h-10 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-3"
        errorMessage={errors.stock?.message}
        type="number"
        label="Quantidade em estoque"
        {...register("stock")}
      />

      <Button
        className="bg-white rounded-lg uppercase font-extrabold mt-4 h-12 text-zinc-800 text-lg hover:bg-zinc-200 w-full"
        type="submit"
        disabled={isPending}
      >
        Atualizar
      </Button>
    </form>
  );
}
