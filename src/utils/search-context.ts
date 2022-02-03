import React from "react"

export enum SortByOption {
  Score = "score",
  Name = "name",
  Creation = "creation",
  Modification = "modification",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export const SearchContext = React.createContext({
  sortBy: SortByOption.Name,
  sortDirection: SortDirection.ASC,
  filteredItems: [],
  allItems: [],
  setAllItems: items => {},
  setSortBy: (sortBy: SortByOption) => {},
  setSortDirection: (sortDirection: SortDirection) => {},
  setFilteredItems: items => {},
})
export function useSearchContext() {
  return React.useContext(SearchContext)
}
