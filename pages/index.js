import { useSession } from "next-auth/react";

import findDimensions from "../helpers/hooks/dimensions";

import styles from "./Home.module.css";
import { Poppins } from "next/font/google";

import { connectDB } from "../helpers/mongohelper";
import User from "../models/user";

import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });
const Home = ({ admins }) => {
  const { width, height } = findDimensions();
  return (
    <div className={poppins.className}>
      <div className={styles.homeWrapper}>
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
                to help making a difference by referencing the Projects
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
              <div style={{ marginLeft: "40px" }}>today's post...</div>
              <br />
            </div>
            <iframe
              src="https://www.instagram.com/p/CyrzDcKOllh/embed"
              width="500"
              height="850"
              allowtransparency="true"
              style={{ border: "0" }}
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.meetWrapper}>
        <div className={styles.meetHeading}>Meet Our Directors</div>
        <div className={styles.directors}>
          {admins &&
            admins.map((admin) => (
              <Link
                key={admin._id}
                className={styles.director}
                href={"/get-to-know-me/" + admin._id}
              >
                <div className={styles.directorTop}>
                  <img width="230px" height="230px" src={admin.image} />
                </div>
                <div className={styles.directorBottom}>
                  <div className={styles.name}>{admin.userName}</div>
                  <div className={styles.title}>{admin.title}</div>
                  <div className={styles.email}>{admin.email}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    await connectDB();
    return {
      props: {
        admins: JSON.parse(
          JSON.stringify(await User.find({ admin: true }).lean())
        ),
      },
    };
  } catch (e) {
    console.error(e);
  }
};
