import {NextPage} from "next";
import {Container} from "@mui/material";
import LoginForm from "@Components/loginForm";
import RegisterForm from "@Components/registerForm";

const Index: NextPage = () => {
    return (
        <Container>
            <LoginForm />
            <RegisterForm />
        </Container>
    )
}

export default Index