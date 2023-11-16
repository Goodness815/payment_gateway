import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
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
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
