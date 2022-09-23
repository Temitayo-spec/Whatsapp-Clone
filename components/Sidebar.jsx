import { Avatar, Button, IconButton } from "@material-ui/core";
import styles from "../styles/Sidebar.module.scss";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

const Sidebar = () => {
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat with"
      );
      
      if (!input) return;

      if (EmailValidator.validate(input)) {
          // we need to add the chat into the DB
      }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.user__avatar}>
            <Avatar className={styles.avatar} />
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

        <Button className={styles.sidebar__btn}>Start a new chat</Button>
      </div>
    </div>
  );
};

export default Sidebar;
