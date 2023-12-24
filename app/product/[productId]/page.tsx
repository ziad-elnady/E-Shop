import { iphone12 } from "../../../utils/product";
import Container from "../../components/Container";
import ListRating from "./ListRating";
import ProductDetails from "./partials/ProductDetails";


type IParams = {
    productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
    console.log("params", params)

    return <div className="p-8">
        <Container>
            <ProductDetails product={iphone12} />
        </Container>

        <div className="flex flex-col mt-20 gap-4">
            <ListRating product={iphone12} />
            <div>List</div>
        </div>
    </div>
}

export default Product