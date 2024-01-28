import Image from "next/image";



import banner2 from "../../assets/banner_2.jpg";
export default function Banner2() {

 

  return (
    <div >
          <Image
            src={banner2}
            alt=""
            style={{
              height: "auto",
            }}
          />
    </div>
  );
}
