interface SearchBarProps {
  city: string
  setCity: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ city, setCity, onSearch }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input input-bordered flex-grow"
      />
      <button className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}
