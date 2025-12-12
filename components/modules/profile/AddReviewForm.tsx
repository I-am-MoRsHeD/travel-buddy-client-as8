/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { serverFetch } from "@/lib/server-fetch";

export default function AddReviewForm({ userId }: { userId: string }) {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const submitReview = async () => {
        const toastId = toast.loading("Submitting your review...");

        const payload = {
            rating: Number(rating),
            description: comment
        };

        try {
            const res = await serverFetch.post(`/review/${userId}`, {
                next: {
                    tags: ["review"]
                },
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            console.log(result);

            if (result.success) {
                toast.success(result.message, { id: toastId });
            } else {
                toast.error(result.message || "Failed to give review. Try again", { id: toastId });
            }

        } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Failed to give review. Try again", { id: toastId });
        }

    };

    return (
        <div className="bg-muted p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold">Write a Review</h3>

            <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
            </Select>

            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
            />

            <Button className="w-full" onClick={submitReview} disabled={!rating || !comment}>
                Submit Review
            </Button>
        </div>
    );
}
