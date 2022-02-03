import React from "react"

export const SearchContext = React.createContext({
  filteredItems: [],
  allItems: [],
  setAllItems: items => {},
  setFilteredItems: items => {},
})
export function useSearchContext() {
  return React.useContext(SearchContext)
}
