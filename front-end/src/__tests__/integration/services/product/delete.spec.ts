import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { deleteProduct } from "@/services/product/delete";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  api: {
    delete: jest.fn(),
  },
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("deleteProduct function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete product successfully", async () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.delete as jest.Mock).mockResolvedValueOnce(null);

    await deleteProduct({ productId: "123" });

    expect(api.delete).toHaveBeenCalledWith("/products/123", {
      headers: {
        authorization: "Bearer mockAccessToken",
      },
    });

    expect(toast.success).toHaveBeenCalledWith("Produto removido com sucesso.");
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle product deletion failure", async () => {
    const mockError = new Error("Internal Server Error");
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.delete as jest.Mock).mockRejectedValueOnce(mockError);

    await deleteProduct({ productId: "123" });

    expect(api.delete).toHaveBeenCalledWith("/products/123", {
      headers: {
        authorization: "Bearer mockAccessToken",
      },
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao remover produto.");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should handle unknown error", async () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(null);
    await deleteProduct({ productId: "123" });

    expect(toast.error).toHaveBeenCalledWith("Erro desconhecido.");
    expect(api.delete).toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });
});
