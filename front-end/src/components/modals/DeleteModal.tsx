import { deleteProduct } from "@/services/product/delete";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { queryClient } from "@/lib/query";
import { useProductStore } from "@/store/productStore";

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export function DeleteModal({ isOpen, closeModal }: DeleteModalProps) {
  const product = useProductStore((state) => state.product);

  async function handleDeleteProduct() {
    await deleteProduct({ productId: product._id });
    await queryClient.invalidateQueries({ queryKey: ["get-products"] });
    closeModal();
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-zinc-900 text-white border-none">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja remover o produto?</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            className="bg-transparent border hover:bg-white hover:text-zinc-900"
            onClick={closeModal}
          >
            Cancelar
          </Button>
          <Button variant="secondary" onClick={handleDeleteProduct}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
