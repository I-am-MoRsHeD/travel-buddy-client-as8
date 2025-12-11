/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { userUpdateProfileZodSchema } from "@/zod/user.validation";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateProfile(prev: any, formData: FormData) {
    try {
        const userId = formData.get("userId") as string;
        const rawData = {
            fullName: formData.get("fullName"),
            bio: formData.get("bio"),
            currentLocation: formData.get("currentLocation"),
            travelInterests: formData.getAll("travelInterests"),
            visitedCountries: formData.getAll("visitedCountries"),
        };

        const imageFile = formData.get("profilePhoto") as File | null;
        if (!imageFile) {
            throw new Error("Profile photo is required");
        }

        if (zodValidators(rawData, userUpdateProfileZodSchema).success === false) {
            return zodValidators(rawData, userUpdateProfileZodSchema);
        }

        const validatedPayload = zodValidators(rawData, userUpdateProfileZodSchema).data;


        const newFormData = new FormData();

        newFormData.append('data', JSON.stringify(validatedPayload));

        if (imageFile && imageFile.size > 0) {
            newFormData.append("file", imageFile as Blob)
        }

        const res = await serverFetch.patch(`/user/${userId}`, {
            body: newFormData
        });

        const result = await res.json();
        console.log(result);
        if (result.success) {
            revalidateTag("user-info", "max");
            revalidatePath("/profile");
        }

        return result;


        return { success: true, error: null };
    } catch (err: any) {
        if (err?.digest?.startsWith("NEXT_REDIRECT")) {
            throw err;
        }
        return {
            success: false,
            error: { message: err.message }
        };
    }
}
