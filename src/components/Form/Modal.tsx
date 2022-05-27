import React, { ReactElement, useEffect } from "react";
import styles from "./addTodo.module.scss";

interface ModalProps {
  visible: boolean;
  title: string;
  text: string;
  category: string;
  onClose: () => void;
}

const Modal = ({ visible, title, text, category, onClose }: ModalProps) => {
  // создаем обработчик нажатия клавиши Esc
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  // c помощью useEffect цепляем обработчик к нажатию клавиш
  // https://ru.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  // или возвращаем верстку модального окна
  return (
    <div className={styles.modal__window} onClick={onClose}>
      <div
        className={styles.add__todo__form}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
