"use client";

import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import TravelInterestTags from "./TravelInterestTags";
import { IUser } from "@/types/user.interface";
import { Country, TravelInterest } from "@/types/enum";
import Image from "next/image";
import VisitedCountries from "./VisitedCountries";
import { EditProfileDialog } from "./EditProfileDialog";
import { useState } from "react";

interface UserHeaderProps {
    user: IUser;
    isOwner?: boolean;
}

export default function UserHeader({ user, isOwner }: UserHeaderProps) {
    const [editModalOpen, setEditModalOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">

            {/* Profile Photo */}
            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-200">
                <Image
                    src={user?.profilePhoto ? user?.profilePhoto : '/images/blank-profile-picture.png'}
                    fill
                    alt={user?.fullName}
                    className="object-cover"
                />
            </div>

            {/* Name + rating */}
            <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">{user?.fullName}</h1>

                    {isOwner && (
                        <Button onClick={() => setEditModalOpen(true)}>Edit Profile</Button>
                    )}
                </div>

                {/* Rating + location */}
                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star size={18} className="text-primary/70" />
                        <span>{user?.avgRating || 0}</span>
                    </div>

                    {user?.currentLocation && (
                        <div className="flex items-center gap-1">
                            <MapPin size={18} />
                            <span>{user?.currentLocation}</span>
                        </div>
                    )}
                </div>

                {/* travel Interests */}
                <TravelInterestTags interests={user?.travelInterests as TravelInterest[]} />
                {/* visited countries */}
                <VisitedCountries countries={user?.visitedCountries as Country[]} />
            </div>

            <EditProfileDialog
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                user={user}
            />
        </div>
    );
}
