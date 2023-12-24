"use client";

import { CartProductType, ProductImageType } from "../../product/[productId]/partials/ProductDetails";

type ColorPickerProps = {
    images: ProductImageType[],
    cartProduct: CartProductType,
    handleColorSelection: (image: ProductImageType) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ images, cartProduct, handleColorSelection }) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span className="font-semibold">COLOR:</span>
                <div className="flex gap-1">
                    {
                        images.map((image) => {
                            return (
                                <div
                                    key={image.color}
                                    onClick={() => handleColorSelection(image)}
                                    className={`h-7 w-7 rounded-full border-green-600 flex items-center justify-center ${cartProduct.selectedImage.color === image.color ? "border-[1.5px]" : "border-none"}`}>
                                    <div
                                        style={{ background: image.colorCode }}
                                        className="w-5 h-5 rounded-full border-[1.2px] cursor-pointer"></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ColorPicker