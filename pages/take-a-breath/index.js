import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "600" });

import styles from "./TakeABreath.module.css";

const TakeABreath = () => {
  return (
    <>
      <div className={styles.text + " " + poppins.className}>
        There's nothing here yet.
        <br />
        For now, just take some deep breaths.
      </div>
    </>
  );
};

export default TakeABreath;
