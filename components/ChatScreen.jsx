import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import styles from "../styles/ChatScreen.module.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import firebase from "firebase/compat/app";
import { useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef } from "react";

const ChatSreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

    const endRef = useRef(null);

    const scrollToBottom = () => {
      endRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);



  return (
    <div className={styles.chatScreen}>
      <div className={styles.chatScreen__header}>
        <div className={styles.chat__header__left}>
          {recipient ? (
            <Avatar
              src={recipient?.photoURL}
              className={styles.chat__header__avatar}
            />
          ) : (
            <Avatar className={styles.chat__header__avatar}>
              {recipientEmail[0]}
            </Avatar>
          )}
          <div className={styles.chat__header__left__info}>
            <h3>{recipientEmail}</h3>
            {recipientSnapshot ? (
              <p>
                Last active: {" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : (
                  "Unavailable"
                )}
              </p>
            ) : (
                <p>Loading last active...</p>
            )}
          </div>
        </div>
        <div className={styles.chat__header__right}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.chat__body}>
        {showMessages()}

        <div ref={endRef} className={styles.bottom__scroll} />
      </div>
      <div className={styles.chat__footer}>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input} onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatSreen;
