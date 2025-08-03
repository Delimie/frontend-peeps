function Info() {
  return (
    <div className="relative flex flex-col justify-center z-[-20] h-full">
      <svg
        className="w-full h-auto"
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

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-full bg-[#F2EBBF] py-25">
        <h1 className="text-6xl">Let's Peeps</h1>
        <div className="flex px-30 items-center justify-center">
          {/* Left */}
          <div className="w-3/5 h-[100%] flex flex-col md:text-left">
            <h2 className="text-5xl">Your always-with-you money chat</h2>
            <p className="text-2xl leading-relaxed w-4/5 pt-5">
              Helping you manage group expenses easily and fairly with clear
              summaries, individual shares, and a full transfer history to keep
              everyone on the same page.
            </p>
            <div className="pt-5">
              <button className="bg-[#8CBEB2] py-3 px-4 text-2xl text-white cursor-pointer rounded-4xl">
                Try Now!
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="bg-[#F2EBBF] w-2/4">
            <img src="./Friends.png" alt="Friends" />
          </div>
        </div>
      </div>

      <svg
        className="w-full h-auto"
        viewBox="0 0 1910 126"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1910 49.1673C1870.96 22.6431 1824.88 1.62598 1752.03 1.62598C1553.07 1.62598 1553.07 71.5454 1354.11 71.5454C1155.15 71.5454 1155.15 0.0943297 956.194 0.0943297C757.235 0.0943297 757.235 126 558.277 126C359.319 126 359.319 4.5186 160.36 4.5186C85.4546 4.5186 39.7543 10.7861 0 18.5997V-1.19209e-07L1910 0.0943297V49.1673Z"
          fill="#F2EBBF"
        />
      </svg>
    </div>
  );
}
export default Info;
