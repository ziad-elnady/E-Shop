import { products } from "../../../utils/products";
import Container from "../../components/Container";
import ListRating from "./ListRating";
import ProductDetails from "./partials/ProductDetails";


type IParams = {
    productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
    console.log("params", params)

    const product = products.find((item) => item.id === params.productId)

    return <div className="p-8">
        <Container>
            <ProductDetails product={product} />
        </Container>

        <div className="flex flex-col mt-20 gap-4">
            <ListRating product={product} />
            <div>List</div>
        </div>
    </div>
}

export default Product