import AboutUs from "@/components/AboutUs";
import Header from "@/components/Header";

const AboutUsPage = () => {
  return (
    <div >
    <Header/>
      <div className="w-full h-[86px] bg-black"></div>
      <main>
        <AboutUs />
      </main>
    </div>
  );
};

export default AboutUsPage;