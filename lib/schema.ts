import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(8, "Must be a valid password"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Must be a valid email"),
    firstName: z.string().min(2, "Min. 2 characters"),
    lastName: z.string().min(2, "Min. 1 character"),
    password: z
      .string()
      .min(6, "Min. 6 characters")
      .refine(
        (password) => /[A-Z]/.test(password),
        "Must contain an uppercase character",
      )
      .refine(
        (password) => /[0-9]/.test(password),
        "Must contain a numeric character",
      )
      .refine(
        (password) => /\W|_/.test(password),
        "Must contain a special character",
      ),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  username: z.string().min(6, "Min. 6 characters"),
  avatar: z.string(),
});
