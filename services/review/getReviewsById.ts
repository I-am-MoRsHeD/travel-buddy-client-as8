/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";



export const getReviewsById = async (id: string) => {
    try {
        const res = await serverFetch.get(`/review/${id}`, {
            cache: "force-cache",
            next: {
                tags: ["review"]
            }
        });

        const result = await res.json();
        const reviews = result.data;

        return reviews;

    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to get user reviews', { cause: error });
    }
};