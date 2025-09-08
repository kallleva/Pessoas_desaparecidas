import type { PageableDTO } from "./PageableDTO";
import type { PessoaDTO } from "./PessoaDTO";

export interface PessoasPageDTO {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableDTO;
  size: number;
  content: PessoaDTO[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}