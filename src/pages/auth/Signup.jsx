import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import axios from "axios";
import { toast } from "react-toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/register`,
        { fullName, email, password }
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
          type="text"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          placeholder="Full Name"
          required
        />
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
        <button>{loader ? "LOADING" : "SIGN UP"}</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
