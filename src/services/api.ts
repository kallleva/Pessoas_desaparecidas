// src/services/api.ts
import axios from 'axios';
import type { PessoasPageDTO } from '../dtos/pessoa.dto/PessoasPageDTO';
import type { PessoaDTO } from '../dtos/pessoa.dto/PessoaDTO';
import type { EstatisticoDTO } from '../dtos/pessoa.dto/EstatisticoDTO';
import type { InformacaoDesaparecidoDTO } from '../dtos/ocorrencia.dto/InformacaoDesaparecidoDTO';
import type { MotivoDTO } from '../dtos/ocorrencia.dto/MotivoDTO';
import type { DelegaciaDigitalDTO } from '../dtos/ocorrencia.dto/DelegaciaDigitalDTO';

// Configuração da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://abitus-api.geia.vip/v1',
  timeout: 30000, // 30 segundos
});

// Interceptor de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ----------------------
// PESSOAS
// ----------------------

// Buscar pessoa por ID
export const getPessoaById = async (id: number): Promise<PessoaDTO> => {
  const { data } = await api.get<PessoaDTO>(`/pessoas/${id}`);
  return data;
};

// Buscar pessoas com filtro
export const getPessoasFiltro = async (
  nome?: string,
  faixaIdadeInicial?: number,
  faixaIdadeFinal?: number,
  pagina: number = 1,
  porPagina: number = 10
): Promise<PessoasPageDTO> => {
  const params = { nome, faixaIdadeInicial, faixaIdadeFinal, pagina, porPagina };
  const { data } = await api.get<PessoasPageDTO>('/pessoas/aberto/filtro', { params });
  return data;
};

// Estatísticas
export const getEstatisticas = async (): Promise<EstatisticoDTO> => {
  const { data } = await api.get<EstatisticoDTO>('/pessoas/aberto/estatistico');
  return data;
};

// Lista dinâmica
export const getPessoasDinamico = async (registros: number = 4): Promise<PessoaDTO[]> => {
  const { data } = await api.get<PessoaDTO[]>(`/pessoas/aberto/dinamico`, { params: { registros } });
  return data;
};

// ----------------------
// OCORRÊNCIAS / INFORMAÇÕES DESAPARECIDO
// ----------------------

// Buscar informações de uma ocorrência
export const getInformacoesDesaparecido = async (ocoId: number): Promise<InformacaoDesaparecidoDTO[]> => {
  const { data } = await api.get<InformacaoDesaparecidoDTO[]>(`/ocorrencias/informacoes-desaparecido`, {
    params: { ocorrenciaId: ocoId },
  });
  return data;
};

// Enviar informações adicionais
export const postInformacoesDesaparecido = async (
  ocoId: number,
  informacao: string,
  descricao: string,
  dataOcorrencia: string,
  files?: File[]
): Promise<InformacaoDesaparecidoDTO> => {
  const formData = new FormData();
  formData.append('informacao', informacao);
  formData.append('descricao', descricao);
  formData.append('data', dataOcorrencia);
  formData.append('ocoId', ocoId.toString());
  if (files) files.forEach((file) => formData.append('files', file));

  const { data } = await api.post<InformacaoDesaparecidoDTO>('/ocorrencias/informacoes-desaparecido', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// ----------------------
// DELEGACIA DIGITAL
// ----------------------

// Registrar delegacia digital
export const postDelegaciaDigital = async (payload: DelegaciaDigitalDTO) => {
  const { data } = await api.post('/ocorrencias/delegacia-digital', payload);
  return data;
};

// Verificar duplicidade
export const postVerificarDuplicidade = async (payload: {
  nome: string;
  mae: string;
  cpf: string;
  dataNascimento: string;
  dataDesaparecimento: string;
}) => {
  const { data } = await api.post('/ocorrencias/delegacia-digital/verificar-duplicidade', payload);
  return data;
};

// ----------------------
// MOTIVOS
// ----------------------
export const getMotivos = async (): Promise<MotivoDTO[]> => {
  const { data } = await api.get<MotivoDTO[]>('/ocorrencias/motivos');
  return data;
};

export default api;
