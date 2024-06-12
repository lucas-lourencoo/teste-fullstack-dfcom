import { render, fireEvent, waitFor } from "@testing-library/react";
import { deleteProduct } from "@/services/product/delete";
import { queryClient } from "@/lib/query";
import { DeleteModal } from "@/components/modals/DeleteModal";

jest.mock("@/services/product/delete", () => ({
  deleteProduct: jest.fn(),
}));

jest.mock("@/lib/query", () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

describe("DeleteModal component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render DeleteModal correctly", () => {
    const { getByText } = render(
      <DeleteModal isOpen={true} closeModal={jest.fn()} productId="1" />
    );

    expect(
      getByText("Tem certeza que deseja remover o produto?")
    ).toBeInTheDocument();
    expect(getByText("Essa ação não pode ser desfeita.")).toBeInTheDocument();
    expect(getByText("Cancelar")).toBeInTheDocument();
    expect(getByText("Confirmar")).toBeInTheDocument();
  });

  it("should call deleteProduct and closeModal when confirm button is clicked", async () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <DeleteModal isOpen={true} closeModal={closeModal} productId="1" />
    );

    fireEvent.click(getByText("Confirmar"));

    waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith({ productId: "1" });
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(
        "get-products"
      );
      expect(closeModal).toHaveBeenCalled();
    });
  });

  it("should call closeModal when cancel button is clicked", async () => {
    const closeModal = jest.fn();
    const { getByText } = render(
      <DeleteModal isOpen={true} closeModal={closeModal} productId="1" />
    );

    fireEvent.click(getByText("Cancelar"));

    expect(closeModal).toHaveBeenCalled();
    expect(deleteProduct).not.toHaveBeenCalled();
    expect(queryClient.invalidateQueries).not.toHaveBeenCalled();
  });
});
