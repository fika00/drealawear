import { useLenis } from "lenis/react";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    header: "Example",
    content: <></>,
  });

  const openModal = (data) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, modalData }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
