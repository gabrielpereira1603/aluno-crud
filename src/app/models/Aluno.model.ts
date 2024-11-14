import { Schema, model, Document, Types } from 'mongoose';

// Interface para definir a estrutura de notas
interface Notas {
  bimestre1: number;
  bimestre2: number;
}

// Interface para definir a estrutura de disciplinas do aluno
interface DisciplinaAluno {
  disciplina_id: Types.ObjectId;
  professor: string;
  notas: Notas;
}

// Interface do Aluno que estende o Document do Mongoose
export interface AlunoDocument extends Document {
  nome: string;
  sexo: string;
  data_nascimento: Date;
  email: string;
  senha: string;
  curso_id: Types.ObjectId;
  disciplinas: DisciplinaAluno[];
}

// Definindo o schema do aluno
const alunoSchema = new Schema<AlunoDocument>({
  nome: { type: String, required: true },
  sexo: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  curso_id: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
  disciplinas: [
    {
      disciplina_id: { type: Schema.Types.ObjectId, ref: 'Disciplina', required: true },
      professor: { type: String, required: true },
      notas: {
        bimestre1: { type: Number, default: 0 },
        bimestre2: { type: Number, default: 0 },
      },
    },
  ],
});

// Criando e exportando o modelo Aluno
const Aluno = model<AlunoDocument>('Aluno', alunoSchema);
export default Aluno;
