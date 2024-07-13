export const ContentPdfDescription = ({
  aggrementDetails,
}: {
  aggrementDetails?: string;
}) => {
  return (
    <div
      className="html-content flex flex-col gap-1 max-w-[1160px]"
      dangerouslySetInnerHTML={{ __html: aggrementDetails || "" }}
    />
  );
};
