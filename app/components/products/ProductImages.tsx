"use client";

import Image from "next/image";
import { CartProductType, ProductImageType as ProductImageType } from "../../product/[productId]/partials/ProductDetails";

type ProductImagesProps = {
    cartProduct: CartProductType
    product: any
    handleImageSelection: (value: ProductImageType) => void
}

const ProductImages: React.FC<ProductImagesProps> = ({
    cartProduct,
    product,
    handleImageSelection
}) => {
    return (
        <div className="grid grid-cols-6 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
                {product.images.map((image: ProductImageType) => {
                    return <div key={image.color} onClick={() => handleImageSelection(image)} className={`relative w-[80%] aspect-square rounded-lg border-black ${cartProduct.selectedImage.color === image.color ? "border-[2px]" : "border-none"}`}>
                        <Image
                            src={image.image}
                            alt={image.color}
                            fill
                            className="object-contain"

                        />
                    </div>
                })}
            </div>
            <div className="col-span-5 relative aspect-square">
                <Image
                    alt={cartProduct.selectedImage.color}
                    src={cartProduct.selectedImage.image}
                    fill
                    className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
                />
            </div>
        </div>
    )
}

export default ProductImages