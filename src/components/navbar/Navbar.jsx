import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_inner}>
        <span>PayGate</span>

        <div className={styles.nav_flex}>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
