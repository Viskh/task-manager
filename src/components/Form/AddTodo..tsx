import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createTodo } from "../../redux/reducers/todos/ActionCreators";
import Modal from "../Layout/Modal";

type ModalProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const AddTodo: FC<ModalProps> = ({ setOpenModal }) => {
  const dispatch = useAppDispatch();
  const { token, id } = useAppSelector((state) => state.userSlice);
  const { loading, error, categories } = useAppSelector(
    (state) => state.categorySlice
  );
  const [todoText, setTodoText] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoCategory, setTodoCategory] = useState<string>("");

  const handleTodoText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoText(e.target.value);
  };

  const handleTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleSelectCategories = (e: ChangeEvent<HTMLSelectElement>) => {
    setTodoCategory(e.target.value);
  };

  const handleSendTodo = () => {
    dispatch(createTodo({ todoTitle, todoText, todoCategory, id }));
    setOpenModal(false);
  };

  if (!token) {
    return <div> Прошу войти в аккаунт</div>;
  }

  return (
    <Modal setOpenModal={setOpenModal}>
      <>
        <input
          value={todoTitle}
          onChange={(e) => handleTodoTitle(e)}
          type="text"
          placeholder="title"
        />
        <textarea
          value={todoText}
          placeholder="text"
          onChange={(e) => handleTodoText(e)}
        />
        <select
          value={todoCategory}
          onChange={(e) => handleSelectCategories(e)}
          name="Category"
        >
          {loading && <span>loadin..</span>}
          {error && <span>{error}</span>}
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button onClick={handleSendTodo}>add</button>
      </>
    </Modal>
  );
};

export default AddTodo;
