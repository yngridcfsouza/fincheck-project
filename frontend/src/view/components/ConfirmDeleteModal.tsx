import { Button } from "./Button";
import { TrashIcon } from "./icons/TrashIcon";
import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  isPending: boolean;
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
}

export function ConfirmDeleteModal({ onClose, title, description, onConfirm, isPending }: ConfirmDeleteModalProps) {
  return(
    <Modal
      open
      onClose={onClose}
      title="Excluir"
    >
      <div className="flex flex-col items-center justify-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex flex-col items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900"/>
        </div>
          <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
            {title}
          </p>

          {description && (
            <p className="text-gray-800 tracking-[-0.5px]">
              {description}
            </p>
          )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isPending={isPending}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          isPending={isPending}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
