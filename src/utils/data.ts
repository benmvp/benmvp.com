interface Item {
  date: string
  title: string
}

export const sortByDate = <I extends Item>(
  items: I[],
  sortBy = 'date',
  sortOrder = 'desc',
) =>
  items.sort((itemA, itemB) => {
    const direction = sortOrder === 'asc' ? 1 : -1

    if (sortBy === 'date') {
      return direction * (Date.parse(itemA.date) > Date.parse(itemB.date) ? 1 : -1)
    }

    if (sortBy === 'title') {
      return direction * (itemA.title > itemB.title ? 1 : -1)
    }

    return 0
  })

export const paginate = <I extends Item>(items: I[], page = 1, size = -1) => {
  const pageIndex = page - 1
  const displaySize = size === -1 ? items.length : size

  return items.slice(pageIndex * displaySize, (pageIndex + 1) * displaySize)
}
