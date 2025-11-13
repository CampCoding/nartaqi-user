import { passwordSchema } from "./SignupSchema.js";
import * as yup from "yup";

export const forgetPasswordSchema = yup.object({
  ...passwordSchema,
});

