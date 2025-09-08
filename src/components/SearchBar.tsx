import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (q: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [q, setQ] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-[400px] mx-auto" // centralizado e largura controlada
    >
      <input
        type="search"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Buscar por nome, local, município..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        style={{marginRight: "10px"}} // sombra sutil
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
