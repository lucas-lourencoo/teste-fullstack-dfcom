declare type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "limpeza" | "estetica" | "eletronico" | "alimenticio";
  stock: number;
};
