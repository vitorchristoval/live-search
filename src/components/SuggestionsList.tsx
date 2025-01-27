"use client"
import React, { useRef, useEffect } from 'react';
import { useGenresContext } from "@/context/genres.context";
import { Movie } from "@/types/movie";
import useFavorites from '@/hooks/useFavorites';
import Image from 'next/image';

interface SuggestionsListProps {
  suggestions: Movie[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  setQuery: (query: string) => void;
  query: string;
  setPage: (page: number) => void;
  page: number;
  loading: boolean;
  handleFavorites: (movie: Movie) => void;
  notFound: boolean;
}

// Função auxiliar para destacar a query no texto
const highlightMatch = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <strong key={index} className="text-[#0092FF]">{part}</strong> : part
  );
};

export default function SuggestionsList({ suggestions, selectedIndex, setSelectedIndex, setQuery, query, setPage, page, loading, handleFavorites, notFound }: SuggestionsListProps) {

  const listRef = useRef<HTMLUListElement>(null);
  const { getGenreNames } = useGenresContext();
  const { favoritesId } = useFavorites();


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
  }, [page, setPage]);

  const clickHandler = (item: Movie) => {
    setQuery(item.title);
    window.open(`https://www.themoviedb.org/movie/${item.id}`, '_blank');
  }

  const isFavorite = (id: number) => favoritesId.includes(id);

  return (
    <ul ref={listRef} className="list-none absolute  bg-white mt-2 w-auto md:w-[480px] h-80 overflow-y-scroll border border-[#8E8E8E] rounded-lg p-[6px] shadow-xl">
      {notFound &&  !loading && !exactMatch && <div className='text-center pt-5'>
        <p className="p-2 font-bold">Nenhum resultado encontrado</p>
        <p className='text-[12px] '>Gostaria de buscar esse termo em outro lugar?</p>
        <div className='flex gap-5 text-[12px] items-center justify-center mt-5'>
          <div className='text-center items-center text-gray-700 border p-4 rounded hover:bg-gray-100 cursor-pointer' onClick={() => window.open(`https://www.google.com/search?q=${query}`)}>
            <p>Buscar no Google</p>
            <Image height={28} width={80}src='/assets/images/google.png' className='h-7 m-auto mt-2' alt='Google' />
          </div>
          <div className='text-center items-center text-gray-700 border p-4 rounded hover:bg-gray-100 cursor-pointer' onClick={() => window.open(`https://www.imdb.com/find/?q=${query}`)}>
            <p>Buscar no IMDB</p>
            <Image height={28} width={80}src='/assets/images/imdb.png' className='h-7 m-auto mt-2' alt='IMDB' />
          </div>
        </div>
      </div>}
      {exactMatch && (
        <li
          key={exactMatch.id}
          data-testid={exactMatch.id}
          className="group cursor-pointer py-[10px] pr-[10px] pl-2 bg-[#E1F2FF] rounded-md"
          onMouseEnter={() => setSelectedIndex(0)}

        >
          <div className="flex relative gap-2 ">
            <Image width={64} height={96} src={`https://image.tmdb.org/t/p/w200${exactMatch.poster_path}`} alt={exactMatch.title} className="w-16 h-24 rounded-[4px]" />
            <div onClick={() => clickHandler(exactMatch)}>
              {highlightMatch(exactMatch.title, query)} ({new Date(exactMatch.release_date).getFullYear()})
              <div className="flex gap-2 mt-2">
                {exactMatch.genre_ids?.map(genreId =>
                  <span key={genreId} className="text-xs rounded-full px-2 py-[2px] border border-[#D2D2D2] bg-[#E8E8E8]">{getGenreNames(genreId)}</span>
                )}
              </div>
            </div>
            <div className="absolute right-0" onClick={() => handleFavorites(exactMatch)}>
              <span className="hidden group-hover:flex self-center justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className={`size-6 ${isFavorite(exactMatch.id) ? 'text-yellow-300' : 'text-white'}`}>
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
          data-testid={item.id}
          className={`flex relative justify-between cursor-pointer p-2 ${index + 1 === selectedIndex ? 'bg-[#D2D2D2]' : ''}`}
          onMouseEnter={() => setSelectedIndex(index + 1)}
        >
          <div onClick={() => clickHandler(item)}>
            {highlightMatch(item.title, query)}
          </div>
          {index + 1 === selectedIndex ? (
            <div className="absolute right-[10px] bg-[#D2D2D2]" onClick={() => handleFavorites(item)}>
              <span className="flex self-center justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className={`size-6 ${isFavorite(item.id) ? 'text-yellow-300' : 'text-white'}`}>
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>) : isFavorite(item.id) && (<div className="absolute right-[10px] " onClick={() => handleFavorites(item)}>
              <span className="flex self-center justify-self-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className={`size-6 text-yellow-300`}>
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </span>
            </div>)}
        </li>
      ))}

    </ul>
  );
}