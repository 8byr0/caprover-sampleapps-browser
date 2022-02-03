export const sortAlphabetically = (asc = true) =>
  function (a, b) {
    // @ts-ignore
    const [{ v: aName }, ,] = a.item
    // @ts-ignore
    const [{ v: bName }, ,] = b.item

    if (aName < bName) {
      return asc ? -1 : 1
    }
    if (aName > bName) {
      return asc ? 1 : -1
    }
    return 0
  }

export const sortByCreationDate = (asc = true) =>
  function (a, b) {
    // @ts-ignore
    const [, { v: aCreated }] = a.item
    // @ts-ignore
    const [, { v: bCreated }] = b.item

    if (aCreated < bCreated) {
      return asc ? -1 : 1
    }
    if (aCreated > bCreated) {
      return asc ? 1 : -1
    }
    return 0
  }
export const sortByModificationDate = (asc = true) =>
  function (a, b) {
    // @ts-ignore
    const [, , { v: aModified }] = a.item
    // @ts-ignore
    const [, , { v: bModified }] = b.item

    if (aModified < bModified) {
      return asc ? -1 : 1
    }
    if (aModified > bModified) {
      return asc ? 1 : -1
    }
    return 0
  }
