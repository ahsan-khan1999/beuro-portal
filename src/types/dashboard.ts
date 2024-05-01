import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dashboard } from ".";

export interface DashboardActionType {
  type: string;
  payload: Dashboard;
}

export interface DashboardCardProps {
  icon: string | StaticImport;
  alt: string;
  backgroundColor: string;
  title: string;
  subTitle: string;
  id: string;
  salePercent: string;
  chartPointColor: string;
  open: string;
  closed: string;
  expired: string;
  route?: Function;
}
