import { CopyIcon } from "@/assets/svgs/components/copy-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { useClipboardCopy } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";

export const CopyField = ({ value }: { value: String }) => {
  const { inputRef, handleCopy, isCopied } = useClipboardCopy();

  const defaultClasses = `flex items-center border-2 border-lightGray rounded-lg h-12 w-full pl-4 pr-1.5 py-3 outline-none`;

  const classes = combineClasses(defaultClasses);

  return (
    <div className="w-full">
      <div className={classes}>
        <p
          ref={inputRef}
          className="text-sm font-normal mr-14 xl:mr-3 truncate select-none"
        >
          {value}
        </p>

        <BaseButton
          containerClassName={`flex gap-x-1 ${
            !isCopied ? "bg-lighttest-gray" : "bg-primary"
          } py-1 px-2.5 rounded !!border !!border-lightGray`}
          textClassName={`${
            !isCopied ? "text-primary" : "text-white"
          } font-medium`}
          buttonText={!isCopied ? "" : "Copied"}
          onClick={handleCopy}
        >
          {!isCopied && <CopyIcon />}
        </BaseButton>
      </div>
    </div>
  );
};
