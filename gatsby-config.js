module.exports = {
  siteMetadata: {
    title: `Caprover one-click apps browser`,
    description: `All one-click apps available for your caprover instance`,
    author: `@8bYr0`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    {
      resolve: require.resolve(`./plugins/gatsby-source-git-override`),
      options: {
        name: `sample-apps`,
        remote: `https://github.com/caprover/one-click-apps.git`,
        branch: `master`,
        // Only import the public folder from a codebase.
        patterns: `public/v4/**`,
        overrideModifiedTime: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#061A40`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: "default",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          apps: allFile(
            filter: {
              sourceInstanceName: { eq: "sample-apps" }
              extension: { in: ["yml", "yaml"] }
              relativeDirectory: { regex: "/apps/" }
            }
            sort: { fields: modifiedTime, order: DESC }
          ) {
            edges {
              node {
                extension
                dir
                name
                modifiedTime
                birthTime
              }
            }
          }
        }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "name",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["name"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["extension", "dir", "name", "modifiedTime", "birthTime"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.apps.edges.map(node => ({
            name: node.name,
            modified: node.modifiedTime,
            created: node.birthTime,
          })),
      },
    },
  ],
}
