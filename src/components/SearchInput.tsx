"use client"
import { useState, KeyboardEvent, useEffect, useCallback } from 'react';
import SuggestionsList from './SuggestionsList';
import { useApiServices } from '@/hooks/useApiServices';
import { Movie } from '@/types/movie';

export default function SearchInput() {
  const { request } = useApiServices();
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [autocomplete, setAutocomplete] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Movie[]>([]);


  // Função debounce
  const debounce = (func: (query: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(query);
      }, delay);
    };
  };

  // Função para buscar sugestões
  const fetchSuggestions = useCallback(debounce((query: string) => {
    request.get('/search/movie?query=' + query)
      .then((response) => { setSuggestions(response.data.results) })
      .catch((error) => { console.log(error) });
  }, 500), []);

  useEffect(() => {
    if (query) {
      fetchSuggestions(query);
    }
  }, [query, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.length > 0) {
   
      const filtered = suggestions.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      const sorted = filtered.sort((a, b) => {
        const aStartsWith = a.title.toLowerCase().startsWith(query.toLowerCase());
        const bStartsWith = b.title.toLowerCase().startsWith(query.toLowerCase());
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
      setFilteredSuggestions(sorted);
    }
  }, [suggestions, query]);

  useEffect(() => {
    if (filteredSuggestions.length > 0) {
      setAutocomplete(filteredSuggestions[0].title);
    } else {
      setAutocomplete('');
    }
  }, [query, filteredSuggestions]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (selectedIndex < filteredSuggestions.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        setQuery(filteredSuggestions[selectedIndex].title);
        setSelectedIndex(-1);
      }
    } else if (e.key === 'ArrowRight') {
      if (autocomplete) {
        setQuery(autocomplete);
        setSelectedIndex(-1);
      }
    } else if (e.key === 'ArrowLeft') {
      const input = e.target as HTMLInputElement;
      if (input.selectionStart === 0 && autocomplete) {
        setAutocomplete('');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
    if (e.target.value === '') {
      setFilteredSuggestions([]);
      setSuggestions([]);
    }
  };

  return (
    <div className='mt-10'>
      <p className='text-sm font-medium text-[#464646] mb-1'>Pesquise um filme</p>
      <div className='relative'>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Star Wars"
          className={`text-sm border py-2 px-3 border-[#616161] min-h-8 rounded-lg w-auto md:w-[480px] placeholder-[#8E8E8E] focus:outline-[#006EFF] focus:outline-1 ${query.length > 0 && 'border-[#006EFF]'}`}
        />

        {autocomplete && query && (
          <input
            type="text"
            value={autocomplete !== query ? autocomplete + ' - Utilize a tecla → para aceitar a sugestão' : ''}
            className='absolute top-0 left-0 text-sm border py-2 px-3 border-transparent min-h-8 rounded-lg w-auto md:w-[480px] text-[#8E8E8E] pointer-events-none'
            style={{ opacity: 0.5 }}
            readOnly
          />
        )}
        {query ? <span className='absolute right-5 top-[10px] bg-white'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#006EFF] bg-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </span> : <span className='absolute right-5 top-[10px]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
        </span>}
      </div>
      <p className='text-sm text-[#8E8E8E] mt-1'>Utilize as teclas ↓ ↑ para navegar entre as opções</p>
      {filteredSuggestions.length > 0 && (
        <SuggestionsList
          suggestions={filteredSuggestions}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setQuery={setQuery}
          query={query}
        />)}
    </div>
  );
}