import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(5).max(100),
    last_name: z.string().min(5).max(100).optional(),
    email: z.string().email(),
    phone: z.string().min(5).max(20),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    first_name: z.string().min(5).max(100).optional(),
    last_name: z.string().min(5).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(5).max(20).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(5).max(100).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(5).max(20).optional(),
    page: z.number().positive().min(1),
    per_page: z.number().positive().max(100),
  });
}
