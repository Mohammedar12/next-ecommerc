import React from "react";
import "./style.css";
import HeaderSection from "@/components/HeaderSection/HeaderSection";
import ProdauctCard from "@/components/ProdauctCard/ProdauctCard";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useState } from "react";

function NewCollection({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  //   const [sliderRef, instanceRef] = useKeenSlider(
  //     {
  //       loop: true,

  //       breakpoints: {
  //         "(max-width: 750px)": {
  //           mode: "snap",
  //           loop: true,
  //           slides: {
  //             perView: 2,
  //             spacing: 30,
  //             origin: "center",
  //           },
  //         },
  //       },
  //       mode: "snap",
  //       slides: {
  //         origin: "center",
  //         number: 3,
  //         perView: 3,
  //         spacing: 50,
  //       },

  //       renderMode: "performance",
  //       defaultAnimation: { duration: 500, easing: (t) => t },
  //     },
  //     []
  //   );

  //   console.log(currentSlide);
  console.log(products.length);
  return (
    <>
      <HeaderSection>New Collection </HeaderSection>
      <div className="products_section">
        <div className="container flex items-center">
          <Splide
            options={{
              arrows: false,
              type: "loop",
              perPage: 3,
              focus: "center",
              autoplay: "play",
              speed: 1000,
              breakpoints: {
                640: {
                  width: "80%",
                  perPage: 2,
                },
              },
              gap: 20,
            }}
            onMove={(splide, index, prev) => console.log(splide)}
            aria-label="My Favorite Images"
          >
            {products.length !== 0 ? (
              products.slice(0, 5).map((product, index) => (
                <SplideSlide key={product._id}>
                  <ProdauctCard
                    product={product}
                    isActive={currentSlide === index}
                  />
                </SplideSlide>
              ))
            ) : (
              <>
                <SplideSlide>
                  <ProdauctCard />
                </SplideSlide>
                <SplideSlide>
                  <ProdauctCard />
                </SplideSlide>
                <SplideSlide>
                  <ProdauctCard />
                </SplideSlide>
              </>
            )}
          </Splide>
        </div>
      </div>
    </>
  );
}

export default NewCollection;
