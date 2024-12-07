import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

const ProductsSlider = ({ products = [] }) => {
  return (
    <section className="w-screen max-w-full box-border py-8 bg-white border-b border-gray-200 relative z-50">
      <Swiper
        spaceBetween={10}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        onSwiper={(swiper) => {
          window.swiperInstance = swiper;
        }}
        modules={[Navigation]}
        className="mySwiper"
        style={{ width: "100%" }}
      >
        {products?.map((product, index) => {
          const { likedProduct } = product;
          return (
            <SwiperSlide key={`${likedProduct.id}_${index}`} className="w-full">
              <ProductCard {...likedProduct} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ProductsSlider;
