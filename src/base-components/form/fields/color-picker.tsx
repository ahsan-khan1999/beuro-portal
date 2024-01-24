import { ColorPickerProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import React, { useState } from "react";

export const ColorPicker = ({
  id,
  name,
  register,
  className,
  disabled,
  placeholder,
  setValue,
  value,
}: ColorPickerProps) => {
  const [color, setColor] = useState(value || "ffffff");
  const defaultClasses = `border border-borderColor rounded-lg w-full h-12 pl-11 pr-16 py-[10px] outline-none text-dark text-sm focus:border-primary`;
  const classes = combineClasses(defaultClasses, className);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const colorHexOnly = newColor.substring(1);
    setColor(colorHexOnly);
    if (setValue) {
      setValue(name, colorHexOnly, { shouldValidate: true });
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        className={classes}
        {...register}
        type="text"
        value={color}
        placeholder={placeholder}
        disabled={disabled}
        style={{ paddingRight: '3rem', /*color: `${color}`*/ }}
      />
      <div
        style={{ 
          backgroundColor: `#${color}`, 
          position: 'absolute', 
          top: '50%', 
          right: '1rem', 
          transform: 'translateY(-50%)', 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%',
          outlineColor: 'invert',
          outlineStyle: 'solid',
          outlineWidth: '1px',
        }}
      />
      <input
        type="color"
        className="opacity-0 absolute top-1/2 right-4 transform -translate-y-1/2 w-8 h-8"
        value={`#${color}`}
        onChange={handleColorChange}
        disabled={disabled}
      />
    </div>
  );
};
