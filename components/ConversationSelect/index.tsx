import styled from "styled-components";
import { Conversation } from "../../types/index";
import { useRecipient } from "../../hooks/useRepcipient";
import RecipientAvatar from "../RecipientAvatar";
import { useRouter } from "next/router";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  :hover {
    opacity: 0.8;
    background-color: whitesmoke;
  }
`;

const ConversationSelect = ({
  id,
  conversationUsers,
}: {
  id: string;
  conversationUsers: Conversation["users"];
}) => {
  const router = useRouter();

  const onSelectConversation = () => {
    console.log(id);
    router.push(`/conversations/${id}`);
  };

  const { recipientEmail, recipient } = useRecipient(conversationUsers);
  return (
    <StyledContainer onClick={onSelectConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      {/* <RecipientEmail /> */}
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};

export default ConversationSelect;
