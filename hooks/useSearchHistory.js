import { createContext, useContext, useState } from 'react'

const SearchHistoryContext = createContext()

export function SearchHistoryProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([])

  return (
    <SearchHistoryContext.Provider value={[searchHistory, setSearchHistory]}>
      { children }
    </SearchHistoryContext.Provider>
  )
}

export default function useSearchHistory() {
  return useContext(SearchHistoryContext)
}