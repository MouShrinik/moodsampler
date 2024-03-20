import Image from "next/image";

const Footer = () => {
  return (
    <div className="relative bg-slate-800 text-white shadow-md overflow-x-hidden h-25">
      <div className="container flex flex-col items-center justify-between p-6 mx-0 sm:space-y-0 sm:flex-row">
        <a href="#">
          <Image
            height={50}
            width={50}
            className="w-auto h-8"
            src={"/loading.svg"}
            alt=""
          />
        </a>

        <p className="text-sm text-gray-200">© MoodSampler 2024. Mood</p>
      </div>
    </div>
  );
};

export default Footer;
