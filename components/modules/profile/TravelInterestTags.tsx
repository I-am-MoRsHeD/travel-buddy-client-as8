import { Badge } from "@/components/ui/badge";
import { TravelInterest } from "@/types/enum";

export default function TravelInterestTags({ interests }: { interests: TravelInterest[] }) {
    if (!interests?.length) return null;

    return (
        <div className="mt-3">
            <h3 className="font-semibold mb-2">Interested Travel Types</h3>
            <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                    <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                        {i}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
