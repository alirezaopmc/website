export type NavItem = {
  href: string;
  label: string;
  enabled: boolean;
};

export const navigation: NavItem[] = [
  { href: "/", label: "Home", enabled: true },
  { href: "/projects", label: "Projects", enabled: false },
  { href: "/blog", label: "Blog", enabled: false },
  { href: "/writing", label: "Writing", enabled: false },
];

export const enabledNavigation = navigation.filter((item) => item.enabled);
