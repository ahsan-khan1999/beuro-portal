import { FilterType } from "@/types";
import { SetStateAction, useState } from "react";

const typeList = [
    {
        item: "None",

    },
    {
        item: "Individual",

    },
    {
        item: "Company",

    }
]
export default function useFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
    const [moreFilter, setMoreFilter] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleItemSelected = (val: string) => {
        setFilter({ ...filter, ["type"]: val })
    }

    const handleFilterReset = (key: keyof FilterType, value: string) => {
        setFilter({ ...filter, [key]: value })
    }
    const handleFilterResetToInitial = () => {
        setFilter({
            text: "",
            sortBy: "",
            type: "None",
            location: "",
            status:""
        })
    }

    return {
        moreFilter,
        setMoreFilter,
        filter,
        setFilter,
        isOpen,
        setIsOpen,
        handleItemSelected,
        handleFilterReset,
        handleFilterResetToInitial,
        typeList

    }
}
