import Container from "../components/Container"
import CartClient from "./CartClient"

const Cart = () => {
    return (
        <Container>
            <div className="pt-8">
                <CartClient />
            </div>
        </Container>
    )
}

export default Cart