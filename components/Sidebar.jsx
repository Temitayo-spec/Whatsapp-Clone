import { Avatar, Button, IconButton } from "@material-ui/core";
import styles from "../styles/Sidebar.module.scss";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { Chat } from "../components";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat with"
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // we need to add the chat into the DB 'chats' collection if it doesn't already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.user__avatar}>
            <Avatar onClick={() => {
              auth.signOut();
              router.push("/");
            }} className={styles.avatar}
              src={user.photoURL}
            />
          </div>

          <div className={styles.icons__ctn}>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </header>

        <div className={styles.search__ctn}>
          <SearchIcon />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search in chats"
          />
        </div>

        <Button onClick={createChat} className={styles.sidebar__btn}>
          Start a new chat
        </Button>

        {/* List of chats */}
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
