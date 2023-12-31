import { products } from "../utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/home-banner/HomeBanner";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 m-8 gap-6">
          {products.map((product: any) => {
            return <ProductCard data={product} />
          })}
        </div>
      </Container>
    </div>
  )
}
