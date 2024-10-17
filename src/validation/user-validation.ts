import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(5).max(50),
    password: z.string().min(5).max(50),
    name: z.string().min(5).max(100),
  });
}
