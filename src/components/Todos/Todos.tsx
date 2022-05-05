import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logOut } from "../../redux/reducers/auth/ActionCreators";
import {
  deleteTodo,
  loadTodos,
  updateTodo,
} from "../../redux/reducers/todos/ActionCreators";
import AddTodo from "../Form/AddTodo.";

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

  const handleExitAccount = () => {
    dispatch(logOut());
  };

  if (!token) {
    return <div>сначала войдите в аккаунт</div>;
  }

  return (
    <div>
      <button onClick={handleExitAccount}>exit</button>
      <AddTodo />
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {!todos.length && !loading && <div>У вас еще нет дел!</div>}
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckedTodo(todo._id, todo.completed)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo._id)}>x</button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
