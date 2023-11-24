import Banner from "../../components/UI/Banner";
import Contact from "../../components/UI/Contact";
import Stats from "../../components/UI/Stats";
import Team from "../../components/UI/Team";
import Testimonial from "../../components/UI/Testimonial";
const Home = () => {
  return (
    <section>
      <Banner />
      <Testimonial />
      <Team />
      <Stats />
      <Contact />
    </section>
  );
};

export default Home;
