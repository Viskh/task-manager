import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { registration } from "../../redux/reducers/auth/ActionCreators";


const Registration = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const sendData = () => {
    if(email && password && name) {
      dispatch(registration({email, password, name}))
    }
    setEmail('')
    setPassword('')
    setName('')
  }

  return (
    <div>
      <input value={email} onChange={(e) => handleEmail(e)} placeholder="email" />
      <input value={password} onChange={(e) => handlePassword(e)} placeholder="password"/>
      <input value={name} onChange={(e) => handleName(e)} placeholder="name"/>
      <button onClick={sendData}>add</button>
    </div>
  );
};

export default Registration;
