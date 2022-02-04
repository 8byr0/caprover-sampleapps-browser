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
    if (ymlDoc.caproverOneClickApp.displayName === "") {
      ymlDoc.caproverOneClickApp.displayName = edge.node.name
    }
    apps[edge.node.name] = {
      // edge,
      data: ymlDoc,
      modified: edge.node.modifiedTime,
      created: edge.node.birthTime,
      slug: edge.node.name,
      friendlyName: ymlDoc.caproverOneClickApp.displayName,
    }
  })
  data.pics.edges.forEach(edge => {
    apps[edge.node.name] = {
      ...apps[edge.node.name],
      cover: edge.node.publicURL,
    }
  })
  const appsArray = Object.keys(apps).map(app => apps[app])
  createPage({
    path: "/",
    component: require.resolve("./src/templates/index.tsx"),
    context: {
      apps: appsArray,
    },
  })
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& means the whole matched string
  }
  function replaceAll(str, match, replacement) {
    return str.replace(new RegExp(escapeRegExp(match), "g"), () => replacement)
  }
  appsArray.forEach(element => {
    createPage({
      path: `/app/${element.slug}`,
      component: require.resolve("./src/templates/app.tsx"),
      context: {
        appData: JSON.parse(
          replaceAll(
            replaceAll(JSON.stringify(element), "$$cap_appname", element.slug),
            "$$cap_root_domain",
            "captain.yourdomain.com"
          )
        ),

        similar: appsArray
          .filter(
            current =>
              current.slug !== element.slug &&
              (current.slug.startsWith(element.slug) ||
                element.slug.startsWith(current.slug))
          )
          .map(app => ({
            cover: app.cover,
            name: app.friendlyName,
            slug: app.slug,
          })),
      },
    })
  })
}
