// in gastby-browser.js
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const { pathname } = location

  if (pathname !== "/") {
    window.scrollTo(0, 0)
  }

  return false
}
