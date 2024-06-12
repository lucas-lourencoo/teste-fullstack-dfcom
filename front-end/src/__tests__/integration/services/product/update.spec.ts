import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { updateProduct } from "@/services/product/update";

jest.mock("@/lib/axios", () => ({
  api: {
    put: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("updateProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update product successfully", async () => {
    const mockData = { id: "1", name: "Updated Product" };
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.put as jest.Mock).mockResolvedValueOnce(null);

    await updateProduct({
      productId: "1",
      name: "Updated Product",
      category: "limpeza",
      description: "Updated Description",
      price: 50,
      stock: 10,
    });

    expect(api.put).toHaveBeenCalledWith(
      "/products/1",
      {
        name: "Updated Product",
        category: "limpeza",
        description: "Updated Description",
        price: 50,
        stock: 10,
      },
      {
        headers: {
          authorization: "Bearer mockAccessToken",
        },
      }
    );

    expect(toast.success).toHaveBeenCalledWith(
      "Produto atualizado com sucesso!"
    );
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle error when updating product", async () => {
    const mockError = new Error("Internal Server Error");
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.put as jest.Mock).mockRejectedValueOnce(mockError);

    await updateProduct({
      productId: "1",
      name: "Updated Product",
      category: "limpeza",
      description: "Updated Description",
      price: 50,
      stock: 10,
    });

    expect(api.put).toHaveBeenCalledWith(
      "/products/1",
      {
        name: "Updated Product",
        category: "limpeza",
        description: "Updated Description",
        price: 50,
        stock: 10,
      },
      {
        headers: {
          authorization: "Bearer mockAccessToken",
        },
      }
    );

    expect(toast.error).toHaveBeenCalledWith("Erro ao atualizar o produto.");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should handle unknown error", async () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.put as jest.Mock).mockRejectedValueOnce(undefined);

    await updateProduct({
      productId: "1",
      name: "Updated Product",
      category: "limpeza",
      description: "Updated Description",
      price: 50,
      stock: 10,
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao atualizar o produto.");
    expect(toast.success).not.toHaveBeenCalled();
  });
});
