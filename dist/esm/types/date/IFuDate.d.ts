export interface IDateProperties {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    yearMonthDay: string;
    yearMonth: string;
    monthDay: string;
    hourMinuteSecond: string;
    hourMinute: string;
    dayOfWeek: number;
    dayOfWeekLong: string;
    dayOfWeekShort: string;
    longTime: number;
}
export interface IFuDate {
    getDate(): Date;
    getDateProperties(locales?: string): IDateProperties;
}
