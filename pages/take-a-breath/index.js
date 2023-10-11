import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "600" });

import styles from "./TakeABreath.module.css";

const TakeABreath = () => {
  return (
    <>
      <div className={styles.text + " " + poppins.className}>
        This page isn't quite ready yet.
        <br />
        For now, practice taking some deep breaths.
      </div>
    </>
  );
};

export default TakeABreath;
