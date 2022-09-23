/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Loader.module.scss";
import { Circle } from "better-react-spinkit";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="whatsapp logo"
        width={200}
        height={200}
      />
      <Circle color="#3CBC28" size={60} />
    </div>
  );
};

export default Loader;
