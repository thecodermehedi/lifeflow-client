import {useQuery} from "@tanstack/react-query";
import {getDistricts, getUpazilas} from "../api/utils";

const useGeoLocation = () => {
  const {data: districtsArray = []} = useQuery({
    queryKey: ["districts"],
    queryFn: getDistricts,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const {data: upazilasArray = []} = useQuery({
    queryKey: ["upazilas"],
    queryFn: getUpazilas,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {districtsArray, upazilasArray};
};

export default useGeoLocation;
