import { useState } from "react";
import { getSession } from "next-auth/react";
import { connectDB } from "../../../helpers/mongohelper";
import User from "../../../models/user";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "../../../styles/Form.module.css";

const Request = ({ emailTo, emailFrom, userName }) => {
  const router = useRouter();
  const [data, setData] = useState({
    time: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/request_meeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, emailTo }),
    });
    if (response.ok) {
      toast.success("Request sent!");
      router.push("/");
    } else {
      toast.error("Request could not be sent");
    }
  };

  return (
    <div className={styles.formPageWrapper}>
      <div className={styles.largeFormWrapper}>
        <div className={styles.formHeader}>
          Schedule a meeting with {userName}
        </div>
        <form onSubmit={handleSubmit}>
          <p style={{ margin: "0px" }}>
            Time and date, including time zones if applicable
          </p>
          <input
            className={styles.smallInput}
            type="text"
            name="text"
            value={data.time}
            onChange={(e) => {
              setData({ ...data, time: e.target.value });
            }}
          />

          <p>Message</p>
          <textarea
            className={styles.smallTextarea}
            name="message"
            value={data.message}
            onChange={(e) => {
              setData({ ...data, message: e.target.value });
            }}
          />
          <p>
            Sending a request will send an email to both you ({emailFrom}) and
            the recipient ({emailTo})
          </p>
          <button className={styles.submit} type="submit">
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Request;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const emailFrom = session.user.email;
    try {
      await connectDB();
      const { email, userName } = JSON.parse(
        JSON.stringify(await User.findById(context.query.id).lean())
      );
      return { props: { emailFrom, emailTo: email, userName } };
    } catch (e) {
      console.error(e);
    }
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
