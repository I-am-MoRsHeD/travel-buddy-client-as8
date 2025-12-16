import { Country, TravelType } from "@/types/enum";
import z from "zod";


export const createTravelPlanZodSchema = z.object({
    destination: z.enum(Country, {
        error: "Destination is required"
    }),
    startDate: z.string({
        error: "Select an start date"
    }).or(z.date()),
    endDate: z.string({
        error: "Select an end date"
    }).or(z.date()),
    budgetRange: z.number({
        error: "Budget range is required"
    }).min(100, "Budget has to be at least 100"),
    travelType: z.enum(TravelType, {
        error: "Travel type is required"
    }),
    description: z.string({
        error: "Description is required"
    }).min(1, "At least 1 word").max(500, "Maximum 500 words"),
}).superRefine((data, ctx) => {
    if (data.endDate <= data.startDate) {
        ctx.addIssue({
            path: ["endDate"],
            message: "End date must be after start date",
            code: z.ZodIssueCode.custom,
        });
    }
});;

export const updateTravelPlanZodSchema = z.object({
    destination: z.enum(Country, {
        error: "Destination is required"
    }).optional(),
    startDate: z.coerce.date({
        error: "Select a start date",
    }).optional(),
    endDate: z.coerce.date({
        error: "Select an end date",
    }).optional(),
    budgetRange: z.number({
        error: "Budget range is required"
    }).int().min(100, "Budget has to be at least 100").optional(),
    travelType: z.enum(TravelType, {
        error: "Travel type is required"
    }).optional(),
    description: z.string({
        error: "Description is required"
    }).min(1, "At least 1 word").max(500, "Maximum 500 words").optional(),
})

// export const updateTravelPlanZodSchema = z.object({
//     destination: z.enum(Country, {
//         error: "Destination is required"
//     }).optional(),
//     startDate: z.string({
//         error: "Select an start date"
//     }).or(z.date()).optional(),
//     endDate: z.string({
//         error: "Select an end date"
//     }).or(z.date()).optional(),
//     budgetRange: z.number({
//         error: "Budget range is required"
//     }).min(100, "Budget has to be at least 100").optional(),
//     travelType: z.enum(TravelType, {
//         error: "Travel type is required"
//     }).optional(),
//     description: z.string({
//         error: "Description is required"
//     }).min(1, "At least 1 word").max(500, "Maximum 500 words").optional(),
// }).superRefine((data, ctx) => {
//     if (data?.endDate && data?.startDate && data.endDate <= data.startDate) {
//         ctx.addIssue({
//             path: ["endDate"],
//             message: "End date must be after start date",
//             code: z.ZodIssueCode.custom,
//         });
//     };
// });