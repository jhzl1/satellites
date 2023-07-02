import { ApiProperty } from '@nestjs/swagger';

class Position {
  @ApiProperty()
  x: number;
  @ApiProperty()
  y: number;
}

export class SatellitePosition {
  @ApiProperty({ type: Position })
  position: Position;

  @ApiProperty({ example: 'Este es mensaje de ejemplo' })
  message: string;
}
