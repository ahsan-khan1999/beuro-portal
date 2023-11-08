import { CustomerTable } from "@/types/admin/customer";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(100px,_100px)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white">
              <Image src={item.logo} alt="company logo" />
            </span>
            <span className="px-6 py-4 bg-white ">{item.companyName}</span>
            <span className="px-6 py-4 bg-white ">{item.customerName}</span>
            <span className="px-6 py-4 bg-white ">{item.email}</span>
            <span className="px-6 py-4 bg-white ">{item.plans}</span>
            <span className="px-6 py-4 bg-white ">
              <div
                className={`${
                  item.status.includes("Active")
                    ? "bg-[#4A13E7]"
                    : "bg-[#FF0000]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 bg-white ">
              <svg
                className="cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: "/admin/customers/details",
                    query: { customer: item.id },
                  })
                }
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <rect
                  x="1.24072"
                  y="0.96875"
                  width="39"
                  height="39"
                  rx="7.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
                <path
                  d="M16.9082 19.8602H8.35358C7.98078 19.8602 7.67822 19.5879 7.67822 19.2524C7.67822 18.9168 7.98078 18.6445 8.35358 18.6445H16.9082C17.281 18.6445 17.5836 18.9168 17.5836 19.2524C17.5836 19.5879 17.281 19.8602 16.9082 19.8602Z"
                  fill="#4A13E7"
                />
                <path
                  d="M13.5326 22.898C13.3597 22.898 13.1869 22.8388 13.0553 22.7198C12.7915 22.4822 12.7915 22.0973 13.0553 21.8598L15.9549 19.2503L13.0553 16.6415C12.7915 16.404 12.7915 16.019 13.0553 15.7816C13.3191 15.5442 13.7468 15.5442 14.0108 15.7816L17.3876 18.8207C17.6514 19.0581 17.6514 19.4431 17.3876 19.6807L14.0108 22.7198C13.8784 22.8388 13.7054 22.898 13.5326 22.898Z"
                  fill="#4A13E7"
                />
                <path
                  d="M22.087 30.1933C21.0937 30.1933 20.2861 29.4663 20.2861 28.5724V13.9846C20.2861 13.2918 20.776 12.6734 21.5053 12.4456L26.9154 10.8223C28.1257 10.4884 29.2909 11.2965 29.2909 12.3639V26.9516C29.2909 27.6438 28.801 28.2612 28.0726 28.4898L22.6606 30.1139C22.4634 30.169 22.2807 30.1933 22.087 30.1933ZM27.4899 11.9586C27.4313 11.9586 27.3819 11.9651 27.3288 11.9797L21.9412 13.5964C21.7646 13.6516 21.6369 13.812 21.6369 13.9846V28.5724C21.6369 28.8489 21.9699 29.0353 22.2482 28.9566L27.6358 27.3398C27.8114 27.2846 27.9402 27.1242 27.9402 26.9516V12.3639C27.9402 12.141 27.7385 11.9586 27.4899 11.9586Z"
                  fill="#4A13E7"
                />
                <path
                  d="M15.5587 14.7944C15.1859 14.7944 14.8833 14.5221 14.8833 14.1866V12.9709C14.8833 11.7415 15.9935 10.7422 17.3595 10.7422H27.4899C27.8627 10.7422 28.1653 11.0145 28.1653 11.35C28.1653 11.6855 27.8627 11.9578 27.4899 11.9578H17.3595C16.7391 11.9578 16.234 12.4125 16.234 12.9709V14.1866C16.234 14.5221 15.9315 14.7944 15.5587 14.7944Z"
                  fill="#4A13E7"
                />
                <path
                  d="M20.9615 27.7612H17.3595C15.9935 27.7612 14.8833 26.7619 14.8833 25.5325V24.3168C14.8833 23.9813 15.1859 23.709 15.5587 23.709C15.9315 23.709 16.234 23.9813 16.234 24.3168V25.5325C16.234 26.0909 16.7391 26.5455 17.3595 26.5455H20.9615C21.3343 26.5455 21.6369 26.8179 21.6369 27.1534C21.6369 27.4889 21.3343 27.7612 20.9615 27.7612Z"
                  fill="#4A13E7"
                />
              </svg>
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

export default TableRow;
