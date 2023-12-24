"use client";

import Image from "next/image";

import { formatPrice } from "../../../utils/format-price";
import { truncateText } from "../../../utils/truncate-text";
import { Rating } from '@mui/material';
import { useRouter } from "next/navigation";
import { calculateRating } from "../../../utils/rating";

type ProductCardProps = {
    data: any
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {

    const router = useRouter();

    return (
        <div
            onClick={() => { router.push(`/product/${data.id}`) }}
            className="col-span-1 cursor-pointer border-[1.5px] border-gray-300 rounded-2xl px-6 py-4 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className="aspect-square overflow-hidden relative w-full">
                    <Image
                        fill
                        src={data.images[0].image}
                        className="w-full h-full object-contain"
                        alt="Product image"
                    />
                </div>
                <div className="mt-4">
                    {truncateText(data.name)}
                </div>
                <div>
                    <Rating value={calculateRating(data)} readOnly />
                </div>
                <div className="text-gray-500 font-thin">{data.reviews.length} reviews</div>
                <div className="font-semibold">{formatPrice(data.price)}</div>
            </div>
        </div>
    )
}

export default ProductCard