import * as React from "react"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { alpha, AppBar, debounce, InputBase } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Fuse from "fuse.js"
import {
  SortByOption,
  SortDirection,
  useSearchContext,
} from "../utils/search-context"
import {
  sortAlphabetically,
  sortByCreationDate,
  sortByModificationDate,
} from "../utils/sort"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}))
export default function PersistentDrawerRight() {
  const data = useStaticQuery(graphql`
    query {
      cover: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 40
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)
  const { sortDirection, sortBy, allItems, setFilteredItems, setAllItems } =
    useSearchContext()
  const getSortFunction = React.useCallback(() => {
    const asc = SortDirection.ASC === sortDirection
    switch (sortBy) {
      case SortByOption.Name: {
        return sortAlphabetically(asc)
      }
      case SortByOption.Creation: {
        return sortByCreationDate(asc)
      }
      case SortByOption.Modification: {
        return sortByModificationDate(asc)
      }
      default: {
        return (a, b) => 0
      }
    }
  }, [sortBy, sortDirection])
  const fuse = React.useMemo(() => {
    return new Fuse(allItems, {
      keys: ["data.caproverOneClickApp.displayName", "created", "modified"],
      ...(sortBy !== SortByOption.Score && {
        sortFn: (a, b) => {
          return getSortFunction()(a, b)
        },
      }),
    })
  }, [allItems, sortBy, sortDirection])

  const [lastQuery, setLastQuery] = React.useState("")

  const onSearch = evt => {
    const queryText = evt.target.value
    setLastQuery(queryText)

    if (!queryText) return setAllItems(allItems)

    setFilteredItems(fuse.search(queryText))
  }

  const onSearchDebounced = debounce(onSearch, 300)

  React.useEffect(() => {
    if (!lastQuery) {
      setFilteredItems(
        allItems
          .sort((a, b) => {
            return getSortFunction()(
              {
                item: [
                  { v: a.data.caproverOneClickApp.displayName },
                  { v: a.created },
                  { v: a.modified },
                ],
              },
              {
                item: [
                  { v: b.data.caproverOneClickApp.displayName },
                  { v: b.created },
                  { v: b.modified },
                ],
              }
            )
          })
          .map(itm => ({ item: itm }))
      )
    } else {
      onSearch({ target: { value: lastQuery } })
    }
  }, [sortBy, sortDirection])

  return (
    <AppBar position="fixed">
      <Toolbar>
        <GatsbyImage
          style={{ marginRight: "10px" }}
          // css={{ margin: `10px auto` }}
          image={getImage(data.cover)}
          loading="eager"
          alt="Caprover logo"
        />

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          Caprover one-click apps browser
        </Typography>
        <Search onChange={onSearchDebounced}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for a service…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  )
}
