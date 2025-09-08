import type { UltimaOcorrenciaDTO } from "./UltimaOcorrenciaDTO";

export interface PessoaDTO {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO" | string;
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrenciaDTO;
}
