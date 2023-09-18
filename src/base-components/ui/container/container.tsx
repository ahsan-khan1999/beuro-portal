import { ContainerProps, MyComponentProp } from "@/types";
import { combineClasses } from "@/utils/utility";

export const Container = ({ children, containerClassName, childClassName }: ContainerProps) => {
    const containerClasses = combineClasses('bg-smoke-white -mx-5 px-5', containerClassName);
    const childClasses = combineClasses('max-w-maxSize mx-auto', childClassName);
  return (
    <div className={`${containerClasses}`}>
      <div className={`${childClasses}`}>
        {children}
      </div>
    </div>
  );
};
