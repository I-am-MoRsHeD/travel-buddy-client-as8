'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Star } from "lucide-react";
import Link from "next/link";

interface TravelPlanCardProps {
    travelPlan: ITravelPlan;
};

const TravelPlanCard = ({ travelPlan }: TravelPlanCardProps) => {
    const { user } = useUser();
    const isAuthor = user?.id === travelPlan?.creator_id;

    const completedStatus = travelPlan?.travelStatus === "COMPLETED" ? "text-background bg-green-600" :
        travelPlan?.travelStatus === "ONGOING" ? "bg-primary/20 text-muted-foreground" :
            travelPlan?.travelStatus === "UPCOMING" ? "bg-primary/10 text-primary" : travelPlan?.travelStatus === "POSTPONED" ? "bg-red-100 text-red-800" : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl shadow-md shadow-primary/30 w-full"
        >
            <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col gap-8">
                    <div className="flex flex-row justify-between items-start grow">
                        <div className="space-y-2">
                            <p className="text-sm">Destination: {travelPlan.destination}</p>
                            <p className="text-sm">Travel type: {travelPlan.travelType}</p>
                            <p className="text-sm">Start: {travelPlan?.startDate?.toLocaleString()}</p>
                            <p className="text-sm">End: {travelPlan?.endDate?.toLocaleString()}</p>
                            <p className="text-sm">Budget: ${travelPlan?.budgetRange}</p>
                            <p className="text-sm">Number of Travelers Interested: {travelPlan?.interestedMembers?.length}</p>
                            <div className="text-sm flex items-center gap-4">Created by:
                                {travelPlan?.creator?.fullName}
                                <div className="flex items-center gap-1">
                                    (<Star size={18} className="text-primary/70" />
                                    <span>{travelPlan?.creator?.avgRating || 0}</span>)
                                </div>
                            </div>
                        </div>
                        <Badge className={`px-5 py-1 bg-primary/10 border rounded-full text-sm 
                            ${completedStatus}`}>{travelPlan?.travelStatus}</Badge>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <Link href={`/travel-plans/${travelPlan.id}`}>
                            <Button>View Details</Button>
                        </Link>
                        {isAuthor && (
                            <>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TravelPlanCard;