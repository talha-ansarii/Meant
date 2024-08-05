'use client'
import { notFound, useParams } from "next/navigation";
import SingleProductPage from "../../../components/SingleProductPage";
import { use, useEffect, useState } from "react";








const ProductPage = () => {
  const { id } = useParams();
  

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/get-product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        console.log(data)
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    }
  
    fetchProduct();
  }, [id]);



  return (
    <main>
      <SingleProductPage product={product} productId={id} />
    </main>
  );
};

export default ProductPage;