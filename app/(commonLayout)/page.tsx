import FAQSection from "@/components/modules/home/FAQ";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PopularDestinations from "@/components/modules/home/PopularDestinations";
import TravelersPreview from "@/components/modules/home/TravelersPreview";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";


const HomePage = () => {
    return (
        <div>
            <Hero />
            <HowItWorks />
            <WhyChooseUs />
            <PopularDestinations />
            <TravelersPreview />
            <FAQSection />
        </div>
    );
};

export default HomePage;