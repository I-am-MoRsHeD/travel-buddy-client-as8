import PublicNavbr from "@/components/shared/PublicNavbar";
import React from "react";

interface CommonLayoutProps {
    children: React.ReactNode
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div>
            <PublicNavbr />
            {children}
        </div>
    );
};

export default CommonLayout;