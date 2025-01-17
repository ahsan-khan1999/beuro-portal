export const DayHeaderContent = (
  arg: any,
  isSmallScreen: boolean,
  isSmallWeekScreen: boolean
) => {
  const { view } = arg;
  const date = arg.date.getDate();

  const dayNameFull = arg.date.toLocaleDateString("en-US", { weekday: "long" });
  const dayNameShort = arg.date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const dayName = isSmallScreen
    ? dayNameShort
    : translate(`calendar.days.${dayNameFull}`);

  if (view.type === "timeGridDay") {
    return {
      html: `<span class="text-[#2E2E2E] font-medium text-base">${dayName}</span>`,
    };
  } else if (view.type === "timeGridWeek") {
    if (isSmallWeekScreen) {
      return {
        html: `<span class="text-[#2E2E2E] font-medium text-xs xMini:text-base">${dayNameShort}</span>`,
      };
    } else {
      return {
        html: `<span class="text-[#2E2E2E] font-medium text-xs xMini:text-base">${dayName}, ${date}</span>`,
      };
    }
  } else {
    return {
      html: `<span class="text-[#2E2E2E] font-medium text-xs xMini:text-base">${dayName}</span>`,
    };
  }
};
