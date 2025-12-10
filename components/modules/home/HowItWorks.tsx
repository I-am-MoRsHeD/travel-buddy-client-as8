"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound, Search, Users } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Create Your Profile",
            description:
                "Add your interests, travel preferences, experience, and get matched with like-minded travelers.",
            icon: <CircleUserRound className="h-10 w-10 text-primary" />,
        },
        {
            title: "Explore or Create Plans",
            description:
                "Browse travelers, destinations, or create your own travel plan for others to join.",
            icon: <Search className="h-10 w-10 text-primary" />,
        },
        {
            title: "Connect & Travel",
            description:
                "Request to join a travel plan or accept others’ requests. Simple, safe, and fun.",
            icon: <Users className="h-10 w-10 text-primary" />,
        },
    ];

    return (
        <section className="container mx-auto px-4 md:px-6 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card
                        key={index}
                        className="border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">{step.icon}</div>
                            <CardTitle>{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 text-center">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
