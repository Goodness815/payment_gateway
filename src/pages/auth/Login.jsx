import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { toast } from "react-toast";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
        { email, password }
      );
      setLoader(false);
      if (res.data.success) {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        toast.success(`Welcome ${res.data.data.name}.`);
        navigate("/dashboard/home");
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.auth_container}>
      <Link to="/">
        <span>PayGate</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button>{loader ? "LOADING" : "LOGIN"}</button>
        <span>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
