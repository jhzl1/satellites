import { Injectable, NotFoundException } from '@nestjs/common';
import { Satellite } from 'src/models/Satellite';

import { Satellites } from 'src/controllers/topsecret/interfaces/satellites.interface';
import { calculate, Vector } from 'weighted-positioning';
import {
  BaseMessagesAndSatellites,
  MessagesAndSatellitesWithRequiredName,
} from 'src/controllers/topsecret/dto/messages-and-satellites.dto';

const kenobi = new Satellite('kenobi', -500, -200);
const skywalker = new Satellite('skywalker', 100, -100);
const sato = new Satellite('sato', 500, 100);

@Injectable()
export class SatellitesService {
  message: string;

  validateSatelliteName(satelliteName: Satellites) {
    const avaliableSatellites: Satellites[] = ['kenobi', 'sato', 'skywalker'];

    if (!avaliableSatellites.includes(satelliteName)) {
      throw new NotFoundException('El nombre del satélite es inválido');
    }
  }

  getLocation(satellites: MessagesAndSatellitesWithRequiredName[]) {
    const messageSet = new Set();

    for (const satellite of satellites) {
      const { name, distance, message } = satellite;

      if (name === 'kenobi') {
        kenobi.distance = distance;
        kenobi.message = message;
      } else if (name === 'skywalker') {
        skywalker.distance = distance;
        skywalker.message = message;
      } else if (name === 'sato') {
        sato.distance = distance;
        sato.message = message;
      }

      for (const messageSlice of message) {
        if (messageSlice && !messageSet.has(messageSlice)) {
          messageSet.add(messageSlice);
        }
      }
    }

    const location = this.calculateLocation();

    this.message = [...messageSet].join(' ');

    return {
      position: {
        x: +location.x.toFixed(1),
        y: +location.y.toFixed(1),
      },
      message: this.message,
    };
  }

  calculateLocation() {
    return calculate([
      {
        v: new Vector(kenobi.position.x, kenobi.position.y),
        w: kenobi.distance,
      },
      {
        v: new Vector(skywalker.position.x, skywalker.position.y),
        w: skywalker.distance,
      },
      { v: new Vector(sato.position.x, sato.position.y), w: sato.distance },
    ]);
  }

  getMessage() {
    if (!kenobi.message && !skywalker.message && !sato.message) {
      throw new NotFoundException(
        'No se pueda determinar la posición o el mensaje',
      );
    }

    const location = this.calculateLocation();

    return {
      position: {
        x: +location.x.toFixed(1),
        y: +location.y.toFixed(1),
      },
      message: this.message,
    };
  }

  updatePositionAndMessage(
    satelliteName: Satellites,
    newSatelliteInfo: BaseMessagesAndSatellites,
  ) {
    const hasBaseInfo = [
      !!(kenobi.message && kenobi.distance),
      !!(sato.message && sato.distance),
      !!(skywalker.message && skywalker.distance),
    ].every(Boolean);

    if (!hasBaseInfo) {
      throw new NotFoundException(
        'No se pueda determinar la posición o el mensaje',
      );
    }

    if (satelliteName === 'kenobi') {
      kenobi.message = newSatelliteInfo.message;
      kenobi.distance = newSatelliteInfo.distance;
    } else if (satelliteName === 'sato') {
      sato.message = newSatelliteInfo.message;
      sato.distance = newSatelliteInfo.distance;
    } else if (satelliteName === 'skywalker') {
      skywalker.message = newSatelliteInfo.message;
      skywalker.distance = newSatelliteInfo.distance;
    }

    const newMessageSet = new Set();

    const updatedMessages = [
      ...kenobi.message,
      ...skywalker.message,
      ...sato.message,
    ];

    for (const msg of updatedMessages) {
      if (msg && !newMessageSet.has(msg)) {
        newMessageSet.add(msg);
      }
    }

    this.message = [...newMessageSet].join(' ');

    const updatedLocation = this.calculateLocation();

    return {
      position: {
        x: +updatedLocation.x.toFixed(1),
        y: +updatedLocation.y.toFixed(1),
      },
      message: this.message,
    };
  }
}
