'use client';
import { Button } from "../ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "../ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserMenu from "../ui/user-menu";
import { Spinner } from "../ui/spinner";
import { navConfig } from "../../lib/navinfo";
import { useUser } from "../hooks/useUser";

const PublicNavbr = () => {
    const pathname = usePathname();
    const { user, setUser, loading } = useUser();
    const navigationLinks = !user
        ? navConfig.guest
        : user.role === "ADMIN"
            ? navConfig.admin
            : navConfig.user;

    return (
        <header className="container mx-auto fixed top-1 left-0 right-0 z-50 rounded-md px-2">
            <div className="flex h-16 items-center justify-between gap-4 w-full">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                {/* mobile menu icon */}
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-72 mt-3 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-4 md:gap-4">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-24">
                                            <Link
                                                href={link.href}
                                                className="flex-row items-center gap-2 py-1.5"
                                            >
                                                <span>{link.label}</span>
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    <div className="flex items-center gap-6 bg-white rounded-xl">
                        <Link href="/" className="text-primary hover:text-primary/90">
                            <Image
                                src="/images/logo.png"
                                width={120}
                                height={120}
                                alt="Logo"
                            />
                        </Link>
                    </div>
                </div>

                {/* Middle area */}
                <NavigationMenu className="max-md:hidden">
                    <NavigationMenuList className="flex flex-row gap-5 w-full h-14 px-2 bg-white rounded-xl">
                        {navigationLinks.map((link, index) => {
                            const isActive =
                                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                            return (
                                <NavigationMenuItem key={index}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "font-medium transition-all border-b-2",
                                            isActive
                                                ? "text-primary border-primary px-2 rounded-sm"
                                                : "text-foreground border-transparent hover:text-primary hover:border-primary/50"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </NavigationMenuItem>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-4">
                    {loading ? (
                        <span className="text-sm text-muted-foreground">
                            <Spinner />
                        </span>
                    ) : user ? (
                        <UserMenu user={user} setUser={setUser} />
                    ) : (
                        <div className="bg-white rounded-xl p-2">
                            <Button asChild className="text-sm">
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}


export default PublicNavbr;