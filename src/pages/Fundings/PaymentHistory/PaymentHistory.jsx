import {useQuery} from "@tanstack/react-query";
import Container from "../../../components/Shared/Container";
import Spinner from "../../../components/Spinner";
import axiosSecure from "../../../api";
const PaymentHistory = () => {
  const {data: payments = [], isLoading: isPaymentsLoading} = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const {data} = await axiosSecure("/fundings");
      return data.fundings;
    },
  });

  if (isPaymentsLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <Container>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto my-5 md:my-8 lg:my-10 w-full">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-red-50 text-primary font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {payments?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default PaymentHistory;
