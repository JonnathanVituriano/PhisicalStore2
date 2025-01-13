//C:\Users\Kaneko\Desktop\PhisicalStore2\PhisicalStore2\project\src\apis\via-cep\via-cep.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { ViaCepService } from './via-cep.service';

@Controller('cep')
export class ViaCepController {
    constructor(private readonly viaCepService: ViaCepService) {}

    @Get(':cep')
    async getCepInfo(@Param('cep') cep: string) {
        return this.viaCepService.getAddressByCep(cep);
    }
}