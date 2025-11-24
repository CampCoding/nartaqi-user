import * as Yup from "yup";
export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("الاسم الأول مطلوب"),
  middleName: Yup.string().required("الاسم الأوسط مطلوب"),
  lastName: Yup.string().required("اسم العائلة مطلوب"),
});
