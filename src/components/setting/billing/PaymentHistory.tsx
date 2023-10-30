import React from "react";

type PlanData = {
  description: string;
  amount: string;
  date: string;
  status: string;
};

const PaymentHistory = () => {
  const paymentHistoryHeading: string[] = [
    "Description",
    "Amount",
    "Date",
    "Status",
  ];

  const planHistoryData: PlanData[] = [
    {
      description: "Your silver plan",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Your silver plan",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Your silver plan",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Your silver plan",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
    {
      description: "Your silver plan",
      amount: "CHF9",
      date: "25/08/2023",
      status: "Paid",
    },
  ];

  return (
    <>
      <p className="text-[#4B4B4B] font-normal text-lg my-4">Payment History</p>

      <section className="bg-white pl-[32px] pr-[61px] py-4 rounded-md">
        <div className="grid grid-cols-[minmax(300px,_100%)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(100px,_100px)] ">
          {paymentHistoryHeading.map((item, index) => (
            <span
              className={`text-base font-medium text-[#8F8F8F] ${
                index === paymentHistoryHeading.length - 1 ? "text-center" : ""
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white pl-[32px]   pr-[61px]  py-4 rounded-md mt-1">
        <div className="grid grid-cols-[minmax(300px,_100%)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(100px,_100px)] gap-y-2 items-center">
          {planHistoryData.map((item, index) => (
            <>
              <span
                className="text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.description}
              </span>
              <span
                className="text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.amount}
              </span>
              <span
                className="text-base font-medium text-[#4B4B4B]"
                key={index}
              >
                {item.date}
              </span>
              <span
                className="text-base font-medium text-[#fff] bg-[#45C769] rounded-lg px-3 py-[6px] text-center"
                key={index}
              >
                {item.status}
              </span>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default PaymentHistory;
