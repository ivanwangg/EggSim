export interface Item {
  id: string;
  name: string;
  icon: string;
  description?: string;
  realImage?: string;
}

export const allItems: Item[] = [
  {
    id: 'chick-black',
    name: 'Black',
    icon: '/hen-skin/hen_skin_black_recolor.svg',
    description: 'black chicken description',
    realImage: '/real-chicken/black_chicken.jpg',
  },
  {
    id: 'chick-brown',
    name: 'Brown',
    icon: '/hen-skin/hen_skin_brown_recolor.svg',
    description: 'brown chicken description',
    realImage: '/real-chicken/brown_chicken.jpeg',
  },
  {
    id: 'chick-pirate',
    name: 'Pirate',
    icon: '/hen-skin/hen_skin_pirate.svg',
  },
  {
    id: 'chick-wyan-black',
    name: 'Black Wyan',
    icon: '/hen-skin/hen_skin_wyandotte_black.svg',
    description: 'black wyan description',
    realImage: '/real-chicken/black_wyandotte_chicken.jpg',
  },
  {
    id: 'chick-wyan',
    name: 'Wyandotte',
    icon: '/hen-skin/hen_skin_wyandotte_normal.svg',
    description: 'wyandotte description',
    realImage: '/real-chicken/wyandotte_chicken.jpg',
  },
  {
    id: 'chick-emo',
    name: 'Emo',
    icon: '/hen-skin/hen_skin_emo.svg',
  },
  {
    id: 'chick-rainbow',
    name: 'Rainbow',
    icon: '/hen-skin/hen_skin_rainbow.svg',
  },
  {
    id: 'chick-red-star',
    name: 'Red Star',
    icon: '/hen-skin/hen_skin_red_star.svg',
    description: 'red star description',
    realImage: '/real-chicken/red_star_chicken.jpg',
  },
  {
    id: 'chick-ski',
    name: 'Ski Mask',
    icon: '/hen-skin/hen_skin_ski_mask.svg',
  },
];
