import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAllProducts } from "@/services/product/getAll";
import { ProductsTable } from "@/app/(home)/dashboard/components/ProductsTable";

jest.mock("next/link");
jest.mock("@/services/product/getAll");

const mockProducts = [
  {
    _id: "1",
    name: "Product 1",
    description: "Description 1",
    price: 1000,
    category: "Category 1",
    stock: 10,
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Description 2",
    price: 2000,
    category: "Category 2",
    stock: 20,
  },
];

const queryClient = new QueryClient();

describe("ProductsTable", () => {
  beforeEach(() => {
    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it("renders products correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductsTable />
      </QueryClientProvider>
    );

    const productNameElements = await screen.findAllByText(/Product/i);
    expect(productNameElements).toHaveLength(mockProducts.length);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(product.category)).toBeInTheDocument();
      expect(screen.getByText(`${product.stock} item(s)`)).toBeInTheDocument();
    });
  });
});
