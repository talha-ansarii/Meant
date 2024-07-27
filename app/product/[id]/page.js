import { notFound } from "next/navigation";
import SingleProductPage from "../../../components/SingleProductPage";
import products from "../../../constants/products";

// Generates static paths for product pages
export async function generateStaticParams() {
  const paths = products.map((product) => ({
    id: product.id.toString(),
  }));

  return paths;
}

// Fetches data for a specific product
export async function getProductData(id) {
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  return product || null;
}

const ProductPage = ({ params }) => {
  const { id } = params;
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return notFound();
  }

  return <SingleProductPage productId={parseInt(id, 10)} />;
};

export default ProductPage;
