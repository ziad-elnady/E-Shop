import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocalStorage as useLocalCartStorage } from "./useLocalStorage";
import { toast } from 'react-hot-toast';
import { CartProductType } from "../product/[productId]/partials/ProductDetails";

type Cart = {
    cartTotalQty: number
    cartTotalAmount: number
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}

export const CartContext = createContext<Cart | null>(null);

type Props = {
    [propName: string]: any
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProductsList, setCartProducts] = useState<CartProductType[] | null>(null);
    const { setItem, getItem } = useLocalCartStorage('eShopCartItems');

    useEffect(() => {
        const jsonCartItems = getItem();
        const savedCartProducts: CartProductType[] | null = JSON.parse(jsonCartItems);

        setCartProducts(savedCartProducts);
    }, []);

    useEffect(() => {
        const getTotals = () => {

            if (cartProductsList) {
                const { total, qty } = cartProductsList?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
                    acc.total += itemTotal
                    acc.qty += item.quantity

                    return acc
                }, { total: 0, qty: 0 })

                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }

        }

        // getTotals();

    }, [cartProductsList])

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
    }, [cartProductsList]);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProductsList) {
            // filters the list by getting all the other products that doesn't containt the same id of the product
            const filteredProducts = cartProductsList.filter((item) => { item.id !== product.id });
            setCartProducts(filteredProducts);
            toast.success('Product removed')
            setItem(JSON.stringify(filteredProducts));
        }
    }, [cartProductsList]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity === 99) {
            return toast.error('Oops! maximum reached')
        }

        if (cartProductsList) {
            updatedCart = [...cartProductsList]

            const existingIndex = cartProductsList.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity += 1
            }

            setCartProducts(updatedCart);
            setItem(JSON.stringify(updatedCart))
        }

    }, [cartProductsList])

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if (product.quantity < 2) {
            return toast.error('Oops! minimum reached')
        }

        if (cartProductsList) {
            updatedCart = [...cartProductsList]

            const existingIndex = cartProductsList.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity -= 1
            }

            setCartProducts(updatedCart);
            setItem(JSON.stringify(updatedCart))
        }

    }, [cartProductsList])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0);
        setItem(null);
    }, [cartProductsList])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts: cartProductsList,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
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