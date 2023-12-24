"use client";

import { CartProductType } from "../../product/[productId]/partials/ProductDetails";

/*
    this is a reusable component
    it will be used in the product detail route as well as the cart
    so the cartCounter usage is to inform which route we are in (because it has 2 different looks)
*/

type ProductQuantityProps = {
    cartCounter?: boolean,
    cartProduct: CartProductType,
    handleQtnDecrease: () => void,
    handleQtnIncrease: () => void,
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
    cartCounter,
    cartProduct,
    handleQtnDecrease,
    handleQtnIncrease
}) => {

    const btnStyles = 'border-[1.2px] border-gray-300 rounded-md px-2'

    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}

            <div className="flex gap-4 items-center text-base">
                <button className={btnStyles} onClick={handleQtnDecrease}>-</button>
                <div>{cartProduct.quantity}</div>
                <button className={btnStyles} onClick={handleQtnIncrease}>+</button>
            </div>
        </div>
    )
}

export default ProductQuantity