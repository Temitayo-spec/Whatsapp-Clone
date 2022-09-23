/* eslint-disable @next/next/no-img-element */
import { Button } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import { auth, provider } from "../firebase";
import styles from "../styles/Login.module.scss";
const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.inner}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="whatsapp logo"
          width={200}
          height={200}
        />
        <Button onClick={signIn} className={styles.button}>Login with Google</Button>
      </div>
    </div>
  );
};

export default Login;
