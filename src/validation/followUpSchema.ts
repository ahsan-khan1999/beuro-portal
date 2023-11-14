import { AddFollowUp, AddPostPonedNote, AddRemarks } from "@/enums/follow-up";
import * as yup from "yup";

// Validation for add post-pond follow up
export const generateAddPostPonedValidation = (translate: Function) => {
  return yup.object().shape({
    [AddPostPonedNote.date]: yup.string().required("validation required"),
    [AddPostPonedNote.detail]: yup.string().required("validation required"),
  });
};

// Validation for add remakrs follow up
export const generateAddRemarksValidation = (translate: Function) => {
  return yup.object().shape({
    [AddRemarks.remark]: yup.string().required("validation required"),
  });
};

// Validation for add remakrs follow up
export const generateAddFollowUpValidation = (translate: Function) => {
  return yup.object().shape({
    [AddFollowUp.selectCustomer]: yup.string().required("validation required"),
    [AddFollowUp.title]: yup.string().required("validation required"),
    [AddFollowUp.selectLead]: yup.string().required("validation required"),
    [AddFollowUp.dateAndTime]: yup.string().required("validation required"),
    [AddFollowUp.followUpType]: yup.string().required("validation required"),
    [AddFollowUp.addititionalDetails]: yup
      .string()
      .required("validation required"),
  });
};
