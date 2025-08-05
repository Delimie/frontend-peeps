function FeatureCards() {

  return (
    <div className="w-full py-5 z-1">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="w-60 h-60 bg-[#8CBEB2] text-white hover:bg-[#F2EBBF] hover:text-[#5C4B51] hover:scale-120 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Connect</h3>
            <div className="text-l leading-relaxed">
              <p>with friends and</p>
              <p>stay organized</p>
              <p>in one place.</p>
            </div>
          </div>

          <div className="w-60 h-60 bg-[#F06060] text-white hover:bg-[#F2EBBF] hover:text-[#5C4B51] hover:scale-120 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Count</h3>
            <div className="text-l leading-relaxed">
              <p>every bill, </p>
              <p>split fairly,</p>
              <p>and stay on track.</p>
            </div>
          </div>

          <div className="w-60 h-60 bg-[#F3B562] text-white hover:bg-[#F2EBBF] hover:text-[#5C4B51] hover:scale-120 rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-3xl font-bold mb-2">Clear</h3>
            <div className="text-l leading-relaxed">
              <p>conversations</p>
              <p>with structured,</p>
              <p>trip-based</p>
              <p>chat rooms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeatureCards;
