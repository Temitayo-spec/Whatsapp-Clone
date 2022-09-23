import { Avatar } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import styles from "../styles/Chat.module.scss";
import getRecipientEmail from "../utils/getRecipientEmail";

const Chat = ({ users, id }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  return (
    <Link href={`/chat/${id}`}>
      <div className={styles.chat__wrapper}>
        <div className={styles.chat__inner}>
          <div className={styles.chat__avatar}>
            {recipient ? (
              <Avatar src={recipient?.photoURL} />
            ) : (
              <Avatar>{recipientEmail[0]}</Avatar>
            )}
          </div>
          <div className={styles.chat__info}>
            <p>{recipientEmail}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
