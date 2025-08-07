function Partners() {
  return (
    <div className="min-h-screen relative z-0 w-full">
      <svg
        className="w-auto h-auto "
        viewBox="0 0 1910 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 76.8327C39.0356 103.357 85.1203 124.374 157.973 124.374C356.931 124.374 356.931 54.4547 555.89 54.4547C754.848 54.4547 754.848 125.906 953.806 125.906C1152.77 125.906 1152.77 0 1351.72 0C1550.68 0 1550.68 121.481 1749.64 121.481C1824.55 121.481 1870.25 115.214 1910 107.4V126L0 125.906V76.8327Z"
          fill="#F2EBBF"
        />
      </svg>

      <div className="flex justify-center gap-10 bg-[#F2EBBF] -my-0.5 py-5">
        <div className="w-1/2 flex justify-end">
          <img src="./Friends.png" alt="Friends" className="w-3/5" />
        </div>
        <div className="w-1/2">
          <div className="w-3/5 h-[100%] flex flex-col justify-center gap-4">
            <h2 className="text-3xl font-bold">
              Thank You to All Our Partners
            </h2>
            <p className="text-l">
              We sincerely thank all our customers and partners for your trust
              and continued support. Your contribution has been a driving force
              behind our growth and our commitment to continually improving our
              services.
            </p>
            <p className="text-l">
              If you're looking for an opportunity to grow alongside a dedicated
              and passionate team, we invite you to become a part of our partner
              network. Get in touch with us today!
            </p>
            <div>
              <button className="bg-[#8CBEB2] py-3 px-4 text-2xl text-white cursor-pointer rounded-4xl">
                Partner with Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <svg
        width="auto"
        height="auto"
        viewBox="0 0 1910 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1910 49.1673C1870.96 22.6431 1824.88 1.62598 1752.03 1.62598C1553.07 1.62598 1553.07 71.5454 1354.11 71.5454C1155.15 71.5454 1155.15 0.0943298 956.194 0.0943298C757.235 0.0943298 757.235 126 558.277 126C359.319 126 359.319 4.5186 160.36 4.5186C85.4546 4.5186 39.7543 10.7861 0 18.5997V0L1910 0.0943298V49.1673Z"
          fill="#F2EBBF"
        />
      </svg>
    </div>
  );
}
export default Partners;
