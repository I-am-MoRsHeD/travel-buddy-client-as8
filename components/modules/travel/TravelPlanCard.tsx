'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Star } from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/formatters";
import TravelPlanFormDialog from "./TravelPlanFormDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { toast } from "sonner";
import { deleteTravelPlan } from "@/services/travel-plans/deleteTravelPlan";

interface TravelPlanCardProps {
    travelPlan: ITravelPlan;
};

const TravelPlanCard = ({ travelPlan }: TravelPlanCardProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [dialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTravelPlan, setSelectedTravelPlan] = useState<ITravelPlan | null>(null);
    const [deletingTravelPlan, setDeletingTravelPlan] = useState<ITravelPlan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { user } = useUser();
    const isAuthor = user?.id === travelPlan?.creator_id;

    const completedStatus = travelPlan?.travelStatus === "COMPLETED" ? "text-background bg-green-600" :
        travelPlan?.travelStatus === "ONGOING" ? "bg-primary/20 text-muted-foreground" :
            travelPlan?.travelStatus === "UPCOMING" ? "bg-primary/10 text-primary" : travelPlan?.travelStatus === "POSTPONED" ? "bg-red-100 text-red-800" : "";

    const handleOpenEditDialog = (plan: ITravelPlan) => {
        setIsDialogOpen(true);
        setSelectedTravelPlan(plan);
    };

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (plan: ITravelPlan) => {
        setDeletingTravelPlan(plan);
    };

    const confirmDelete = async () => {
        if (!deletingTravelPlan) return;

        setIsDeleting(true);
        const result = await deleteTravelPlan(deletingTravelPlan.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Travel plan deleted successfully");
            setDeletingTravelPlan(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete travel plan");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl shadow-md shadow-primary/30 w-full"
        >

            <TravelPlanFormDialog
                open={dialogOpen}
                onClose={() => setIsDialogOpen(false)}
                travelPlan={selectedTravelPlan!}
                onSuccess={() => {
                    router.refresh();
                }}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingTravelPlan}
                onOpenChange={(open) => !open && setDeletingTravelPlan(null)}
                onConfirm={confirmDelete}
                title="Delete Admin"
                description={`Are you sure you want to delete travel Plan? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

            <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col gap-8">
                    <div className="flex flex-row justify-between items-start grow">
                        <div className="space-y-2">
                            <p className="text-sm">Destination: {travelPlan.destination}</p>
                            <p className="text-sm">Travel type: {travelPlan.travelType}</p>
                            <p className="text-sm">Start: {formatDateTime(travelPlan?.startDate)}</p>
                            <p className="text-sm">End: {formatDateTime(travelPlan?.endDate)}</p>
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
                                <Button onClick={() => handleOpenEditDialog(travelPlan)}>Edit</Button>
                                <Button onClick={() => handleDelete(travelPlan)}>Delete</Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TravelPlanCard;