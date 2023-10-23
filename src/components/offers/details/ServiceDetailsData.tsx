import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";

const ServiceDetailsData = () => {
  const router = useRouter();

  const serviceData = [
    {
      title: `2 Mitarbeiter  Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      values: {
        price: 1000,
        unit: "Std.",
        count: 2,
        totalPrice: "2000CHF",
      },
    },
    {
      title: `2 Mitarbeiter 
      Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      values: {
        price: 1000,
        unit: "Std.",
        count: 2,
        totalPrice: "2000CHF",
      },
    },
    {
      title: `2 Mitarbeiter 
      Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      values: {
        price: 1000,
        unit: "Std.",
        count: 2,
        totalPrice: "2000CHF",
      },
    },
    {
      title: `2 Mitarbeiter 
      Lorem ipsum dorl`,
      description: `Kostenübernahme bei lore
      Ipsum dollar smith emit em..`,
      values: {
        price: 1000,
        unit: "Std.",
        count: 2,
        totalPrice: "2000CHF",
      },
    },
  ];

  return (
    <LeadsCardLayout>
      <div className="flex justify-between  pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Service Details</h2>
        <button
          onClick={() => router.push("/customers/edit")}
          className="flex  items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <svg
            className="mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g clipPath="url(#clip0_1241_60323)">
              <path
                d="M16.3079 10.197C15.8471 10.197 15.4746 10.5704 15.4746 11.0303V17.697C15.4746 18.1561 15.1012 18.5303 14.6413 18.5303H2.97461C2.51456 18.5303 2.14133 18.1561 2.14133 17.697V6.03027C2.14133 5.57114 2.51456 5.19699 2.97461 5.19699H9.64133C10.1021 5.19699 10.4746 4.82361 10.4746 4.36371C10.4746 3.90366 10.1021 3.53027 9.64133 3.53027H2.97461C1.59628 3.53027 0.474609 4.65195 0.474609 6.03027V17.697C0.474609 19.0753 1.59628 20.197 2.97461 20.197H14.6413C16.0197 20.197 17.1413 19.0753 17.1413 17.697V11.0303C17.1413 10.5695 16.7687 10.197 16.3079 10.197Z"
                fill="#4B4B4B"
              />
              <path
                d="M8.28756 9.43707C8.22927 9.49536 8.19006 9.56952 8.17342 9.64948L7.58428 12.5963C7.55682 12.7328 7.60015 12.8737 7.69842 12.9728C7.77761 13.052 7.88427 13.0945 7.99352 13.0945C8.02007 13.0945 8.04769 13.092 8.07516 13.0862L11.021 12.4971C11.1027 12.4803 11.1768 12.4412 11.2343 12.3828L17.8277 5.78946L14.8818 2.84375L8.28756 9.43707Z"
                fill="#4B4B4B"
              />
              <path
                d="M19.8647 0.806664C19.0524 -0.005867 17.7307 -0.005867 16.9189 0.806664L15.7656 1.95992L18.7115 4.90578L19.8647 3.75237C20.2581 3.35992 20.4748 2.83654 20.4748 2.2799C20.4748 1.72326 20.2581 1.19988 19.8647 0.806664Z"
                fill="#4B4B4B"
              />
            </g>
            <defs>
              <clipPath id="clip0_1241_60323">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.474609 0.158203)"
                />
              </clipPath>
            </defs>
          </svg>
          Edit Details
        </button>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)] mb-[28px]">
          <span className="text-[14px] font-medium text-[#8F8F8F]">
            Service/Product Title
          </span>
          <span className="text-[14px] font-medium text-[#8F8F8F]">
            Description
          </span>

          <span>Price(CHF)</span>
          <span> Unit</span>
          <span> Count</span>
          <span> Total Price</span>
        </div>

        {serviceData.map((item, index) => (
          <div
            className="grid grid-cols-[minmax(250px,_100%)_minmax(300px,_100%)_minmax(130px,_100%)_minmax(80px,_100%)_minmax(80px,_100%)_minmax(92px,_92px)]  mb-[18px] text-[14px] font-medium text-[#4B4B4B]"
            key={index}
          >
            <span>{item.title}</span>
            <span>{item.description}</span>

            <span>{item.values.price}</span>
            <span> {item.values.unit}</span>
            <span> {item.values.count}</span>
            <span> {item.values.totalPrice}</span>
          </div>
        ))}
      </div>
      <hr className="opacity-20 mt-[40px]" />

      <div className="mt-5 border float-right border-[#EBEBEB] rounded-lg w-fit p-5">
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-2 border-r-[2px] border-r-[#EBEBEB]">
            <span className="text-[#4D4D4D] text-[14px] font-normal">
              Sub Total
            </span>
            <span className="text-[#4B4B4B] text-base font-medium">
              2000CHF
            </span>
          </div>
          <div className="flex flex-col gap-2 ml-5">
            <span className="text-[#4D4D4D] text-[14px] font-normal">Tax%</span>
            <span className="text-[#4B4B4B] text-base font-medium">
              100CHF (7.7%)
            </span>
          </div>
        </div>

        <hr className="opacity-20 mt-2" />

        <div className="grid grid-cols-2 mt-3">
          <span className="text-[#1E1E1E] text-base font-semibold">Grand Total:</span>

          <span className="text-[#1E1E1E] text-base font-semibold ml-5">
          2100.50 CHF
          </span>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default ServiceDetailsData;
