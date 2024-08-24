import { useTranslation } from "next-i18next";

export const DayHeaderContent = (arg: any) => {
  const dayName = arg.date.toLocaleDateString("en-US", { weekday: "long" });
  const translatedDayName = translate(`calendar.days.${dayName}`);

  return {
    html: `<span class="text-[#2E2E2E] font-medium text-base block text-left py-4">${translatedDayName}</span>`,
  };
};
