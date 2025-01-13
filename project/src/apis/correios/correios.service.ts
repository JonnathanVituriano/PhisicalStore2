import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CorreiosService {
    async calculateShipping(
        cepOrigem: string,
        cepDestino: string,
        peso: number,
        tipoFrete: 'PAC' | 'SEDEX',
    ) {
        const nCdServico = tipoFrete === 'PAC' ? '04510' : '04014';
        const url = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx`;
        const params = {
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
            nCdServico,
            nCdEmpresa: '',
            sDsSenha: '',
            StrRetorno: 'xml',
            nIndicaCalculo: '3',
        };

        try {
            console.log('Calculando frete com:', params);
            const response = await axios.get(url, {
                params,
                timeout: 10000, 
            });
            

            console.log('Resultado dos Correios:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro na API dos Correios:', error.message);
            throw new Error(`Erro ao calcular frete: ${error.message}`);
        }
    }
}