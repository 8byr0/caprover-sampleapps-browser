import { CheckCircle } from "@mui/icons-material"
import { Typography, Grid, Chip, Stack, Box, Breadcrumbs } from "@mui/material"
import Link from "@mui/material/Link"

import { Link as GatsbyLink } from "gatsby"
import * as React from "react"
import ReactTimeAgo from "react-time-ago"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { AppData } from "../types"
import ServiceCard from "../components/service-card"

interface AppDetailsTemplateProps {
  pageContext: {
    appData: AppData
    similar: { name: string; cover: string; slug: string }[]
  }
}

const AppDetailsTemplate: React.FC<AppDetailsTemplateProps> = ({
  pageContext,
}) => {
  const { appData, similar } = pageContext
  const modifiedTime = React.useMemo(() => {
    return new Date(appData.modified)
  }, [appData.modified])
  const creationTime = React.useMemo(() => {
    return new Date(appData.created)
  }, [appData.created])

  const services = React.useMemo(() => {
    return Object.keys(appData.data.services).map(serviceName => ({
      ...appData.data.services[serviceName],
      name: serviceName,
    }))
  }, [appData.data.services])

  return (
    <Layout enableSearch={false}>
      <Seo title={appData.friendlyName} />
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={GatsbyLink} underline="hover" color="inherit" to="/">
          Apps
        </Link>
        <Typography color="text.primary">{appData.friendlyName}</Typography>
      </Breadcrumbs>
      <Grid
        spacing={4}
        container
        wrap="nowrap" // --> add this line to disable wrap
        sx={{ overflow: "hidden", marginTop: "0px" }}
        direction={{ md: "row", sm: "column", xs: "column" }}
      >
        <Grid item md={3} sm={4} xs={12}>
          <Stack>
            <Box>
              <img
                alt={`${appData.friendlyName} logo`}
                style={{
                  width: "150px",
                  maxWidth: "80%",
                  height: "100px",
                  margin: "auto",
                  objectFit: "contain",
                }}
                src={appData.cover}
              />
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ textTransform: "capitalize" }}
              >
                {appData.data.caproverOneClickApp.displayName}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {appData.data.caproverOneClickApp.description}
              </Typography>
              {appData.data.caproverOneClickApp.isOfficial && (
                <Chip
                  sx={{ width: "fit-content" }}
                  icon={<CheckCircle />}
                  color="success"
                  variant="outlined"
                  label="Official integration"
                />
              )}
              <Typography
                gutterBottom
                variant="caption"
                color="text.secondary"
                component="div"
              >
                Created <ReactTimeAgo date={creationTime} locale="en-US" /> -
                Last update <ReactTimeAgo date={modifiedTime} locale="en-US" />
              </Typography>

              {similar.length > 0 && (
                <Box sx={{ margin: "20px 0" }}>
                  <Typography variant="h6">Related apps</Typography>
                  {similar.map((sim, idx) => (
                    <Link
                      href={`/app/${sim.slug}`}
                      key={`link-similar--${idx}`}
                    >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        sx={{ margin: "10px 0" }}
                      >
                        <img
                          style={{
                            marginBottom: 0,
                            width: "60px",
                            objectFit: "contain",
                          }}
                          src={sim.cover}
                        />
                        <Typography variant="body2">{sim.name}</Typography>
                      </Stack>
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          </Stack>
        </Grid>
        <Grid item md={9} sm={8} xs={12}>
          <Stack spacing={4}>
            <Typography variant="body1">
              {appData.data.caproverOneClickApp.instructions.start}
            </Typography>
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                Deployed services
              </Typography>
              <Grid
                container
                spacing={2}
                direction={{ md: "row", sm: "row", xs: "column" }}
              >
                {services.map((service, idx) => (
                  <Grid item md={3} sm={6} xs={12}>
                    <ServiceCard
                      key={`service-card-${idx}`}
                      service={service}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography gutterBottom variant="h5" component="div">
                Variables
              </Typography>
              <Stack spacing={2}>
                {appData.data.caproverOneClickApp.variables.map(variable => (
                  <Box key={variable.id}>
                    <Typography variant="body1">
                      {variable.label}{" "}
                      <Chip
                        size="small"
                        label={`Default: ${variable.defaultValue}`}
                      />
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {variable.id}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {variable.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {/* <pre style={{ width: "100%" }}>{JSON.stringify(similar, null, 2)}</pre>
      <pre style={{ width: "100%" }}>{JSON.stringify(appData, null, 2)}</pre> */}
    </Layout>
  )
}

export default AppDetailsTemplate
