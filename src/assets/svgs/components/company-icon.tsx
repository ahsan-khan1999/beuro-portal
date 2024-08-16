import { combineClasses } from "@/utils/utility";

export interface CompanyIconProps {
  containerClassName?: string;
}

export const CompanyIcon = ({ containerClassName }: CompanyIconProps) => {
  const defaultClasses = combineClasses(
    "bg-[#EBEBEB] rounded-[4px] p-1",
    containerClassName
  );

  return (
    <div className={defaultClasses}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.1553 2.27706C12.1553 1.82154 11.7315 1.48444 11.2876 1.58687L2.78766 3.54841C2.46627 3.62257 2.23861 3.90876 2.23861 4.2386V14.936H1.88444C1.68884 14.936 1.53027 15.0946 1.53027 15.2902C1.53027 15.4858 1.68884 15.6444 1.88444 15.6444H2.59138H2.59277H2.59417H5.78027V13.5194C5.78027 13.1281 6.09741 12.811 6.48861 12.811H7.90527C8.29649 12.811 8.61361 13.1281 8.61361 13.5194V15.6444H11.7997H11.8011H11.8025H12.1553V2.27706ZM4.71777 5.72768C4.52217 5.72768 4.36361 5.88625 4.36361 6.08185V6.79018C4.36361 6.98578 4.52217 7.14435 4.71777 7.14435H5.42611C5.62171 7.14435 5.78027 6.98578 5.78027 6.79018V6.08185C5.78027 5.88625 5.62171 5.72768 5.42611 5.72768H4.71777ZM4.36361 8.20685C4.36361 8.01128 4.52217 7.85268 4.71777 7.85268H5.42611C5.62171 7.85268 5.78027 8.01128 5.78027 8.20685V8.91518C5.78027 9.11076 5.62171 9.26935 5.42611 9.26935H4.71777C4.52217 9.26935 4.36361 9.11076 4.36361 8.91518V8.20685ZM4.71777 9.97768C4.52217 9.97768 4.36361 10.1363 4.36361 10.3319V11.0402C4.36361 11.2358 4.52217 11.3944 4.71777 11.3944H5.42611C5.62171 11.3944 5.78027 11.2358 5.78027 11.0402V10.3319C5.78027 10.1363 5.62171 9.97768 5.42611 9.97768H4.71777ZM6.48861 6.08185C6.48861 5.88625 6.64717 5.72768 6.84277 5.72768H7.55111C7.74668 5.72768 7.90527 5.88625 7.90527 6.08185V6.79018C7.90527 6.98578 7.74668 7.14435 7.55111 7.14435H6.84277C6.64717 7.14435 6.48861 6.98578 6.48861 6.79018V6.08185ZM6.84277 7.85268C6.64717 7.85268 6.48861 8.01128 6.48861 8.20685V8.91518C6.48861 9.11076 6.64717 9.26935 6.84277 9.26935H7.55111C7.74668 9.26935 7.90527 9.11076 7.90527 8.91518V8.20685C7.90527 8.01128 7.74668 7.85268 7.55111 7.85268H6.84277ZM6.48861 10.3319C6.48861 10.1363 6.64717 9.97768 6.84277 9.97768H7.55111C7.74668 9.97768 7.90527 10.1363 7.90527 10.3319V11.0402C7.90527 11.2358 7.74668 11.3944 7.55111 11.3944H6.84277C6.64717 11.3944 6.48861 11.2358 6.48861 11.0402V10.3319ZM8.96777 5.72768C8.7722 5.72768 8.61361 5.88625 8.61361 6.08185V6.79018C8.61361 6.98578 8.7722 7.14435 8.96777 7.14435H9.67611C9.87168 7.14435 10.0303 6.98578 10.0303 6.79018V6.08185C10.0303 5.88625 9.87168 5.72768 9.67611 5.72768H8.96777ZM8.61361 8.20685C8.61361 8.01128 8.7722 7.85268 8.96777 7.85268H9.67611C9.87168 7.85268 10.0303 8.01128 10.0303 8.20685V8.91518C10.0303 9.11076 9.87168 9.26935 9.67611 9.26935H8.96777C8.7722 9.26935 8.61361 9.11076 8.61361 8.91518V8.20685ZM8.96777 9.97768C8.7722 9.97768 8.61361 10.1363 8.61361 10.3319V11.0402C8.61361 11.2358 8.7722 11.3944 8.96777 11.3944H9.67611C9.87168 11.3944 10.0303 11.2358 10.0303 11.0402V10.3319C10.0303 10.1363 9.87168 9.97768 9.67611 9.97768H8.96777Z"
          fill="#393939"
        />
        <path
          d="M12.8633 4.09216V15.6444H14.6331H14.6341H14.6351H15.3424C15.538 15.6444 15.6966 15.4858 15.6966 15.2902C15.6966 15.0946 15.538 14.936 15.3424 14.936H14.9883V5.59243C14.9883 5.32414 14.8367 5.07886 14.5967 4.95888L12.8633 4.09216Z"
          fill="#393939"
        />
        <path
          d="M7.90495 15.6443H6.48828V13.5193H7.90495V15.6443Z"
          fill="#393939"
        />
      </svg>
    </div>
  );
};
