"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Facebook,
    Instagram,
    Twitter,
    Github,
    Dribbble
} from "lucide-react";

const PublicFooter = () => {
    return (
        <footer className="container mx-auto lg:grid lg:grid-cols-5 pt-10 md:pt-16 lg:pt-28">

            {/* Left Image Section */}
            <div className="relative h-32 lg:col-span-2 lg:h-full">
                <Image
                    src="/images/footer2.jpg"
                    alt="footer image"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Right Content */}
            <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

                    {/* Contact Section */}
                    <div>
                        <p>
                            <span className="text-xs tracking-wide text-gray-500 uppercase">
                                Call us
                            </span>

                            <a
                                href="tel:0123456789"
                                className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl"
                            >
                                0123456789
                            </a>
                        </p>

                        <ul className="mt-8 space-y-1 text-sm text-muted-foreground">
                            <li>Monday to Friday: 10am - 5pm</li>
                            <li>Weekend: 10am - 3pm</li>
                        </ul>

                        {/* Social Icons */}
                        <ul className="mt-8 flex gap-6">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:opacity-75">
                                    <Facebook size={24} />
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-muted-foreground hover:opacity-75">
                                    <Instagram size={24} />
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-muted-foreground hover:opacity-75">
                                    <Twitter size={24} />
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-muted-foreground hover:opacity-75">
                                    <Github size={24} />
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-muted-foreground hover:opacity-75">
                                    <Dribbble size={24} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Sections */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Services - updated for travel website */}
                        <div>
                            <p className="font-medium text-gray-900">Services</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href="/explore" className="text-muted-foreground hover:opacity-75">
                                        Explore Destinations
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/travel-plans" className="text-muted-foreground hover:opacity-75">
                                        Travel plans
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div>
                            <p className="font-medium text-gray-900">Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <Link href="#" className="text-muted-foreground hover:opacity-75">
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link href="#" className="text-muted-foreground hover:opacity-75">
                                        Meet the Team
                                    </Link>
                                </li>

                                <li>
                                    <Link href="#" className="text-muted-foreground hover:opacity-75">
                                        Careers
                                    </Link>
                                </li>

                                <li>
                                    <Link href="#" className="text-muted-foreground hover:opacity-75">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-100 pt-12">
                    <div className="sm:flex sm:items-center sm:justify-between">

                        <ul className="flex flex-wrap gap-4 text-xs">
                            <li>
                                <Link href="#" className="text-gray-500 hover:opacity-75">
                                    Terms & Conditions
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-gray-500 hover:opacity-75">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="#" className="text-gray-500 hover:opacity-75">
                                    Cookies
                                </Link>
                            </li>
                        </ul>

                        <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                            © {new Date().getFullYear()}. Travel Buddy. All rights reserved.
                        </p>

                    </div>
                </div>

            </div>
        </footer>
    );
}


export default PublicFooter;