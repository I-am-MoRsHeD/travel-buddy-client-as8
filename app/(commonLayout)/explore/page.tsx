import TravelersCard from "@/components/modules/explore/TravelersCard";
import TravelerFilters from "@/components/modules/explore/TravelersFilter";
import Pagination from "@/components/shared/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { queryStringFormatter } from "@/lib/formatters";
import { getTravelers } from "@/services/users/getAllTravelers";
import { IUser } from "@/types/user.interface";


const ExploreTravelersPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const travelers = await getTravelers(queryString);
    const totalPages = Math.ceil(travelers?.meta.total / travelers?.meta.limit);

    return (
        <div className="container mx-auto py-32 px-4 space-y-8 flex flex-col md:flex-row gap-6">

            <TravelerFilters />

            <div className="h-auto border border-primary"></div>
            <div className="w-full flex-1 space-y-5">
                <ScrollArea className="h-[600px] w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {travelers?.data?.map((traveler: IUser) => (
                            <TravelersCard key={traveler.id} traveler={traveler} />
                        ))}
                    </div>
                </ScrollArea>
                <Pagination currentPage={travelers?.meta.page} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default ExploreTravelersPage;