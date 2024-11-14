import { Disciplina } from "./Disciplina.model";

export interface Curso {
  id?: string;
  name: string;
  description: string;
  carga_horaria_total: number;
  disciplinas?: Disciplina[];
}
