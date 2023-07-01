import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Satellites } from '../interfaces/satellites.interface';

export class BaseMessagesAndSatellites {
  @IsNumber({}, { message: 'La distancia es requerida' })
  readonly distance: number;
  @IsArray({ message: 'El formato del mensaje es inváido' })
  @ArrayNotEmpty({ message: 'El mensaje no puede estar vacío' })
  @IsString({ each: true, message: 'El mensaje es requerido' })
  readonly message: string[];
}

export class MessagesAndSatellitesWithRequiredName extends BaseMessagesAndSatellites {
  @IsString()
  @Matches(/^(kenobi|skywalker|sato)$/)
  readonly name: Satellites;
}
