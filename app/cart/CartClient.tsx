'use client'

import Link from "next/link";
import { useCart } from "../hooks/useCart"
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/heading/Heading";
import Button from "../components/button/Button";
import ProductRow from "./ProductRow";

const CartClient = () => {

    const { cartProducts, handleClearCart } = useCart();

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={'/'} className="flex gap-1 mt-2 items-center text-slate-600">
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 mt-8 items-center">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>

            <div>
                {cartProducts && cartProducts.map((product) => {
                    return <ProductRow key={product.id} product={product} />;
                })}
            </div>

            <div className="flex border-t-[1.5px] py-4 justify-between gap-4">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => { handleClearCart() }} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>$1000</span>
                    </div>
                    <p className="text-slate-500">Taxes and Shipping are calculated at checkout</p>
                    <Button label="Checkout" onClick={() => { }} />
                    <Link href={'/'} className="flex gap-1 mt-2 items-center text-slate-600">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartClient