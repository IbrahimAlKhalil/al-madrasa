export interface MenuItem {
  id: string;
  label: string;
  link: string;
  icon: string;
  children: MenuItem[];
}

export interface Menu {
  id: number;
  items: MenuItem[];
}
