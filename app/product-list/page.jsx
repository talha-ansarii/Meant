import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import React from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}