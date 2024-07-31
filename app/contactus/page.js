
import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";

const ContactUsPage = () => {
  return (
    <div className="bg-white ">
      {/* <div className="w-full h-[86px] bg-[#F7879A]/[10%]"></div> */}

    <Header/>
      <div className="w-full h-[86px] bg-[#F7879A]/[10%]"></div>
      <main>

        <ContactUs />
      </main>
    </div>
  );
}



export default ContactUsPage;

