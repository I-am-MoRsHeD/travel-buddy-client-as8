"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const travelers = [
    {
        name: "Ariana Smith",
        location: "London, UK",
        rating: 4.9,
        image: "/images/user1.jpg",
    },
    {
        name: "David Lin",
        location: "Tokyo, Japan",
        rating: 4.7,
        image: "/images/user2.jpg",
    },
    {
        name: "Sophia Miller",
        location: "Hamburg, Germany",
        rating: 4.8,
        image: "/images/user3.jpg",
    },
    {
        name: "Lucas Brown",
        location: "New York, USA",
        rating: 4.6,
        image: "/images/user4.jpg",
    },
    {
        name: "Mia Chen",
        location: "Seoul, South Korea",
        rating: 4.9,
        image: "/images/user5.jpg",
    },
];

export default function TravelersPreview() {
    return (
        <section className="container mx-auto px-4 md:px-6 py-20">
            <h2 className="text-4xl font-bold text-center mb-14">
                Meet Some Amazing Travelers
            </h2>

            <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                    {travelers.map((t, i) => (
                        <CarouselItem
                            key={i}
                            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <Card className="rounded-2xl hover:shadow-2xl transition-all duration-300 border border-primary/20 shadow-md">
                                <CardHeader className="flex justify-center py-6">
                                    <div className="relative w-28 h-28">
                                        <Image
                                            src={t.image}
                                            alt={t.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                </CardHeader>

                                <CardContent className="text-center">
                                    <h3 className="text-xl font-semibold">{t.name}</h3>
                                    <p className="text-muted-foreground">{t.location}</p>

                                    <div className="flex justify-center gap-1 mt-3">
                                        <Star className="text-yellow-500" /><span className="font-medium">{t.rating}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
