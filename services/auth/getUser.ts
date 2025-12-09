/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";



export const getUser = async (): Promise<IUser> => {
    try {
        const res = await serverFetch.get("/user/me", {
            cache: "force-cache",
            next: {
                tags: ["user-info"]
            }
        });

        const result = await res.json();
        const userInfo: IUser = result.data;

        return userInfo;

    } catch (error: any) {
        console.log(error);
        throw new Error('Failed to get user info', { cause: error });
    }
};