import FeatureCards from "../components/LandingPage/FeatureCards";
import FloatingShapes from "../components/LandingPage/FloatingShapes";
import Info from "../components/LandingPage/Info";
import Partners from "../components/LandingPage/Partners";
import VideoSection from "../components/LandingPage/VdoSection.Jsx";
import Pricing from "./PricingPage";

function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] mt-19.75 relative z-0">
      <FloatingShapes />
      <div className="flex flex-col h-1/2 items-center justify-center">
        <VideoSection/>
        <FeatureCards />
        <Info />
        <Pricing />
        <Partners />
      </div>
    </div>
  );
}

export default Home;
