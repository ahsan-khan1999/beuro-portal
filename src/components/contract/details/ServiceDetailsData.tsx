import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";

const ServiceDetailsData = () => {
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
    <div className="rounded-md border-none bg-white pt-6 px-[30px] pb-[23px] border w-full h-fit" id="Service Details">
      <h2 className="text-[#393939] text-lg font-medium">
        Service/Product Details
      </h2>

      <hr className="opacity-20 my-6" />

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
          <span className="text-[#1E1E1E] text-base font-semibold">
            Grand Total:
          </span>

          <span className="text-[#1E1E1E] text-base font-semibold ml-5">
            2100.50 CHF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsData;
