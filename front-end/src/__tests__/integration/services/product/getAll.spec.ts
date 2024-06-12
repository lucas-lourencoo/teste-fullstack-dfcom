import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getAllProducts } from "@/services/product/getAll";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("getAllProducts function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all products successfully", async () => {
    const mockData = [
      { id: "1", name: "Product 1" },
      { id: "2", name: "Product 2" },
    ];
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const result = await getAllProducts();

    expect(api.get).toHaveBeenCalledWith("/products", {
      headers: {
        authorization: "Bearer mockAccessToken",
      },
    });

    expect(result).toEqual(mockData);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle error when fetching products", async () => {
    const mockError = new Error("Internal Server Error");
    (Cookies.get as jest.Mock).mockReturnValueOnce("mockAccessToken");
    (api.get as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await getAllProducts();

    expect(api.get).toHaveBeenCalledWith("/products", {
      headers: {
        authorization: "Bearer mockAccessToken",
      },
    });

    expect(result).toBeUndefined();
    expect(toast.error).toHaveBeenCalledWith("Erro desconhecido.");
  });

  it("should handle unknown error", async () => {
    (Cookies.get as jest.Mock).mockReturnValueOnce(null);
    const result = await getAllProducts();

    expect(result).toBeUndefined();
    expect(api.get).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Erro desconhecido.");
  });
});
