import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    async criarJogador(criaJodarorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criaJodarorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec()
        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com email ${email} já cadastrado!`)
        } 
        const jogadorCriado = new this.jogadorModel(criaJodarorDto)
        return await jogadorCriado.save()
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        const jogadorEncontrado = await this.jogadorEncontrado(_id)
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com o id ${_id} não encontrado`) 
        } 
        await this.jogadorModel.findOneAndUpdate(
            { _id },
            { $set: atualizarJogadorDto }
        ).exec()
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadoresPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorEncontrado(_id)
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        } 
        return jogadorEncontrado
    }

    async deletarJogador(_id: string): Promise<any> {
        const jogadorEncontrado = await this.jogadorEncontrado(_id)
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }
        return await this.jogadorModel.deleteOne({ _id }).exec()
    }

    private async jogadorEncontrado(_id: string): Promise<Jogador> {
        return await this.jogadorModel.findOne({ _id }).exec()
    }
}
