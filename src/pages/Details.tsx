// src/pages/Details.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import {
  getPessoaById,
  getInformacoesDesaparecido,
  postInformacoesDesaparecido,
} from '../services/api';
import type { PessoaDTO } from '../dtos/pessoa.dto/PessoaDTO';
import type { InformacaoDesaparecidoDTO } from '../dtos/ocorrencia.dto/InformacaoDesaparecidoDTO';

// Substitua a função parseDateDDMMYYYYToISO por esta:
const parseDateDDMMYYYYToLocalDate = (ddmmyyyy: string): string => {
  const parts = ddmmyyyy.split('/');
  if (parts.length !== 3) return new Date().toISOString().split('T')[0];
  const [dd, mm, yyyy] = parts.map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};


const formatISODate = (iso?: string | null) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR');
};

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pessoa, setPessoa] = useState<PessoaDTO | null>(null);
  const [informacoes, setInformacoes] = useState<InformacaoDesaparecidoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [observacao, setObservacao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [localAvistado, setLocalAvistado] = useState('');
  const [dataOcorrencia, setDataOcorrencia] = useState('');
  const [fotos, setFotos] = useState<FileList | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPessoaById(Number(id));
        setPessoa(data);
        const ocoId = data?.ultimaOcorrencia?.ocoId;
        if (ocoId) await loadInformacoes(ocoId);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar detalhes do registro.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const loadInformacoes = async (ocoId: number) => {
    try {
      setInfoLoading(true);
      const infos = await getInformacoesDesaparecido(ocoId);
      setInformacoes(infos || []);
    } catch (err) {
      console.error('Erro ao carregar informações da ocorrência', err);
    } finally {
      setInfoLoading(false);
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => setFotos(e.target.files);

  const limparFormulario = () => {
    setObservacao('');
    setTelefone('');
    setLocalAvistado('');
    setDataOcorrencia('');
    setFotos(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pessoa) return;
    const ocoId = pessoa.ultimaOcorrencia?.ocoId;
    if (!ocoId) return alert('Registro não possui ocorrência associada.');
    if (!observacao || !dataOcorrencia) return alert('Preencha observação e data.');

    const descricaoParts: string[] = [];
    if (localAvistado) descricaoParts.push(`Local avistado: ${localAvistado}`);
    if (telefone) descricaoParts.push(`Telefone: ${telefone}`);
    const descricao = descricaoParts.join(' | ') || '';

    const dataISO = parseDateDDMMYYYYToLocalDate(dataOcorrencia);

    const filesArray = fotos ? Array.from(fotos).slice(0, 5) : undefined;

    try {
      setFormLoading(true);
      await postInformacoesDesaparecido(ocoId, observacao, descricao, dataISO, filesArray);
      alert('Informação enviada com sucesso!');
      await loadInformacoes(ocoId);
      limparFormulario();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar informação.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Carregando...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!pessoa) return <div className="text-center mt-10">Nenhum registro encontrado.</div>;

  const ultima = pessoa.ultimaOcorrencia;

  return (
    <div className="flex flex-col items-center p-6 space-y-8 max-w-6xl mx-auto">

      {/* Botão voltar */}
      <div className="w-full flex justify-start">
        <button onClick={() => nav(-1)} className="text-blue-600 hover:underline font-medium">← Voltar</button>
      </div>

      {/* Seção 1: Detalhes da pessoa */}
      <section className="w-full ">
          <h2 className="text-xl font-semibold border-b pb-2">Detalhes da pessoa</h2>
        <div className="flex flex-row bg-white rounded-xl shadow-md p-6 gap-6 w-full max-w-4xl items-start">
          
          {/* Imagem à esquerda */}
          <div className="w-1/3 flex justify-center" style={{ marginLeft: '80px', marginRight: '80px' }}>
            <img
              src={pessoa.urlFoto || '/placeholder.png'}
              alt={pessoa.nome}
              className="w-40 h-40 md:h-48 object-cover rounded-lg"
            />
          </div>

          {/* Dados à direita */}
          <div className="w-2/3 flex flex-col justify-start space-y-2 text-sm">
          
            <p><strong>Nome:</strong> {pessoa.nome}</p>
            <p>
              <strong>Status:</strong> 
              <span className={`px-2 py-1 ml-2 font-semibold rounded-full text-white ${pessoa.vivo ? 'bg-green-500' : 'bg-red-500'}`}>
                {pessoa.vivo ? 'LOCALIZADO' : 'DESAPARECIDO'}
              </span>
            </p>
            <p><strong>Idade:</strong> {pessoa.idade ?? '-'}</p>
            <p><strong>Sexo:</strong> {pessoa.sexo ?? '-'}</p>
            {ultima && (
              <div className="mt-2">
                <h4 className="font-semibold">Última ocorrência</h4>
                <div className="grid grid-cols-1 gap-1 mt-1 text-sm">
                  <p><strong>Data desaparecimento:</strong> {formatISODate(ultima.dtDesaparecimento)}</p>
                  <p><strong>Data localização:</strong> {formatISODate(ultima.dataLocalizacao)}</p>
                  <p><strong>Local:</strong> {ultima.localDesaparecimentoConcat || '-'}</p>
                  <p><strong>Encontrado vivo:</strong> {ultima.encontradoVivo ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Seção 2: Formulário de envio */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Enviar informação</h2>
        <form className="space-y-4 mt-4" onSubmit={submit}>
          <div>
            <label className="block mb-1 font-medium text-sm">Observação</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              required
              className="border rounded-md p-2 w-full text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Data (dd/mm/yyyy)</label>
            <IMaskInput
              mask="00/00/0000"
              value={dataOcorrencia}
              onAccept={(value: string) => setDataOcorrencia(value)}
              placeholder="dd/mm/yyyy"
              className="border rounded-md p-2 w-full text-sm"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Local avistado</label>
            <input value={localAvistado} onChange={(e) => setLocalAvistado(e.target.value)} className="border rounded-md p-2 w-full text-sm" />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Telefone (opcional)</label>
            <IMaskInput
              mask="(00) 00000-0000"
              value={telefone}
              onAccept={(value: string) => setTelefone(value)}
              placeholder="(99) 99999-9999"
              className="border rounded-md p-2 w-full text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Anexar fotos (até 5)</label>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFiles} />
          </div>
          <button type="submit" disabled={formLoading} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md shadow text-sm">
            {formLoading ? 'Enviando...' : 'Enviar informação'}
          </button>
        </form>
      </section>

      {/* Seção 3: Informações registradas */}
      <section className="w-full bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Informações registradas</h2>
        {infoLoading ? (
          <div className="mt-2 text-sm">Carregando informações...</div>
        ) : informacoes.length === 0 ? (
          <div className="mt-2 text-sm">Nenhuma informação registrada ainda.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {informacoes.map((inf, idx) => (
              <div key={idx} className="bg-gray-50 p-3 rounded-md shadow-sm text-sm space-y-1">
                {inf.informacao && <p><strong>Descrição:</strong> {inf.informacao}</p>}
                {inf.data && <p><strong>Data:</strong> {formatISODate(inf.data)}</p>}
                {inf.anexos && inf.anexos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {inf.anexos.map((foto, i) => (
                      <img key={i} src={foto} alt={`Foto ${i+1}`} className="w-24 h-24 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Details;
