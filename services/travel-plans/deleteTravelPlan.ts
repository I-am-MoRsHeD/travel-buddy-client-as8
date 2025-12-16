/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';


import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath, revalidateTag } from "next/cache";


export async function deleteTravelPlan(id: string) {
    try {
        const response = await serverFetch.delete(`/travel/${id}`)
        const result = await response.json();

        if (result.success) {
            revalidatePath('my-travel-plans');
            revalidatePath("travel-plans");
            revalidateTag("travel-plans", "max")
        };

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}