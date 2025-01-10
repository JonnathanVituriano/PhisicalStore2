import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ViaCepService {
    private readonly baseUrl = "https://viacep.com.br/ws";

    async getAddressByCep(cep: string) {
        try {
            const url = `${this.baseUrl}/${cep}/json`;
            const response = await axios.get(url);

            if (response.data.erro) {
                throw new Error(`CEP ${cep} não encontrado`)    
            }

            return response.data;
        } catch (error) {
            throw new Error (`Erro ao buscar informações do CEP ${cep}: ${error.message}`);
        }
    }
}
