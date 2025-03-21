import { useEffect, useState } from "react";
import Carousel from "./Carousel";

const SlideCarousel = () => {
    const [slide, setSlide] = useState([]);

    useEffect(() => {
      fetch("/Slide.json")
        .then((responese) => responese.json())
        .then((data) => setSlide(data))
        .catch((error) => console.error("Error:", error));
    }, []);
      
  return (
    <div className="w-[95%] rounded-[25px] overflow-hidden m-auto">
      <Carousel Value={slide} />
    </div>
  );
};

export default SlideCarousel;
