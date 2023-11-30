import {useQuery} from "@tanstack/react-query";
import Container from "../../components/Shared/Container";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import SelectBloodGroup from "../../components/Shared/SelectField/SelectBloodGroup";
import SelectDistrict from "../../components/Shared/SelectField/SelectDistrict";
import SelectUpazila from "../../components/Shared/SelectField/SelectUpazila";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useEffect} from "react";
import Spinner from "../../components/Spinner";
import {getDonors} from "../../api/users";
import {usePDF} from "react-to-pdf";
const Search = () => {
  const {handleSubmit, reset, control} = useForm();
  const {toPDF, targetRef} = usePDF({filename: "page.pdf"});
  const {data: donors, isLoading: isDonorsLoading} = useQuery({
    queryKey: ["donors"],
    queryFn: async () => await getDonors(),
  });

  const [tableDonors, setTableDonors] = useState();

  useEffect(() => {
    if (!isDonorsLoading && donors?.length > 0) {
      setTableDonors(donors);
    }
  }, [isDonorsLoading, donors]);

  const handleSearch = (data) => {
    const filteredDonors = donors?.filter((donor) => {
      return (
        (data?.bloodGroup === "" ||
          donor?.bloodGroup
            .toLowerCase()
            .includes(data?.bloodGroup?.toLowerCase())) &&
        (data?.district === "" ||
          donor?.district
            .toLowerCase()
            .includes(data?.district?.toLowerCase())) &&
        (data?.upazila === "" ||
          donor?.upazila.toLowerCase().includes(data?.upazila?.toLowerCase()))
      );
    });

    setTableDonors(filteredDonors);
  };
  const handleReset = () => {
    reset();
    setTableDonors(donors);
  };

  if (isDonorsLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <SectionTitle
        title="Search Blood Donor"
        subtitle="Find a life-saving blood donor match in your vicinity"
      />
      <Container>
        <div className="w-full border rounded-lg p-5 md:p-8">
          <form onSubmit={handleSubmit(handleSearch)} className="mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              <SelectBloodGroup control={control} defaultValue={""} />
              <SelectDistrict control={control} defaultValue={""} />
              <SelectUpazila control={control} defaultValue={""} />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center donors-center gap-4 mt-12">
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

              <button
                onClick={() => toPDF()}
                className="bg-blue-600 hover:bg-blue-800 text-white
                 py-2 px-4 rounded-lg sm:px-6 md:px-8"
              >
                Download Result
              </button>
            </div>
          </form>
        </div>
      </Container>

      {tableDonors?.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-lg font-semibold">No donors found</h2>
        </div>
      ) : (
        <Container>
          <div
            className="mt-12 shadow-sm border rounded-lg overflow-x-auto my-5 md:my-8 lg:my-10 w-full"
            ref={targetRef}
          >
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
