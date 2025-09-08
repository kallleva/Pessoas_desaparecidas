export interface InformacaoDesaparecidoDTO {
  ocoId: number;
  informacao: string;
  data: string; // ISO string
  id: number;
  anexos: string[]; // URLs ou hashes de arquivos
}
