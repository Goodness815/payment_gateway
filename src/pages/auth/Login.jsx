import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setEmail("");
      setPassword("");
    }, 4000);
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
