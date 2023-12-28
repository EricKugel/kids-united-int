import { getSession } from "next-auth/react";
import User from "../../models/user";

import styles from "./Donate.module.css";


import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "600" });

const Donate = ({user}) => {
    return (
        <div className = {styles.donate_wrapper + " " + poppins.className}>
            <div className = {styles.left}>
                Consider Donating
            </div>
            <div className = {styles.right}>
                Mhm!
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (session) {
      try {
        await connectDB();
        const email = session.user.email;
        const user = JSON.parse(
          JSON.stringify(await User.findOne({ email }).lean())
        );
  
        return { props: { user } };
      } catch (e) {
        console.error(e);
      }
    } else {
      return {
        props: {}
      };
    }
};

export default Donate;