"use client";

import { Rating } from "@mui/material";
import { calculateRating } from "../../../../utils/rating";
import { useCallback, useEffect, useState } from "react";
import ColorPicker from "../../../components/products/ColorPicker";
import ProductQuantity from "../../../components/products/ProductQuantity";
import Button from "../../../components/button/Button";
import ProductImages from "../../../components/products/ProductImages";
import { useCart } from "../../../hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";


type ProductDetailsProps = {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImage: ProductImageType,
    quantity: number,
    price: number
}

export type ProductImageType = {
    color: string,
    colorCode: string,
    image: string
}

const LineBreak = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

    const { cartProducts, handleAddProductToCart } = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false);

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImage: { ...product.images[0] },
        quantity: 1,
        price: product.price
    });

    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false);

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const handleColorSelection = useCallback(
        (value: ProductImageType) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImage: value }
            });
        },
        [cartProduct.selectedImage]
    )

    const handleQtnDecrease = useCallback(() => {
        if (cartProduct.quantity <= 1) { return }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, [cartProduct.quantity]);

    const handleQtnIncrease = useCallback(() => {
        if (cartProduct.quantity >= 99) { return }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct.quantity]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImages
                product={product}
                cartProduct={cartProduct}
                handleImageSelection={handleColorSelection}
            />
            <div className="flext flex-col gap-1 text-gray-500 text-sm">
                <h2 className="text-3xl font-semibold text-black">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={calculateRating(product)} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <LineBreak />
                <div className="text-justify">{product.description}</div>
                <LineBreak />
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-green-600" : "text-rose-400"}>
                    {product.inStock ? "In stock" : "Out of stock"}
                </div>
                <LineBreak />
                {isProductInCart ?
                    (
                        <>
                            <p className="mb-2 text-gray-400 flex items-center gap-1">
                                <MdCheckCircle size={20} className="text-green-500" />
                                <span>Product added to cart</span>
                            </p>
                            <div className="max-w-[300px]">
                                <Button label="View Cart" outline onClick={() => {
                                    router.push('/cart');
                                }} />
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <ColorPicker
                                images={product.images}
                                cartProduct={cartProduct}
                                handleColorSelection={handleColorSelection}
                            />
                            <LineBreak />
                            <ProductQuantity
                                cartCounter={false}
                                cartProduct={cartProduct}
                                handleQtnDecrease={handleQtnDecrease}
                                handleQtnIncrease={handleQtnIncrease}
                            />
                            <LineBreak />
                            <div className="max-w-[300px]">
                                <Button
                                    label="Add To Cart"
                                    onClick={() => handleAddProductToCart(cartProduct)}
                                />
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}

export default ProductDetails