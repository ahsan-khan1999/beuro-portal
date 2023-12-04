import { ContactDetailsProps } from "@/types/types";

export const ContactDetails = ({
  address: { city, name, postalCode, streetWithNumber },
  email,
  phone,
}: ContactDetailsProps) => {
  return (
    <div className="flex justify-between items-center mt-5 mb-[37px]">
      <div className="flex flex-col gap-[4px]">
        <span className="text-[#000] text-base font-medium">{name}</span>
        <span className="text-[#000] text-base font-medium">
          {streetWithNumber}
        </span>
        <span className="text-[#000] text-base font-medium">
          {postalCode} {city}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div>
          <span className="text-[#000] text-base font-medium">Email:</span>
          <span className="text-[#000] text-base font-medium">{email}</span>
        </div>
        <div>
          <span className="text-[#404040] text-base font-medium">Phone:</span>
          <span className="text-[#000] text-base font-medium">{phone}</span>
        </div>
      </div>
    </div>
  );
};
