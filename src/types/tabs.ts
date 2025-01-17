import { ReactNode } from "react";

// Interface for tab
export interface leadsTabsSectionTypes {
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  selectedTab: number;
  name: string;
  icon: string;
  onScroll?: (id: number) => void;
  onItemSelected?: (id: string) => void;
}

// Interface for tab
export interface OfferTabsSectionTypes {
  setTabType: (tabType: number) => void;
  tabType: number;
  isSelected: boolean;
  isToggle?: boolean;
  selectedTab: number;
  name: string;
  index: number;
  icon: string;
  onScroll?: (id: number) => void;
  onItemSelected?: (id: string) => void;
}
