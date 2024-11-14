export interface Professor {
  semestre: string;
  nome: string;
}

export interface Disciplina {
  id?: string; // O ID pode ser opcional, caso seja fornecido automaticamente pelo banco de dados
  name: string;
  ementa: string;
  carga_horaria: number;
  professores?: Professor[]; // Lista de professores, cada um com semestre e nome
}
