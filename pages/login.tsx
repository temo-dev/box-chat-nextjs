import Head from "next/head";
import styled from "styled-components";
import Button from "@mui/material/Button";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`;

const StyledLoginContainer = styled.div`
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

const Login = () => {
  const [signInWithGoogle, _user, loading, _error] = useSignInWithGoogle(auth);
  const signIn = () => {
    signInWithGoogle();
  };
  return (
    <StyledContainer>
      <Head>
        <title>Login Box Chat</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <StyledBoxChatLogo />
        </StyledImageWrapper>
        <Button variant="outlined" onClick={signIn} disabled={loading}>
          Login with us
        </Button>
      </StyledLoginContainer>
    </StyledContainer>
  );
};

export default Login;
