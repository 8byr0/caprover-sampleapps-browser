import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#061A40",
      light: "#3a64b5",
    },
    secondary: {
      main: "#B9D6F2",
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
