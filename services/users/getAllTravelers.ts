/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";



export const getTravelers = async (queryString: string) => {
    try {
        const res = await serverFetch.get(`/user/all${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: {
                tags: ["travelers"]
            }
        });

        const result = await res.json();
        const travelers = result.data;

        return travelers;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
};