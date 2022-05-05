import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sign from "./components/Sign";
import Todos from "./components/Todos/Todos";
import { useAppSelector } from "./hooks/reduxHooks";

const App = () => {
  const {token} = useAppSelector((state) => state.userSlice);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Navigate to='/sign' /> : <Todos />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
