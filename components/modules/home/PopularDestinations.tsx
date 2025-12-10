import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
    "/images/popular1.jpg",
    "/images/popular2.jpg",
    "/images/popular3.jpg",
    "/images/popular4.jpg",
    "/images/popular5.jpg",
];

const PopularDestinations = () => (
    <div className="mx-auto w-full container py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <p className="text-muted-foreground mt-3 text-lg">
                Most visited places by our community members
            </p>
        </div>
        <Carousel>
            <CarouselContent>
                {slides.map((slide, i) => (
                    <CarouselItem key={i}>
                        {/* IMPORTANT: parent must be relative */}
                        <div className="relative w-full h-[700px] overflow-hidden rounded-[80px]">
                            <Image
                                src={slide}
                                alt="carousel image"
                                fill
                                className="object-cover transition-opacity duration-700"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
);

export default PopularDestinations;
