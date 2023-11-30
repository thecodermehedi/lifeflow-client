import { useEffect } from "react";
import Banner from "../../components/Home/Banner";
import Contact from "../../components/Home/Contact";
import Featured from "../../components/Home/Featured";
import Stats from "../../components/Home/Stats";
import Team from "../../components/Home/Team";
import Testimonial from "../../components/Home/Testimonial";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <section>
      <Banner />
      <Featured />
      <Testimonial />
      <Team />
      <Stats />
      <Contact />
    </section>
  );
};

export default Home;
