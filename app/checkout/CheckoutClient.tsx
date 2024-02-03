"use client"

import { useEffect } from "react"
import { useCart } from "../hooks/useCart"

const CheckoutClient = () => {

    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()

    useEffect(() => {

    }, [cartProducts, paymentIntent])



    return (
        <>
            Checkout
        </>
    )
}

export default CheckoutClient 