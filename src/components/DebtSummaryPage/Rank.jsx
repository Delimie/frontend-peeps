function Rank() {
  const ranks = [
    { name: "Gao", gold: 4, silver: 3, bronze: 0 },
    { name: "Ploy", gold: 3, silver: 3, bronze: 0 },
    { name: "Dew", gold: 1, silver: 2, bronze: 1 },
  ];

  return (
    <div className="bg-white h-full w-7/15 min-w-[250px] rounded-4xl shadow-[5px_5px_5px_1px_rgba(0,_0,_0,_0.1)] overflow-y-auto">
      <h1 className="text-3xl pl-10 pt-8 text-[#5C4B51]">Rank</h1>

      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-sm  items-center gap-5 mb-4 px-2 mx-6">
        <div></div>
        <div></div>
        <img src="./Gold.svg" alt="Gold" />
        <img src="./Silver.svg" alt="Silver" />
        <img src="./Bronze.svg" alt="Bronze" />
      </div>

      {ranks.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-5 mb-4 px-2 mx-6"
        >
          <img src="./Trophy.svg" className="w-8" />
          <span className="itim text-[#5C4B51] font-medium text-2xl">
            {item.name}
          </span>
          <span
            className={`itim text-center font-bold text-2xl ${
              item.gold > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
            }`}
          >
            {item.gold}
          </span>

          <span
            className={`itim text-center font-bold text-2xl ${
              item.silver > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
            }`}
          >
            {item.silver}
          </span>

          <span
            className={`itim text-center font-bold text-2xl ${
              item.bronze > 0 ? "text-[#8CBEB2]" : "text-[#D9D9D9]"
            }`}
          >
            {item.bronze}
          </span>
        </div>
      ))}
    </div>
  );
}
export default Rank;
