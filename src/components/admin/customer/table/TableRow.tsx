import { CustomerTable, CustomersAdmin } from "@/types/admin/customer";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";

const TableRow = ({ currentPageRows }: { currentPageRows: CustomersAdmin[] }) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div

            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(60px,_60px),minmax(80px,_80px)_minmax(200px,_200px)_minmax(160px,_160px)_minmax(240px,_100%)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(80px,_80px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(150px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(70px,_70px)_minmax(180px,_180px)_minmax(140px,_140px)_minmax(160px,_100%)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(40px,_40px)] mt-2  rounded-md"
          >
            <span className="py-4  rounded-md flex items-center">
              {item?.company?.refID}
            </span>
            <span className="py-4  flex items-center justify-center">
              {/* <Image
                src={item?.company?.logo}
                alt="company logo"
                height={35}
                width={35}
              /> */}
            </span>
            <span className="py-4  flex items-center">
              {item?.company?.companyName}
            </span>
            <span className="py-4  flex items-center">
              {item?.fullName}
            </span>
            <span className="xs:flex mlg:hidden xlg:hidden maxSize:flex py-4  items-center">
              {item?.email}
            </span>
            <span className="py-4  flex items-center">
              {item?.company?.plan}
            </span>
            <span className="py-4  flex items-center justify-center">
              <div
                className={`${item.status =="unBlock"
                  ? "bg-[#4A13E7]"
                  : "bg-[#FF0000]"
                  } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm `}
              >
                {item.status}
              </div>
            </span>

            <span className="col-start-9 col-end-10 py-4 flex justify-center items-center  rounded-md"
              onClick={() =>
                router.push({
                  pathname: "/admin/customers/details",
                  query: { customer: item.id },
                })
              }

            >
              <Image src={moreInfoIcon} alt="moreInfoIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
