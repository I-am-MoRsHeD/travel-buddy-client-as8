import { Country, TravelInterest, UserRole, UserStatus } from "./enum";



export interface IUser {
    id?: string;
    fullName: string;
    email: string;
    password: string;
    profilePhoto?: string | null;
    role?: UserRole;
    avgRating?: number;
    isPremiumTaken?: boolean;
    bio?: string | null;
    status: UserStatus;
    travelInterests?: TravelInterest[];
    visitedCountries?: Country[];
    currentLocation?: string;
    travelPlans?: string[];
    reviewsReceived: [];
}