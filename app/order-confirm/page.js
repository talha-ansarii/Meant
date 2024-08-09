import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderConfirm from "@/components/OrderConfirm";

export default function OrderConfirmPage() {
  return (
    <div className="">
  <div className="bg-black w-full h-[100px]">
      <Header />

  </div>

      <main className="lg:pt-[80px] pt-[80px] bg-white md:pt-[80px] pb-12 ">
        <OrderConfirm />
      </main>
      <Footer />
    </div>
  );
}
