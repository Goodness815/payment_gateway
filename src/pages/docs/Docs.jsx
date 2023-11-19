import { Link } from "react-router-dom";
import styles from "./docs.module.css";
import Navbar from "../../components/navbar/Navbar";

function Docs() {
  return (
    <>
      <Navbar />
      <div className={styles.docs_container}>
        <h2>Introduction</h2>
        <p>
          PayGate is beautifully designed, expertly crafted components UI kit
          for building a high-quality website and web apps using web
          technologies — React JS — with integrations of the world’s most
          popular frameworks.
        </p>
        <h2>Quick Start</h2>
        <p>
          PayGate JavaScript framework for accepting payments. It builds on top
          of standard JavaScript, and provides a declarative and component-based
          programming model that helps you efficiently proccess payments on your
          platform, be it simple or complex.
        </p>
        <h2>Installation and Usage</h2>
        <p>Here is a step by step guide on how to use PayGate:</p>
        <ul>
          <li>
            Create an account <Link to="/signup">here</Link>
          </li>
          <li>
            Login to your account <Link to="/login">here</Link>
          </li>
          <li>Find your APP ID on the top right corner of your dashboard.</li>
          <li>
            Use your APP ID to make requests to our servers with the appropriate
            credientials and get a payment link response on each successfull
            requests you make.
          </li>
        </ul>
        {/* <h2>Code Snippet:</h2>
        <code>
          {
            "const formData ={ paymentTitle, recipientName,recipientEmail, amount} const createPayment = async (e) => {try {const res =await axios.post(`${BASE_URL}/auth/createpayment/${app_id}`,formData);console.log(res.data)} catch (error) {console.log(error.message);}}"
          }
        </code> */}
      </div>
    </>
  );
}

export default Docs;
