import "../styles/globals.scss";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "../components";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;
  if (!user) router.replace("/login");

  return <Component {...pageProps} />;
}

export default MyApp;
