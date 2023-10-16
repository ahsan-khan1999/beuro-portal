import Image from "next/image";
import React from "react";

const TableRows = ({ dataToAdd }) => {
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(120px,_120px),minmax(200px,_100%)_minmax(250px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_100%)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.customer}</span>
            <span className="px-6 py-4 bg-white ">{item.contractTitle}</span>
            <span className="px-6 py-4 bg-white ">{item.totalPrice}</span>
            <span className="px-6 py-4 bg-white ">
              {item.createdOn.toLocaleDateString()}
            </span>
            <span className="flex justify-center items-center bg-white">
              <div
                className={`${
                  item.payment.includes("Cash")
                    ? "bg-[#45C769]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-[64px] text-sm`}
              >
                {item.payment}
              </div>
            </span>

            <span className="flex justify-center items-center bg-white ">
              <div
                className={`${
                  item.status.includes("Open")
                    ? "bg-[#4A13E7]"
                    : item.status.includes("Confirmed")
                    ? "bg-[#45C769]"
                    : "bg-[#FF0000]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 flex justify-center items-center  bg-white ">
              <Image
                src={item.editImg}
                alt="edit_img_icon"
                className="cursor-pointer"
              />
            </span>
            <span className="px-6 py-4 flex justify-center items-center bg-white ">
              <Image
                src={item.editNote}
                alt="edit_note_icon"
                className="cursor-pointer"
              />
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
              >
                <path
                  d="M0.332761 13.773C0.162353 13.59 0.0771484 13.3734 0.0771484 13.1231C0.0771484 12.8728 0.162353 12.6565 0.332761 12.474L5.32573 7.1132L0.31572 1.73412C0.156672 1.56335 0.0771484 1.3499 0.0771484 1.09375C0.0771484 0.837604 0.162353 0.618049 0.332761 0.435087C0.503169 0.252125 0.704933 0.160645 0.938051 0.160645C1.17117 0.160645 1.37271 0.252125 1.54266 0.435087L7.26838 6.6009C7.33654 6.67409 7.38494 6.75337 7.41357 6.83875C7.4422 6.92413 7.45628 7.01562 7.45583 7.1132C7.45583 7.21077 7.44152 7.30226 7.41289 7.38764C7.38426 7.47302 7.33609 7.5523 7.26838 7.62549L1.52562 13.7913C1.36657 13.9621 1.17049 14.0475 0.937369 14.0475C0.704251 14.0475 0.502715 13.956 0.332761 13.773Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
