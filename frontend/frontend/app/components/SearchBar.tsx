import { FormEvent } from 'react';

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
}

/**
 * SearchBar component for entering city name and triggering weather fetch.
 */
export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="input input-bordered w-full mb-2 text-gray-700"
      />
      <button type="submit" className="btn btn-primary w-full">
        Search
      </button>
    </form>
  );
}