const Testimonial = () => {
  return (
    <section className="relative py-28 bg-primary/80">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-blue-100 font-semibold pb-6">
            What people are saying
          </h3>
          <figure>
            <blockquote>
              <p className="text-balck text-xl font-semibold sm:text-2xl">
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                et est hendrerit, porta nunc vitae, gravida justo. Nunc
                fermentum magna lorem, euismod volutpat arcu volutpat et.“
              </p>
            </blockquote>
            <div className="mt-6">
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-16 h-16 mx-auto rounded-full"
              />
              <div className="mt-3">
                <span className="block text-white font-semibold">
                  Martin escobar
                </span>
                <span className="block text-blue-100 text-sm mt-0.5">
                  Founder of meta
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
