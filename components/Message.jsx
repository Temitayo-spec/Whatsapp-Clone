import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styles from "../styles/Message.module.scss";
import moment from "moment";

const Message = ({
  user,
  message: { timestamp, message, photo, email, displayName },
}) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage =
    user === userLoggedIn.email ? styles.sender : styles.receiver;
  return (
    <div className={TypeOfMessage}>
      <div className={styles.inner}>
        <p>{message}</p>
        <div className={styles.timestamp}>
          {timestamp ? (
            moment(timestamp).format("LT")
          ) : (
            <span className={styles.time}>...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
