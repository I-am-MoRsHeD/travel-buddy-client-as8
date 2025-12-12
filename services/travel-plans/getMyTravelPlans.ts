/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";



export const getMyTravelPlans = async (queryString: string) => {
    try {
        const res = await serverFetch.get(`/travel/me${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: {
                tags: ["travel-plans"]
            },
            credentials: "include",
        });

        const result = await res.json();
        const travelPlans = result.data;

        return travelPlans;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong in my travel plans fetching.'}`
        };
    }
};