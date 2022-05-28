import { DeleteFilled } from "@ant-design/icons";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import {
  deleteTodo,
  updateTodo,
} from "../../redux/reducers/todos/ActionCreators";
import styles from "./todos.module.scss";

type TodoProps = {
  todo: ITodo;
  handleOpenModal: (task: ITodo) => void;
};

const Todo: FC<TodoProps> = ({ todo, handleOpenModal }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleCheckedTodo = (todoId: string, completed: boolean) => {
    dispatch(updateTodo({ todoId, completed }));
  };

  return (
    <div className={styles.todo} onClick={() => handleOpenModal(todo)}>
      <div className={styles.todo__title}>
        <p>{todo.title}</p>
      </div>
      <div className={styles.todo__text}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCheckedTodo(todo._id, todo.completed)}
        />
        <p className={styles.todo__text__item} data-content={todo.text}>
          {todo.text}
        </p>
        <span onClick={() => handleDeleteTodo(todo._id)}>
          <DeleteFilled />
        </span>
      </div>
    </div>
  );
};

export default Todo;
