interface SearchBarProps {
  city: string
  setCity: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  return (
    <div className="flex items-center search-bar gap-2">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input input-bordered flex-grow w-full max-w-xs"
      />
      <button className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}
