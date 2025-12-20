import * as yup from "yup";
export const passwordSchema = {
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تحتوي على ٨ أحرف على الأقل"),

  confirmPassword: yup
    .string()
    .required("تأكيد كلمة المرور مطلوب")
    .oneOf([yup.ref("password"), null], "كلمة المرور غير متطابقة"),
};

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required("الاسم الأول مطلوب")
    .min(2, "الاسم الأول يجب أن يحتوي على حرفين على الأقل"),

  middleName: yup
    .string()
    .required("الاسم الأوسط مطلوب")
    .min(2, "الاسم الأوسط يجب أن يحتوي على حرفين على الأقل"),

  lastName: yup
    .string()
    .required("اسم العائلة مطلوب")
    .min(2, "اسم العائلة يجب أن يحتوي على حرفين على الأقل"),

  gender: yup
    .string()
    .oneOf(["male", "female"], "يرجى اختيار النوع")
    .required("النوع مطلوب"),

  phone: yup
    .string()
    .required("رقم الجوال مطلوب")
    .matches(/^[0-9]{9,14}$/, "رقم الجوال غير صحيح"),
  ...passwordSchema,
});
