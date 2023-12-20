export const AggrementTerms = ({ aggrementDetails }: { aggrementDetails: string }) => {
  return (
    <div>
      <div className="flex flex-col gap-1" dangerouslySetInnerHTML={{ __html: aggrementDetails }} />
    </div>
  );
};
