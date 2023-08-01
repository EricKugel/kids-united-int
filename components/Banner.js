import Link from "next/link";
import { Poppins } from "next/font/google";
import styles from "./Banner.module.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Banner = () => {
  return (
    <>
      <img id={styles.logo} src="/icon-transparent.png" />
      <header id={styles.header}>
        <nav id={styles.nav} className={poppins.className}>
          <Link href="/" className={styles.nav_link}>
            <div className={styles.nav_link_text}>About Us</div>
          </Link>
          <Link href="/get-to-know-me" className={styles.nav_link}>
            <div className={styles.nav_link_text}>Get To Know Me</div>
          </Link>
          <Link href="/blog" className={styles.nav_link}>
            <div className={styles.nav_link_text}>Blog</div>
          </Link>
          <Link href="/take-a-breath" className={styles.nav_link}>
            <div className={styles.nav_link_text}>Take a Breath</div>
          </Link>
          <Link href="/upcoming-projects" className={styles.nav_link}>
            <div className={styles.nav_link_text}>Upcoming Projects</div>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Banner;
