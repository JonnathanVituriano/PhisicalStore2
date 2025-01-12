import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { ViaCepService } from '../via-cep/via-cep.service';

@Injectable()
export class GoogleMapsService {
  private readonly client = new Client();
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

  constructor(private readonly viaCepService: ViaCepService) {} 

  async getCoordinates(cep: string) {
    try {

      const viaCepResponse = await this.viaCepService.getAddressByCep(cep);
      const address = `${viaCepResponse.logradouro}, ${viaCepResponse.localidade}, ${viaCepResponse.uf}`;

      const response = await this.client.geocode({
        params: {
          address,
          key: this.apiKey,
        },
      });

      if (!response.data.results || response.data.results.length === 0) {
        throw new HttpException(
          `Nenhuma coordenada encontrada para o endereço: ${address}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return response.data.results[0].geometry.location;
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar coordenadas no Google Maps: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async calculateDistance(origin: string, destination: string) {
    try {
      const response = await this.client.distancematrix({
        params: {
          origins: [origin],
          destinations: [destination],
          key: this.apiKey,
        },
      });

      if (
        !response.data.rows ||
        !response.data.rows[0].elements ||
        response.data.rows[0].elements.length === 0
      ) {
        throw new HttpException(
          `Erro ao calcular distância entre ${origin} e ${destination}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return response.data.rows[0].elements[0].distance.value;
    } catch (error) {
      throw new HttpException(
        `Erro ao calcular distância: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
