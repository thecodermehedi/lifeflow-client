import {Controller} from "react-hook-form";
import useGeoLocation from "../../../hooks/useGeoLocation";

const SelectDistrict = ({control, defaultValue, required}) => {
  const {districtsArray} = useGeoLocation();

  return (
    <Controller
      name="district"
      control={control}
      defaultValue={defaultValue}
      rules={{required: required && "District is required"}}
      render={({field}) => (
        <select
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          className="w-full mt-2 px-3 py-2 text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:border-primary"
        >
          <option value="">Select district</option>
          {districtsArray.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default SelectDistrict;
