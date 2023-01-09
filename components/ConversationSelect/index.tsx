import styled from "styled-components";
import { Conversation } from "../../types/index";
import { useRecipient } from "../../hooks/useRepcipient";
import RecipientAvatar from "../RecipientAvatar";

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
  const { recipientEmail, recipient } = useRecipient(conversationUsers);
  return (
    <StyledContainer>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      {/* <RecipientEmail /> */}
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};

export default ConversationSelect;
