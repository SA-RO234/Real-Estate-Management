import { FaPersonShelter } from "react-icons/fa6";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = ({ Value }: any) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {Value.map((item: any, index: any) => (
        <SwiperSlide key={index}>
          <div className="main-container relative w-[1450px]">
            <div className="overlay absolute bg-black opacity-[0.6] w-full h-full"></div>
            <img src={item.Photo} alt="" className="w-[100%]" />
            <div className="title-layer w-[800px] text-white m-auto text-center absolute inset-[100px_0px]">
              <div className="main-title flex items-end justify-center gap-[20px]">
                <FaPersonShelter className="text-[40px] text-white" />
                <p className="title uppercase text-orage font-bold font-chenla">
                  {" "}
                  ស្វាគមន៍ការមកកាន់ ឃើញផ្ទះហើយ​!
                </p>
              </div>
              <h1 className="m-title text-orage text-[50px] font-bold pb-[30px] font-moul pt-[30px]">
                {item.title}
              </h1>
              <p className="description text-orage pb-[50px]">{item.description}</p>
              <div className="layer-btn flex gap-[20px] justify-center">
                <button type="button" className="btn btn-wide">
                  មើលអចលនទ្រព្យ
                </button>
                <button type="button" className="btn">ទំនាក់ទំនងឥឡូវនេះ</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
