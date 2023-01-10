import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { Conversation } from "../../types";
import ConversationSelect from "../ConversationSelect";

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  flex-grow: 1;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;
const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;
const StyledSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;
const StyledButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledNameUser = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

const SideBar = () => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] =
    useState(false);

  const [recipientEmail, setRecipientEmail] = useState("");
  const isInvitingSelf = recipientEmail === loggedInUser?.email;

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen);
    if (!isOpen) setRecipientEmail(" ");
  };

  const closeNewConversationDialog = () => {
    toggleNewConversationDialog(false);
  };
  // check if conversation already exists between the current logged in user and recipent
  const queryGetConversationsForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", loggedInUser?.email)
  );
  // check conversation on db
  const [conversationSnapshot, __loading, __error] = useCollection(
    queryGetConversationsForCurrentUser
  );
  // find conversation
  const isConversationAlreadyExists = (recipientEmail: string) =>
    conversationSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(recipientEmail)
    );

  const createConversation = async () => {
    if (isInvitingSelf) return;

    if (
      EmailValidator.validate(recipientEmail) &&
      !isInvitingSelf &&
      !isConversationAlreadyExists(recipientEmail)
    ) {
      // add conversation user to db table "conversations" collection
      await addDoc(collection(db, "conversations"), {
        users: [loggedInUser?.email, recipientEmail],
      });
    }
    closeNewConversationDialog();
  };
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={loggedInUser?.email || "User Email"} placement="right">
          {loggedInUser?.photoURL ? (
            <StyledUserAvatar src={loggedInUser.photoURL} />
          ) : (
            <StyledUserAvatar>
              {(loggedInUser?.email && loggedInUser.email[0].toUpperCase()) ||
                "User"}
            </StyledUserAvatar>
          )}
        </Tooltip>
        <Tooltip
          title={loggedInUser?.displayName || "User Email"}
          placement="top"
        >
          <StyledNameUser>
            {loggedInUser && loggedInUser.displayName}
          </StyledNameUser>
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton onClick={logOut}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSearch>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <StyledSearchInput placeholder="Search in conversation" />
      </StyledSearch>
      <StyledButton
        onClick={() => {
          toggleNewConversationDialog(true);
        }}
      >
        start a new conversation
      </StyledButton>

      {/* add dialog conversation */}
      <Dialog
        open={isOpenNewConversationDialog}
        onClose={closeNewConversationDialog}
      >
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
            with us
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(event) => {
              setRecipientEmail(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* add dialog conversation - end */}

      {/* map conversation fronm db */}
      {conversationSnapshot?.docs.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={(conversation.data() as Conversation).users}
        />
      ))}

      {/* map conversation fronm db -- end */}
    </StyledContainer>
  );
};

export default SideBar;
