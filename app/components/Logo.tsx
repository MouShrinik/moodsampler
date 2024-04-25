import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="fixed flex items-start justify-center h-20 w-20 p-5 rounded-full">
      <a href="#">
        <Image width={90} height={90} src={"/loading.svg"} alt="Loading..." />
      </a>
    </div>
  );
};

export default Logo;
