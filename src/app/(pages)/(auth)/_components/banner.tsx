import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="bg-primary w-full md:w-1/2 flex items-center justify-center p-8">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold">CC</h1>
        <p className="text-2xl mt-2 font-[family-name:var(--font-jost-regular)]">CleanCheck</p>
      </div>
    </div>
  );
};

export default Banner;
