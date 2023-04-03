import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import OrderContent from "./components/Order/OrderContent";
import MainBody from "./components/Home/MainBody";
import CreateOrder from "./components/Order creation/CreateOrder";
import Confirmedorder from "./components/past order/Confirmedorder";
import { useEffect } from "react";
const Routing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("jwt");
    if (!user) {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainBody />} />
      <Route path="/ordercontent" element={<OrderContent />} />
      <Route path="/createorder" element={<CreateOrder />} />
      <Route path="/confirmedorder" element={<Confirmedorder />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
