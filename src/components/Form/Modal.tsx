import { Dispatch, ReactElement, SetStateAction } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactElement;
}

const Modal = ({ setOpenModal, children }: ModalProps) => {
  return (
    <div className={styles.modal__window} onClick={() => setOpenModal(false)}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
