
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PastOrders from "@/components/PastOrders";

const PastOrdersPage = () => {
  return (
    <div >

    <Header/>
      <main className="flex w-full m-auto lg:mt-[120px] md:mt-[120px] justify-center items-center">

       <PastOrders/>
      </main>
      <Footer/>
    </div>
  );
}



export default PastOrdersPage;

