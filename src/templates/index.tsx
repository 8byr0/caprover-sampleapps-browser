import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import AppsGrid from "../components/apps-grid"
import ResultsSort from "../components/results-sort"

const IndexPageTemplate = ({ pageContext }) => {
  const { apps } = pageContext

  return (
    <Layout>
      <Seo title="Caprover one click apps browser" />
      <ResultsSort />
      <AppsGrid apps={apps} />
    </Layout>
  )
}

export default IndexPageTemplate
