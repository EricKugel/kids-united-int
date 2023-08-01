import Head from "next/head";
import Banner from "./Banner";
import Footer from "./Footer";

import styles from "./Layout.module.css";

import { withRouter } from "next/router";
const Layout = ({ router, children }) => {
  const map =
    router.pathname.startsWith("/get-to-know-me") ||
    router.pathname.startsWith("/blog");
  const takeABreath = router.pathname.startsWith("/take-a-breath");
  const blobby = !(map || takeABreath);
  return (
    <>
      <div className={map ? styles.funBg : styles.plainBg}>
        <div
          id={map ? styles.map : blobby ? styles.blobby : styles.takeABreath}
        >
          <Head>
            <title>Kids United Int</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Banner />
          <div id="main">
            <div className="contentPane">
              <main>{children}</main>
            </div>
          </div>
          <Footer />
          <style jsx global>{`
            html,
            body {
              margin: 0;
              width: 100%;
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default withRouter(Layout);
