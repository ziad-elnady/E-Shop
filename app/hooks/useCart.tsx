import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../product/[productId]/partials/ProductDetails";
import { useLocalStorage } from "./useLocalStorage";
import { toast } from 'react-hot-toast';

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
    const { setItem, getItem } = useLocalStorage('eShopCartItems');

    useEffect(() => {
        const jsonCartItems = getItem();
        const savedCartProducts: CartProductType[] | null = JSON.parse(jsonCartItems);

        setCartProducts(savedCartProducts);
    }, []);

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedProducts

            if (prev) {
                updatedProducts = { ...prev, product }
            } else {
                updatedProducts = [product]
            }

            toast.success('Successfully added product to cart!')
            setItem(JSON.stringify(updatedProducts));
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