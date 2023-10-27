import * as yup from "yup";
import { ChangeMailSetting } from "@/enums/setting";

// Validation for edit details
export const generateChangeMailSettingValidationSchema = (translate: Function) => {
  return yup.object().shape({
    [ChangeMailSetting.mailDriver]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailHost]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailPort]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailEncryption]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailUsername]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailPassword]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailFormAddress]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mailFormName]: yup
      .string()
      .required(translate("validation required")),
    [ChangeMailSetting.mail]: yup
      .string()
      .required(translate("validation required")),
  });
};
