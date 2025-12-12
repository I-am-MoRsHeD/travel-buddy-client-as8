"use client";

import { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { travelTypes } from "@/lib/travelFiltersInfo";
import { COUNTRIES } from "@/lib";
import { createTravelPlan } from "@/services/travel-plans/createTravelPlan";
import { toast } from "sonner";
import { ErrorItem } from "@/types";


interface CreateTravelPlanDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateTravelPlanDialog({
    open,
    onClose,
    onSuccess,
}: CreateTravelPlanDialogProps) {
    const [state, formAction, pending] = useActionState(createTravelPlan, null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = today.toLocaleDateString("en-CA");

    useEffect(() => {
        if (state && state?.success) {
            toast.success(state?.message || "Travel plan created successfully!");
            onSuccess();
            onClose();
        }
        else if (state && state.error && !state.success) {
            state.error.forEach((element: ErrorItem) => {
                toast.error(element?.message || "Travel creation failed. Please try again.");
            });
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:min-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Create Travel Plan</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="space-y-4">

                    {/* Budget Range + Travel Type */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field>
                            <FieldLabel>Destination</FieldLabel>
                            <Select name="destination">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COUNTRIES.map((country) => (
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError field="destination" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel>Budget Range</FieldLabel>
                            <Input
                                name="budgetRange"
                                placeholder="$500"

                            />
                            <InputFieldError field="budgetRange" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel>Travel Type</FieldLabel>
                            <Select name="travelType">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {travelTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputFieldError field="travelType" state={state} />
                        </Field>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>Start Date</FieldLabel>
                            <Input
                                type="date"
                                name="startDate"
                                min={minDate}
                            />
                            <InputFieldError field="startDate" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel>End Date</FieldLabel>
                            <Input
                                type="date"
                                name="endDate"
                                min={minDate}
                            />
                            <InputFieldError field="endDate" state={state} />
                        </Field>
                    </div>

                    {/* Description */}
                    <Field>
                        <FieldLabel>Short Description</FieldLabel>
                        <Textarea
                            name="description"
                            placeholder="Write a short description..."
                        />
                        <InputFieldError field="description" state={state} />
                    </Field>

                    {/* Buttons */}
                    <div className="pt-2">
                        <Button
                            disabled={pending}
                            type="submit"
                            className="w-full"
                        >
                            {pending ? "Creating..." : "Create Plan"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
