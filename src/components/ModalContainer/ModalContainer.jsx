import { useModal } from "../utils/ModalProvider";
import "./ModalContainer.scss";

import { AnimatePresence, cubicBezier, motion } from "framer-motion";

const ModalContainer = () => {
  const { isOpen, closeModal, modalData } = useModal();

  const onBackgroundClick = () => {
    closeModal();
  };

  const cubicEease = cubicBezier(0.44, 0, 0.35, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{
              // backgroundColor: "#10101000",
              opacity: 0,
            }}
            animate={{
              // backgroundColor: "#101010a0",
              opacity: 1,
            }}
            exit={{
              // backgroundColor: "#10101000",
              opacity: 0,
            }}
            onClick={onBackgroundClick}
            transition={{
              duration: 0.4,
            }}
            className="modalcontainer-container"
          ></motion.div>

          <motion.div
            className="modalcontainer-container-modal"
            // onClick={(e) => e.stopPropagation()}
            initial={{
              // y: 15,
              scale: 0.975,
              opacity: 0,
            }}
            animate={{
              // y: 0,
              scale: 1,
              opacity: 1,
            }}
            exit={{
              // y: -15,
              scale: 0.975,
              opacity: 0,
            }}
            transition={{
              duration: 0.34,

              ease: cubicEease,
            }}
          >
            <div className="modalcontainer-container-modal-inner">
              <div className="modalcontainer-container-modal-inner-top">
                <h1 className="modalcontainer-container-modal-inner-top-header">
                  {modalData.header}
                </h1>
                <img
                  className="modalcontainer-container-modal-inner-top-close"
                  src="/icons/e-remove_dark.svg"
                  alt="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modalcontainer-container-modal-inner-content">
                {modalData.content}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalContainer;
