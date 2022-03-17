import {NextPage} from "next";
import {Container} from "@mui/material";
import LoginForm from "@Components/loginForm";

const Index: NextPage = () => {
    return (
        <Container>
            <LoginForm />
        </Container>
    )
}

export default Index