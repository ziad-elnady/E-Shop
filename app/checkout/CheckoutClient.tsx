"use client"

import { useEffect, useState } from "react"
import { useCart } from "../hooks/useCart"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const CheckoutClient = () => {

    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    const router = useRouter()

    useEffect(() => {
        if (cartProducts) {
            setIsLoading(true)
            setError(false)

            fetch('api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_inent_id: paymentIntent
                })
            })
                .then((response) => {
                    setIsLoading(false)
                    if (response.status === 401) return router.push('/login')
                    return response.json()
                })
                .then((data) => {
                    setClientSecret(data.paymentIntent.clientSecret)
                    handleSetPaymentIntent(data.paymentIntent.id)
                })
                .catch((error) => {

                    setError(true)
                    toast.error('Something went wrong!')
                })
        }
    }, [cartProducts, paymentIntent])



    return (
        <>
            Checkout
        </>
    )
}

export default CheckoutClient 