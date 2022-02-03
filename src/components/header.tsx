import * as React from "react"
import { styled } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { alpha, AppBar, debounce, InputBase } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Fuse from "fuse.js"
import { useSearchContext } from "../utils/search-context"

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
  const { allItems, setFilteredItems, setAllItems } = useSearchContext()

  const fuse = React.useMemo(() => {
    return new Fuse(allItems, {
      keys: ["data.caproverOneClickApp.displayName"],
    })
  }, [allItems])

  const onSearch = debounce(evt => {
    const queryText = evt.target.value
    if (!queryText) return setAllItems(allItems)

    setFilteredItems(fuse.search(queryText))
  }, 300)

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
        <Search onChange={onSearch}>
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
