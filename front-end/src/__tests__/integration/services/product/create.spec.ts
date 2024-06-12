import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { createProduct } from "@/services/product/create";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  api: {
    post: jest.fn(),
  },
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("createProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create product successfully", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(null);

    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");

    await createProduct({
      name: "Product 1",
      category: "limpeza",
      description: "Description for product 1",
      price: 10.0,
      stock: 100,
    });

    expect(api.post).toHaveBeenCalledWith(
      "/products",
      {
        name: "Product 1",
        category: "limpeza",
        description: "Description for product 1",
        price: 10.0,
        stock: 100,
      },
      {
        headers: {
          authorization: "Bearer mockAccessToken",
        },
      }
    );

    expect(toast.success).toHaveBeenCalledWith("Produto criado com sucesso!");

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle product creation failure", async () => {
    const mockError = new Error("Internal Server Error");
    (api.post as jest.Mock).mockRejectedValueOnce(mockError);

    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");

    await createProduct({
      name: "Product 2",
      category: "estetica",
      description: "Description for product 2",
      price: 20.0,
      stock: 200,
    });

    expect(api.post).toHaveBeenCalledWith(
      "/products",
      {
        name: "Product 2",
        category: "estetica",
        description: "Description for product 2",
        price: 20.0,
        stock: 200,
      },
      {
        headers: {
          authorization: "Bearer mockAccessToken",
        },
      }
    );

    expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar o produto.");

    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should handle unknown error", async () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(null);

    (api.post as jest.Mock).mockRejectedValueOnce(new Error("Unknown error"));

    await createProduct({
      name: "Product 3",
      category: "eletronico",
      description: "Description for product 3",
      price: 30.0,
      stock: 300,
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao cadastrar o produto.");
    expect(api.post).toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
