import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import { IUser } from "@/types/user.interface";
import Link from "next/link";

export default function TravelersCard({ traveler }: { traveler: IUser }) {
    return (
        <Card className="rounded-xl md:p-4 h-60 shadow-md shadow-primary/20 border-dashed border-primary/30">
            <CardContent className="flex gap-4">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                        src={traveler.profilePhoto || "/images/blank-profile-picture.png"}
                        width={80}
                        height={80}
                        alt="profile"
                        className="object-cover"
                    />
                </div>

                {/* User Info */}
                <div className="flex-1 space-y-1">
                    <p className="font-semibold flex items-center gap-2">
                        {traveler?.fullName}
                        {traveler?.isPremiumTaken ? (
                            <BadgeCheck className="text-blue-600" size={18} />
                        ) : (
                            <span className="text-xs text-red-600">(Not verified)</span>
                        )}
                    </p>

                    <p className="text-sm flex gap-1 items-center">
                        <Star size={16} className="text-yellow-500" />
                        {traveler?.avgRating} ({traveler?.reviewsReceived?.length} reviews)
                    </p>

                    <p className="text-sm">{traveler?.currentLocation}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {traveler?.travelInterests?.map((item: string, i: number) => (
                            <Badge variant="secondary" key={i}>
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="justify-end items-end h-full">
                <Link href={`/profile/${traveler.id}`}>
                    <Button>View profile</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
