import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatScreen, Sidebar } from "../../components";
import { auth, db } from "../../firebase";
import styles from "../../styles/EachChat.module.scss";
import getRecipientEmail from "../../utils/getRecipientEmail";

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  // PREP the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // PREP the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>

      <div className={styles.chat__inner}>
        <Sidebar />
        <div className={styles.chat__ctn}>
          <ChatScreen chat={chat} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
