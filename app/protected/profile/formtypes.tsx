import { z } from "zod";

// Hooks cannot be conditional rendered
export const form_schema = z.object({
  user_nit: z.string().min(5).max(100),
  user_name: z.string().min(2).max(50),
  user_lastname: z.string().min(2).max(50),
  date_of_birth: z.date({ required_error: "Campo requerido." }),
  phone_number: z.string().min(10).max(10),
});




