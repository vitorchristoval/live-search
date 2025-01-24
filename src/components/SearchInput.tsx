"use client"
import { useState, KeyboardEvent, useEffect } from 'react';
import SuggestionsList from './SuggestionsList';
import { useApiServices } from '@/hooks/useApiServices';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: (number)[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export default function SearchInput() {
  const { request } = useApiServices();
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [autocomplete, setAutocomplete] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Movie[]>([]);


  useEffect(() => {
    if(suggestions.length > 0 ){
      setFilteredSuggestions(suggestions?.filter(item => item.title.toLowerCase().includes(query.toLowerCase())))
    }
  }, [suggestions])

  useEffect(() => {
    request.get('/search/movie?query=' + query)
      .then((response) => { setSuggestions(response.data.results) })
      .catch((error) => { console.log(error) });
  }, [query])

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
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
    if(e.target.value === ''){
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
          className='text-sm border py-2 px-3 border-[#616161] min-h-8 rounded-lg w-auto md:w-96 placeholder-[#8E8E8E] focus:outline-[#006EFF] focus:outline-1'
        />
        {autocomplete && query && (
          <input
            type="text"
            value={autocomplete !== query  ? autocomplete + ' - Utilize a tecla → para aceitar a sugestão' : autocomplete}
            className='absolute top-0  left-0 text-sm border py-2 px-3 border-transparent min-h-8 rounded-lg w-auto md:w-96 text-[#8E8E8E] pointer-events-none'
            style={{ opacity: 0.5 }}
            readOnly
          />
        )}
      </div>
      <p className='text-sm text-[#8E8E8E] mt-1'>Utilize as teclas ↓ ↑ para navegar entre as opções</p>
      <SuggestionsList
        suggestions={filteredSuggestions}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setQuery={setQuery}
        query={query}
      />
    </div>
  );
}