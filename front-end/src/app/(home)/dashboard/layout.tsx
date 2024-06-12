import { Header } from "@/components/header";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-zinc-900 h-screen text-white flex items-center justify-center flex-col">
      <Header />
      {children}
    </main>
  );
}
