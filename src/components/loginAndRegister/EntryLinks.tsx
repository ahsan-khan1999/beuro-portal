import Link from "next/link";
import React from "react";

const EntryLinks = () => {
  return (
    <div className="space-x-[18px] flex items-center justify-center    ">
      <select className="text-xs text-[#8F8F8F] focus:outline-none">
        <option>English</option>
        <option>German</option>
      </select>
      <Link href={""} className="text-xs text-[#8F8F8F]">
        Privacy Policy
      </Link>
      <Link href={""} className="text-xs text-[#8F8F8F]">
        Copyright 2023
      </Link>
    </div>
  );
};

export default EntryLinks;
