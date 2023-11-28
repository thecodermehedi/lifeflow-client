import {Controller} from "react-hook-form";

const SelectBloodGroup = ({control, defaultValue, required}) => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Controller
      name="bloodGroup"
      control={control}
      defaultValue={defaultValue}
      rules={{required: required && "Blood Group is required"}}
      render={({field}) => (
        <select
          value={field.value}
          onChange={field.onChange}
          className="w-full mt-2 px-3 py-2 text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:border-primary"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default SelectBloodGroup;
