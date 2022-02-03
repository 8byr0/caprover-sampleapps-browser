/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import TimeAgo from "javascript-time-ago"

import en from "javascript-time-ago/locale/en.json"
import ReactTimeAgo from "react-time-ago"

TimeAgo.addDefaultLocale(en)

import Header from "./header"
import "./layout.css"
import { ToggleButton, ToggleButtonGroup, ThemeProvider } from "@mui/material"
import theme from "../theme"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import CssBaseline from "@mui/material/CssBaseline"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Fab from "@mui/material/Fab"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Zoom from "@mui/material/Zoom"
import {
  SearchContext,
  SortByOption,
  SortDirection,
  useSearchContext,
} from "../utils/search-context"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}
function ScrollTop(props: Props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor")

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

const ResultsSort = () => {
  const { sortBy, sortDirection, setSortDirection, setSortBy } =
    useSearchContext()
  return (
    <Box
      sx={{
        marginLeft: "auto",
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "right",
      }}
    >
      <ToggleButtonGroup
        size="small"
        aria-label="outlined primary button group"
        exclusive
        value={sortBy}
        // @ts-ignore
        onChange={event => setSortBy(event.target.value)}
      >
        <ToggleButton value={SortByOption.Score}>Score</ToggleButton>
        <ToggleButton value={SortByOption.Name}>Name</ToggleButton>
        <ToggleButton value={SortByOption.Modification}>
          Modification
        </ToggleButton>
        <ToggleButton value={SortByOption.Creation}>Creation</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        disabled={sortBy === SortByOption.Score}
        size="small"
        exclusive
        aria-label="outlined primary button group"
        value={sortDirection}
        // @ts-ignore
        onChange={event => setSortDirection(event.target.value)}
      >
        <ToggleButton value={SortDirection.ASC}>ASC</ToggleButton>
        <ToggleButton value={SortDirection.DESC}>DESC</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}

const Layout = ({ children }) => {
  const [filteredItems, setFilteredItems] = React.useState([])
  const [allItems, setAllItems] = React.useState([])
  const [sortDirection, setSortDirection] = React.useState(SortDirection.ASC)
  const [sortBy, setSortBy] = React.useState(SortByOption.Name)

  return (
    <SearchContext.Provider
      value={{
        sortBy,
        sortDirection,
        setSortBy,
        setSortDirection,
        filteredItems,
        allItems,
        setFilteredItems,
        setAllItems: itms => {
          setAllItems(itms)
          setFilteredItems(itms.map(app => ({ item: app })))
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <span id="back-to-top-anchor" />
        <Header />

        <div
          style={{
            margin: `100px auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <ResultsSort />
          <main>{children}</main>
          <footer
            style={{
              marginTop: `2rem`,
            }}
          >
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </footer>
        </div>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </SearchContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
