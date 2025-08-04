function Partners() {
  return (
    <div className="w-full flex justify-center">
      <div className="border border-amber-950 w-1/2 flex justify-center items-center">
        <div className="flex flex-col">
          <div className="border border-amber-950 rounded-4xl">test</div>
          <div className="border border-amber-950 rounded-4xl">test</div>
        </div>
        <div className="flex flex-col">
          <div className="border border-amber-950 rounded-4xl">test</div>
          <div className="border border-amber-950 rounded-4xl">test</div>
        </div>
        <div>
          <div className="border border-amber-950 rounded-4xl">test</div>
        </div>
      </div>
      <div className="border border-amber-950 w-1/2">
        <div className="w-3/5 h-[100%] flex flex-col md:text-left">
          <h1>Thank You to All Our Partners</h1>
          <p>
            We sincerely thank all our customers and partners for your trust and
            continued support. Your contribution has been a driving force behind
            our growth and our commitment to continually improving our services.
          </p>
          <p>
            If you're looking for an opportunity to grow alongside a dedicated
            and passionate team, we invite you to become a part of our partner
            network. Get in touch with us today!
          </p>
          <div className="pt-5">
              <button className="bg-[#8CBEB2] py-3 px-4 text-2xl text-white cursor-pointer rounded-4xl">
                Partner with Us
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Partners;
