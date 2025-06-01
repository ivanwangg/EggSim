export interface Item {
  id: string;
  name?: string;
  icon?: string;
}

export const allItems: Item[] = [
  { id: "chick-red", name: "Red Chicken", icon: "/egg.svg" },
  { id: "chick-blue", name: "Blue Chicken", icon: "/hen_nesting.svg" },
];