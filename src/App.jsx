import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/registration/Home/Home";
import Login from "./Pages/registration/Login/Login";
import Error from "./Pages/registration/Error/Error";
import Registration from "./Pages/registration/Registration/Registration";
import Chat from "./Pages/registration/Chat/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
