import * as React from "react"

import Masonry from "@mui/lab/Masonry"
import { useSearchContext } from "../utils/search-context"
import AppCard from "./app-card"

const AppsGrid = ({ apps }) => {
  const { filteredItems, setAllItems } = useSearchContext()

  React.useEffect(() => {
    setAllItems(apps)
  }, [apps])

  return (
    <Masonry columns={{ md: 3, xs: 1, sm: 2 }} spacing={2}>
      {filteredItems.map(({ item }, idx) => (
        <AppCard key={`app-card-${idx}`} item={item} />
      ))}
    </Masonry>
  )
}

export default AppsGrid
