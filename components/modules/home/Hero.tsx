"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

const images = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center py-10">
            <div className="relative w-full container">

                {/* Main big image with rounded blob */}
                <div className="relative w-full h-[700px] overflow-hidden rounded-[80px]">
                    {images.map((img, i) => (
                        <Image
                            key={i}
                            src={img}
                            fill
                            alt="hero image"
                            className={clsx(
                                "object-cover transition-opacity duration-700",
                                i === index ? "opacity-100" : "opacity-0"
                            )}
                        />
                    ))}

                    {/* TEXT + BUTTONS (right middle) */}
                    <div className="
                        absolute right-0 top-1/2 -translate-y-1/2
                        bg-background backdrop-blur-sm
                        p-8 rounded-l-3xl shadow-2xl
                        max-w-sm
                    ">
                        <h1 className="text-3xl font-bold text-foreground leading-tight">
                            Travel Together. Explore More.
                        </h1>

                        <p className="mt-3 text-muted-foreground text-lg">
                            Find Your Perfect Travel Buddy Today
                        </p>

                        <div className="mt-6 flex gap-4">
                            <Link href="/explore" className="
                                bg-primary hover:bg-primary/90 
                                text-background font-semibold 
                                px-5 py-3 rounded-xl
                                transition
                            ">
                                Explore Travelers
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Left Shape */}
                <div className="absolute bottom-[-60px] -left-5 
                    w-60 h-44 bg-background rounded-tr-[40px]">
                </div>

                {/* Small preview image bottom-left */}
                <div className="absolute bottom-[-50px] left-0 
                    w-[180px] h-[130px] 
                    rounded-[40px] overflow-hidden shadow-lg bg-black/20"
                >
                    <Image
                        src={images[index]}
                        fill
                        alt="preview"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
