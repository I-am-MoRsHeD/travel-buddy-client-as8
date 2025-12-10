"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const FAQ_DATA = [
    {
        question: "How do I find a travel buddy?",
        answer:
            "Use the Explore or Find Buddy page, apply filters like destination or travel dates, visit a traveler’s profile, and send a 'Request to Join' their travel plan.",
    },
    {
        question: "Do I need an account to use the platform?",
        answer:
            "You can browse travelers while logged out, but you must create an account to request to join trips, create plans, or access messaging.",
    },
    {
        question: "Is it safe to travel with strangers?",
        answer:
            "We recommend checking user profiles, reviews, verifications, and chatting before deciding. Safety information is displayed to help you make informed decisions.",
    },
    {
        question: "What happens when someone accepts my join request?",
        answer:
            "Once accepted, both users can start chatting, and the trip will appear on your dashboard so you can plan together.",
    },
    {
        question: "Can I cancel my travel plan later?",
        answer:
            "Yes, you can edit or delete any plan anytime from your dashboard. Travelers who requested to join will be notified automatically.",
    },
];

export default function FAQSection() {
    return (
        <div className="container flex flex-row justify-between items-center gap-10 mx-auto px-4 md:px-6 py-20">
            <div className="flex-1">
                <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                <Accordion type="single" collapsible className="space-y-4">
                    {FAQ_DATA.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="border border-primary/40 rounded-xl px-4"
                        >
                            <AccordionTrigger className="text-lg font-semibold">
                                {item.question}
                            </AccordionTrigger>

                            <AccordionContent className="text-muted-foreground text-base">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="relative flex-1 h-[700px] overflow-hidden rounded-[80px]">
                <Image
                    src="/images/faq.jpg"
                    fill
                    alt="faq"
                    className={
                        "object-cover transition-opacity duration-700"
                    }
                />
            </div>
        </div>
    );
}
