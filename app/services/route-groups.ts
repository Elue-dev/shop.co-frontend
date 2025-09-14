interface RouteConfig {
  path: string | RegExp;
  regex?: boolean;
}

export const noTokenRoutes: RouteConfig[] = [
  {
    path: "/auth/login",
  },
  {
    path: "/auth/register",
  },
  {
    path: "/auth/activate",
  },
  {
    path: "/auth/activate/request",
  },
  {
    path: "/auth/forgot",
  },
  {
    path: "/auth/reset",
  },
  {
    path: "/health",
  },
  {
    path: "/products",
  },
  {
    path: "/products/categories",
  },
  {
    path: "/products/dress-styles",
  },
  {
    path: /^\/products\/[^\/]+\/?$/,
    regex: true,
  },
  {
    path: /^\/products\/[^\/]+\/reviews\/?$/,
    regex: true,
  },
];

export const isNoTokenRoute = (url: string): boolean => {
  return noTokenRoutes.some((route) => {
    if (route.regex && route.path instanceof RegExp) {
      return route.path.test(url);
    } else {
      return url.includes(route.path as string);
    }
  });
};
