import Image from "next/image";
import "./Banners.css";

import banner1 from "../../assets/banner_1.jpg";
export default function Banner() {
  return (
    <section className="bg-[#ffffff] my-0 mx-2">
      <div
        className="container px-7 py-3
        flex items-center flex-col text-center
        md:flex-row justify-between"
      >
        <div className="px-3 mt-[50px] md:text-start  ">
          <h1 className="text-4xl font-bold">
            All Your Style <br />{" "}
            <span className="text-[#FE9D66]">Are Here</span>
          </h1>
          <p className="desc mt-[50px] text-gray-400 ">
            This E-commerce website is a platform where you can order T-shirts
            Onlin .
          </p>
          <button className="bg-[#FE9D66] mt-[50px] mb-[40px] rounded-md text-white shadow-sm py-2 px-5">
            Eplore Now
          </button>
        </div>
        <div className="flex items-center gap-[30px] sm:w-1/2">
          <div className="image">
            <Image
              src={banner1}
              alt=""
              className=" max-w-full "
              style={{
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
