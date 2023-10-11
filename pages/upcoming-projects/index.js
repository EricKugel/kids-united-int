import { Poppins } from "next/font/google";

import styles from "./UpcomingProjects.module.css";

import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const UpcomingProjects = () => {
  return (
    <div className={poppins.className + " " + styles.wrapper}>
      <div className={styles.header}>Projects</div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoHeader}>Fundraising in Ukraine</div>
        <div className={styles.info}>
          In response to the deeply distressing sequence of events that followed
          the war in Ukraine, Kids United International was established in an
          effort to supply crucial medical aid to both Ukrainian soldiers and
          civilians. Through diligent fundraising and collaboration with local
          Georgian businesses, a grand sum of $10,000 was amassed and
          subsequently presented to the Ukrainian embassy for distribution.
        </div>
      </div>

      <div className={styles.gallery}>
        <Link href="/georgia/0.jpg">
          <img className={styles.galleryPhoto} src="/georgia/0.jpg" />
        </Link>
        <Link href="/georgia/1.jpg">
          <img
            className={styles.galleryPhoto + " " + styles.vertical}
            src="/georgia/1.jpg"
          />
        </Link>
        <Link href="/georgia/2.jpg">
          <img className={styles.galleryPhoto} src="/georgia/2.jpg" />
        </Link>
      </div>

      <div className={styles.infoWrapper + " " + styles.right}>
        <div className={styles.infoHeader}>Fundraising in Georgia</div>
        <div className={styles.info}>
          Kids United International held a fundraiser alongside local politician
          Levan Japaridze to provide resources for a low-income family of twelve
          in Tbilisi, Georgia. In addition to the $1,151 (2,995 lari) raised for
          the family, an abundance of food and other supplies were also
          gathered. All items were personally delivered during a private meeting
          with the family, as pictured below/above.
        </div>
      </div>

      <div className={styles.gallery}>
        <Link href="/georgia/3.jpg">
          <img className={styles.galleryPhoto} src="/georgia/3.jpg" />
        </Link>
        <Link href="/georgia/4.jpg">
          <img className={styles.galleryPhoto} src="/georgia/4.jpg" />
        </Link>
        <Link href="/georgia/5.jpg">
          <img className={styles.galleryPhoto} src="/georgia/5.jpg" />
        </Link>
      </div>

      <div
        className={styles.header}
        style={{
          marginTop: "50px",
        }}
      >
        Recently Started
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.infoHeader}>Girl's Essentials Drive</div>
        <div className={styles.info}>
          Menstrual health and safety are not a priority in a number of
          countries. In several African countries, including Tanzania, Ghana,
          and Kenya, girls are discouraged to attend school while on their
          period. In an effort to promote educational equity in such countries,
          Kids United International is hosting a Girls' Essentials Drive in
          collaboration with Bookfriends International. Make a contribution by
          donating the items necessary to provide African girls with the
          menstrual hygiene kits necessary to stay in school. Confused on what
          to donate? Here are a few dos and don'ts:
          <div style={{ color: "black" }}>
            <br />
            <br />
            Do:
            <ul>
              <li>
                Donate cotton or cotton-blend <b>underwar:</b>
                <ul>
                  <li>GIRLS' sizes 12, 14, and 16</li>
                  <li>WOMENS' sizes 6 and 7</li>
                  <li>
                    <b>Sturdy</b> and <b>brief</b>
                  </li>
                </ul>
              </li>
              <li>
                Washable, reusable <b>tampons/pads</b> (handmade instructions on{" "}
                <Link href="https://bookfriends.org">Bookfriends</Link>)
              </li>
            </ul>
            Don't:
            <ul>
              <li>
                Donate <b>disposable</b> or <b>non-resuable</b> menstrual pads
                or tampons
              </li>
              <li>
                Donate <b>thongs</b> or <b>bikinis</b>
              </li>
            </ul>
            Drop off sites in Rochester, MN will be posted soon! If you have the
            means, please consider <b>donating</b> to the cause.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;
