import { ArrowIcon } from "@/assets/svgs/components/arrow-icon";
import { MultiSelectBoxProps, SelectBoxProps } from "@/types";
import { getLabelByValue } from "@/utils/auth.util";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import { useMemo, useRef, useState, useEffect } from 'react';

export const MultiSelectBox = ({
    id,
    options,
    value: defaultValues,
    field,
    trigger,
    svg,
    success,
    placeholder,
    className,
    onItemChange,
    disabled,
}: MultiSelectBoxProps) => {
    
    const [option, setOption] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultValues || []);

    useEffect(() => {
        if (defaultValues) {
            setOption(options.filter((item) => !defaultValues.includes(item.value)));
        }
    }, [defaultValues, options]);

    useMemo(() => {
        if (options.length > 0) {
            setOption(options);
        }
    }, [options?.length]);

    const search = useRef<string>("");

    const toggleDropDown = () => {
        setIsOpen((prevState) => !prevState);
    };

    const selectBoxRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
    const selectedOptionHandler = (value: string) => {
        const isSelected = selectedOptions.includes(value);
        const updatedOptions = isSelected
            ? selectedOptions.filter((option) => option !== value)
            : [...selectedOptions, value];

        setSelectedOptions(updatedOptions);
        field?.onChange(updatedOptions);
        trigger?.(field?.name);
        onItemChange && onItemChange(updatedOptions);

        // Remove the selected option from the available options
        setOption(options.filter((item) => !updatedOptions.includes(item.value)));
    };

    const handleChange = (value: string) => {
        search.current = value;
        setOption(
            options.filter((item) =>
                item.value?.toLowerCase()?.includes(value?.toLowerCase())
            )
        );
    };

    const defaultClasses = `placeholder:text-dark  py-[10px] flex items-center justify-between  text-left text-dark bg-white  rounded-lg border border-lightGray focus:border-primary outline-none w-full ${success ? "pl-4 pr-10" : "pl-11 pr-4"
        }`;
    const classes = combineClasses(defaultClasses, className);

    return (
        <div id={id} ref={selectBoxRef} className="relative focus:border-primary">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={classes}
            >
                <div className="flex flex-wrap">
                    {selectedOptions.map((selectedValue) => (
                        <span key={selectedValue} className="m-1 p-2 bg-gray-200 rounded">
                            {getLabelByValue(selectedValue, options)}
                            <span
                                className="cursor-pointer ml-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    selectedOptionHandler(selectedValue);
                                }}
                            >
                                &#10005;
                            </span>
                        </span>
                    ))}
                </div>
                {!disabled && <ArrowIcon isOpen={isOpen} />}
                {svg && (
                    <span
                        className={`mr-3 absolute  left-4 ${(isOpen && "tests") || "test"}`}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                )}
            </div>
            {!disabled && isOpen && (
                <ul className="absolute top-[52px] w-full bg-white border-2 border-lightGray border-t-0 rounded-br-lg rounded-bl-lg rounded-lg z-10">
                    <div className="flex border-y-2 border-lightGray rounded-lg  w-full">
                        <input
                            value={search.current}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Search..."
                            className="w-full outline-none rounded-lg p-2"
                        />
                    </div>
                    {option.map(({ value, label }) => (
                        <li
                            key={value}
                            onClick={() => selectedOptionHandler(value)}
                            className={`p-2 hover:bg-extra-light-gray cursor-pointer ${selectedOptions.includes(value) ? "bg-gray-200" : ""
                                }`}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};