import * as yup from "yup";
export const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .min(3, "التعليق يجب ان يكون اكثر من 3 حروف")
    .max(500, "التعليق يجب ان يكون اقل من 500 حرف")
    .required("التعليق مطلوب"),
});
