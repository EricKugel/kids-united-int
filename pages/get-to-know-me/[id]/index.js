import { connectDB } from "../../../helpers/mongohelper";
import User from "../../../models/user";
import { useSession, getSession } from "next-auth/react";

import styles from "./UserPage.module.css";

import Link from "next/link";

const UserPage = ({ user }) => {
  const session = useSession();

  const contact = (method) => {
    return (
      <div className={styles.contact}>
        <img src={"/" + method + ".png"} className={styles.icon} />
        {user[method]}
      </div>
    );
  };

  return (
    <>
      <div id={styles.wrapper}>
        <div id={styles.top}>
          <div id={styles.left}>
            <img width="300px" height="300px" src={user?.image} />
          </div>
          <div id={styles.right}>
            <div>
              <span id={styles.name}>{user.userName}</span>, {user.email}
            </div>
            <div>
              {user.admin ? (
                <span style={{ color: "red" }}>{user.title}</span>
              ) : (
                ""
              )}
            </div>
            <div id={styles.country}>{user.country}</div>
            <div id={styles.pronouns}>{user.pronouns}</div>
            <hr />
            <div style={{ height: "200px", overflowY: "auto" }} id={styles.bio}>
              {user.bio}
            </div>
          </div>
        </div>
        <div id={styles.bottom}>
          {user.phone ? contact("phone") : ""}
          {user.ig ? contact("ig") : ""}
          {user.snap ? contact("snap") : ""}
          <div className={styles.contact}>
            <img src={"/zoom.png"} className={styles.icon} />
            <Link href={"/get-to-know-me/" + user._id + "/request"}>
              Schedule a zoom meeting with {user.userName}
            </Link>
          </div>

          {session?.data?.user?.email == user.email ? (
            <Link
              href="/get-to-know-me/edit-my-bio"
              className={styles.editLink}
            >
              <b>Edit my bio</b>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  try {
    await connectDB();
    const user = JSON.parse(
      JSON.stringify(await User.findById(context.query.id).lean())
    );
    if (session || user.admin) {
      return { props: { user } };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (e) {
    console.error(e);
  }
};

export default UserPage;
