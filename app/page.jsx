import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="pt-[100px] pb-4">
        <Banner />
        <main>
          <ProductList />
        </main>
        <Footer />
      </div>
    </div>
  );
}
