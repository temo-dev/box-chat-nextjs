import WhatsApp from "@mui/icons-material/WhatsApp";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
`;

const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 20%), 0 4px 6px 0 rgb(0 0 0 / 20%);
`;

const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const StyledBoxChatLogo = styled(WhatsApp)`
  height: 500px;
  width: 500px;
  color: green;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <StyledLoadingContainer>
        <StyledImageWrapper>
          <StyledBoxChatLogo />
        </StyledImageWrapper>
        <CircularProgress />
      </StyledLoadingContainer>
    </StyledContainer>
  );
};

export default Loading;
