import { useTranslation } from "next-i18next";
import React from "react";

type PlanData = {
  description: string;
  amount: string;
  date: string;
  status: string;
};

const PaymentHistory = () => {
  const { t: translate } = useTranslation();
  const paymentHistoryHeading: string[] = [
    `${translate("setting.billing.payment_history.setting")}`,
    `${translate("setting.billing.payment_history.amount")}`,
    `${translate("setting.billing.payment_history.date")}`,
    `${translate("setting.billing.payment_history.status")}`,
  ];

  const planHistoryData: PlanData[] = [
    {
      description: "Abonement",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Abonement",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Abonement",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Abonement",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Abonement",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
  ];

  return (
    <>
      <p className="text-[#4B4B4B] font-normal text-lg my-4">
        {translate("setting.billing.payment_history.main_heading")}
      </p>

      <section className="bg-white   rounded-md">
        <div className="grid grid-cols-[minmax(300px,_100%)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(100px,_100px)]">
          {paymentHistoryHeading?.map((item, index) => (
            <span
              className={`bg-white pl-[32px] pr-[61px] py-4  text-base font-medium text-[#8F8F8F] ${
                index === paymentHistoryHeading.length - 1 ? "text-center" : ""
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className=" bg-white  rounded-md mt-1">
        <div className="grid grid-cols-[minmax(300px,_100%)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(100px,_100px)] items-center">
          {planHistoryData?.map((item, index) => (
            <>
              <span
                className=" bg-white pl-[32px]   pr-[61px]  py-4 text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.description}
              </span>
              <span
                className="bg-white pl-[32px]   pr-[61px]  py-4 text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.amount}
              </span>
              <span
                className="bg-white pl-[32px]   pr-[61px]  py-4 text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.date}
              </span>
              <span
                className=" bg-white pl-[32px]   pr-[61px]  py-4 "
                key={index}
              >
                <span className="text-base font-medium text-[#fff] bg-[#45C769] rounded-lg px-3 py-[6px] text-center">
                  {item.status}
                </span>
              </span>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default PaymentHistory;
