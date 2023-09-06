import Link from "next/link";
import { Poppins } from "next/font/google";
import styles from "./Banner.module.css";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import isMobile from "../helpers/hooks/dimensions";

import { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Banner = () => {
  const mobile = isMobile();

  const [showBars, setShowBars] = useState(false);

  const handleClick = () => {
    setShowBars(!showBars);
  };

  const close = () => {
    setShowBars(false);
  };

  return (
    <>
      <img id={styles.logo} src="/icon-transparent.png" />
      <header id={styles.header}>
        {mobile ? (
          <div className={poppins.className}>
            <nav id={styles.nav}>
              <div onClick={handleClick} className={styles.dropDown}>
                <FontAwesomeIcon className={styles.barsIcon} icon={faBars} />
              </div>
            </nav>
            <div
              onClick={close}
              className={styles.dropDownLinks}
              style={{ display: showBars ? "block" : "none" }}
            >
              <Link href="/" className={styles.dropDownLink}>
                <div className={styles.nav_link_text}>About Us</div>
              </Link>
              <Link href="/get-to-know-me" className={styles.dropDownLink}>
                <div className={styles.nav_link_text}>Get To Know Me</div>
              </Link>
              <Link href="/blog" className={styles.dropDownLink}>
                <div className={styles.nav_link_text}>Blog</div>
              </Link>
              <Link href="/take-a-breath" className={styles.dropDownLink}>
                <div className={styles.nav_link_text}>Take a Breath</div>
              </Link>
              <Link href="/upcoming-projects" className={styles.dropDownLink}>
                <div className={styles.nav_link_text}>Projects</div>
              </Link>
            </div>
          </div>
        ) : (
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
              <div className={styles.nav_link_text}>Projects</div>
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Banner;
