export interface IDateProperties {
  year: string
  month: string
  day: string
  yearMonthDay: string
  yearMonth: string
  hourMinuteSecond: string
  hourMinute: string
  dayOfWeek: number
  dayOfWeekLongName: string
  dayOfWeekShortName: string
  longTime: number
}

export interface IFuDate {
  getDate(): Date
  getDateProperties(locales?: string): IDateProperties
}
