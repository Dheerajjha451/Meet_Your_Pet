import Footer from "../../assets/Components/Footer";
import Navbar from "../../assets/Components/Navbar";
import AdoptionCentersPage from "../../assets/Components/AdoptionCenter";

function Home() {
    return (
        <div className="bg-customBg flex flex-col min-h-screen">
          <Navbar/>
          <div className="flex-grow my-20">
          <AdoptionCentersPage/>
          </div>
          <Footer/>
        </div>
    );
}

export default Home;
