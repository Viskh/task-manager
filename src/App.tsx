import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/Home";
import Sign from "./components/Sign";
import { useAppSelector } from "./hooks/reduxHooks";

const App = () => {
  const {token} = useAppSelector((state) => state.userSlice);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Navigate to='/sign' /> : <Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
