/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";

interface ReviewsSectionProps {
    userId: string;
    reviews: any[];
    isOwner: boolean;
}

export default function ReviewsSection({ userId, reviews, isOwner }: ReviewsSectionProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Reviews</h2>

            {/* Review List */}
            <div className="space-y-4">
                {reviews?.length ? (
                    reviews.map((r) => <ReviewCard key={r.id} review={r} />)
                ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                )}
            </div>

            {/* Others can review */}
            {!isOwner && <AddReviewForm userId={userId} />}
        </div>
    );
}
