'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { travelStatusInfo, travelTypes } from "@/lib/travelFiltersInfo";
import { COUNTRIES } from "@/lib";
import { Plus } from "lucide-react";
import CreateTravelPlanDialog from "./CreateTravelPlanFormDialog";

const TravelPlanHeader = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [destination, setDestination] = useState(searchParams.get("destination") || "");
    const [travelType, setTravelType] = useState(searchParams.get("travelType") || "");
    const [travelStatus, setTravelStatus] = useState(searchParams.get("travelStatus") || "");
    const [dialogOpen, setIsDialogOpen] = useState(false);

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        setDestination("");
        setTravelType("");
        setTravelStatus("");
        router.push(`/${pathname.includes("my-travel-plans") ? "my-travel-plans" : "travel-plans"}`);
    }

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    return (
        <div className="w-full border-none flex flex-row justify-between">

            <CreateTravelPlanDialog
                open={dialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={() => {
                    router.refresh();
                }}
            />

            {/* filter fields */}
            <div className="flex flex-row gap-4 overflow-x-scroll md:overflow-x-visible">

                {/* Filter by destination */}
                <div className="min-h-[90px]">
                    <Select
                        value={destination}
                        onValueChange={(v) => {
                            setDestination(v);
                            updateQuery("destination", v);
                        }}
                    >
                        <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {
                                COUNTRIES.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter by travel type */}
                <div className="min-h-[90px]">
                    <Select
                        value={travelType}
                        onValueChange={(v) => {
                            setTravelType(v);
                            updateQuery("travelType", v);
                        }}
                    >
                        <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Select travel type" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {
                                travelTypes.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter by travel status */}
                <div className="min-h-[90px]">
                    <Select
                        value={travelStatus}
                        onValueChange={(v) => {
                            setTravelStatus(v);
                            updateQuery("travelStatus", v);
                        }}
                    >
                        <SelectTrigger className="mt-1 w-full">
                            <SelectValue placeholder="Select travel status" />
                        </SelectTrigger>
                        <SelectContent className="border-none">
                            {
                                travelStatusInfo.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>


                {/* Fixed Clear Filters button at bottom */}
                <Button onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>

            {/* create travel plans button */}
            {pathname.includes("my-travel-plans") && (
                <Button onClick={handleOpenDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Travel Plan
                </Button>
            )}
        </div>
    );
};

export default TravelPlanHeader;