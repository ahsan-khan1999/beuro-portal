import { FilterType } from "@/types";
import { useState } from "react";

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
export default function useFilter() {
    const [moreFilter, setMoreFilter] = useState(false);
    const [isOpen, setIsOpen] = useState("");
    const [filter, setFilter] = useState({
        text: "",
        sortBy: "",
        type: "None",
        location: ""
    });
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
            location: ""
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
