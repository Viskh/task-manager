import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { createTodo } from '../../redux/reducers/todos/ActionCreators';

const AddTodo = () => {
  const dispatch = useAppDispatch()
  const { token, id } = useAppSelector((state) => state.userSlice);

  const [todoText, setTodoText] = useState<string>('')

  const handleTodoText = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value)
  }

  const handleSendTodo = () => {
    dispatch(createTodo({todoText, id}))
  }

  if(!token) {
    return <div> Прошу войти в аккаунт</div>
  }

  return (
    <div>
      <input value={todoText} type="text" onChange={(e) => handleTodoText(e)}/>
      <button onClick={handleSendTodo}>add</button>
    </div>
  );
};

export default AddTodo;