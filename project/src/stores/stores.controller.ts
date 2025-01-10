import { Controller, Query, Body, Post, Get, Param} from '@nestjs/common';
import { ViaCepService } from 'src/apis/via-cep/via-cep.service';
import { GoogleMapsService } from 'src/apis/google-maps/google-maps.service';
import { CorreiosService } from 'src/apis/correios/correios.service';
import { StoresService } from './stores.service';
import { CreateStoreDto } from 'src/stores/dto/create-stores.dto';

@Controller('stores')
export class StoresController {
    constructor(
        private readonly viaCepService: ViaCepService,
        private readonly googleMapsService: GoogleMapsService,
        private readonly correiosService: CorreiosService,
        private readonly storesService: StoresService,
    ) {}

    @Get('test-viacep')
    async testViaCep(@Query('cep') cep: string) {
        return this.viaCepService.getAddressByCep(cep);
    }

    @Get('shipping')
    async calculateShipping(
        @Query('cepOrigem') cepOrigem: string,
        @Query('cepDestino') cepDestino: string,
        @Query('peso') peso: number,
    ){
        return this.storesService.calculateShipping(cepOrigem, cepDestino, peso);
    }

    @Get('id')
    async storeById(@Param('id') id: string) {
        return this.storesService.findById(id);
    }

    @Get('state')
    async storeByState(@Query('state') state: string) {
        return this.storesService.findByState(state);
    }

    @Get('nearby')
    async storeByCep(@Query('cep') cep: string) {
        const coordinates = await this.googleMapsService.getCoordinates(cep);
        return this.storesService.findNearby(coordinates.lat, coordinates.lng)
    }

    @Get('test-google-maps')
    async testGoogleMaps(@Query('cep') cep: string) {
        return this.googleMapsService.getCoordinates(cep);
    }

    @Get('test-correios')
    async testCorreios(
        @Query('cepOrigem') cepOrigem: string,
        @Query('cepDestino') cepDestino: string,
        @Query('peso') peso: number,
        @Query('tipoFrete') tipoFrete: string,
    ) {
        return this.correiosService.calculateShipping(
            cepOrigem,
            cepDestino,
            peso,
            tipoFrete as 'PAC' | 'SEDEX',
        );
    }

    @Post()
    async createStore(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.createStore(createStoreDto);
    }
}

//atualização