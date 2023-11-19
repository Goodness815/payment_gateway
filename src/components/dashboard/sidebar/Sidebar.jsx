import { Link, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.css";
import { IoMdClose } from "react-icons/io";

function Sidebar({ navState, setNavState }) {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.sidebar_container} ${
        navState ? styles.navbar_open : ""
      }`}
    >
      <IoMdClose
        onClick={() => setNavState(false)}
        className={styles.sidebar_close}
      />
      <div className={styles.sidebar_inner}>
        <ul>
          <Link to="/dashboard/home">
            {" "}
            <li>Home</li>
          </Link>
          <Link to="/dashboard/payments">
            <li>Payments</li>
          </Link>
          <Link to="/dashboard/withdraw">
            <li>Withdrawal</li>
          </Link>

          <li
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
