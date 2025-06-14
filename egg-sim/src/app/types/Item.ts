export interface Item {
  id: string;
  name?: string;
  icon?: string;
}

export const allItems: Item[] = [
  {
    id: 'chick-black',
    name: 'Black Chicken',
    icon: '/hen-skin/hen_skin_black_recolor.svg',
  },
  {
    id: 'chick-brown',
    name: 'Brown Chicken',
    icon: '/hen-skin/hen_skin_brown_recolor.svg',
  },
  {
    id: 'chick-pirate',
    name: 'Pirate Chicken',
    icon: '/hen-skin/hen_skin_pirate.svg',
  },
  {
    id: 'chick-wyan-black',
    name: 'Wyan Black Chicken',
    icon: '/hen-skin/hen_skin_wyandotte_black.svg',
  },
  {
    id: 'chick-wyan',
    name: 'Wyan Chicken',
    icon: '/hen-skin/hen_skin_wyandotte_normal.svg',
  },
];
