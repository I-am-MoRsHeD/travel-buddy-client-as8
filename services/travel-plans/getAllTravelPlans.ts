/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";



export const getAllTravelPlans = async (queryString: string) => {
    try {
        const res = await serverFetch.get(`/travel/all${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: {
                tags: ["travel-plans"]
            },
        });

        const result = await res.json();
        const travelPlans = result.data;

        return travelPlans;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong in travel plans fetching.'}`
        };
    }
};