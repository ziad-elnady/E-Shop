import { createContext, useCallback, useContext, useState } from "react";
import { CartProductType } from "../product/[productId]/partials/ProductDetails";

type Cart = {
    cartTotalQty: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<Cart | null>(null);

type Props = {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedProducts

            if (prev) {
                updatedProducts = { ...prev, product }
            } else {
                updatedProducts = [product]
            }

            return updatedProducts
        })
    }, [])

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
}