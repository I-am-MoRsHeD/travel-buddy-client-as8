"use client";

import { useActionState, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { IUser } from "@/types/user.interface";
import { updateProfile } from "@/services/users/updateProfile";
import { MultiSelect } from "@/components/shared/MultiSelect";
import { COUNTRIES } from "@/lib";
import { travelInterests } from "@/lib/travelFiltersInfo";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/InputFieldError";

interface ErrorItem {
    field: string;
    message: string;
}


export function EditProfileDialog({
    user,
    open,
    onClose,
}: {
    user: IUser;
    open: boolean;
    onClose: () => void;
}) {
    const [state, formAction, pending] = useActionState(updateProfile, {
        success: false,
        error: null,
    });

    const [preview, setPreview] = useState<string | null>(user.profilePhoto || null);

    useEffect(() => {
        if (state && state?.success) {
            toast.success(state?.message || "Profile updated successfully!");
            onClose();
        }
        else if (state && state.error && !state.success) {
            state.error.forEach((element: ErrorItem) => {
                toast.error(element?.message || "Profile update failed. Please try again.");
            });
        }
    }, [state]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form
                    action={formAction}
                    className="space-y-6 max-h-[80vh] overflow-y-auto pr-2"
                >
                    {user && <input type="hidden" name="userId" value={user.id} />}

                    {/* PROFILE PHOTO */}
                    <div className="space-y-2">
                        <Label>Profile Photo</Label>
                        <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                        />
                        <InputFieldError field="file" state={state} />

                        {preview && (
                            <Image
                                src={preview}
                                width={70}
                                height={70}
                                alt="preview"
                                className="rounded-full mt-2"
                            />
                        )}
                    </div>

                    {/* FULL NAME */}
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input name="fullName" defaultValue={user.fullName} />
                        {state.error?.fullName && (
                            <p className="text-red-500 text-sm">{state.error.fullName}</p>
                        )}
                    </div>

                    {/* BIO */}
                    <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea name="bio" rows={4} defaultValue={user.bio || ""} />
                        {state.error?.bio && (
                            <p className="text-red-500 text-sm">{state.error.bio}</p>
                        )}
                    </div>

                    {/* LOCATION */}
                    <div className="space-y-2">
                        <Label>Current Location</Label>
                        <Input
                            name="currentLocation"
                            defaultValue={user.currentLocation || ""}
                        />
                        {state.error?.currentLocation && (
                            <p className="text-red-500 text-sm">
                                {state.error.currentLocation}
                            </p>
                        )}
                    </div>

                    {/* TRAVEL INTERESTS */}
                    <div className="space-y-2">
                        <Label>Travel Interests</Label>
                        <MultiSelect
                            name="travelInterests"
                            options={travelInterests}
                            defaultValues={user.travelInterests || []}
                        />
                        {state.error?.travelInterests && (
                            <p className="text-red-500 text-sm">
                                {state.error.travelInterests}
                            </p>
                        )}
                    </div>

                    {/* VISITED COUNTRIES */}
                    <div className="space-y-2">
                        <Label>Visited Countries</Label>
                        <MultiSelect
                            name="visitedCountries"
                            options={COUNTRIES}
                            defaultValues={user.visitedCountries || []}
                        />
                        {state.error?.visitedCountries && (
                            <p className="text-red-500 text-sm">
                                {state.error.visitedCountries}
                            </p>
                        )}
                    </div>

                    {/* FOOTER BUTTONS */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
