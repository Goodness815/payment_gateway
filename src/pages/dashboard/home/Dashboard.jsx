import styles from "./dashboard.module.css";
import { Modal } from "antd";
import Wrapper from "../../../components/dashboard/wrapper/Wrapper";
import { useEffect, useState } from "react";
import { toast } from "react-toast";
import axios from "axios";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  const [balance, setBalance] = useState("");
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    paymentTitle: "",
    recipientName: "",
    recipientEmail: "",
    amount: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleChange = (e) => {
    // Use the name attribute of the input to determine which field to update
    const { name, value } = e.target;

    // Update the state with the new value
    setFormData({
      ...formData,
      [name]: value,
    });
  };
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
        setTableData(res.data.data.transaction_history);
        setBalance(res.data.data.account_balance);
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      setPageLoader(false);
      toast.error(error.message);
    }
  };

  const createPayment = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/createpayment/${
          userData.app_id
        }`,
        formData
      );
      setLoader(false);
      if (res.data.success) {
        setIsModalOpen(false);
        setFormData({
          paymentTitle: "",
          recipientName: "",
          recipientEmail: "",
          amount: "",
        });
        toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
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
            <div className={styles.balance_card_flex}>
              <div className={styles.balance_card_item}>
                <span>NGN {balance.toLocaleString()}.00</span> Account Balance
              </div>
              <div
                className={styles.balance_card_item}
                onClick={() => setIsModalOpen(true)}
              >
                <span>Click to</span> Create New Payment
              </div>
            </div>
            <h3>Recent Transactions</h3>
            <div className={styles.transactions_table}>
              <div className={styles.header}>
                <span>ID</span>
                <span>Amount</span>
                <span>Status</span>
                <span className={styles.remove}>Date</span>
              </div>
              {tableData.length > 0 ? (
                <>
                  {tableData.map((item, i) => {
                    return (
                      <div key={i} className={styles.content}>
                        <span>{item.payment_id}</span>
                        <span>{item.amount}</span>
                        <span>{item.payment_status}</span>
                        <span className={styles.remove}>{item.date}</span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className={styles.content}>
                  <span>No Transactions</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Modal
        title="Create Payment"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className={styles.create_payment}
      >
        <form onSubmit={createPayment}>
          <input
            type="text"
            placeholder="Payment Title"
            name="paymentTitle"
            value={formData.paymentTitle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Recipient Email"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <button>{loader ? "LOADING" : "CREATE PAYMENT"}</button>
        </form>
      </Modal>
    </Wrapper>
  );
}

export default Dashboard;
