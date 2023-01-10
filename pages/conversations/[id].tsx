import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import { auth, db } from "../../config/firebase";
import { Conversation } from "../../types";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { IMessage } from "../../types/index";
import {
  generateQueryGetMessages,
  transformMeassage,
} from "../../utils/getMessagesInConversation";
import ConversationSreen from "../../components/ConversationSreen";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const Conversation = ({ conversation, messages }: Props) => {
  const [loggedInUser, _loading, _error] = useAuthState(auth);
  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with{" "}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>
      <SideBar />
      <StyledConversationContainer>
        <ConversationSreen conversation={conversation} messages={messages} />
      </StyledConversationContainer>
    </StyledContainer>
  );
};

export default Conversation;

// working in server
export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  // get conversation, to know who are chatting with
  const conversationRef = doc(db, `conversations`, conversationId as string);
  const conversationSnapShot = await getDoc(conversationRef);

  // get all message between logged in user and recipient in this conversation
  const queryMessages = generateQueryGetMessages(conversationId);
  const messagesSnapshot = await getDocs(queryMessages);

  //change to json
  const messages = messagesSnapshot.docs.map((messageDoc) =>
    transformMeassage(messageDoc)
  );
  return {
    props: {
      conversation: conversationSnapShot.data() as Conversation,
      messages,
    },
  };
};
