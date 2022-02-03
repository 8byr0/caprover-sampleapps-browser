import * as React from "react"
import ReactTimeAgo from "react-time-ago"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Badge, IconButton } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

const AppCard = ({ item }) => {
  const modifiedTime = React.useMemo(() => {
    return new Date(item.modified)
  }, [item.modified])
  const creationTime = React.useMemo(() => {
    return new Date(item.created)
  }, [item.created])

  const isNew = React.useMemo(() => {
    // All items created within a 4 weeks range
    const ONE_WEEK = 604800 * 1000 * 4 /* ms */
    return new Date().getTime() - creationTime.getTime() < ONE_WEEK
  }, [creationTime])
  return (
    <Card
      elevation={1}
      sx={{
        width: "100%",
        position: "relative",
        overflow: "visible",
      }}
    >
      {isNew && (
        <Typography
          variant="overline"
          color="white"
          className="neu"
          sx={{
            zIndex: 1,
            padding: "0 8px",
            borderRadius: "3px 0px 0px 3px",
            position: "absolute",
            top: 5,
            lineHeight: "1.7",
            right: "-4px",
            background: "#dfac47",
            transition: "all .3s ease-in-out",
            "&::after": {
              content: '""',
              borderTop: "4px solid #4e7c7d",
              borderRight: "4px solid transparent",
              position: "absolute",
              bottom: "-4px",
              right: 0,
            },
          }}
        >
          NEW
        </Typography>
      )}
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
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Updated <ReactTimeAgo date={modifiedTime} locale="en-US" />
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Added <ReactTimeAgo date={creationTime} locale="en-US" />
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small">
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default AppCard
