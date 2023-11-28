import * as Select from "@radix-ui/react-select";
import React from "react";
import {Controller} from "react-hook-form";

const SelectBloodGroup = ({control, defaultValue}) => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Controller
      name="bloodGroup"
      control={control}
      defaultValue={defaultValue}
      // rules={{required: true}}
      render={({field}) => (
        <Select.Root value={field.value} onValueChange={field.onChange}>
          <div className="w-full mt-2">
            <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2  text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:border-primary">
              <Select.Value placeholder="Select Blood Group" />
              <Select.Icon className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                avoidCollisions={false}
                className="w-[var(--radix-select-trigger-width)] mt-3 overflow-auto bg-white border rounded-lg shadow-sm "
              >
                <Select.Viewport className="">
                  {bloodGroups.map((item, idx) => (
                    <SelectItem key={idx} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </div>
        </Select.Root>
      )}
    />
  );
};

const SelectItem = React.forwardRef(({children, ...props}, forwardedRef) => {
  return (
    <Select.Item
      className="flex items-center justify-between px-3 cursor-default py-2 duration-150 text-gray-600 data-[state=checked]:text-primary data-[state=checked]:bg-primary/20 data-[highlighted]:text-primary data-[highlighted]:bg-primary/20 data-[highlighted]:hover:text-primary data-[highlighted]:hover:bg-primary/20 outline-none"
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>
        <div className="pr-4 line-clamp-1">{children}</div>
      </Select.ItemText>
      <div className="w-6">
        <Select.ItemIndicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>{" "}
        </Select.ItemIndicator>
      </div>
    </Select.Item>
  );
});
SelectItem.displayName = "SelectItem";

export default SelectBloodGroup;
