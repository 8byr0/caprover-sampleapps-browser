# caprover-sampleapps-browser

Public frontend to browse caprover sample apps
![Sample Apps browser](/docs/homepage_screenshot.png)

## Introduction

This project exists because the only way to know which integrations are available is by logging in a caprover instance (i.e. selfhosted or public demo).
I wanted a platform to:

- know which new integrations have been added/updated
- share this list to argue on the power of caprover

All these informations are available on (sample apps)[repo https://github.com/caprover/one-click-apps], this browser is just a simple scrapper fetching data from github

## Under the hood

This website uses `gatsby` to run. A standalone change detection instance is running to trigger build whenever something changes in the repo.

- UI: (material ui)[https://github.com/mui-org/material-ui]
- Data fetching: (gatsby-source-git)[https://github.com/stevetweeddale/gatsby-source-git] (locally patched version)
- Frontend search: (fuse.js)[https://fusejs.io/]

## License

MIT license, see `LICENSE` file.
