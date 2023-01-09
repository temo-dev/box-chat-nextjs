import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../config/firebase";
import { AppUser, Conversation } from "../types";
import { getRecipientEmail } from "../utils/getRecipientEmail";

export const useRecipient = (conversationUser: Conversation["users"]) => {
  const [loogedInUser, _loading, _error] = useAuthState(auth);

  // get recipient Email
  const recipientEmail = getRecipientEmail(conversationUser, loogedInUser);

  // get recipient Avatar
  const queryGetRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );
  const [recipientSnapshot, __loading, __error] =
    useCollection(queryGetRecipient);

  // recipientSnapshot?.docs could be an empty array
  const recipient =
    (recipientSnapshot?.docs[0]?.data() as AppUser) || undefined;

  return {
    recipientEmail,
    recipient,
  };
};
