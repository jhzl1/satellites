export type Position = {
  x: number;
  y: number;
};

export class Satellite {
  name: string;
  distance: number;
  position: Position;
  message: string[];

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.distance;
    this.position = { x, y };
    this.message;
  }
}
