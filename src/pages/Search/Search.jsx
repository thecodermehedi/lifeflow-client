import {useQuery} from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import SelectBloodGroup from "../../components/Shared/SelectField/SelectBloodGroup";
import SelectDistrict from "../../components/Shared/SelectField/SelectDistrict";
import SelectUpazila from "../../components/Shared/SelectField/SelectUpazila";
import {useForm} from "react-hook-form";
import {getUsers} from "../../api/users";
import {useState} from "react";
import {useEffect} from "react";
import Spinner from "../../components/Spinner";
const Search = () => {
  const {register, handleSubmit, reset, control} = useForm();

  const {data: donors = [], isLoading: isDonorsLoading} = useQuery({
    queryKey: ["donors"],
    queryFn: async () => await getUsers("donor"),
  });

  const [tableDonors, setTableDonors] = useState([]);
  useEffect(() => {
    if (donors?.length > 0) {
      setTableDonors(donors);
    }
  }, [donors]);

  const handleSearch = (data) => {
    const filteredDonors = tableDonors?.filter((donor) => {
      return (
        (data.email === "" || donor.email.includes(data.email)) &&
        (data.bloodGroup === "" ||
          donor.bloodGroup.includes(data.bloodGroup)) &&
        (data.district === "" || donor.district.includes(data.district)) &&
        (data.upazila === "" || donor.upazila.includes(data.upazila))
      );
    });

    if (filteredDonors?.length > 0) {
      setTableDonors(filteredDonors);
    } else {
      reset();
      setTableDonors(donors);
    }
  };

  const handleReset = () => {
    reset();
    setTableDonors(donors);
  };

  return (
    <section>
      <SectionTitle
        title="Search Blood Donor"
        subtitle="Find a life-saving blood donor match in your vicinity"
      />
      <Container>
        <div className="w-full border rounded-lg p-5 md:p-8">
          <form onSubmit={handleSubmit(handleSearch)} className="mx-auto mt-12">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter donor email address"
                {...register("email")}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-lg outline-none bg-base focus:bg-white focus:border-primary/70"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              <SelectBloodGroup control={control} />
              <SelectDistrict control={control} />
              <SelectUpazila control={control} />
            </div>
            <div className="w-full flex justify-center donors-center gap-4 mt-12">
              <button
                type="button"
                onClick={handleReset}
                className="btn-reverse px-8 py-3"
              >
                <span>Reset</span>
              </button>
              <button type="submit" className="btn px-8 py-3">
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </Container>

      {isDonorsLoading ? (
        <Spinner />
      ) : (
        <Container>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto my-5 md:my-8 lg:my-10 w-full">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-red-50 text-primary font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Donor</th>
                  <th className="py-3 px-6">Blood Group</th>
                  <th className="py-3 px-6">District</th>
                  <th className="py-3 px-6">Upazila</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {tableDonors?.map((donor, idx) => (
                  <tr key={idx}>
                    <td className="flex donors-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      <img
                        src={donor?.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {donor?.name}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {donor?.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor?.bloodGroup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor?.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {donor?.upazila}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      )}
    </section>
  );
};

export default Search;
