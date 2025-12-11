import { IUser } from "@/types/user.interface";




export default function UserStats({ user }: {user : IUser}) {
    const stats = [
        { label: "Travel Plans", value: user.travelPlans?.length ?? 0 },
        { label: "Reviews", value: user.reviewsReceived?.length ?? 0 },
    ];

    return (
        <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
                <div key={s.label} className="bg-muted p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-sm text-gray-600">{s.label}</p>
                </div>
            ))}
        </div>
    );
}
