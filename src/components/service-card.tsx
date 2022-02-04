import { Folder, RestartAlt } from "@mui/icons-material"
import {
  Typography,
  Chip,
  Stack,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Popover,
  Badge,
} from "@mui/material"
import * as React from "react"
import { Earth, Docker, Connection, CodeBraces } from "mdi-material-ui"
import { OneClickAppService } from "../types"
import { CardActions } from "@mui/material"

interface ServiceCardProps {
  service: OneClickAppService & { name: string }
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Card sx={{ width: { md: "fit-content", xs: "100%" } }}>
      <CardContent>
        <Typography variant="h6">
          {service.name}{" "}
          {!service.caproverExtra?.notExposeAsWebApp && (
            <Earth color="info" sx={{ fontSize: "15px" }} />
          )}
        </Typography>
        <Stack spacing={1}>
          <Chip
            sx={{ width: "fit-content" }}
            icon={<Docker />}
            label={service.image ? service.image : "custom"}
          />

          <Box>
            <List dense>
              {service.volumes?.map((volume, idx) => (
                <ListItem key={`volume-${idx}`}>
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText primary={volume} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </CardContent>
      <CardActions>
        {service.caproverExtra?.containerHttpPort && (
          <Chip
            sx={{ width: "fit-content" }}
            icon={<Connection />}
            label={service.caproverExtra.containerHttpPort}
          />
        )}
        <Chip
          sx={{ width: "fit-content" }}
          icon={<RestartAlt />}
          label={service.restart}
        />
        {service.environment && (
          <Badge
            color="secondary"
            badgeContent={Object.keys(service.environment).length}
          >
            <IconButton onClick={handleClick}>
              <CodeBraces />
            </IconButton>
          </Badge>
        )}
      </CardActions>
      {service.environment && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List dense>
            {Object.keys(service.environment).map((envVar, idx) => (
              <ListItem key={`env-var-${idx}`}>
                <ListItemText
                  primary={envVar}
                  secondary={`default: ${service.environment[envVar]}`}
                />
              </ListItem>
            ))}
          </List>
        </Popover>
      )}
    </Card>
  )
}

export default ServiceCard
