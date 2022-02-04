import * as React from "react"

import {
  SortCalendarAscending,
  Creation,
  SortCalendarDescending,
  SortAlphabeticalAscending,
  SortAlphabeticalDescending,
  SortClockAscending,
  SortClockDescending,
} from "mdi-material-ui"
import "./layout.css"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

import Box from "@mui/material/Box"
import {
  SortByOption,
  SortDirection,
  useSearchContext,
} from "../utils/search-context"

const ResultsSort = () => {
  const { sortBy, sortDirection, setSortDirection, setSortBy } =
    useSearchContext()
  const sortOptions = [
    {
      value: SortByOption.Score,
      ascIcon: Creation,
      descIcon: Creation,
      canChangeDirection: false,
      label: "Sort by search score",
    },
    {
      value: SortByOption.Name,
      ascIcon: SortAlphabeticalAscending,
      descIcon: SortAlphabeticalDescending,
      label: "Sort by name",
      canChangeDirection: true,
    },
    {
      value: SortByOption.Modification,
      ascIcon: SortClockAscending,
      descIcon: SortClockDescending,
      label: "Sort by modification date",
      canChangeDirection: true,
    },
    {
      value: SortByOption.Creation,
      ascIcon: SortCalendarAscending,
      descIcon: SortCalendarDescending,
      canChangeDirection: true,

      label: "Sort by creation date",
    },
  ]
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginTop: "10px",
        marginBottom: "10px",
        width: "fit-content",
      }}
    >
      <ToggleButtonGroup size="small" aria-label="Sort configuration" exclusive>
        {sortOptions.map((item, i) => {
          return (
            <ToggleButton
              key={item.label}
              value={item}
              selected={sortBy === item.value}
              onClick={() => {
                if (sortBy === item.value && item.canChangeDirection) {
                  setSortDirection(
                    sortDirection === SortDirection.ASC
                      ? SortDirection.DESC
                      : SortDirection.ASC
                  )
                }
                setSortBy(item.value)
              }}
              aria-label={item.label}
            >
              {sortDirection === SortDirection.ASC ? (
                <item.ascIcon />
              ) : (
                <item.descIcon />
              )}
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </Box>
  )
}

export default ResultsSort
