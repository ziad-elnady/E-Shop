import Stripe from 'stripe'
import prisma from '../../../libs/prismadb'
import { NextResponse } from 'next/server'
import { CartProductType } from '../../product/[productId]/partials/ProductDetails'
import { getCurrentUser } from '../../../actions/getCurrentUser'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16'
})

// more secure calculation of the cart's total price
const calculateOrderPrice = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity

        return acc + itemTotal

    }, 0)
    return totalPrice
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { items, payment_intent_id } = body

    const totalPrice = calculateOrderPrice(items) * 100 // * 100 because stripe take money input in cents
    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: totalPrice,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    }

    if (payment_intent_id) {
        // update the order
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if (current_intent) {
            const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: totalPrice })
            const [existing_order, updated_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id }
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: totalPrice,
                        products: items
                    }
                })
            ])

            if (!existing_order) return NextResponse.json(
                { error: 'Invalid Payment Intent' },
                { status: 400 }
            )

            return NextResponse.json({ paymentIntent: updatedIntent })
        }

    } else {
        // create the payment intent & the order
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: 'usd',
            automatic_payment_methods: { enabled: true }
        })

        orderData.paymentIntentId = paymentIntent.id

        await prisma.order.create({
            data: orderData
        })

        return NextResponse.json({ paymentIntent })
    }
}