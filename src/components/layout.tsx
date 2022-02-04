/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import TimeAgo from "javascript-time-ago"

import en from "javascript-time-ago/locale/en.json"

TimeAgo.addDefaultLocale(en)

import Header from "./header"
import "./layout.css"
import { ThemeProvider, Link } from "@mui/material"
import theme from "../theme"
import Typography from "@mui/material/Typography"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Zoom from "@mui/material/Zoom"
import {
  SearchContext,
  SortByOption,
  SortDirection,
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

const Layout = ({ children, enableSearch = true }) => {
  const [filteredItems, setFilteredItems] = React.useState([])
  const [allItems, setAllItems] = React.useState([])
  const [sortDirection, setSortDirection] = React.useState(SortDirection.DESC)
  const [sortBy, setSortBy] = React.useState(SortByOption.Modification)

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
        <Header showSearchField={enableSearch} />

        <Box
          sx={{
            margin: `100px auto`,
            marginTop: { xs: "185px", sm: "190px", md: "85px" },
            maxWidth: "1200px",
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
        </Box>
        <footer
          style={{
            margin: "auto",
            width: "100%",
            maxWidth: "1200px",
            padding: "0 1.0875rem 1.45rem",
            textAlign: "center",
          }}
        >
          <Typography color="text.secondary" variant="overline">
            © {new Date().getFullYear()}, Built with
            {` `}
            <Link
              color="primary.light"
              href="https://www.gatsbyjs.com"
              target="_blank"
            >
              Gatsby
            </Link>
            {" - "}
            Source code available on{" "}
            <Link
              target="_blank"
              color="primary.light"
              href="https://github.com/8byr0/caprover-sampleapps-browser"
            >
              GitHub
            </Link>
          </Typography>
        </footer>
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
