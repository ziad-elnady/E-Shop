'use client'

import { CartProductType } from "../product/[productId]/partials/ProductDetails"
import { formatPrice } from "../../utils/format-price"
import Link from "next/link"
import { truncateText } from "../../utils/truncate-text"
import Image from "next/image"
import ProductQuantity from "../components/products/ProductQuantity"
import { useCart } from "../hooks/useCart"

type ProductRowProps = {
    product: CartProductType
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {

    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 gap-2 flex justify-self-start">
                <Link href={`/product/${product.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={product.selectedImage.image} alt={product.name} fill className="object-contain" />
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${product.id}`}>
                        {truncateText(product.name)}
                    </Link>
                    <div>{product.selectedImage.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={() => { handleRemoveProductFromCart(product) }}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{formatPrice(product.price)}</div>
            <div className="justify-self-center">
                <ProductQuantity cartCounter cartProduct={product} handleQtnIncrease={() => { handleCartQtyIncrease(product) }} handleQtnDecrease={() => { handleCartQtyDecrease(product) }} />
            </div>
            <div className="justify-self-end">{formatPrice(product.price * product.quantity)}</div>
        </div>
    )
}

export default ProductRow