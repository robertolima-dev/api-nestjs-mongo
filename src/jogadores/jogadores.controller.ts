import { Body, Controller, Delete, Get, Post, Put, Query, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipes'

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
    ): Promise<void> {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores()
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadoresPeloId(_id)
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
        return await this.jogadoresService.deletarJogador(_id)
    }
}
