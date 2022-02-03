import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import AppsGrid from "../components/apps-grid"

const IndexPageTemplate = ({ data, pageContext }) => {
  const { apps } = pageContext

  return (
    <Layout>
      <Seo title="Home" />
      <AppsGrid apps={apps} />
    </Layout>
  )
}

export default IndexPageTemplate
