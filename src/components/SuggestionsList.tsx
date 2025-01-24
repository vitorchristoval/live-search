
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

export default function SuggestionsList({ suggestions, selectedIndex, setSelectedIndex, setQuery, query }: SuggestionsListProps) {

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };



  return (
    <ul className=''>
      {suggestions.map((item, index) => {
        const isSelected = index === selectedIndex;
        const isMatch = query.toLowerCase() === item.title.toLowerCase();

        return (
          <li
            key={item.id}
            className={`cursor-pointer p-2 ${isMatch ? 'font-bold bg-blue-200' : ''} ${isSelected ? 'bg-gray-200' : ''}`}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => setQuery(item.title)}
          >
            {highlightMatch(item.title, query)}
            {isMatch && (
              <div className="flex mt-2">
                <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title} className="w-16 h-24 mr-4" />
                <div>
                  <p className="text-sm">{item.overview}</p>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}