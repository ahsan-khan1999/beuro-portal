import { CheckFieldProps } from "@/types/global";
import React from "react";

export default function CheckField({
  label,
  checkboxFilter,
  setCheckBoxFilter,
  type,
  checked,
  value,
  onChange,
}: CheckFieldProps) {
  const handleChange = (e: any) => {
    const isChecked = e.target.checked;
    const currentValues = checkboxFilter[type];

    const newValues = isChecked
      ? Array.isArray(currentValues)
        ? [...currentValues, value]
        : [value]
      : Array.isArray(currentValues)
      ? currentValues.filter((item) => item !== value)
      : [];

    setCheckBoxFilter({ ...checkboxFilter, [type]: newValues });
    if (onChange) {
      onChange(value, isChecked);
    }
  };

  return (
    <>
      <label
        htmlFor={label}
        className="custom-checkbox py-2 pl-[10px] pr-[22px] h-fit bg-white rounded-md relative cursor-pointer w-fit"
      >
        <input
          type="checkbox"
          name={label}
          id={label}
          className="hidden"
          checked={
            checkboxFilter[type] !== undefined &&
            checkboxFilter[type]?.includes(value)
          }
          onChange={handleChange}
        />

        <span className="checkbox-control"></span>
        <p className="text-[13px] font-medium text-[#393939] whitespace-nowrap">
          {label}
        </p>
        {checkboxFilter[type] !== undefined &&
        checkboxFilter[type]?.includes(value) ? (
          <svg
            className="absolute top-1 right-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
          >
            <path
              d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
              fill="#4A13E7"
            />
          </svg>
        ) : (
          <svg
            className="absolute top-1 right-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
          >
            <path
              d="M6.21875 8.69944L4.1875 6.66778L4.76153 6.09375L6.21875 7.55056L9.30016 4.46875L9.875 5.04359L6.21875 8.69944Z"
              fill="black"
            />
            <path
              d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM7.03125 11.375C6.06707 11.375 5.12454 11.0891 4.32285 10.5534C3.52116 10.0177 2.89632 9.25637 2.52734 8.36558C2.15836 7.47479 2.06182 6.49459 2.24992 5.54893C2.43803 4.60328 2.90233 3.73464 3.58411 3.05285C4.26589 2.37107 5.13453 1.90677 6.08019 1.71867C7.02585 1.53057 8.00604 1.62711 8.89683 1.99609C9.78762 2.36506 10.549 2.98991 11.0847 3.7916C11.6203 4.59328 11.9063 5.53582 11.9063 6.5C11.9063 7.79293 11.3926 9.03291 10.4784 9.94715C9.56416 10.8614 8.32418 11.375 7.03125 11.375Z"
              fill="black"
            />
          </svg>
        )}
      </label>
    </>
  );
}

// export default function CheckField({
//   label,
//   checkboxFilter,
//   setCheckBoxFilter,
//   type,
//   checked,
//   value,
//   onChange,
// }: CheckFieldProps) {
//   const handleChange = (e) => {
//     const isChecked = e.target.checked;
//     const currentValues = Array.isArray(checkboxFilter[type]) ? checkboxFilter[type] : [];
//     const newValues = isChecked
//       ? [...currentValues, value]
//       : currentValues.filter((item) => item !== value);

//     setCheckBoxFilter({ ...checkboxFilter, [type]: newValues });
//     if (onChange) {
//       onChange(value, isChecked);
//     }
//   };

//   const isChecked = Array.isArray(checkboxFilter[type]) && checkboxFilter[type].includes(value);

//   return (
//     <>
//       <label htmlFor={label} className="custom-checkbox py-2 pl-[10px] pr-[22px] h-fit bg-white rounded-md relative cursor-pointer w-fit">
//         <input
//           type="checkbox"
//           name={label}
//           id={label}
//           className="hidden"
//           checked={isChecked}
//           onChange={handleChange}
//         />
//         <span className="checkbox-control"></span>
//         <p className="text-[13px] font-medium text-[#393939] whitespace-nowrap">
//           {label}
//         </p>
//         {isChecked ? (
//           // SVG for checked state
//         ) : (
//           // SVG for unchecked state
//         )}
//       </label>
//     </>
//   );
// }
