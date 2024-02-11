import { format, getYear } from 'date-fns'

type DateFormat = 'normal' | 'long'

const DATE_FORMAT: Record<DateFormat, string> = {
  normal: 'MMMM dd, yyy',
  long: 'EEEE, MMMM dd, yyyy',
}

export const formatDate = (
  date: string,
  dateFormat: DateFormat = 'normal',
): string => {
  const parsedDate = Date.parse(date)

  if (!parsedDate) {
    return date
  }

  return parsedDate ? format(parsedDate, DATE_FORMAT[dateFormat]) : date
}

export const formatTime = (date: string): string => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, 'h:mm b z') : date
}

export const getDateYear = (date: string) => {
  const parsedDate = Date.parse(date)

  return parsedDate ? getYear(Date.parse(date)) : Number.NaN
}
