import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import delIcon from "@/assets/pngs/address_del_icon.png";
import editIcon from "@/assets/pngs/address_edit_icon.png";
import Image from "next/image";
import { GeneralAddress } from "@/types/settings";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import CustomLoader from "@/base-components/ui/loader/customer-loader";
import { useTranslation } from "next-i18next";

export interface GeneralAddressProps {
  onAddAddressTitle: () => void;
  onEditAddressTitle: (id: number) => void;
  onAddressDelete: (index: number) => void;
  addresses: GeneralAddress | null;
  loading: boolean;
}

export const AddressDetailCard = ({
  onAddAddressTitle,
  onEditAddressTitle,
  onAddressDelete,
  addresses,
  loading,
}: GeneralAddressProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="p-6 bg-white rounded-md">
      <div className="flex items-center justify-between pb-6 border-b border-b-[#000] border-opacity-10">
        <span className="text-xl text-[#1E1E1E] font-medium">
          {translate("setting.general_setting.address")}
        </span>
        <Button
          inputType="button"
          onClick={onAddAddressTitle}
          className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
          text={translate("common.add_new_address")}
          icon={addIcon}
          id="address title"
          iconAlt="address title"
        />
      </div>

      {loading ? (
        <CustomLoader />
      ) : addresses &&
        addresses?.addresses &&
        addresses?.addresses?.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between my-6">
            <span className="text-sm text-[#8F8F8F] font-medium">
              {translate("common.address_title")}
            </span>
            <span className="text-sm text-[#8F8F8F] font-medium flex items-center justify-start w-[110px]">
              {translate("common.actions")}
            </span>
          </div>
          <div className="flex flex-col gap-y-5">
            {addresses?.addresses?.map((item, index) => (
              <div
                className="py-3 px-4 border border-[#ccc] rounded-lg hover:bg-[#EDF4FF] flex items-center justify-between"
                key={index}
              >
                <span className="text-base font-medium text-[#4B4B4B]">
                  {index + 1}:&nbsp; {item}
                </span>
                <div className="flex items-center gap-x-5">
                  <Image
                    src={editIcon}
                    alt="edit address"
                    className="cursor-pointer"
                    onClick={() => onEditAddressTitle(index)}
                  />
                  <Image
                    src={delIcon}
                    alt="del address"
                    className="cursor-pointer"
                    onClick={() => onAddressDelete(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoDataEmptyState
          containerClassName="xMini:py-[153px] w-full flex items-center justify-center"
          className="py-5 px-3 xMini:py-10 xMini:px-6 w-[531px]"
        />
      )}
    </div>
  );
};
