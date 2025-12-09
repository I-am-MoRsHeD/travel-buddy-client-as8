/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerValidateZodSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters long"
    }).max(100, {
        message: "Full name must be at most 100 characters long"
    }),
    email: z.email({
        error: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(100, {
        message: "Password must be at most 100 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"]
});


export const loginValidateZodSchema = z.object({
    email: z.email({
        error: "Email is required"
    }),
    password: z.string({
        error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters long"
    }).max(100, {
        message: "Password must be at most 100 characters long"
    })
})