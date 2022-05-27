import { DeleteFilled } from "@ant-design/icons";
import { Modal } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import {
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../../redux/reducers/todos/ActionCreators";
import AddTodo from "../Form/AddTodo.";
import styles from "./todos.module.scss";

const Todos = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();
  const { todos, loading, error } = useAppSelector((state) => state.todoSlice);
  const { token, id } = useAppSelector((state) => state.userSlice);

  const [isModal, setModal] = useState<boolean>(false)
  const onClose = () => setModal(false)

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

  const handleModalWindow = (todo: ITodo) => {
      {/* <Modal
        visible={isModal}
        title={todo.title}
        text={todo.text}
        category={todo.category}
        onClose={onClose}
      /> */}
  }

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
          <div
            onClick={() => handleModalWindow(todo)}
            key={todo._id}
            className={styles.todo}
          >
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
      })}

    </>
  );
};

export default Todos;
