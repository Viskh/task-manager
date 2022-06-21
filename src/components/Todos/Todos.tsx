import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import {
  loadTodos,
  updateTodo,
} from "../../redux/reducers/todos/ActionCreators";
import Modal from "../Layout/Modal";
import Todo from "./Todo";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();

  const { todos, loading, error } = useAppSelector((state) => state.todoSlice);
  const { categories } = useAppSelector((state) => state.categorySlice);
  const { token, id } = useAppSelector((state) => state.userSlice);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoCategory, setTodoCategory] = useState<string>("");
  const [todoId, setTodoId] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(loadTodos(id));
    }
  }, [dispatch, id]);

  const handleOpenModal = (todo: ITodo) => {
    setTodoId(todo._id);
    setTodoText(todo.text);
    setTodoTitle(todo.title);
    setTodoCategory(todo.category);
    setOpenModal(true);
  };

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ todoId, todoTitle, todoText, todoCategory }));
    setOpenModal(false);
  };

  const filtredTodos = todos.filter((todo) => {
    if (!categoryId) return true;

    return todo.category === categoryId;
  });

  if (!token) {
    return <div>сначала войдите в аккаунт</div>;
  }

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {!todos.length && !loading && <div>У вас еще нет дел!</div>}

      {filtredTodos.map((todo) => {
        return (
          <Todo key={todo._id} todo={todo} handleOpenModal={handleOpenModal} />
        );
      })}

      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          <div>
            <input
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              type="text"
              placeholder="title"
            />
            <textarea
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="text"
            />
            <select
              value={todoCategory}
              onChange={(e) => setTodoCategory(e.target.value)}
              name="Category"
            >
              {categories?.map((category) => {
                return <option value={category._id}>{category.name}</option>;
              })}
            </select>
            <div onClick={handleUpdateTodo}>add</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Todos;
