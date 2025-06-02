import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormProduct from "./FormProductComponent";

interface ModalProps {
  title: string;
  isOpenDefault?: boolean;
  formType: "agregar" | "editar" | "eliminar";
  productId?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  isOpenDefault = false,
  formType,
  productId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const firstRender = React.useRef(true);

  // Abre el modal automáticamente si se monta con isOpenDefault
  React.useEffect(() => {
    if (isOpenDefault && firstRender.current) {
      onOpen();
      firstRender.current = false;
    }
  }, [isOpenDefault, onOpen]);

  // Maneja el cierre: al cerrar, navega a /productos (la ruta padre)
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      navigate("/productos");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      backdrop="opaque"
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <FormProduct
                type={formType}
                productId={productId}
                onClose={close}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={close}>
                Cancelar
              </Button>
              <Button color="secondary" onPress={close}>
                {formType === "agregar" && "Agregar"}
                {formType === "editar" && "Guardar Cambios"}
                {formType === "eliminar" && "Eliminar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
