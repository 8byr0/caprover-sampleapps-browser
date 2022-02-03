import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ReactTimeAgo from "react-time-ago"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { IconButton } from "@mui/material"
import Masonry from "@mui/lab/Masonry"
import GitHubIcon from "@mui/icons-material/GitHub"
import Fuse from "fuse.js"
import { useSearchContext } from "../utils/search-context"

const AppsGrid = ({ apps }) => {
  const { filteredItems, setAllItems } = useSearchContext()

  React.useEffect(() => {
    setAllItems(apps)
  }, [apps])

  return (
    <Masonry columns={{ md: 3, xs: 1, sm: 2 }} spacing={2}>
      {filteredItems.map(({ item }) => (
        <Card sx={{ width: "100%" }} elevation={1}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            sx={{ objectFit: "contain", padding: "10px" }}
            image={item.cover}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.data.caproverOneClickApp.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.data.caproverOneClickApp.description}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {item.data.caproverOneClickApp.documentation}
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Updated <ReactTimeAgo date={item.modified} locale="en-US" />
            </Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              Added <ReactTimeAgo date={item.created} locale="en-US" />
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small">
              <GitHubIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Masonry>
  )
}

export default AppsGrid
