export class Location {
  _id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  facilities: string[];
  openingTimes: OpeningTime[];
  coords: Coordinates;
  reviews: Review[];
}

export class OpeningTime {
  days: string;
  opening: string;
  closing: string;
  closed: boolean;
}

export class Review {
  author: string;
  rating: number;
  reviewText: string;
}

export class Coordinates {
  type: string;
  coordinates: number[];
}

export class KeySecret {
  key:string;
  secret: string;
  message: string;
}