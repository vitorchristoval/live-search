
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
    part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
  );
};

export default function SuggestionsList({ suggestions, selectedIndex, setSelectedIndex, setQuery, query }: SuggestionsListProps) {
  // Filtra o item que deu match exato
  const exactMatch = suggestions.find(item => item.title.toLowerCase() === query.toLowerCase());
  // Filtra os itens que não deram match exato
  const filteredSuggestions = suggestions.filter(item => item.title.toLowerCase() !== query.toLowerCase());

  return (
    <ul className="list-none p-0 mt-2">
      {exactMatch && (
        <li
          key={exactMatch.id}
          className="cursor-pointer p-2 font-bold bg-blue-200"
          onMouseEnter={() => setSelectedIndex(0)}
          onClick={() => setQuery(exactMatch.title)}
        >
          <div className="flex mt-2">
            <img src={`https://image.tmdb.org/t/p/w200${exactMatch.poster_path}`} alt={exactMatch.title} className="w-16 h-24 mr-4" />
            <div>
              {highlightMatch(exactMatch.title, query)} ({exactMatch.release_date})
              <div className="text-sm">{}</div>
            </div>
          </div>
        </li>
      )}
      {filteredSuggestions.map((item, index) => (
        <li
          key={item.id}
          className={`cursor-pointer p-2 ${index + 1 === selectedIndex ? 'bg-gray-200' : ''}`}
          onMouseEnter={() => setSelectedIndex(index + 1)}
          onClick={() => setQuery(item.title)}
        >
          {highlightMatch(item.title, query)}
        </li>
      ))}
    </ul>
  );
}