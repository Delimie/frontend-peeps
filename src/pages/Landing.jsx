import { PeepsAnimation } from "../components/Animation";
import FeatureCards from "../components/LandingPage/FeatureCards";
import FloatingShapes from "../components/LandingPage/FloatingShapes";
import Info from "../components/LandingPage/Info";
import Partners from "../components/LandingPage/Partners";
import VideoSection from "../components/LandingPage/VdoSection.Jsx";
import Pricing from "../components/Pricing";

function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] relative z-0">
      <FloatingShapes />
      <div className="flex flex-col h-1/2 items-center justify-center">
        <div className="mt-30 flex flex-col items-center gap-2">
          {/* <div className="px-6 py-2 bg-[#F2EBBF] rounded-4xl"> */}
            <PeepsAnimation/>
          {/* </div> */}
          <div className="bg-[#F2EBBF] px-3 py-2 rounded-4xl"><p className="text-2xl">Chat it out, no bill doubt!</p>
</div>
        </div>

        <Info />
        <FeatureCards />
        <div className="min-h-[800px] pt-30">
          <Pricing />
        </div>
        <Partners />
      </div>
    </div>
  );
}

export default Home;
