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

        const result = await calcularPrecoPrazo(options);
        return result;
    }
}
