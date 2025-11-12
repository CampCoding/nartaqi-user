import * as yup from "yup";
export const codeSchema = yup.object({
  activationCode: yup
    .string()
    .required("كود التفعيل مطلوب")
    .matches(/^[0-9]{6}$/, "يجب أن يتكون كود التفعيل من 6 أرقام"),
});
