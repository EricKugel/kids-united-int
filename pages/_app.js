import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
};

export default MyApp;
