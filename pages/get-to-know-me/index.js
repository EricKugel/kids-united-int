import { connectDB } from "../../helpers/mongohelper";
import User from "../../models/user";
import Link from "next/link";

import { getSession } from "next-auth/react";

import styles from "./GetToKnowMe.module.css";

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const GetToKnowMe = ({ users, email, count }) => {
  return (
    <>
      <div className={styles.users}>
        {users.map((user) => (
          <Link
            key={user._id}
            className={
              styles.user + " " + styles["blob" + Math.floor(Math.random() * 3)]
            }
            href={"/get-to-know-me/" + user._id}
          >
            <div class={styles.name}>
              <b>
                {user.userName.split(" ").map((word) => (
                  <span>
                    {word}
                    <br />
                  </span>
                ))}
              </b>
            </div>
            <div style={{ fontSize: "12px" }}>{user.country}</div>
            <img width="100px" height="100px" src={user.image} />
            {user.email == email ? <div>Click to edit</div> : ""}
          </Link>
        ))}
      </div>
      <br />
      <br />
      <div id={styles.count} className={poppins.className}>
        {count} members!
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    try {
      await connectDB();
      const email = session.user.email;
      const otherUsers = JSON.parse(
        JSON.stringify(
          await User.find({ email: { $ne: email } })
            .collation({ locale: "en" })
            .sort({ admin: -1, userName: 1 })
            .lean()
        )
      );
      const myUser = JSON.parse(
        JSON.stringify(await User.findOne({ email }).lean())
      );
      otherUsers.splice(0, 0, myUser);

      const count = await User.count();
      return { props: { users: otherUsers, email, count } };
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

export default GetToKnowMe;
