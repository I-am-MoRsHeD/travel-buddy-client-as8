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
});