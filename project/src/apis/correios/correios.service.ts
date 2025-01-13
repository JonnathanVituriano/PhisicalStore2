//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\correios\correios.service.ts

import { Injectable } from '@nestjs/common';
import { calcularPrecoPrazo, PrecoPrazoRequest } from 'correios-brasil';

@Injectable()
export class CorreiosService {
    async calculateShipping(
        cepOrigem: string,
        cepDestino: string,
        peso: number,
        tipoFrete: 'PAC' | 'SEDEX',
    ) {
        const options: PrecoPrazoRequest = {
            nCdServico: [tipoFrete === 'PAC' ? '04510' : '04014'],
            sCepOrigem: cepOrigem,
            sCepDestino: cepDestino,
            nVlPeso: peso.toString(),
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '10',
            nVlLargura: '15',
            nVlDiametro: '0',
            sCdMaoPropria: 'N',
            nVlValorDeclarado: '0',
            sCdAvisoRecebimento: 'N',
        };

        try{
            console.log('Calculando frete com as opções:', options);
            const result = await calcularPrecoPrazo(options);
            console.log('Resultado do API dos Correios:', result);
            return result;
        } catch (error) {
            console.error('Erro bruto:', error);
            throw new Error(`Erro ao calcular frete: ${error.message} || 'Erro desconhecido'`);
        }
    }
}
