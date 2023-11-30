import Banner from "../../components/Home/Banner";
import Contact from "../../components/Home/Contact";
import Featured from "../../components/Home/Featured";
import Stats from "../../components/Home/Stats";
import Team from "../../components/Home/Team";
import Testimonial from "../../components/Home/Testimonial";
const Home = () => {
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
