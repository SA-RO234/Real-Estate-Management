import ContactExpert from "../components/Home/ContactExpert";
import Footer from "../components/Home/footer/Footer";
import PropertyList from "../components/Home/ListProperty/PropertyList";
import PropertybyCityContainer from "../components/Home/PropertyByCity/PropertybyCityContainer";
import PropertyTypes from "../components/Home/propertyType/PropertyTypes";
import WhyChoose from "../components/Home/WhyChoose/WhyChoose";
import MainHero from "../components/MainHero";

const Home = () => {
  return (
    <>
      <MainHero />
      <PropertyTypes />
      <PropertyList />
      <WhyChoose />
      <ContactExpert />
      <PropertybyCityContainer />
      <Footer />
    </>
  );
};

export default Home;
