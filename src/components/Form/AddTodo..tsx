import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createTodo } from "../../redux/reducers/todos/ActionCreators";
import styles from "./addTodo.module.scss";

type ModalProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const AddTodo: FC<ModalProps> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.userSlice);

  const [todoText, setTodoText] = useState<string>("");

  const handleTodoText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoText(e.target.value);
  };

  const handleSendTodo = () => {
    dispatch(createTodo({ todoText, id }));
    setOpenModal(false);
  };

  if (!token) {
    return <div> Прошу войти в аккаунт</div>;
  }

  return (
    <div className={styles.modal__window} onClick={() => setOpenModal(false)}>
      <div
        className={styles.add__todo__form}
        onClick={(e) => e.stopPropagation()}
      >
        <textarea value={todoText} onChange={(e) => handleTodoText(e)} />
        <button onClick={handleSendTodo}>add</button>
      </div>
    </div>
  );
};

export default AddTodo;
