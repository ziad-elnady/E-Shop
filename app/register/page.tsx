import { getCurrentUser } from "../../actions/getCurrentUser"
import Container from "../components/Container"
import FormWrap from "../components/form-wrap/FormWrap"
import RegisterForm from "./RegisterForm"

const Register = async () => {

    const currentUser = await getCurrentUser();

    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    )
}

export default Register