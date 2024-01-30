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


      <div className={styles.infoWrapper}>
        <div className={styles.infoHeader}>Girl's Essentials Drive</div>
        <div className={styles.info}>
        Menstrual health and safety are not a priority in a number of countries. In several African countries, including Tanzania, Uganda, and Kenya, girls are discouraged to attend school while on their period. In an effort to promote educational equity in such countries, Kids United International hosted a Girls' Essentials Drive in collaboration with Bookfriends International. A month-long drive, various items were donated. All donations were packaged to Bookfriends International, who will safely ensure the delivery of the materials and hygiene kits to African countries.
        </div>
      </div>

      {/* <div
        className={styles.header}
        style={{
          marginTop: "50px",
        }}
      >
        Upcoming Projects
      </div> */}

      <div className={styles.gallery}>
        <Link href="/Erekle/0.png">
          <img className={styles.galleryPhoto + " " + styles.vertical} src="/Erekle/0.png" />
        </Link>
        <Link href="/Erekle/2.png">
          <img className={styles.galleryPhoto + " " + styles.vertical} src="/Erekle/2.png" />
        </Link>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.infoHeader}>Fundraising for Erekle Jokhadze</div>
        <div className={styles.info}>Kids United International raised a total of $1251.78 through GoFundMe to support medical student Erekle Jokhadze. Jokhadze, living in Tbilisi, Georgia, lacked the appropriate funding to continue paying for his tuition at Geomedi University. Above are two pictures of Jokhadze, and below is as a personally crafted letter of his in English providing some background into his life.
        </div>
      </div>

      <div className={styles.letterWrapper}>
          <p style = {{"margin": 0}}>Hello,</p>
          <p style = {{"textIndent": "25px", "margin": 0}}>I am Erekle Jokhadze, 19 years old, 2nd year student. I was born and grew up in Ambrolauri, one of the cities of Georgia. From a young age, I wanted to provide some kind of help to people and be there for them when they were sick. That is why I decided to choose a medical university.</p>
          <p style = {{"textIndent": "25px", "margin": 0}}>I am enrolling in the 2nd year of the Faculty of Physical Medicine and Rehabilitation of the Geomed Training University. I am a winner in one of the famous youth educational projects in Georgia, called "Bookshelf". After winning this project, I won a prize and was in England for 2 weeks.</p>
          <p style = {{"textIndent": "25px", "margin": 0}}>I have been a big fan of sports since childhood and currently I am a beginner physiotherapist in one of the football clubs, "Lokomotivi" where I am paid 600 GEL.</p>
          <div style = {{"textAlign": "right", "marginTop": "25px"}}>Thank you for your attention.</div>
      </div>

    </div>
  );
};

export default UpcomingProjects;
