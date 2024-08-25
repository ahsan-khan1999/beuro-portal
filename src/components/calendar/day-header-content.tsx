import { useTranslation } from "next-i18next";

export const DayHeaderContent = (arg: any) => {
  const { view } = arg; // Access the current view
  const dayName = arg.date.toLocaleDateString("en-US", { weekday: "long" });
  const date = arg.date.getDate();

  const translatedDayName = translate(`calendar.days.${dayName}`);

  if (view.type === "timeGridDay") {
    return {
      html: `<span class="text-[#2E2E2E] font-medium text-base block text-left py-4">${translatedDayName}</span>`,
    };
  } else if (view.type === "timeGridWeek") {
    return {
      html: `<span class="text-[#2E2E2E] font-medium py-4">${translatedDayName}, ${date}</span>`,
    };
  } else {
    return {
      html: `<span class="text-[#2E2E2E] font-medium py-4">${translatedDayName}</span>`,
    };
  }
};
