export interface IDateParts {
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
export interface ILightKitDate {
    getDate(): Date;
    getDateParts(locales?: string): IDateParts;
    differenceIn(date: Date, unit: "year" | "month" | "day" | "hour" | "minute" | "second"): number;
}
