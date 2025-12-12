/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { registerValidateZodSchema } from "@/zod/auth.validation";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get("password"),
        };

        if (zodValidators(payload, registerValidateZodSchema).success === false) {
            return zodValidators(payload, registerValidateZodSchema);
        }

        const validatedPayload = zodValidators(payload, registerValidateZodSchema);

        const registerData = {
            fullName: validatedPayload.data?.fullName,
            email: validatedPayload?.data?.email,
            password: validatedPayload?.data?.password,
        };

        const res = await serverFetch.post(`/user/register`, {
            next: {
                tags: ["user"]
            },
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return { error: "Registration failed!" }
    }
};