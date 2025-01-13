//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\stores.controller.ts

import { Controller, Delete, Query, Body, Post, Put, Get, Param, Logger} from '@nestjs/common';
import { ViaCepService } from 'src/apis/via-cep/via-cep.service';
import { GoogleMapsService } from 'src/apis/google-maps/google-maps.service';
import { CorreiosService } from 'src/apis/correios/correios.service';
import { StoresService } from './stores.service';
import { CreateStoreDto } from 'src/stores/dto/create-stores.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { CalculateShippingDto } from './dto/calculate-shipping.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
    private readonly logger = new Logger('StoresController.name');
    
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

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar uma loja pelo ID' })
    @ApiResponse({ status: 200, description: 'Loja deletada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
    @Delete(':id')
    async deleteStore(@Param('id') id: string) {
        return this.storesService.deleteStore(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Editar uma loja pelo ID' })
    @ApiResponse({ status: 200, description: 'Loja atualizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
    @Put(':id')
    async updateStore(@Param('id')id: string, @Body() updateStoreDto: Partial<CreateStoreDto>) {
        return this.storesService.updateStore(id, updateStoreDto);
    }

    @Get('shipping')
    @ApiOperation({ summary: 'Calcular o frete entre dois CEPs'})
    async calculateShipping(@Query() params: CalculateShippingDto) {
        this.logger.debug(`Parametros recebidos: ${JSON.stringify(params)}`);
        const { cepOrigem, cepDestino, peso } = params;
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

    @Get('test-distance')
    async testDistance(
        @Query('origin') origin: string,
        @Query('destination') destination: string,
    ) {
        return this.googleMapsService.calculateDistance(origin, destination);
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
    @ApiOperation({ summary: 'Adicionar uma nova loja' })
    @ApiResponse({ status: 201, description: 'Loja criada com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })

    async createStore(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.createStore(createStoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as lojas' })
    @ApiResponse({ status: 200, description: 'Lista de lojas.' })

    async listAll() {
      return this.storesService.findAll();
    }

}

export class calculateShipping {

    @IsString()
    cepOrigem: string;

    @IsString()
    cepDestino: string;

    @IsNumber()
    peso: number;
}

//atualização