function FeatureCards() {

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="w-70 h-70 bg-[#8CBEB2] text-white rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-4xl font-bold mb-2">Connect</h3>
            <div className="text-xl leading-relaxed">
              <p>with friends and</p>
              <p>stay organized</p>
              <p>in one place.</p>
            </div>
          </div>

          <div className="w-70 h-70 bg-[#F06060] text-white rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-4xl font-bold mb-2">Count</h3>
            <div className="text-xl leading-relaxed">
              <p>every bill, </p>
              <p>split fairly,</p>
              <p>and stay on track.</p>
            </div>
          </div>

          <div className="w-70 h-70 bg-[#F3B562] text-white rounded-full flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <h3 className="text-4xl font-bold mb-2">Clear</h3>
            <div className="text-xl leading-relaxed">
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
