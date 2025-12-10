"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Users, Globe2, MessageCircleHeart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyChooseUs() {
    const features = [
        {
            title: "Trusted & Verified Travelers",
            desc: "Every premium traveler is identity-verified, ensuring you meet reliable companions for your trips.",
            icon: <ShieldCheck className="h-10 w-10 text-indigo-500" />,
        },
        {
            title: "Worldwide Travel Community",
            desc: "Join a global tribe of explorers. No matter where you go, someone is always traveling with your vibe.",
            icon: <Globe2 className="h-10 w-10 text-teal-500" />,
        },
        {
            title: "Find Your Perfect Match",
            desc: "We connect you with companions who share similar interests, budgets, and travel styles.",
            icon: <Users className="h-10 w-10 text-rose-500" />,
        },
        {
            title: "Connect, Chat & Travel",
            desc: "Built for meaningful travel: join plans, chat with matches, and build friendships that last.",
            icon: <MessageCircleHeart className="h-10 w-10 text-yellow-500" />,
        },
    ];

    return (
        <section className="container mx-auto px-4 md:px-6 py-20">
            <div className="text-center mb-14">
                <div className="flex flex-row justify-center items-center gap-1">
                    <h2 className="text-4xl font-extrabold ">
                        Why
                    </h2>
                    <Image
                        src="/images/logo.png"
                        width={150}
                        height={150}
                        alt="Logo"
                    />
                    <h2 className="text-4xl font-extrabold ">
                        is perfect for you
                    </h2>
                </div>
                <p className="text-muted-foreground mt-3 text-lg">
                    A platform built for real travelers who want meaningful, safe, and memorable journeys.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.15 }}
                    >
                        <Card
                            className="
                bg-white/60 
                backdrop-blur-xl 
                border border-white/30 
                shadow-xl 
                hover:shadow-2xl
                hover:scale-[1.02]
                transition-all 
                duration-300
                rounded-2xl
                p-4
              "
                        >
                            <CardHeader className="flex flex-row items-center gap-5">
                                <div className="p-4 bg-white/80 rounded-full shadow-inner">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
