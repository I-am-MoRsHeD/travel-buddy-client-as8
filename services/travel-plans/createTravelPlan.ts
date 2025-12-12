/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { createTravelPlanZodSchema } from "@/zod/travelPlan.validation";
import { revalidatePath, revalidateTag } from "next/cache";


export const createTravelPlan = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const data = Object.fromEntries(formData.entries());

        const payload = {
            destination: data.destination,
            startDate: data.startDate,
            endDate: data.endDate,
            budgetRange: Number(data.budgetRange),
            travelType: data.travelType,
            description: data.description,
        };

        if (zodValidators(payload, createTravelPlanZodSchema).success === false) {
            return zodValidators(payload, createTravelPlanZodSchema);
        }

        const validatedPayload = zodValidators(payload, createTravelPlanZodSchema).data;

        const res = await serverFetch.post(`/travel/create`, {
            next: {
                tags: ["travel-plans"]
            },
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(validatedPayload),
            credentials: 'include',
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("travel-plans", "max");
            revalidatePath("/my-travel-plans");
        }

        return result;
    } catch (error : any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        return {
            success: false,
            error: { message: error.message }
        };
    }

};