import Navbar from "./Home/Navbar";
import { useEffect, useState } from "react";
import SlideCarousel from "./Home/SlideCarousel";

interface Property {
  id: number;
  photo: string;
  title: string;
  description: string;
}
const MainHero = () => {
  const [slide, setSlide] = useState<Property[]>([]);
  useEffect(() => {
    fetch("/Slide.json")
      .then((responese) => responese.json())
      .then((data) => setSlide(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <section className="w-full ">
      <Navbar />
      <SlideCarousel Data={slide} />
    </section>
  );
};

export default MainHero;
