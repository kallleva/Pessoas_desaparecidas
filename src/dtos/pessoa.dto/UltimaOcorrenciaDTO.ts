import type { ListaCartazDTO } from "./ListaCartazDTO";
import type { OcorrenciaEntrevDesapDTO } from "./OcorrenciaEntrevDesapDTO";

export interface UltimaOcorrenciaDTO {
  dtDesaparecimento: string; // ISO date
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
  listaCartaz: ListaCartazDTO[] | null;
  ocoId: number;
}