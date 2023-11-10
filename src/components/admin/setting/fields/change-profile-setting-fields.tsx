import { Field } from "@/enums/form";
import { FormField, GenerateAccountSettingAdminFormField } from "@/types";

export const changeProfileSettingFormField: GenerateAccountSettingAdminFormField =
  (register, loading, control) => {
    const formField: FormField[] = [
      {
        field: {
          type: Field.div,
          className: "flex ",
          children: [
            {
              containerClass: "flex justify-start  mb-5",
              field: {
                type: Field.profileUploadField,
                id: "fileUpload",
                name: "fileUpload",
                control,
              },
            },
            {
              containerClass: "w-full ml-[60px]",
              field: {
                type: Field.div,
                className: "",
                children: [
                  {
                    containerClass: "w-full relative",
                    field: {
                      type: Field.div,
                      className: "grid grid-cols-2 gap-x-6 ",
                      children: [
                        {
                          containerClass: "mb-0",
                          label: {
                            text: "Full Name",
                            htmlFor: "fullName",
                          },
                          field: {
                            type: Field.input,
                            id: "fullName",
                            name: "fullName",
                            inputType: "text",
                            placeholder: "Enter Your Name",
                            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M9.74966 0.828796C9.56809 0.647231 9.56809 0.352864 9.74966 0.171298C9.93122 -0.0102245 10.2255 -0.0102245 10.4071 0.171298L12.2071 1.97119C12.3886 2.15275 12.3886 2.44712 12.2071 2.62868C12.1163 2.71942 11.9973 2.76486 11.8784 2.76486C11.7594 2.76486 11.6404 2.71947 11.5496 2.62868L9.74966 0.828796ZM12.4326 13.0326H0.478085C0.221333 13.0326 0.0131836 13.2407 0.0131836 13.4975C0.0131836 13.7542 0.221333 13.9624 0.478085 13.9624H12.4326C12.6893 13.9624 12.8975 13.7542 12.8975 13.4975C12.8975 13.2407 12.6894 13.0326 12.4326 13.0326ZM0.703647 11.6748C0.586745 11.5579 0.54072 11.3878 0.58273 11.228L1.22413 8.78651C1.24509 8.7068 1.2868 8.63415 1.34504 8.57591L8.48876 1.43207C8.67033 1.25055 8.96465 1.25055 9.14622 1.43207L10.9463 3.23204C11.0335 3.31923 11.0824 3.43744 11.0824 3.56077C11.0824 3.68405 11.0335 3.80231 10.9463 3.8895L3.80251 11.0333C3.74427 11.0915 3.67158 11.1332 3.59195 11.1541L1.15054 11.7957C1.11149 11.806 1.07176 11.811 1.03242 11.811C0.910655 11.811 0.791936 11.7632 0.703647 11.6748ZM1.68434 10.6941L3.23398 10.2868L9.96009 3.56077L8.81753 2.41829L2.09146 9.14444L1.68434 10.6941Z" fill="#8F8F8F"/>
                      </svg>
                    `,
                            register,
                          },
                        },
                        {
                          containerClass: "mb-0",
                          label: {
                            text: "Email",
                            htmlFor: "email",
                          },
                          field: {
                            type: Field.input,
                            inputType: "email",
                            id: "email",
                            value: "rahalahmed@gmail.com",
                            name: "email",
                            disabled: true,
                            className: "bg-[#F1F1F1] border-none focus-none ",
                            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path d="M12.3107 0.703125H1.21449C0.563394 0.703125 0.03125 1.23293 0.03125 1.88637V8.98582C0.03125 9.6395 0.563736 10.1691 1.21449 10.1691H12.3107C12.9618 10.1691 13.4939 9.63926 13.4939 8.98582V1.88637C13.4939 1.23277 12.9615 0.703125 12.3107 0.703125ZM12.129 1.49195C11.7464 1.87577 7.25284 6.384 7.06823 6.56922C6.91404 6.72388 6.61121 6.72399 6.45694 6.56922L1.39619 1.49195H12.129ZM0.820078 8.84081V2.03138L4.21375 5.4361L0.820078 8.84081ZM1.39619 9.38024L4.77064 5.9948L5.89827 7.12611C6.36036 7.5897 7.16499 7.58952 7.62693 7.12611L8.75456 5.99482L12.129 9.38024H1.39619ZM12.7051 8.84081L9.31142 5.4361L12.7051 2.03138V8.84081Z" fill="#8F8F8F"/>
                  </svg>
                    `,
                            register,
                          },
                        },
                      ],
                    },
                  },

                  {
                    containerClass: "mt-[26px] mb-[21px]",
                    field: {
                      type: Field.div,
                      className: "flex gap-x-4 items-center relative w-full ",
                      children: [
                        {
                          containerClass: "mb-0",
                          field: {
                            type: Field.span,
                            text: "Update Password",
                            containerClassName:
                              "text-[14px] text-[#393939] font-normal ",
                          },
                        },
                        {
                          field: {
                            type: Field.span,
                            containerClassName:
                              " absolute top-3 bg-[#BFBFBF] w-[87%]  mx-auto h-[1px]",
                          },
                        },
                      ],
                    },
                  },
                  {
                    containerClass: "w-full relative mb-7",
                    field: {
                      type: Field.div,
                      className: "grid grid-cols-2 gap-x-6 ",
                      children: [
                        {
                          containerClass: "mb-0 ",
                          label: {
                            text: "Old Password",
                            htmlFor: "oldPassword",
                          },
                          field: {
                            type: Field.password,
                            id: "oldPassword",
                            name: "oldPassword",
                            placeholder: "************",
                            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <path d="M8.79605 9.38507C9.07929 9.38507 9.3089 9.15546 9.3089 8.87222C9.3089 8.58898 9.07929 8.35938 8.79605 8.35938C8.51281 8.35938 8.2832 8.58898 8.2832 8.87222C8.2832 9.15546 8.51281 9.38507 8.79605 9.38507Z" fill="#8F8F8F"/>
                            <path d="M11.1039 9.28255C11.3871 9.28255 11.6167 9.05295 11.6167 8.7697V6.87216C11.6167 5.74102 10.6964 4.82077 9.56531 4.82077H8.94894V3.01211C8.94894 1.35123 7.56856 0 5.87185 0C4.17515 0 2.79477 1.35123 2.79477 3.01211V4.82077H2.1803C1.04916 4.82077 0.128906 5.74102 0.128906 6.87216V11.0775C0.128906 12.2087 1.04916 13.1289 2.1803 13.1289H9.56531C10.6964 13.1289 11.6167 12.2087 11.6167 11.0775C11.6167 10.7943 11.3871 10.5647 11.1039 10.5647C10.8206 10.5647 10.591 10.7943 10.591 11.0775C10.591 11.6431 10.1309 12.1032 9.56531 12.1032H2.1803C1.61473 12.1032 1.1546 11.6431 1.1546 11.0775V6.87216C1.1546 6.30659 1.61473 5.84647 2.1803 5.84647H9.56531C10.1309 5.84647 10.591 6.30659 10.591 6.87216V8.7697C10.591 9.05295 10.8206 9.28255 11.1039 9.28255ZM7.92325 4.82077H3.82046V3.01211C3.82046 1.91679 4.74072 1.0257 5.87185 1.0257C7.00299 1.0257 7.92325 1.91679 7.92325 3.01211V4.82077Z" fill="#8F8F8F"/>
                            <path d="M4.92398 9.38507C5.20722 9.38507 5.43683 9.15546 5.43683 8.87222C5.43683 8.58898 5.20722 8.35938 4.92398 8.35938C4.64074 8.35938 4.41113 8.58898 4.41113 8.87222C4.41113 9.15546 4.64074 9.38507 4.92398 9.38507Z" fill="#8F8F8F"/>
                            <path d="M3.00064 9.38507C3.28388 9.38507 3.51349 9.15546 3.51349 8.87222C3.51349 8.58898 3.28388 8.35938 3.00064 8.35938C2.7174 8.35938 2.48779 8.58898 2.48779 8.87222C2.48779 9.15546 2.7174 9.38507 3.00064 9.38507Z" fill="#8F8F8F"/>
                            <path d="M6.84732 9.38507C7.13056 9.38507 7.36017 9.15546 7.36017 8.87222C7.36017 8.58898 7.13056 8.35938 6.84732 8.35938C6.56408 8.35938 6.33447 8.58898 6.33447 8.87222C6.33447 9.15546 6.56408 9.38507 6.84732 9.38507Z" fill="#8F8F8F"/>
                          </svg>
                              `,
                            alt: "password",
                            register,
                          },
                        },
                        {
                          containerClass: "mb-0 ",
                          label: {
                            text: "New Password",
                            htmlFor: "newPassword",
                          },
                          field: {
                            type: Field.password,
                            id: "newPassword",
                            name: "newPassword",
                            placeholder: "************",
                            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <path d="M8.79605 9.38507C9.07929 9.38507 9.3089 9.15546 9.3089 8.87222C9.3089 8.58898 9.07929 8.35938 8.79605 8.35938C8.51281 8.35938 8.2832 8.58898 8.2832 8.87222C8.2832 9.15546 8.51281 9.38507 8.79605 9.38507Z" fill="#8F8F8F"/>
                            <path d="M11.1039 9.28255C11.3871 9.28255 11.6167 9.05295 11.6167 8.7697V6.87216C11.6167 5.74102 10.6964 4.82077 9.56531 4.82077H8.94894V3.01211C8.94894 1.35123 7.56856 0 5.87185 0C4.17515 0 2.79477 1.35123 2.79477 3.01211V4.82077H2.1803C1.04916 4.82077 0.128906 5.74102 0.128906 6.87216V11.0775C0.128906 12.2087 1.04916 13.1289 2.1803 13.1289H9.56531C10.6964 13.1289 11.6167 12.2087 11.6167 11.0775C11.6167 10.7943 11.3871 10.5647 11.1039 10.5647C10.8206 10.5647 10.591 10.7943 10.591 11.0775C10.591 11.6431 10.1309 12.1032 9.56531 12.1032H2.1803C1.61473 12.1032 1.1546 11.6431 1.1546 11.0775V6.87216C1.1546 6.30659 1.61473 5.84647 2.1803 5.84647H9.56531C10.1309 5.84647 10.591 6.30659 10.591 6.87216V8.7697C10.591 9.05295 10.8206 9.28255 11.1039 9.28255ZM7.92325 4.82077H3.82046V3.01211C3.82046 1.91679 4.74072 1.0257 5.87185 1.0257C7.00299 1.0257 7.92325 1.91679 7.92325 3.01211V4.82077Z" fill="#8F8F8F"/>
                            <path d="M4.92398 9.38507C5.20722 9.38507 5.43683 9.15546 5.43683 8.87222C5.43683 8.58898 5.20722 8.35938 4.92398 8.35938C4.64074 8.35938 4.41113 8.58898 4.41113 8.87222C4.41113 9.15546 4.64074 9.38507 4.92398 9.38507Z" fill="#8F8F8F"/>
                            <path d="M3.00064 9.38507C3.28388 9.38507 3.51349 9.15546 3.51349 8.87222C3.51349 8.58898 3.28388 8.35938 3.00064 8.35938C2.7174 8.35938 2.48779 8.58898 2.48779 8.87222C2.48779 9.15546 2.7174 9.38507 3.00064 9.38507Z" fill="#8F8F8F"/>
                            <path d="M6.84732 9.38507C7.13056 9.38507 7.36017 9.15546 7.36017 8.87222C7.36017 8.58898 7.13056 8.35938 6.84732 8.35938C6.56408 8.35938 6.33447 8.58898 6.33447 8.87222C6.33447 9.15546 6.56408 9.38507 6.84732 9.38507Z" fill="#8F8F8F"/>
                          </svg>
                              `,
                            alt: "password",
                            register,
                          },
                        },
                        {
                          containerClass: "mb-0 mt-6",
                          label: {
                            text: "Confirm New Password",
                            htmlFor: "confirmNewPassword",
                          },
                          field: {
                            type: Field.password,
                            id: "confirmNewPassword",
                            name: "confirmNewPassword",
                            placeholder: "************",
                            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <path d="M8.79605 9.38507C9.07929 9.38507 9.3089 9.15546 9.3089 8.87222C9.3089 8.58898 9.07929 8.35938 8.79605 8.35938C8.51281 8.35938 8.2832 8.58898 8.2832 8.87222C8.2832 9.15546 8.51281 9.38507 8.79605 9.38507Z" fill="#8F8F8F"/>
                            <path d="M11.1039 9.28255C11.3871 9.28255 11.6167 9.05295 11.6167 8.7697V6.87216C11.6167 5.74102 10.6964 4.82077 9.56531 4.82077H8.94894V3.01211C8.94894 1.35123 7.56856 0 5.87185 0C4.17515 0 2.79477 1.35123 2.79477 3.01211V4.82077H2.1803C1.04916 4.82077 0.128906 5.74102 0.128906 6.87216V11.0775C0.128906 12.2087 1.04916 13.1289 2.1803 13.1289H9.56531C10.6964 13.1289 11.6167 12.2087 11.6167 11.0775C11.6167 10.7943 11.3871 10.5647 11.1039 10.5647C10.8206 10.5647 10.591 10.7943 10.591 11.0775C10.591 11.6431 10.1309 12.1032 9.56531 12.1032H2.1803C1.61473 12.1032 1.1546 11.6431 1.1546 11.0775V6.87216C1.1546 6.30659 1.61473 5.84647 2.1803 5.84647H9.56531C10.1309 5.84647 10.591 6.30659 10.591 6.87216V8.7697C10.591 9.05295 10.8206 9.28255 11.1039 9.28255ZM7.92325 4.82077H3.82046V3.01211C3.82046 1.91679 4.74072 1.0257 5.87185 1.0257C7.00299 1.0257 7.92325 1.91679 7.92325 3.01211V4.82077Z" fill="#8F8F8F"/>
                            <path d="M4.92398 9.38507C5.20722 9.38507 5.43683 9.15546 5.43683 8.87222C5.43683 8.58898 5.20722 8.35938 4.92398 8.35938C4.64074 8.35938 4.41113 8.58898 4.41113 8.87222C4.41113 9.15546 4.64074 9.38507 4.92398 9.38507Z" fill="#8F8F8F"/>
                            <path d="M3.00064 9.38507C3.28388 9.38507 3.51349 9.15546 3.51349 8.87222C3.51349 8.58898 3.28388 8.35938 3.00064 8.35938C2.7174 8.35938 2.48779 8.58898 2.48779 8.87222C2.48779 9.15546 2.7174 9.38507 3.00064 9.38507Z" fill="#8F8F8F"/>
                            <path d="M6.84732 9.38507C7.13056 9.38507 7.36017 9.15546 7.36017 8.87222C7.36017 8.58898 7.13056 8.35938 6.84732 8.35938C6.56408 8.35938 6.33447 8.58898 6.33447 8.87222C6.33447 9.15546 6.56408 9.38507 6.84732 9.38507Z" fill="#8F8F8F"/>
                          </svg>
                              `,
                            alt: "password",
                            register,
                          },
                        },
                      ],
                    },
                  },
                  {
                    containerClass: "mb-0",
                    field: {
                      type: Field.button,
                      text: "Save Changes",
                      inputType: "submit",
                      className:
                        "rounded-lg   p-4 w-fit h-[50px]  text-white hover:bg-none ",
                      loading,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ];

    return formField;
  };
