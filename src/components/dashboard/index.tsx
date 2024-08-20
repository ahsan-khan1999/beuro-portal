import React, { useEffect, useState } from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import DashboardCard from "./Cards";
import { FollowUpNotificationBar } from "./notification-bar/FollowUp";
import ActivitiesNotificationBar from "./notification-bar/Activities";
import leadsIcon from "@/assets/svgs/leads.svg";
import offersIcon from "@/assets/svgs/offers.svg";
import contractsIcon from "@/assets/svgs/contracts.svg";
import salesIcon from "@/assets/svgs/sales.svg";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readDashboard } from "@/api/slices/authSlice/auth";
import { FilterType } from "@/types";
import { getCurrentMonth } from "@/utils/utility";
import { DashboardActionType } from "@/types/dashboard";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useTranslation } from "next-i18next";

const AdminDashboard = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const { dashboard } = useAppSelector((state) => state.auth);

  const [pieData, setPieData] = useState({
    datasets: [
      {
        data: [40, 10, 10, 10, 15, 15],
        backgroundColor: [
          "#FE9244",
          "#FF376F",
          "#4A13E7",
          "#45C769",
          "#7B18FF",
          "#221177",
        ],
      },
    ],
    labels: [
      `${translate("dashboard_detail.charts_labels.website")}`,
      `${translate("dashboard_detail.charts_labels.google")}`,
      `${translate("dashboard_detail.charts_labels.facebook")}`,
      `${translate("dashboard_detail.charts_labels.insta")}`,
      `${translate("dashboard_detail.charts_labels.pinterest")}`,
      `${translate("dashboard_detail.charts_labels.whatsapp")}`,
    ],
  });

  const [filter, setFilter] = useState<FilterType>({
    month: getCurrentMonth(),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readDashboard({ params: { filter: filter } })).then(
      (response: DashboardActionType) => {
        if (response?.payload) {
          setPieData({
            datasets: [
              {
                data: response?.payload?.leadSource?.map(
                  (item) => item?.totalLeadSource
                ),
                backgroundColor: [
                  "#FE9244",
                  "#FF376F",
                  "#4A13E7",
                  "#45C769",
                  "#7B18FF",
                  "#221177",
                ],
              },
            ],
            labels: response?.payload?.leadSource?.map((item) => item?._id),
          });
        }
      }
    );
  }, []);

  const dashboardCards = [
    {
      icon: leadsIcon,
      alt: "leads icon",
      title: `${translate("dashboard_detail.cards_title.leads")}`,
      subTitle:
        dashboard?.Lead?.totalLeads +
        ` ${translate("dashboard_detail.cards_title.leads")}`,
      id: dashboard?.Lead?.filterCount,
      salePercent:
        (dashboard?.Lead?.percentage && dashboard?.Lead?.percentage > 0
          ? "+"
          : "") +
        Math.round(dashboard?.Lead?.percentage! * 100) / 100 +
        "%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open:
        dashboard?.Lead?.opened +
        ` ${translate("dashboard_detail.cards_status.open")}`,
      closed:
        dashboard?.Lead?.closed +
        ` ${translate("dashboard_detail.cards_status.close")}`,
      expired:
        dashboard?.Lead?.expired +
        ` ${translate("dashboard_detail.cards_status.expire")}`,
      route: () => router.push("/leads?status=None"),
    },
    {
      icon: offersIcon,
      alt: "offers icon",
      title: `${translate("dashboard_detail.cards_title.offer")}`,
      subTitle:
        dashboard?.Offer?.totalOffers +
        ` ${translate("dashboard_detail.cards_title.offer")}`,
      id: dashboard?.Offer?.filterCount,
      salePercent:
        (dashboard?.Offer?.percentage && dashboard?.Offer?.percentage > 0
          ? "+"
          : "") +
        Math.round(dashboard?.Offer?.percentage! * 100) / 100 +
        "%",
      backgroundColor: "bg-dashboardCard2-gradient",
      chartPointColor: "#FC3576",
      open:
        dashboard?.Offer?.opened +
        ` ${translate("dashboard_detail.cards_status.open")}`,
      closed:
        dashboard?.Offer?.signed +
        ` ${translate("dashboard_detail.cards_status.signed")}`,
      expired:
        dashboard?.Offer?.expired +
        ` ${translate("dashboard_detail.cards_status.expire")}`,
      route: () => router.push("/offers?status=None"),
    },
    {
      icon: contractsIcon,
      alt: "contracts icon",
      title: `${translate("dashboard_detail.cards_title.contracts")}`,
      subTitle:
        dashboard?.Contract?.totalContract +
        ` ${translate("dashboard_detail.cards_title.contracts")}`,
      id: dashboard?.Contract?.filterCount,
      salePercent:
        (dashboard?.Contract?.percentage && dashboard?.Contract?.percentage > 0
          ? "+"
          : "") +
        Math.round(dashboard?.Contract?.percentage! * 100) / 100 +
        "%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
      open:
        dashboard?.Contract?.opened +
        ` ${translate("dashboard_detail.cards_status.open")}`,
      closed:
        dashboard?.Contract?.confirmed +
        ` ${translate("dashboard_detail.cards_status.confirm")}`,
      expired:
        dashboard?.Contract?.cancelled +
        ` ${translate("dashboard_detail.cards_status.cancel")}`,
      route: () => router.push("/contract?status=None"),
    },
    {
      icon: salesIcon,
      alt: "sales icon",
      title: `${translate("dashboard_detail.cards_title.sales")}`,
      subTitle:
        dashboard?.Sales?.totalSales +
        ` ${translate("dashboard_detail.cards_title.sales")}`,
      id: dashboard?.Sales?.filterCount,
      salePercent:
        (dashboard?.Sales?.percentage && dashboard?.Sales?.percentage > 0
          ? "+"
          : "") +
        Math.round(dashboard?.Sales?.percentage! * 100) / 100 +
        "%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open:
        dashboard?.Sales?.pending +
        ` ${translate("dashboard_detail.cards_status.pending")}`,
      closed:
        dashboard?.Sales?.overdue +
        ` ${translate("dashboard_detail.cards_status.overdue")}`,
      expired:
        dashboard?.Sales?.paid +
        ` ${translate("dashboard_detail.cards_status.paid")}`,
      route: () => router.push("/invoices?status=None"),
    },
  ];

  const handleFilterChange = (query: FilterType) => {
    dispatch(readDashboard({ params: { filter: { month: query?.month } } }));
  };

  const path = router.asPath;
  const isAgentRoute = path.startsWith("/agent");

  return (
    <div className="mb-10">
      <div className="p-5 xMini:p-9 bg-gradient rounded-lg">
        <h1 className="font-medium text-lg xMini:text-2xl mlg:text-[28px] tracking-[0.5px] text-white">
          {isAgentRoute
            ? `${translate("dashboard_detail.agent_dashboard")}`
            : `${translate("dashboard_detail.main_heading")}`}
        </h1>
      </div>

      {/* <SearchInputFiled
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        containerClassName="py-4 max-w-[400px] mlg:max-w-[642px] rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex space-x-1 items-center mx-auto"
        textClassName="ml-4 w-fullfocus:outline-none border-[#BFBFBF] py-0 rounded-none "
        options={[
          {
            icon: customerIcon,
            id: "V-2000",
            userName: "Mateen",
            service: "Umzug Cleaning Service",
          },
          {
            icon: leadsPngIcon,
            id: "V-2000",
            userName: "Mateen",
            service: "Umzug Cleaning Service",
          },
          {
            icon: offersPngIcon,
            id: "V-2000",
            userName: "Mateen",
            service: "Umzug Cleaning Service",
          },
          {
            icon: invoiceIcon,
            id: "V-2000",
            userName: "Mateen",
            service: "Umzug Cleaning Service",
          },
        ]}
      /> */}

      {dashboard !== null ? (
        <>
          <DashboardFunctions
            filter={filter}
            setFilter={setFilter}
            handleFilterChange={handleFilterChange}
          />

          <div className="grid xMini:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5">
            {dashboardCards?.map((item, index) => {
              return (
                <DashboardCard
                  key={index}
                  icon={item.icon}
                  alt={item.alt}
                  backgroundColor={item.backgroundColor}
                  title={item.title}
                  subTitle={item.subTitle}
                  id={item?.id?.toString() as string}
                  salePercent={item.salePercent}
                  chartPointColor={item.chartPointColor}
                  open={item.open}
                  closed={item.closed}
                  expired={item.expired}
                  route={item.route}
                />
              );
            })}
          </div>

          {!isAgentRoute && (
            <div className="mt-[51px] grid grid-cols-2 2xl:grid-cols-3 gap-x-[18px] mb-10">
              <div className="hidden 2xl:block">
                <FollowUpNotificationBar dashboard={dashboard} />
              </div>
              <ActivitiesNotificationBar dashboard={dashboard} />
              <PieChart data={pieData} />
            </div>
          )}
        </>
      ) : (
        <CustomLoader />
      )}
    </div>
  );
};

export default AdminDashboard;
