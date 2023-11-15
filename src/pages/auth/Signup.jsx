import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./auth.module.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setfullName("");
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
