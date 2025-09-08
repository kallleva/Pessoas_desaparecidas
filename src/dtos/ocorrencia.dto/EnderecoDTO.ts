export interface EnderecoDTO {
  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidadeId: number;
  uf: string;
  referencia?: string;
  latitude?: number;
  longitude?: number;
  cep?: string;
  tipoEndereco?: string;
}

export interface TelefoneDTO {
  numero: string;
  tipoTelefone: string;
}

export interface EmailDTO {
  endereco: string;
  principal: boolean;
}

export interface VitimaDTO {
  nome: string;
  nomeSocial?: string;
  razaoSocial?: string;
  mae?: string;
  pai?: string;
  dtNascimento?: string;
  naturalidadeId?: number;
  sexo?: string;
  orientacaoSexual?: string;
  identidadeGenero?: string;
  escolaridade?: string;
  estadoCivil?: string;
  cutis?: string;
  funcaoPublica?: string;
  nacionalidadeId?: number;
  cpfCnpj?: number;
  rgNumero?: string;
  rgEmissor?: string;
  rgUF?: string;
  tipoPessoa?: string;
  profissao?: string;
  restrito?: boolean;
  dtFalecimento?: string;
  vivo?: boolean;
  telefones?: TelefoneDTO[];
  emails?: EmailDTO[];
  enderecos?: EnderecoDTO[];
}

export interface VitimaFotoDTO {
  descricao?: string;
  tamanho?: number;
  tipo?: string;
  data?: string;
  principal?: boolean;
  hash?: string;
  bucket?: string;
}

export interface CriarOcorrenciaDTO {
  protocolo?: string;
  numAip?: string;
  numIp?: string;
  enderecos?: EnderecoDTO[];
  vitima: VitimaDTO;
  vitimaFotos?: VitimaFotoDTO[];
  unidadeId?: number;
  usuarioCadastroId?: number;
  boNumero?: string;
  origemBO?: string;
  codBO?: number;
  dataHoraFato?: string;
  altura?: string;
  compleicao?: string;
  cabeloCor?: string;
  cabeloTipo?: string;
  olhoTipo?: string;
  olhoCor?: string;
  fratura?: string;
  placaMetalica?: string;
  tatuagem?: string;
  cicatriz?: string;
  arcadaDentaria?: string;
  aparelhoDentario?: boolean;
  defeitoFisico?: string;
  deficienciaFisica?: string;
  deficienciaMental?: string;
  deficienciaMentalCuratela?: boolean;
  deficienciaMentalLaudo?: boolean;
  deficienciaMentalInterdicao?: boolean;
  doencaTransmissivelIncuravel?: string;
  gravidez?: boolean;
  cegueira?: boolean;
  faccao?: boolean;
  faccaoNome?: string;
  grupoSanguineo?: string;
  fatorRh?: string;
  contatos?: {
    nome: string;
    telefone: string;
    grauParentesco: string;
  }[];
  entrevistaComportamental?: Record<string, any>;
  entrevistaDesaparecimento?: Record<string, any>;
  grauParentescoComunicante?: string;
  grauParentescoLocalizacao?: string;
  telefoneLocalizacao?: string;
  condicaoLocalizacao?: string;
  encontradoVivo?: boolean;
  sigiloso?: boolean;
  grauParentescoPessoaTermo?: string;
  informacaoMorte?: boolean;
  informacaoMorteBoNumero?: string;
  nomeUsuarioCadastro?: string;
  cargoUsuarioCadastro?: string;
  comunicante?: VitimaDTO;
  redesSociaisVitima?: {
    tipoRedeSocial: string;
    url: string;
  }[];
}
