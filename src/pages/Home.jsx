import { LandingGallery } from "../components/Animation";

function Home() {
  return (
    <>
      <p className="flex justify-center items-center text-5xl font-bold mt-18 pt-15">
        TEST PAGE
      </p>
      <div className="flex justify-center items-center pb-18">
        <LandingGallery />
      </div>
    </>
  );
}

export default Home;
