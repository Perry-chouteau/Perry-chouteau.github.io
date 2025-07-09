import { Point } from "@react-three/drei";

const black = 0x000000;
const red = 0xff0000;
const green = 0x00ff00;
const blue = 0x0000ff;
const yellow = red + green;
const cyan = green + blue;
const magenta = red + blue;
const white = red + green + blue;
const orange = red + green * 0.4;
const purple = red * 0.6 + blue;

export interface Vector2 {
  x: number;
  y: number;
}

export interface Coordinate {
  title: string;
  description: string;
  x: number;
  y: number;
  points: Vector2[];
  color: number;
}

export const coordinates = [
  {
    title: 'Paris - France',
    description: 'Home country',
    x: -90, y: 119,
    color: white,
    points: [
      { x: -4, y: 0.8 },
      { x: -2.5, y: 0 },
      { x: 3.5, y: -1 },
      { x: 2.3, y: -2 },
      { x: 2, y: -4 },
      { x: 3, y: -4 },
    ]
  },
  {
    title: 'Milan - Italy',
    description: 'Home country',
    x: -84, y: 116,
    color: white,
    points: [
      { x: -0.5, y: 0.5 },
    ]
  },
  {
    title: 'Porto - Portugal',
    description: 'Sightseeing',
    x: -100,
    y: 113,
    color: white,
    points: [
      { x: -0.3, y: 1.2},
    ]
  },
  {
    title: 'Madrid - Spain',
    description: 'Sightseeing',
    x: -95.5,
    y: 112.8,
    color: white,
    points: [
    ]
  },
  {
    title: 'South Korea',
    description: '1 year of study in IT & more than 21days of bike trip',
    x: 24.5,
    y: 127.5,
    color: white,
    points: [
      // CrossCountry
      { x: -2.2, y: 1 },
      { x: -1, y: 1 },
      { x: 0.5, y: 0.5 },
      { x: 1.5, y: -0.3},
      //East Coast      
      { x: -1, y: 2 },
      { x: 1, y: 1.2 },
      //SouthWest
      { x: -1.5, y: 0 },
      { x: -1, y: -1.7 },
      { x: -0.5, y: -0.8 },
      { x: 0.8, y: -1.2 },
      // Jeju
      { x: -1, y: -3 },
    ]
  },
  {
    title: 'Tokyo - Japan',
    description: '2.5 weeks of sightseeing by Shinkansen, ferry, metro & bus',
    x: 37,
    y: 130.5,
    color: white,
    points: [
      //Hiroshima
      { x: -6, y: -4 },
      //Himeji, Kobe
      { x: -4.7, y: -3.3 },
      //Osaka, Kyoto, Inari, Nagoya
      { x: -4.5, y: -2 },
      //Mt Fuji
      { x: -1, y: -1},
      //Sapporo
      { x: -1, y: 6},
    ]
  },
  {
    title: 'Beijing - China',
    description: '1 week of sightseeing by metro',
    x: 10,
    y: 130,
    color: white,
    points: [
    ]
  }
];