import styles from "./topbar.module.css";
import { FaBarsStaggered } from "react-icons/fa6";

function Topbar({ setNavState }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  function getFirstName(fullName) {
    // Split the full name into an array of words
    const nameArray = fullName.split(" ");

    // Return the last element of the array (which is assumed to be the first name)
    return nameArray[nameArray.length - 1];
  }
  return (
    <div className={styles.topbar_container}>
      <h2>
        <span>
          <FaBarsStaggered
            onClick={() => setNavState(true)}
            className={styles.nav_hamburger}
          />
        </span>{" "}
        <div>
          Welcome, <span>{getFirstName(userData.name)}</span>
        </div>
      </h2>
      <div className={styles.right}>
        <div className={styles.text_case}>
          APP ID:<span>{userData.app_id}</span>
        </div>
        <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" alt="" />
      </div>
    </div>
  );
}

export default Topbar;
