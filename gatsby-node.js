const fs = require("fs")
const yaml = require("js-yaml")
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query HomePageQuery {
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
      pics: allFile(
        filter: {
          sourceInstanceName: { eq: "sample-apps" }
          extension: { in: ["png", "PNG", "jpg", "jpeg", "JPG", "JPEG"] }
          relativeDirectory: { regex: "/logos/" }
        }
      ) {
        edges {
          node {
            extension
            name
            dir
            modifiedTime
            publicURL
          }
        }
      }
    }
  `)

  const apps = {}
  data.apps.edges.forEach(edge => {
    const ymlDoc = yaml.load(
      fs.readFileSync(
        `${edge.node.dir}/${edge.node.name}.${edge.node.extension}`,
        "utf-8"
      )
    )
    apps[edge.node.name] = {
      // edge,
      data: ymlDoc,
      modified: edge.node.modifiedTime,
      created: edge.node.birthTime,
    }
  })
  data.pics.edges.forEach(edge => {
    apps[edge.node.name] = {
      ...apps[edge.node.name],
      cover: edge.node.publicURL,
    }
  })

  createPage({
    path: "/",
    component: require.resolve("./src/templates/index.tsx"),
    context: {
      apps: Object.keys(apps).map(app => apps[app]),
    },
  })

  // ymlDoc.forEach(element => {
  //   createPage({
  //     path: element.path,
  //     component: require.resolve("./src/templates/basicTemplate.js"),
  //     context: {
  //       pageContent: element.content,
  //       links: element.links,
  //     },
  //   })
  // })
}
