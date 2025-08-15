type DynamicRoutes = {
	
};

type Layouts = {
	"/": undefined;
	"/api": undefined;
	"/api/test": undefined
};

export type RouteId = "/" | "/api" | "/api/test";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/api" | "/api/test";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/robots.txt";