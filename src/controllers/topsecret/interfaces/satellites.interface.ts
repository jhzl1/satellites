export type Satellites = 'kenobi' | 'skywalker' | 'sato';

export type SatellitePosition = {
  position: {
    x: number;
    y: number;
  };
  message: string;
};
