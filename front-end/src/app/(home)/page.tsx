"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Title } from "@/components/ui/title";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email("Digite um email válido."),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login-mutation"],
    mutationFn: login,
    onSuccess: (response) => {
      if (response?.data.access_token) {
        Cookies.set("access_token", response?.data.access_token);
        router.push("/dashboard");
      }
    },
    onError: () => {
      toast.error("Login não autorizado, tente novamente.");
    },
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    await mutateAsync(data);
  }

  return (
    <main className="bg-zinc-900 h-screen text-white flex items-center justify-center flex-col">
      <Title>Seja bem vindo!</Title>

      <form
        method="POST"
        className="border border-zinc-500 p-6 rounded-lg max-w-[540px] w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="h-12 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white mb-2"
          type="email"
          errorMessage={errors.email?.message}
          label="Email"
          data-testid="email-input"
          {...register("email")}
        />

        <Input
          className="h-12 px-4 hover:bg-zinc-800 border-zinc-600 focus:border-white"
          type="password"
          label="Senha"
          data-testid="password-input"
          errorMessage={errors.password?.message}
          {...register("password")}
        />

        <Button
          className="bg-white uppercase font-extrabold w-full text-zinc-800 text-lg h-14 mt-6 hover:bg-zinc-200"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </main>
  );
}
