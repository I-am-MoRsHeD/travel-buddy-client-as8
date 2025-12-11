/* eslint-disable @typescript-eslint/no-explicit-any */

import ReviewsSection from "@/components/modules/profile/ReviewSection";
import UserBio from "@/components/modules/profile/UserBio";
import UserHeader from "@/components/modules/profile/UserHeader";
import UserStats from "@/components/modules/profile/UserStats";
import { getUser } from "@/services/users/getUser";
import { getUserById } from "@/services/users/getUserById";


const UserProfilePage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const author = await getUser();
    const userInfo = await getUserById(id);

    const isOwner = author?.id === userInfo?.id;

    return (
        <div className="container mx-auto py-32 space-y-10">
            <UserHeader user={userInfo} isOwner={isOwner ? true : false} />

            <UserStats user={userInfo} />

            <UserBio bio={userInfo?.bio} />

            <ReviewsSection
                userId={userInfo?.id as string}
                reviews={userInfo?.reviewsReceived}
                isOwner={isOwner ? true : false}
            />
        </div>
    );
};

export default UserProfilePage;