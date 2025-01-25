"use client"
import React, { useRef, useEffect } from 'react';
import { useGenresContext } from "@/context/genres.context";
import { Movie } from "@/types/movie";
interface SuggestionsListProps {
  suggestions: Movie[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  setQuery: (query: string) => void;
  query: string;
  setPage: (page: number) => void;
  page: number;
  loading: boolean;
}

// Função auxiliar para destacar a query no texto
const highlightMatch = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <strong key={index} className="text-[#0092FF]">{part}</strong> : part
  );
};

export default function SuggestionsList({ suggestions, selectedIndex, setSelectedIndex, setQuery, query, setPage, page, loading }: SuggestionsListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const { genres } = useGenresContext();

  const getGenreNames = (genreIds: number | undefined | null) => {
    return genres.find(genre => genre.id === genreIds)?.name
  };

  // Filtra o item que deu match exato
  const exactMatch = suggestions.find(item => item.title.toLowerCase() === query.toLowerCase());
  // Filtra os itens que não deram match exato
  const filteredSuggestions = suggestions.filter(item => item.title.toLowerCase() !== query.toLowerCase());


  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          setPage(page + 1);
        }
      }
    };

    const ulElement = listRef.current;
    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page]);

  return (
    <ul ref={listRef} className="list-none relative mt-2 w-auto md:w-[480px] h-80 overflow-y-scroll border border-[#8E8E8E] rounded-lg p-[6px] shadow-xl">
      {exactMatch && (
        <li
          key={exactMatch.id}
          className="group cursor-pointer py-[10px] pr-[10px] pl-2 bg-[#E1F2FF] rounded-md"
          onMouseEnter={() => setSelectedIndex(0)}
          onClick={() => setQuery(exactMatch.title)}
        >
          <div className="flex relative gap-2 ">
            <img src={`https://image.tmdb.org/t/p/w200${exactMatch.poster_path}`} alt={exactMatch.title} className="w-16 h-24 rounded-[4px]" />
            <div>
              {highlightMatch(exactMatch.title, query)} ({exactMatch.release_date})
              <div className="flex gap-2 mt-2">
                {exactMatch.genre_ids?.map(genreId =>
                  <span key={genreId} className="text-xs rounded-full px-2 py-[2px] border border-[#D2D2D2] bg-[#E8E8E8]">{getGenreNames(genreId)}</span>
                )}
              </div>
            </div>
            <div className="absolute right-0">
              <span className="hidden group-hover:flex self-center justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className="size-6 text-white ">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
        </li>
      )}
      {filteredSuggestions.map((item, index) => (
        <li
          key={item.id}
          className={`flex relative justify-between cursor-pointer p-2 ${index + 1 === selectedIndex ? 'bg-[#D2D2D2]' : ''}`}
          onMouseEnter={() => setSelectedIndex(index + 1)}
          onClick={() => setQuery(item.title)}
        >
          <div>
            {highlightMatch(item.title, query)}
          </div>
          {index + 1 === selectedIndex && (
            <div className="absolute right-[10px] bg-[#D2D2D2]">
              <span className="flex self-center justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className="size-6 text-white ">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>)}
        </li>
      ))}
      {loading && <li className="text-center p-2 bg-white">Buscando mais filmes...</li>}
    </ul>
  );
}