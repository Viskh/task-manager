import { DeleteFilled } from "@ant-design/icons";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import {
  checkTodo,
  deleteTodo,
} from "../../redux/reducers/todos/ActionCreators";
import styles from "./todos.module.scss";

type TodoProps = {
  todo: ITodo;
  handleOpenModal: Function;
};

const Todo: FC<TodoProps> = ({ todo, handleOpenModal }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleCheckTodo = (todoId: string, completed: boolean) => {
    dispatch(checkTodo({todoId, completed}))
  }

  return (
    <div className={styles.todo}>
      <div
        className={styles.todo__title}
        data-content={todo.title}
        onClick={() => handleOpenModal(todo)}
      >
        <p>{todo.title}</p>
      </div>
      <div className={styles.todo__text}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCheckTodo(todo._id, todo.completed)}
        />

        <p
          className={styles.todo__text__item}
          onClick={() => handleOpenModal(todo)}
          data-content={todo.text}
        >
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
