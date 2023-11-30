import {Link} from "react-router-dom";
import bannerPhoto from "../../assets/banner.png";
import Container from "../Shared/Container";
const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bannerPhoto})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Container className="relative py-32 lg:flex lg:h-screen ">
        <div className="max-w-5xl mx-auto text-white text-center flex flex-col items-center justify-center">
          <h1
            className="text-3xl  font-extrabold sm:text-5xl"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Join the LifeFlow Community
            <strong
              className="block font-extrabold "
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              and Save Lives Today!
            </strong>
          </h1>
          <p
            className="mt-4 max-w-lg sm:text-xl/relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            Seamlessly connecting donors with those in need. Together, we make a
            life-saving impact.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 text-center"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            <Link
              to={"/register"}
              className="btn block w-full  px-12 py-3 text-base font-bold shadow sm:w-auto"
            >
              <span>Join as a donor</span>
            </Link>

            <Link
              to={"/search"}
              className="btn-reverse block w-full  px-12 py-3 text-base font-bold shadow sm:w-auto"
            >
              <span> Search Donors</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
