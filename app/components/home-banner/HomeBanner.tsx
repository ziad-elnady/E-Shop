import Image from "next/image"

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-gray-400 to-black rounded-lg m-4">
            <div className="mx:auto px-8 py-20 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Summer Sale!</h1>
                    <p className="text-lg md:text-xl mb-2">Enjoy discounts on selected items</p>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold">GET 50% OFF</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image
                        src="/banner-image.png"
                        fill
                        alt="Banner Image"
                        className="object-contain text-white"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner