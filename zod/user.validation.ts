import { UserStatus } from '@/types/enum';
import z from 'zod';


export const userUpdateProfileZodSchema = z.object({
    fullName: z.string({
        error: "Full name is required"
    }).optional(),
    bio: z.string({ error: "Bio is required" }).min(1, "At least 1 word about yourself").max(300, "Maximum of 300 words about yourself").optional(),
    travelInterests: z.array(
        z.string().min(1, "Interest cannot be empty")
    )
        .min(1, "At least 1 interest is required")
        .max(10, "Maximum of 10 interests allowed")
        .optional(),
    visitedCountries: z.array(
        z.string().min(1, "Visited countries cannot be empty")
    )
        .min(1, "At least 1 visited country is required")
        .max(30, "Maximum of 30 visited countries allowed")
        .optional(),
    currentLocation: z.string({
        error: "Current Location is required"
    }).min(1, "Current Location is required").max(100, "Current location must be maximum of 100 words").optional(),
    status: z.enum(Object.values(UserStatus) as [string]).optional(),
    profilePhoto: z.string().optional()
});