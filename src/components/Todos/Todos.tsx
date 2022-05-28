import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import { loadTodos } from "../../redux/reducers/todos/ActionCreators";
import Modal from "../Form/Modal";
import Todo from "./Todo";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();

  const { todos, loading, error } = useAppSelector((state) => state.todoSlice);
  const { categories } = useAppSelector((state) => state.categorySlice);
  const { token, id } = useAppSelector((state) => state.userSlice);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<ITodo>();

  useEffect(() => {
    if (id) {
      dispatch(loadTodos(id));
    }
  }, [dispatch, id]);

  const handleOpenModal = (task: ITodo) => {
    setCurrentTask(task);
    setOpenModal(true);
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
            <input value={currentTask?.title} type="text" placeholder="title" />
            <textarea value={currentTask?.text} placeholder="text" />
            <select value={currentTask?.category} name="Category">
              {categories?.map((category) => {
                return <option value={category._id}>{category.name}</option>;
              })}
            </select>
            <button>add</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Todos;
