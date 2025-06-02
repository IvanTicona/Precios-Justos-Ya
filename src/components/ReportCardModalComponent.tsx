// src/components/ReportCardModal.tsx
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ReportCard } from "./ReportCardComponent";

interface ReportCardModalProps {
  title: string;
  img: string;
  stock: number;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  title,
  img,
  stock,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <div className="w-full max-w-xs mx-auto sm:max-w-sm lg:max-w-md">
      <ReportCard onPress={onOpen} title={title} img={img} stock={stock} />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        backdrop="opaque"
        radius="lg"
        classNames={{
          base: "border-[#292f46] bg-[#19172c] text-[#a8b0d3] w-full max-w-xs sm:max-w-sm lg:max-w-md",
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody className="px-4">
                <p className="text-base text-default-400 leading-relaxed">
                  Esta producto tiene muy poco stock es necesario reponerlo... {stock}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Acción
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
