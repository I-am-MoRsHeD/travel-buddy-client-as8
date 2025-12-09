"use server";

import { deleteCookie } from "@/services/auth/tokenHandlers";


export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    return {
        success: true,
        message: "Logged out successfully"
    };
};