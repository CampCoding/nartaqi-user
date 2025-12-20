import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "كلمة المرور القديمة يجب أن تكون 8 أحرف على الأقل")
    .required("كلمة المرور القديمة مطلوبة"),

  newPassword: yup
    .string()
    .min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل")
    .required("كلمة المرور الجديدة مطلوبة")
    .test(
      "not-same-as-old",
      "كلمة المرور الجديدة يجب أن تكون مختلفة عن القديمة",
      function (value) {
        return value !== this.parent.oldPassword;
      }
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "كلمتا المرور غير متطابقتين")
    .required("تأكيد كلمة المرور مطلوب"),
});
