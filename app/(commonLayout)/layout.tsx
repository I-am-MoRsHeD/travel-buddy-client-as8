import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbr from "@/components/shared/PublicNavbar";
import React from "react";

interface CommonLayoutProps {
    children: React.ReactNode
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
    return (
        <div>
            <PublicNavbr />
            <div className="min-h-dvh">
                {children}
            </div>
            <PublicFooter />
        </div>
    );
};

export default CommonLayout;