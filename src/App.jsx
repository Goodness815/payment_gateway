import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toast";
import Home from "./pages/home/Home";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/home/Dashboard";
import Payments from "./pages/dashboard/payments/Payments";
import PaymentModal from "./pages/dashboard/payments/PaymentModal";
import Withdraw from "./pages/dashboard/withdraw/Withdraw";
import Docs from "./pages/docs/Docs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/documentation" element={<Docs />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/payments" element={<Payments />} />
        <Route path="/dashboard/withdraw" element={<Withdraw />} />
        <Route path="/payment" element={<PaymentModal />} />
      </Routes>
      <ToastContainer position={"bottom-right"} delay={2000} />
    </>
  );
}

export default App;
