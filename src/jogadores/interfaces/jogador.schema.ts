import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    telefoneCelular: { type: String },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoAmigo: String,
}, {timestamps: true, collection: 'jogadores'})
