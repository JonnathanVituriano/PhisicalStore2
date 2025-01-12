//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\stores\stores.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Store } from './entities/store.entity';
import { GoogleMapsService } from 'src/apis/google-maps/google-maps.service';
import { CorreiosService } from 'src/apis/correios/correios.service';
import { CreateStoreDto } from './dto/create-stores.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
        private readonly googleMapsService: GoogleMapsService,
        private readonly correiosService: CorreiosService,
    ) {}

    async calculateShipping(cepOrigem: string, cepDestino: string, peso: number) {
        const origemCoords = await this.googleMapsService.getCoordinates(cepOrigem);
        const destinoCoords = await this.googleMapsService.getCoordinates(cepDestino);

        const distance = await this.googleMapsService.calculateDistance(
            `${origemCoords.lat}, ${origemCoords.lng}`,
            `${destinoCoords.lat}, ${destinoCoords.lng}`,
        );

        if (distance < 50000) {
            return {
                distance: `${(distance / 1000).toFixed(1)}Km`,
                value: [
                    {
                        prazo: '1 dia útil',
                        price: 'R$ 15,00',
                        description: 'Frete fixo para distâncias menores que 50Km',
                    },
                ],
            };
        }

        const pac = await this.correiosService.calculateShipping(cepOrigem, cepDestino, peso, 'PAC');
        const sedex = await this.correiosService.calculateShipping(cepOrigem, cepDestino, peso, 'SEDEX');

        return {
            distance: `${(distance / 1000).toFixed(1)}`,
            value:  [
                {
                    prazo: `${pac[0].PrazoEntrega} dias úteis.`,
                    price: `R$ ${pac[0].Valor}`,
                    description: 'PAC - Encomenda econômica dos Correios',
                },

                {
                    prazo: `${sedex[0].PrazoEntrega} dias úteis`,
                    price: `R$ ${sedex[0].Valor}`,
                    description: 'SEDEX - Encomenda expressa dos Correios',
                },
            ],
        };

    }

    async updateStore(id: string, updateStoreDto: Partial<CreateStoreDto>) {
        return this.storeModel.findByIdAndUpdate(id, updateStoreDto, { new: true }).exec();
    }

    async deleteStore(id: string) {
        return this.storeModel.findByIdAndDelete(id).exec();
    }
    
    async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
        const newStore = new this.storeModel(createStoreDto);
        return newStore.save();
    }

    async findAll() {
        return this.storeModel.find().exec();
    }

    async findNearby(lat: number, lng: number) {
        const MAX_DISTANCE = 50000
        return this.storeModel.aggregate([
        {
            $geoNear: {
                near: { type: 'Point', coordinates: [lng, lat] },
                distanceField: 'distance',
                maxDistance: MAX_DISTANCE,
                spherical: true,
            },
        },
    ]);
    }

    async findById(id: string) {
        return this.storeModel.findById(id).exec();
    }

    async findByState(state: string) {
        return this.storeModel.find({ state }).exec();
    }
}

//atualização