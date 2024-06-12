"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import Link from "next/link";

export function Header() {
  return (
    <NavigationMenu className="max-h-24 h-24 fixed top-0">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link
            href="/dashboard"
            className="py-3 px-5 rounded-lg hover:bg-zinc-800/70 uppercase"
          >
            Listar produtos
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/dashboard/add-product"
            className="py-3 px-5 rounded-lg hover:bg-zinc-800/70 uppercase"
          >
            Adicionar produto
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
