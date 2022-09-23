/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Loader.module.scss";
import Loader  from "react-loaders";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="whatsapp logo"
        width={200}
        height={200}
      />
      <Loader type="ball-pulse" />
    </div>
  );
};

export default Loading;
