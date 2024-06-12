import { create } from "zustand";

type ProductStore = {
  product: Product;
  add: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: {} as Product,
  add: (product) => set(() => ({ product: product })),
}));
