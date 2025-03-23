import { FaPersonShelter } from "react-icons/fa6";
import leftArrow from "../../assets/leftIcon.png";
import rightArrow from "../../assets/rightIcon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { useEffect } from "react";

const SlideCarousel = ({ Data }: any) => {
  useEffect(() => {
    SwiperCore.use([Navigation]); // Ensure Swiper re-initializes
  }, []);

  return (
    <>
      <Swiper
        // Install swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
        navigation={{
          nextEl: ".nextBtn",
          prevEl: ".prevBtn",
        }}
      >
        {Data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-[700px]  w-[95%] m-auto rounded-[30px] overflow-hidden ">
              <img
                src={item.photo}
                alt=""
                className="w-full absolute z-[-1] h-full"
              />
              <div className="overlay absolute bg-black opacity-[0.6] w-full h-full"></div>
              <div className="title-layer w-[800px] text-white m-auto text-center absolute inset-[100px_0px]">
                <div className="main-title flex items-end justify-center gap-[20px]">
                  <FaPersonShelter className="text-[40px] text-white" />
                  <p className="title uppercase text-orage font-bold font-chenla">
                    ស្វាគមន៍ការមកកាន់ ឃើញផ្ទះហើយ​!
                  </p>
                </div>
                <h1 className="m-title text-orage text-[50px] font-bold pb-[30px] font-moul pt-[30px]">
                  {item.title}
                </h1>
                <p className="description text-orage pb-[50px]">
                  {item.description}
                </p>
                <div className="layer-btn flex gap-[20px] justify-center">
                  <button type="button" className="btn btn-wide">
                    មើលអចលនទ្រព្យ
                  </button>
                  <button type="button" className="btn">
                    ទំនាក់ទំនងឥឡូវនេះ
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        id="prevBtn"
        type="button"
        className="prevBtn  h-[100px]  absolute w-[70px] inset-[400px_70px] z-[1]"
      >
        <img className="w-full" src={leftArrow} alt="" />
      </button>
      <button
        type="button"
        id="nextBtn"
        className="nextBtn absolute  w-[70px] h-[100px]  inset-[400px_1340px] z-[1]"
      >
        <img className="w-full" src={rightArrow} alt="" />
      </button>
    </>
  );
};

export default SlideCarousel;
