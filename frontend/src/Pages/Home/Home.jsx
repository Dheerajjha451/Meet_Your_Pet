import HeroSection from "../../assets/Components/HeroSection";
import Upload from "../../assets/Components/Upload";
import Footer from "../../assets/Components/Footer";
import Navbar from "../../assets/Components/Navbar";

function Home() {
    return (
        <div className="bg-customBg flex flex-col min-h-screen">
          <Navbar/>
          <div className="flex-grow">
            <HeroSection/>
            <Upload/>
          </div>
          <Footer/>
        </div>
    );
}

export default Home;
