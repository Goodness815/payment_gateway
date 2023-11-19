import { useEffect, useState } from "react";
import styles from "./payment.module.css";
import { FaLock } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toast";
import axios from "axios";

function PaymentModal() {
  const [test, setTest] = useState(true);
  const [loader, setLoader] = useState(true);
  const [paymentData, setpaymentData] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState(0);
  const [modalLoader, setModalLoader] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState("");
  const amount = parseInt(paymentData.amount || "").toLocaleString();
  // Use the useLocation hook to get the location object, including search (query parameters)
  const location = useLocation();

  // Parse the search string to get a URLSearchParams object
  const searchParams = new URLSearchParams(location.search);

  // Get the values of the 'page' and 'category' query parameters
  const app = searchParams.get("app");
  const key = searchParams.get("key");

  const getPaymentData = async () => {
    setLoader(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/getpayment/${app}/${key}`
      );
      setLoader(false);
      if (res.data.success) {
        setpaymentData(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoader(false);
    }
  };

  const makePayment = async () => {
    setModalLoader(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/makepayment/${app}/${key}`,
        { status }
      );
      setModalLoader(false);
      if (res.data.success) {
        if (status === 1) {
          setModalSuccess(true);
        } else if (status === 2) {
          setModalError(`Your payment is processing`);
        } else {
          setModalError(`Your payment of ${amount} failed`);
        }
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(error.message);
      setModalLoader(false);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  if (error) {
    return (
      <div className={styles.payment_modal_container}>
        <div className={styles.payment_inner}>
          <h2>{error}</h2>
          <span>
            <FaLock /> Secured by PayGate
          </span>
        </div>
      </div>
    );
  }

  if (modalSuccess) {
    return (
      <div className={styles.payment_modal_container}>
        <div className={styles.payment_inner}>
          <div className={styles.payment_main}>
            <h3
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              Congratulations!
            </h3>
            <h4 style={{ textAlign: "center", paddingBottom: "20px" }}>
              Your payment of {amount} was successfull!
            </h4>
          </div>
          <span>
            <FaLock /> Secured by PayGate
          </span>
        </div>
      </div>
    );
  }
  if (modalError) {
    return (
      <div className={styles.payment_modal_container}>
        <div className={styles.payment_inner}>
          <div className={styles.payment_main}>
            <h3
              style={{
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              {modalError}!
            </h3>
          </div>
          <span>
            <FaLock /> Secured by PayGate
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.payment_modal_container}>
      <div className={styles.payment_inner}>
        {loader ? (
          <FiLoader className={styles.payment_loader} />
        ) : (
          <div className={styles.payment_main}>
            <div className={styles.payment_header}>
              <h4>{paymentData.recipientEmail}</h4>
              <h5 style={{ marginTop: "5px" }}>Pay NGN {amount}</h5>
            </div>
            {test ? (
              <div
                className={`${styles.payment_content} ${
                  test ? styles.fadeIn : styles.fadeIn
                }`}
              >
                <h3>Use any of the options below to test the payment flow</h3>

                <div
                  className={`${styles.test_payment_div} ${
                    status === 1 ? styles.payment_active : ""
                  }`}
                  onClick={() => setStatus(1)}
                >
                  <div className={styles.payment_radio}></div> Success
                </div>
                <div
                  className={`${styles.test_payment_div} ${
                    status === 2 ? styles.payment_active : ""
                  }`}
                  onClick={() => setStatus(2)}
                >
                  <div className={styles.payment_radio}></div> Bank
                  Authentication
                </div>
                <div
                  className={`${styles.test_payment_div} ${
                    status === 3 ? styles.payment_active : ""
                  }`}
                  onClick={() => setStatus(3)}
                >
                  <div className={styles.payment_radio}></div> Declined
                </div>

                <button
                  disabled={status === 0 ? true : false}
                  onClick={() => makePayment()}
                >
                  {modalLoader ? (
                    <FiLoader
                      className={`${styles.payment_loader} ${styles.payment_loader_sm}`}
                    />
                  ) : (
                    <>Pay NGN {amount}</>
                  )}
                </button>
                <span onClick={() => setTest(!test)}>Use another card</span>
              </div>
            ) : (
              <div
                className={`${styles.payment_content} ${
                  test ? styles.fadeIn : styles.fadeOut
                }`}
              >
                <h3>Enter your card details to pay</h3>
                <input
                  type="number"
                  placeholder="CARD NUMBER (000 0000 0000 000)"
                />
                <div className={styles.payment_content_flex}>
                  <input type="number" placeholder="CARD EXPIRY" />
                  <input type="number" placeholder="CVV" />
                </div>
                <button disabled>Pay NGN {amount}</button>
                <span onClick={() => setTest(!test)}>Use a test card</span>
              </div>
            )}
          </div>
        )}
        <span>
          <FaLock /> Secured by PayGate
        </span>
      </div>
    </div>
  );
}

export default PaymentModal;
