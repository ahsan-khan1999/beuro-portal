import { ReactNode } from "react";

// Interface for tab
export interface leadsTabsSectionTypes {
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  selectedTab: number;
  name: string;
  icon: ReactNode;
}

// Interface for tab
export interface OfferTabsSectionTypes {
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  selectedTab: number;
  name: string;
  index: number;
  icon: ReactNode | string;
}
