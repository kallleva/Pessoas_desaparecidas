import React, { useState } from "react";
import placeholderImg from "../assets/placeholder.png";

interface CardPessoaProps {
  pessoa: {
    id: string;
    nome: string;
    idade?: string;
    nascimento?: string;
    fotoUrl: string;
    ultimaOcorrencia?: {
      dtDesaparecimento?: string;
      localDesaparecimentoConcat?: string;
      dtNascimento?: string;
    };
    status: "DESAPARECIDO" | "LOCALIZADO";
  };
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-"; // caso não seja uma data válida
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const CardPessoa: React.FC<CardPessoaProps> = ({ pessoa }) => {
  const [imgError, setImgError] = useState(false);

  const imageUrl = pessoa.fotoUrl && !imgError ? pessoa.fotoUrl : placeholderImg;

  return (
    <div
      className="bg-white border border-gray-200 shadow flex flex-col items-center"
      style={{
        padding: "15px",
        borderRadius: "15px",
        color: "black",
        background: "white",
        width: "200px",
        margin: "10px",
      }}
    >
      {/* Imagem */}
      <div className="relative w-full h-[200px] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center mb-2">
        <img
          src={imageUrl}
          alt={pessoa.nome}
          height={200}
          className="object-contain w-full h-full rounded-xl"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Informações */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold mb-1 text-center line-clamp-2">
            {pessoa.nome}
          </h3>

          {/* Status em destaque */}
          <p
            className={`text-xs font-bold text-center mb-3 `}
            style={{ color: pessoa.status === "LOCALIZADO" ? "#16A34A" : "#DC2626" , fontWeight: "bold"}}
          >
            {pessoa.status}
          </p>

          {/* Idade */}
          <p className="text-xs text-gray-600">
            Idade: {pessoa.idade ? `${pessoa.idade} anos` : "-"}
          </p>

          {/* Desaparecimento */}
          <p className="text-xs text-gray-600">
            Desaparecimento:{" "}
            {pessoa.ultimaOcorrencia?.dtDesaparecimento ? (
              <strong>
                {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
              </strong>
            ) : (
              "-"
            )}
          </p>

          {/* Local */}
          <p className="text-xs text-gray-600">
            Local: {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat || "-"}
          </p>
        </div>

        {/* Botão */}
        <div className="mt-4 flex flex-col items-center">
          <a
            href={`/detalhe/${pessoa.id}`}
            className="w-full inline-block bg-yellow-400 text-white px-4 py-[5px] rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg text-center text-xs font-semibold transition"
            style={{ color: "white", backgroundColor: "#F59E0B" , borderRadius: "8px"}}
          >
            AUXILIE
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardPessoa;
