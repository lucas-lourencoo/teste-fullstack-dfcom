import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteButton } from "@/app/(home)/dashboard/components/DeleteButton";

jest.mock("@/components/modals/DeleteModal", () => ({
  DeleteModal: ({ isOpen, closeModal, productId }: any) =>
    isOpen ? (
      <div data-testid="delete-modal">
        <button onClick={closeModal}>Close</button>
        Product ID: {productId}
      </div>
    ) : null,
}));

describe("DeleteButton", () => {
  const productId = "test-product-id";

  it("renders DeleteButton and opens/closes the modal correctly", () => {
    render(<DeleteButton productId={productId} />);

    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const modal = screen.getByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(`Product ID: ${productId}`);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(modal).not.toBeInTheDocument();
  });
});
