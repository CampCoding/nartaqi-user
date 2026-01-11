import * as Yup from "yup";
export const LoginSchema = Yup.object().shape({
  phone: Yup.string().required("رقم الهاتف مطلوب "),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});
