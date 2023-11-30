import Container from "../Shared/Container";

const Featured = () => {
  return (
    <section className="my-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          <div className="overflow-hidden rounded-lg border text-center border-gray-100 bg-white shadow-sm">
            <img
              alt="Office"
              src="http://innovativeartisan.com/demo/html/blad-ai/assets/images/r1.jpg"
              className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
              <h3 className="text-lg md:text-xl font-bold text-primary">
                Become a Donar
              </h3>

              <p className="mt-2 text-sm/relaxed text-gray-700">
                Becoming a donor is a noble decision that can save lives. By
                donating blood, you are providing a vital resource that can be
                used in emergencies or for people who need long-term treatments.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border text-center border-gray-100 bg-white shadow-sm">
            <img
              alt="Office"
              src="http://innovativeartisan.com/demo/html/blad-ai/assets/images/r2.jpg"
              className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
            <h3 className="text-lg md:text-xl font-bold text-primary">
                Why Give Blood?
              </h3>

              <p className="mt-2 text-sm/relaxed text-gray-700">
                Giving blood is a simple act, but it can have a profound impact.
                It&#39;s a way to directly help others, and it&#39;s a vital part of
                healthcare that ensures hospitals have the supplies they need to
                treat patients.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border text-center border-gray-100 bg-white shadow-sm">
            <img
              alt="Office"
              src="http://innovativeartisan.com/demo/html/blad-ai/assets/images/r3.jpg"
              className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
            <h3 className="text-lg md:text-xl font-bold text-primary">
                How Donations Helps
              </h3>

              <p className="mt-2 text-sm/relaxed text-gray-700">
                Blood donations are used in a variety of ways. They can help
                patients undergoing treatments for cancer, people who have
                suffered trauma, and those undergoing surgery. Your donation can
                make a real difference.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Featured;
