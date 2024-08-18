import CreateReportDetails from "./create-reports-details";

export const CreateReport = () => {
  return (
    <div className="mt-[115px]">
      <h1 className="text-[#222B45] font-medium xMini:font-semibold text-xl xMini:text-[32px] mb-6 text-center">
        {translate("agent.main_heading")}
      </h1>

      <CreateReportDetails />
    </div>
  );
};
