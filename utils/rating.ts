export const calculateRating = (item: any) => {
    return item.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / item.reviews.length;
}