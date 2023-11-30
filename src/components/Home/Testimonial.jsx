const Testimonial = () => {
  return (
    <section className="relative py-28 bg-red-500">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-white font-semibold pb-6">
            Donors&#39; Experiences
          </h3>
          <figure>
            <blockquote>
              <p className="text-white text-xl font-semibold sm:text-2xl">
                “Donating blood was a life-changing experience for me. It&#39;s a simple act, but it can make a huge difference in someone&#39;s life.“
              </p>
            </blockquote>
            <div className="mt-6">
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-16 h-16 mx-auto rounded-full"
              />
              <div className="mt-3">
                <span className="block text-white font-semibold">
                  John Doe
                </span>
                <span className="block text-white text-sm mt-0.5">
                  Regular Donor
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