import {useQuery} from "@tanstack/react-query";
import {getDistricts, getUpazilas} from "../api/utils";

const useGeoLocation = () => {
  const {data: districtsArray = []} = useQuery({
    queryKey: ["districts"],
    queryFn: getDistricts,
  });
  const {data: upazilasArray = []} = useQuery({
    queryKey: ["upazilas"],
    queryFn: getUpazilas,
  });

  return {districtsArray, upazilasArray};
};

export default useGeoLocation;
