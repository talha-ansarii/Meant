import ContactUs from "@/components/ContactUs";
import Header from "@/components/Header";

const ContactUsPage = () => {
  return (
    <div>
    <Header/>
      <div className="w-full h-[86px] bg-black"></div>
      <main>
        <ContactUs />
      </main>
    </div>
  );
};

export default ContactUsPage;