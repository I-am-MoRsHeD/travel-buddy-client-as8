/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";

export default function ReviewCard({ review } : {review: any}) {
    return (
        <div className="p-4 bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
                <p className="font-semibold">{review.senderName}</p>
                <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" size={16} />
                    <span>{review.rating}</span>
                </div>
            </div>

            <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
    );
}
