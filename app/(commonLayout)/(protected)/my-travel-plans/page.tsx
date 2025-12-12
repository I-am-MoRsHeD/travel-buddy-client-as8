import TravelPlanCard from "@/components/modules/travel/TravelPlanCard";
import TravelPlanHeader from "@/components/modules/travel/TravelPlanHeader";
import Pagination from "@/components/shared/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyTravelPlans } from "@/services/travel-plans/getMyTravelPlans";
import { ITravelPlan } from "@/types/travelPlan.interface";


const MyTravelPlansPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const travelPlans = await getMyTravelPlans(queryString);

    const hasData = travelPlans?.data && travelPlans?.data.length > 0;
    const totalPages = Math.ceil(travelPlans?.meta.total / travelPlans?.meta.limit);

    return (
        <div className="container mx-auto py-24">

            <TravelPlanHeader />
            {!hasData && (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                    <h2 className="text-lg font-semibold">No Travel Plans Found</h2>
                    
                </div>
            )}
            <div className="w-full flex-1 space-y-5">
                <ScrollArea className="h-[600px] w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {travelPlans?.data?.map((travelPlan: ITravelPlan) => (
                            <TravelPlanCard key={travelPlan.id} travelPlan={travelPlan} />
                        ))}
                    </div>
                </ScrollArea>
                <Pagination currentPage={travelPlans?.meta.page} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default MyTravelPlansPage;