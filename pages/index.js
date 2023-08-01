import { useSession } from "next-auth/react";

import styles from "./Home.module.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const Home = () => {
  return (
    <>
      <div className={styles.homeWrapper + " " + poppins.className}>
        <div className={styles.left}>
          <div className={styles.logoWrapper}>
            <object id={styles.logoImageLarge} data="/logo.svg" />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.info + " " + styles.leftInfo}>
              <div className={styles.infoHeader}>About us</div>
              <div className={styles.infoText}>
                Kids United International is a <span>youth-led</span> 501c3
                non-profit organization which strives to amplify global
                connectivity and extend peer support on an{" "}
                <span>international</span> scale. Our mission encompasses
                raising awareness of and addressing worldly affairs while
                simultaneously working to help better mental health efforts
                through the <span>nurturing</span> of relationships and
                fostering of personal growth.
              </div>
            </div>
            <div className={styles.info + " " + styles.rightInfo}>
              <div className={styles.infoHeader}>What do we do?</div>
              <div className={styles.infoText}>
                Originating from a humble volunteer effort in Georgia, Kids
                United International (KUI) has rapidly evolved.{" "}
                <span>Collaborating</span> with politicians in several nations,
                we have successfully facilitated aid to children in dire
                circumstances across the globe. From Africa to Ukraine to the
                United States, KUI has organized and hosted{" "}
                <span>impactful</span> drives, combatting issues such as period
                poverty, hunger, and more. We provide a nurturing space
                characterized by{" "}
                <span>inclusivity, knowledge-sharing, and tranquility</span>,
                enabling users to relax and immerse themselves in the splendors
                of different cultures while empowering one another through
                empathetic friendships.
              </div>
            </div>
            <div className={styles.info + " " + styles.leftInfo}>
              <div className={styles.infoHeader}>How do we do it?</div>
              <div className={styles.infoText}>
                Kids United International (KUI) embraces a{" "}
                <span>multifaceted</span> approach to attain its success,
                employing a variety of strategies rather than depending on a
                single method. To get involved, we invite you to explore our
                remarkable website. Connect with individuals from every corner
                of the world on our awe-inspiring <span>Get to Know Me</span>{" "}
                page, take a momentary respite for mental well-being on our{" "}
                <span>rejuvenating</span> Take a Breath tab, or scroll through
                user-generated blogs on our Blogs page to uncover{" "}
                <span>fascinating</span> insights into users' daily lives,
                passions, and their countries. Don't forget to stay updated on
                our latest and upcoming projects to learn how you can contribute
                to help making a difference by referencing the Upcoming Projects
                tab.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.postHeader}>
            <div className={styles.realHeader}>
              In case you missed
              <br />
              <div style={{ marginLeft: "40px" }}>today's post..</div>
              <br />
            </div>
            <iframe
              class="instagram-media instagram-media-rendered"
              id="instagram-embed-0"
              src="https://www.instagram.com/p/CuXCl3GryIM/embed/?cr=1&amp;v=14&amp;wp=598&amp;rd=https%3A%2F%2Fcdn.iframe.ly&amp;rp=%2Fapi%2Fiframe%3Fapp%3D1%26url%3Dhttps%253A%252F%252Fwww.instagram.com%252Fp%252FCuXCl3GryIM%252F%253Fimg_index%253D1%26key%3D462812a26b593f2dbfbfcbb14f6d699a#%7B%22ci%22%3A0%2C%22os%22%3A133.5%2C%22ls%22%3A129.79999995231628%2C%22le%22%3A129.79999995231628%7D"
              allowtransparency="true"
              allowfullscreen="true"
              frameborder="0"
              height="955"
              data-instgrm-payload-id="instagram-media-payload-0"
              style={{
                backgroundColor: "white",
                maxWidth: "658px",
                width: "calc(100% - 2px)",
                borderRadius: "3px",
                border: "1px solid rgb(219, 219, 219)",
                boxShadow: "none",
                display: "block",
                margin: "0px 0px 12px",
                minWidth: "326px",
                padding: "0px",
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
