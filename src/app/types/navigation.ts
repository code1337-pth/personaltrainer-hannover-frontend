export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};