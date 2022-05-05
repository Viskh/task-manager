import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { login } from "../../redux/reducers/auth/ActionCreators";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useAppSelector((state) => state.userSlice);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorLog, setErrorLog] = useState<string>("");

  useEffect(() => {
    if (error) {
      setErrorLog(error);
    }
    if (!error) {
      setErrorLog("");
    }
  }, [error]);

  useEffect(() => {
    if(token) {
      return navigate('/')
    }
  })

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorLog(e.target.value && "");
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorLog(e.target.value && "");
  };

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
      setEmail("");
      setPassword("");
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      {errorLog && <div>{errorLog}</div>}
      <input
        value={email}
        onChange={(e) => handleEmail(e)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => handlePassword(e)}
        placeholder="password"
      />
      <button onClick={handleLogin}>add</button>
    </div>
  );
};

export default Login;
