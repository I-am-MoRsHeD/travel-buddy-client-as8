"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

export default function AddReviewForm({ userId }) {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const submitReview = () => {
        // You implement API call
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

            <Button className="w-full" onClick={submitReview}>
                Submit Review
            </Button>
        </div>
    );
}
