import { format, getYear } from 'date-fns'

export const formatDate = (date: string): string => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, 'EEEE, MMMM dd, yyyy') : date
}

export const formatTime = (date: string): string => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, 'h:mm b z') : date
}

export const getDateYear = (date: string) => {
  const parsedDate = Date.parse(date)

  return parsedDate ? getYear(Date.parse(date)) : Number.NaN
}
