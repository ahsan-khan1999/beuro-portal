import React, { SetStateAction, useState } from 'react'
import filterImage from "@/assets/svgs/Frame.svg"
import Image from "next/image";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { BaseButton } from "@/base-components/ui/button/base-button";
import InputField from './fields/input-field';
import { FilterProps } from '@/types';


export default function DetailFilter({ filter,  moreFilter, setMoreFilter, handleFilterReset, handleFilterResetToInitial, handleItemSelected, typeList }: FilterProps) {


    return (
        <div className="relative flex my-auto  ">
            <Image src={filterImage} alt="filter" onClick={() => setMoreFilter(!moreFilter)} className='cursor-pointer' />
            {
                moreFilter &&
                <div className="absolute right-0 top-10 bg-white p-5 min-w-[400px] rounded-lg shadow-lg">
                    <div className="flex justify-between border-b border-lightGray pb-3">
                        <span className="font-medium text-lg">
                            Filter
                        </span>
                        <span className=" text-base text-gray cursor-pointer" onClick={() => handleFilterResetToInitial()}>
                            Reset All
                        </span>
                    </div>
                    <div className="">
                        <div className="mt-5 mb-2">
                            <div className="flex justify-between">
                                <label htmlFor="type" className="font-medium ">
                                    Types
                                </label>
                                <label htmlFor="type" className="cursor-pointer text-lightGray" onClick={() => handleFilterReset("type", "None")}>
                                    Reset
                                </label>

                            </div>
                            <DropDown
                                items={typeList}
                                onItemSelected={handleItemSelected}
                                selectedItem={filter.type || ""}
                                dropDownTextClassName="custom-text-style"
                                dropDownIconClassName="custom-icon-style"
                                dropDownDisabled={false}
                                shouldNotSelectItem={false}
                                dropDownClassName="my-2 border border-black h-10"
                                key={Math.random()}
                            />

                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="type" className=" ">
                                    Location
                                </label>
                                <label htmlFor="type" className="cursor-pointer text-lightGray" onClick={() => handleFilterReset("location", "")}>
                                    Reset
                                </label>

                            </div>

                            <InputField iconDisplay={false} handleChange={(value) => handleFilterReset("location", value)} value={filter.location || ""} textClassName="border border-black min-h-[42px]" containerClassName=" my-2"

                            />

                        </div>
                    </div>
                    <div>
                        <BaseButton buttonText="Save" onClick={() => {
                            setMoreFilter(!moreFilter)
                        }}
                            containerClassName="bg-primary my-2 px-8 py-1"
                            textClassName="text-white"
                        />
                    </div>
                </div>
            }
        </div>
    )
}
