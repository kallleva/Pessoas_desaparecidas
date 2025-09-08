import React, { useEffect, useState } from "react";
import api from "../services/api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import CardPessoa from "../components/CardPessoa";
import type { PessoaDTO } from "../dtos/pessoa.dto/PessoaDTO";

interface PessoasResponseDTO {
  content: PessoaDTO[];
  totalPages: number;
  totalElements: number;
}

const Home: React.FC = () => {
  const [pessoas, setPessoas] = useState<PessoaDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPessoas = async (page = 1, query = "") => {
    setLoading(true);
    setError("");
    try {
      console.log(`Buscando pessoas - página: ${page}, filtro: "${query}"`);

      const response = await api.get<PessoasResponseDTO>("/pessoas/aberto/filtro", {
        params: {
          nome: query,
          page: page,
          size: 10, // ajustado para algumas APIs Java/Spring
        },
        timeout: 30000, // 30 segundos
      });

      console.log("Resposta da API:", response.data);

      setPessoas(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);

      if (!response.data.content || response.data.content.length === 0) {
        setError("Nenhuma pessoa encontrada.");
      }
    } catch (err: any) {
      console.error("Erro ao buscar pessoas:", err);
      if (err.code === "ECONNABORTED") {
        setError("Tempo de conexão excedido. Tente novamente.");
      } else {
        setError("Erro ao carregar pessoas.");
      }
      setPessoas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPessoas(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen px-6 py-6 bg-gray-100 flex flex-col items-center">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Pessoas Desaparecidas / Localizadas
      </h1>

      {/* Barra de busca */}
      <div className="mb-6 w-full flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Mensagens de loading/erro */}
      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}

      {/* Grid de pessoas */}
      {pessoas.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {pessoas.map((pessoa) => (
            <CardPessoa
              key={pessoa.id}
              pessoa={{
                id: pessoa.id.toString(),
                nome: pessoa.nome,
                fotoUrl: pessoa.urlFoto || "/placeholder.png",
                status: pessoa.ultimaOcorrencia?.encontradoVivo
                  ? "LOCALIZADO"
                  : "DESAPARECIDO",
                idade: pessoa.idade?.toString(),
                ultimaOcorrencia: {
                  dtDesaparecimento: pessoa.ultimaOcorrencia?.dtDesaparecimento,
                  localDesaparecimentoConcat:
                    pessoa.ultimaOcorrencia?.localDesaparecimentoConcat,
                },
              }}
            />
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
