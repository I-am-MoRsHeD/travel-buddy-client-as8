import { UserRole } from "@/types/enum";

export type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/explore", "/travel-plans"],
    patterns: []
};

export const userProtectedRoutes: RouteConfig = {
    exact: ["/my-travel-plans"],
    patterns: [/^\/user/]
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: []
};


export const isAuthRoute = (pathname: string): boolean => {
    return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    };

    return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "ADMIN" | "USER" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    };
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    };
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    };
    return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard"
    };
    if (role === "USER") {
        return "/user/dashboard"
    };
    return "/";
};

export const isValidRedirectForRole = (redirectPath: string, userRole: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    };

    if (routeOwner === userRole) {
        return true;
    };

    return false;
}