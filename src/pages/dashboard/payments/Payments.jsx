import styles from "./payment.module.css";
import Wrapper from "../../../components/dashboard/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toast";
import axios from "axios";

function Dashboard() {
  const [pageLoader, setPageLoader] = useState(true);
  const [tableData, setTableData] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));

  // {
  //   id: "1213443",
  //   amount: "100,000",
  //   status: "success",
  //   date: "10/11/2020",
  // }

  const getUserData = async () => {
    setPageLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/getuserdata/${
          userData.userId
        }`
      );
      setPageLoader(false);
      if (res.data.success) {
        setTableData(res.data.data.payment_links);
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      setPageLoader(false);
      toast.error(error.message);
    }
  };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.success("Copied to clipboard!");
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Wrapper>
      <div className={styles.dashboard_container}>
        {pageLoader ? (
          <>
            <h3>Loading...</h3>
          </>
        ) : (
          <>
            <h3>Active Payments</h3>
            <div className={styles.transactions_table}>
              <div className={styles.header}>
                <span>ID</span>
                <span>Amount</span>
                <span>Payment Link</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {tableData.length > 0 ? (
                <>
                  {tableData.map((item, i) => {
                    const date = new Date(item.date);
                    return (
                      <div key={i} className={styles.content}>
                        <span>{item.payment_id}</span>
                        <span>{parseInt(item.amount).toLocaleString()}</span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => copyToClipboard(item.payment_link)}
                        >
                          {item.payment_link}
                        </span>
                        <span>{item.payment_status}</span>
                        <span>{date.toLocaleString("en-US")}</span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className={styles.content}>
                  <span>No Active Payment</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}

export default Dashboard;
