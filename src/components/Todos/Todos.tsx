import { DeleteFilled } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../../redux/reducers/todos/ActionCreators";
import styles from './todos.module.scss'

const Todos = () => {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todoSlice);
  const { token, id } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (id) {
      dispatch(loadTodos(id));
    }
  }, [dispatch, id]);

  const handleDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  const handleCheckedTodo = (todoId: string, completed: boolean) => {
    dispatch(updateTodo({ todoId, completed }));
  };

  if (!token) {
    return <div>сначала войдите в аккаунт</div>;
  }

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {!todos.length && !loading && <div>У вас еще нет дел!</div>}
      {todos.map((todo) => {
        return (
          <div key={todo._id} className={styles.todo}>
            <input
            className={styles.checkbox}
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckedTodo(todo._id, todo.completed)}
            />
            <p className={styles.todo__text} >{todo.text}</p>
            <span onClick={() => handleDeleteTodo(todo._id)}><DeleteFilled /></span>
          </div>
        );
      })}
    </>
  );
};

export default Todos;
