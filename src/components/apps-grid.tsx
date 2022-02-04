import * as React from "react"

import Masonry from "@mui/lab/Masonry"
import { useSearchContext } from "../utils/search-context"
import AppCard from "./app-card"
import { Skeleton, Stack } from "@mui/material"

const LoadingCard = () => {
  return (
    <Stack>
      <Skeleton height={250} />
      <Skeleton height={50} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <div style={{ flexGrow: 1 }} />
    </Stack>
  )
}
const AppsGrid = ({ apps }) => {
  const { filteredItems, setAllItems } = useSearchContext()
  const [isLoading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setAllItems(apps)
  }, [apps])
  React.useEffect(() => {
    setLoading(false)
  }, [filteredItems])

  return (
    <Masonry columns={{ md: 3, xs: 1, sm: 2 }} spacing={2}>
      {isLoading && (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      )}
      {!isLoading &&
        filteredItems.map(({ item }, idx) => (
          <AppCard key={`app-card-${idx}`} item={item} />
        ))}
    </Masonry>
  )
}

export default AppsGrid
