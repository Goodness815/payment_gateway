import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./home.module.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.home_container}>
        <div className={styles.home_inner}>
          <div className={styles.home_left}>
            <h2>Start accepting payments in 3 minutes</h2>
            <p>
              Integrate xyz payment gateway without any technical knowledge.{" "}
            </p>
            <div className={styles.home_button_flex}>
              <button>
                <Link to="/signup">Start Now</Link>
              </button>
              <button>Read the developer docs</button>
            </div>
          </div>
          <div className={styles.home_right}>
            <img
              src="https://assets-global.website-files.com/6127a80f5f93f701eb77b33a/6197f363f1589c32d3fa546f_Atm%20card%20Sample.969.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
