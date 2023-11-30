const Stats = () => {
  const stats = [
    {
      data: "10K",
      title: "Donors",
    },
    {
      data: "5K",
      title: "Lives Saved",
    },
    {
      data: "50+",
      title: "Blood Drives",
    },
    {
      data: "20+",
      title: "Participating Hospitals",
    },
  ];

  return (
    <section className="py-14 bg-red-500 text-white">
      <div className="max-w-screen-xl mx-auto px-4  md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-semibold sm:text-4xl">
            Making a Difference, One Donation at a Time
          </h3>
          <p className="mt-3">
            Our dedicated donors and partners are helping us save lives every day.
          </p>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
            {stats.map((item, idx) => (
              <li key={idx} className="text-center px-12 md:px-16">
                <h4 className="text-4xl text-white font-semibold">
                  {item.data}
                </h4>
                <p className="mt-3 font-medium text-white">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;