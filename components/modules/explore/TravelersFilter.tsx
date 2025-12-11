"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { travelInterests } from "@/lib/travelFiltersInfo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

declare global {
    interface Window {
        searchTimeout?: NodeJS.Timeout;
    }
}

export default function TravelerFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [name, setName] = useState(searchParams.get("searchTerm") || "");
    const [interest, setInterest] = useState(searchParams.get("travelInterests") || "");
    const [verified, setVerified] = useState(searchParams.get("isPremiumTaken") || "");
    const [sort, setSort] = useState(searchParams.get("sortBy") || "");

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    const clearFilters = () => {
        setName("");
        setInterest("");
        setVerified("");
        setSort("");
        router.push(`/explore`);
    }

    return (
        <>
            <div className="md:hidden block">
                <Sheet>
                    <SheetTrigger className="w-1/3 mx-auto">
                        <Button>
                            FIlter options
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-64 sm:w-[540px]">
                        <div className="w-full md:w-64 bg-primary/10 border-none p-4 rounded-xl h-[600px] flex flex-col">

                            {/* Scrollable filter fields */}
                            <div className="space-y-2 overflow-y-auto pr-2 grow">

                                {/* Search by name */}
                                <div className="min-h-[90px]">
                                    <label className="font-semibold">Search by name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setName(value);

                                            clearTimeout(window.searchTimeout);
                                            window.searchTimeout = setTimeout(() => {
                                                updateQuery("searchTerm", value);
                                            }, 400);
                                        }}
                                        placeholder="Search..."
                                        className="mt-1"
                                    />
                                </div>

                                {/* Filter by interest */}
                                <div className="min-h-[90px]">
                                    <label className="font-semibold">Filter by interest</label>
                                    <Select
                                        value={interest}
                                        onValueChange={(v) => {
                                            setInterest(v);
                                            updateQuery("travelInterests", v);
                                        }}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Choose interest" />
                                        </SelectTrigger>
                                        <SelectContent className="border-none">
                                            {
                                                travelInterests.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Verified */}
                                <div className="min-h-[90px]">
                                    <label className="font-semibold">Filter by verified</label>
                                    <Select
                                        value={verified}
                                        onValueChange={(v) => {
                                            setVerified(v);
                                            updateQuery("isPremiumTaken", v);
                                        }}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Verified or not" />
                                        </SelectTrigger>
                                        <SelectContent className="border-none">
                                            <SelectItem value="true">Verified</SelectItem>
                                            <SelectItem value="false">Not Verified</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sort */}
                                <div className="min-h-[90px]">
                                    <label className="font-semibold">Sort by</label>
                                    <Select
                                        value={sort}
                                        onValueChange={(v) => {
                                            setSort(v);
                                            updateQuery("sortBy", v);
                                        }}
                                    >
                                        <SelectTrigger className="mt-1 w-full">
                                            <SelectValue placeholder="Choose sorting" />
                                        </SelectTrigger>
                                        <SelectContent className="border-none">
                                            <SelectItem value="avgRating">Rating</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Fixed Clear Filters button at bottom */}
                            <div className="pt-6">
                                <Button className="w-full" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="w-full md:w-64 bg-primary/10 border-none p-4 rounded-xl h-[600px] md:flex flex-col hidden">

                {/* Scrollable filter fields */}
                <div className="space-y-2 overflow-y-auto pr-2 grow">

                    {/* Search by name */}
                    <div className="min-h-[90px]">
                        <label className="font-semibold">Search by name</label>
                        <Input
                            value={name}
                            onChange={(e) => {
                                const value = e.target.value;
                                setName(value);

                                clearTimeout(window.searchTimeout);
                                window.searchTimeout = setTimeout(() => {
                                    updateQuery("searchTerm", value);
                                }, 400);
                            }}
                            placeholder="Search..."
                            className="mt-1"
                        />
                    </div>

                    {/* Filter by interest */}
                    <div className="min-h-[90px]">
                        <label className="font-semibold">Filter by interest</label>
                        <Select
                            value={interest}
                            onValueChange={(v) => {
                                setInterest(v);
                                updateQuery("travelInterests", v);
                            }}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Choose interest" />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                {
                                    travelInterests.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label.replace("_", " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Verified */}
                    <div className="min-h-[90px]">
                        <label className="font-semibold">Filter by verified</label>
                        <Select
                            value={verified}
                            onValueChange={(v) => {
                                setVerified(v);
                                updateQuery("isPremiumTaken", v);
                            }}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Verified or not" />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                <SelectItem value="true">Verified</SelectItem>
                                <SelectItem value="false">Not Verified</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort */}
                    <div className="min-h-[90px]">
                        <label className="font-semibold">Sort by</label>
                        <Select
                            value={sort}
                            onValueChange={(v) => {
                                setSort(v);
                                updateQuery("sortBy", v);
                            }}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue placeholder="Choose sorting" />
                            </SelectTrigger>
                            <SelectContent className="border-none">
                                <SelectItem value="avgRating">Rating</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Fixed Clear Filters button at bottom */}
                <div className="pt-6">
                    <Button className="w-full" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </div>
            </div>
        </>
    );
}
