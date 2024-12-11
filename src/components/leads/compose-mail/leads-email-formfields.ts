import { Field } from "@/enums/form";
import { FormField, GenerateLeadFormField } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const LeadEmailFormField: GenerateLeadFormField = (
  register,
  loading,
  control,
  onClick,
  onBack,
  content,
  contentDetails,
  onContentSelect,
  attachements,
  setAttachements,
  offerDetails,
  isMoreEmail,
  setIsMoreEmail,
  setValue
) => {
  const router = useRouter();
  const isMail = router?.query?.isMail;
  const { t: translate } = useTranslation();
  const formField: FormField[] = [
    {
      field: {
        type: Field.div,
        id: "div-field",
        className: "relative",
        children: [
          {
            field: {
              type: Field.div,
              id: "div-field",
              children: [
                {
                  field: {
                    type: Field.div,
                    id: "div-field",
                    className:
                      "grid grid-cols-1 xl:grid-cols-12 gap-x-3 gap-y-5 xl:gap-y-0 rounded-t-lg px-2 pt-3 pb-5 bg-[#EDF4FF]",
                    children: [
                      {
                        containerClass: "mb-0 col-span-4",
                        label: {
                          text: `${translate(
                            "contracts.contract_email_preview.email"
                          )}`,
                          htmlFor: "email",
                          className: "mb-[10px]",
                        },
                        field: {
                          type: Field.input,
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          inputType: "email",
                          id: "email",
                          name: "email",
                          placeholder: "email@domain.com",
                          register,
                        },
                      },
                      {
                        containerClass: "col-span-1 flex my-auto",
                        field: {
                          type: Field.div,
                          className: "flex space-x-2 items-center",
                          id: "text",
                          children: [
                            {
                              containerClass: "mb-0",
                              field: {
                                type: Field.span,
                                text: `Cc`,
                                containerClassName:
                                  "underline text-[14px] text-[#393939] font-normal cursor-pointer",
                                id: "cc",
                                onClick: () => {
                                  if (setValue) {
                                    setValue("cc", "");
                                  }

                                  setIsMoreEmail({
                                    ...isMoreEmail,
                                    isCc: !isMoreEmail?.isCc,
                                  });
                                },
                              },
                            },

                            {
                              containerClass: "mb-0",
                              field: {
                                type: Field.span,
                                text: `Bcc`,
                                containerClassName:
                                  "underline text-[14px] text-[#393939] font-normal cursor-pointer",
                                id: "bcc",
                                onClick: () => {
                                  if (setValue) {
                                    setValue("bcc", "");
                                  }
                                  setIsMoreEmail({
                                    ...isMoreEmail,
                                    isBcc: !isMoreEmail?.isBcc,
                                  });
                                },
                              },
                            },
                          ],
                        },
                      },

                      {
                        containerClass: "col-span-7",
                        label: {
                          text: `${translate(
                            "contracts.contract_email_preview.content"
                          )}`,
                          htmlFor: "content",
                          className: "mb-[10px]",
                        },
                        field: {
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          type: Field.select,
                          id: "content",
                          name: "content",
                          options:
                            content?.map((item) => ({
                              label: item.contentName,
                              value: item.id,
                            })) || [],
                          control,
                          onItemChange: onContentSelect,
                          value:
                            (contentDetails?.id && contentDetails?.id) ||
                            offerDetails?.content?.id ||
                            "",
                        },
                      },

                      (isMoreEmail?.isCc && {
                        containerClass: "mb-0 mt-5 col-span-4",
                        label: {
                          text: `Cc`,
                          htmlFor: "cc",
                          className: "mb-[10px]",
                        },
                        field: {
                          type: Field.input,
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          inputType: "email",
                          id: "cc",
                          name: "cc",
                          placeholder: "email@domain.com",
                          register,
                        },
                      }) || {
                        containerClass: "hidden",
                        label: {
                          text: `Cc`,
                          htmlFor: "cc",
                          className: "mb-[10px]",
                        },
                        field: {
                          type: Field.input,
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          inputType: "email",
                          id: "cc",
                          name: "cc",
                          placeholder: "email@domain.com",
                          register,
                        },
                      },
                      (isMoreEmail?.isBcc && {
                        containerClass: "mb-0 mt-5 col-span-4",
                        label: {
                          text: `Bcc`,
                          htmlFor: "bcc",
                          className: "mb-[10px]",
                        },
                        field: {
                          type: Field.input,
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          inputType: "email",
                          id: "bcc",
                          name: "bcc",
                          placeholder: "email@domain.com",
                          register,
                        },
                      }) || {
                        containerClass: "hidden",
                        label: {
                          text: `Bcc`,
                          htmlFor: "bcc",
                          className: "mb-[10px]",
                        },
                        field: {
                          type: Field.input,
                          className:
                            "!p-4 !border-[#EBEBEB] focus:!border-primary",
                          inputType: "email",
                          id: "bcc",
                          name: "bcc",
                          placeholder: "email@domain.com",
                          register,
                        },
                      },
                    ],
                  },
                },
                {
                  containerClass: "mb-0 col-span-2 px-2 pb-5 bg-[#EDF4FF]",
                  label: {
                    text: `${translate(
                      "contracts.contract_email_preview.subject"
                    )}`,
                    htmlFor: "subject",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.input,
                    className: "!p-4 !border-[#EBEBEB] focus:!border-primary",
                    inputType: "text",
                    id: "subject",
                    name: "subject",
                    placeholder: "",
                    register,
                  },
                },
                {
                  containerClass: "mb-0 px-2 pb-5 bg-[#EDF4FF]",
                  label: {
                    text: `${translate(
                      "contracts.contract_email_preview.description"
                    )}`,
                    htmlFor: "description",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.ckEditor,
                    className: "!p-4 !border-[#BFBFBF] focus:!border-primary",
                    id: "description",
                    name: "description",
                    control,
                    value:
                      (contentDetails?.id &&
                        contentDetails?.offerContent?.body) ||
                      offerDetails?.content?.offerContent?.body,
                  },
                },
                {
                  containerClass: "px-2 rounded-b-lg pb-3 bg-[#EDF4FF]",
                  label: {
                    text: `${translate(
                      "contracts.contract_email_preview.attachments"
                    )}`,
                    htmlFor: "attachments",
                    className: "mb-[10px]",
                  },
                  field: {
                    type: Field.dragAndDropPdfField,
                    id: "attachments",
                    isOpenedFile: false,
                    text: translate("common.image_upload_heading"),
                    fileSupported: translate("common.file_support"),
                    name: "attachments",
                    control,
                    attachements,
                    setAttachements,
                  },
                },
              ],
            },
          },
          {
            containerClass:
              "mb-0 fixed right-[92px] top-3/4 bg-[#00000014] p-6 rounded-lg",
            field: {
              type: Field.button,
              id: "button",
              text:
                (isMail &&
                  `${translate("contracts.contract_email_preview.send")}`) ||
                `${translate("contracts.contract_email_preview.next_button")}`,
              inputType: "submit",
              className:
                "rounded-lg px-4 w-[152px] h-[50px] text-white hover:bg-none",
              loading,
            },
          },
        ],
      },
    },

    // {
    //   containerClass: "mt-[30px]",
    //   field: {
    //     type: Field.div,
    //     id: "div-field",
    //     className: "flex items-center justify-end space-x-[18px]",
    //     children: [
    //       // {
    //       //   containerClass: "mb-0",
    //       //   field: {
    //       //     type: Field.button,
    //       //     id: "button",
    //       //     text: `${translate(
    //       //       "contracts.contract_email_preview.back_button"
    //       //     )}`,
    //       //     inputType: "button",
    //       //     className:
    //       //       "rounded-lg border border-[#C7C7C7] bg-white p-4 w-[92px] h-[50px]   text-dark hover:bg-none",
    //       //     onClick: onBack,
    //       //   },
    //       // },
    //       {
    //         containerClass: "mb-0",
    //         field: {
    //           type: Field.button,
    //           id: "button",
    //           text:
    //             (isMail &&
    //               `${translate("contracts.contract_email_preview.send")}`) ||
    //             `${translate("contracts.contract_email_preview.next_button")}`,
    //           inputType: "submit",
    //           className:
    //             "rounded-lg px-4 w-[152px] h-[50px]  text-white hover:bg-none",
    //           loading,
    //         },
    //       },
    //     ],
    //   },
    // },
  ];

  return formField;
};
