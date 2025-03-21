import PropertyTypes from "../components/Home/PropertyTypes";
import MainHero from "../components/MainHero";

const Home = () => {
  return (
    <div className="wrapper bg-white">
      <div className="app"></div>
      <MainHero />
      <PropertyTypes />
    </div>
  );
};

export default Home;
