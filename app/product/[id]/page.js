'use client'
import { notFound, useParams } from "next/navigation";
import SingleProductPage from "../../../components/SingleProductPage";
import { use, useEffect, useState } from "react";








const ProductPage = () => {
  const { id } = useParams();
  


  return (
    <main>
      <SingleProductPage productId={id} />
    </main>
  );
};

export default ProductPage;