import { useGenresContext } from "@/context/genres.context";
import { Movie } from "@/types/movie";
interface SuggestionsListProps {
  suggestions: Movie[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  setQuery: (query: string) => void;
  query: string;
}

// Função auxiliar para destacar a query no texto
const highlightMatch = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <strong key={index} className="text-[#0092FF]">{part}</strong> : part
  );
};

export default function SuggestionsList({ suggestions, selectedIndex, setSelectedIndex, setQuery, query }: SuggestionsListProps) {
  const { genres } = useGenresContext();

  const getGenreNames = (genreIds: number | undefined | null) => {
    return genres.find(genre => genre.id === genreIds)?.name
  };

  // Filtra o item que deu match exato
  const exactMatch = suggestions.find(item => item.title.toLowerCase() === query.toLowerCase());
  // Filtra os itens que não deram match exato
  const filteredSuggestions = suggestions.filter(item => item.title.toLowerCase() !== query.toLowerCase());

  return (
    <ul className="list-none mt-2 w-auto md:w-[480px] h-80 overflow-y-scroll border border-[#8E8E8E] rounded-lg p-[6px] shadow-xl">
      {exactMatch && (
        <li
          key={exactMatch.id}
          className="cursor-pointer py-[10px] pr-[10px] pl-2 bg-[#E1F2FF] rounded-md"
          onMouseEnter={() => setSelectedIndex(0)}
          onClick={() => setQuery(exactMatch.title)}
        >
          <div className="flex gap-2 ">
            <img src={`https://image.tmdb.org/t/p/w200${exactMatch.poster_path}`} alt={exactMatch.title} className="w-16 h-24 rounded-[4px]" />
            <div>
              {highlightMatch(exactMatch.title, query)} ({exactMatch.release_date})
              <div className="flex gap-2 mt-2">
                  {exactMatch.genre_ids?.map(genreId => 
                      <span key={genreId} className="text-xs rounded-full px-2 py-[2px] border border-[#D2D2D2] bg-[#E8E8E8]">{getGenreNames(genreId)}</span>
                  )}
              </div>
            </div>
          </div>
        </li>
      )}
      {filteredSuggestions.map((item, index) => (
        <li
          key={item.id}
          className={`cursor-pointer p-2 ${index + 1 === selectedIndex ? 'bg-[#D2D2D2]' : ''}`}
          onMouseEnter={() => setSelectedIndex(index + 1)}
          onClick={() => setQuery(item.title)}
        >
          {highlightMatch(item.title, query)}
        </li>
      ))}
    </ul>
  );
}