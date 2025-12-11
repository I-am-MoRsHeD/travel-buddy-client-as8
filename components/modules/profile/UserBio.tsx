export default function UserBio({ bio } : { bio?: string | null }) {
    return (
        <div className="bg-muted p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-gray-700">
                {bio || "This user has not added a bio yet."}
            </p>
        </div>
    );
}
