interface IDateProperties {
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
interface IFuDate {
    getDate(): Date;
    getDateProperties(locales?: string): IDateProperties;
}

declare class FuDate implements IFuDate {
    private readonly date;
    /**
     * Initializes the class with a given date value or the current date if no value is provided.
     *
     * @param {number | string | Date} [dateValue] - The value used to initialize the date. It can be a timestamp (number), a date string, a Date object, or undefined.
     * - If no value is provided, the current date and time will be used.
     * - If a valid value is provided, it will be parsed into a Date object.
     * @throws {Error} Throws an error if the provided date value cannot be parsed into a valid Date object.
     */
    constructor(dateValue?: number | string | Date);
    /**
     * Retrieves the current date.
     *
     * @returns {Date} A Date object representing the current date and time.
     */
    getDate(): Date;
    /**
     * Extracts various date and time properties from the Date object.
     *
     * @param {string} [locale] - Optional locale string for formatting the day of the week name. Defaults to the system's locale.
     * @returns {IDateProperties} An object containing various date and time properties such as year, month, day, day of the week, and formatted strings.
     */
    getDateProperties(locale?: string): IDateProperties;
    /**
     * Validates whether a given Date object matches the specified year, month, day, hour, minute, and second.
     *
     * @param {Date} date - The Date object to validate.
     * @param {number} year - The expected year.
     * @param {number} month - The expected month (1-12).
     * @param {number} [day] - The optional expected day of the month.
     * @param {number} [hour] - The optional expected hour of the day (0-23).
     * @param {number} [minute] - The optional expected minute (0-59).
     * @param {number} [second] - The optional expected second (0-59).
     * @returns {boolean} Returns `true` if all provided date components match the Date object, otherwise `false`.
     */
    private validationDate;
    /**
     * Matches a date string in the format 'YYYY-MM-DD HH:MM:SS' and converts it to a Date object if valid.
     *
     * @param {number | string | Date} dateValue - A date string in 'YYYY-MM-DD HH:MM:SS' format or a Date object.
     * @returns {Date | null} Returns the corresponding Date object if the date string is valid and matches the format, otherwise returns `null`.
     * @throws {Error} Throws an error if the date string is invalid or does not match the expected format.
     */
    private matchDateValue;
    /**
     * Parses a date value from a number, string, or Date object into a valid Date object.
     *
     * @param {number | string | Date} dateValue - The value to parse into a Date object. It can be a timestamp (number), a date string, or an existing Date object.
     * @returns {Date} A valid Date object based on the provided input.
     * @throws {Error} Throws an error if the number is not a valid finite timestamp.
     * @throws {Error} Throws an error if the string cannot be parsed into a valid date.
     * @throws {Error} Throws an error if the provided Date object is invalid (e.g., the time is NaN).
     * @throws {Error} Throws an error if the input is not a number, string, or Date object.
     */
    private parse;
}

type MapFunction<T, U> = (item: T) => Promise<U>;
type FilterFunction<T> = (item: T) => boolean;
type GroupedData<T> = {
    [key: string | number]: T[];
};

/**
 * 제공된 매핑 함수를 사용하여 요소 배열을 비동기적으로 매핑하고 Promise를 반환합니다.
 *
 * @template T - 입력 배열의 요소 유형입니다.
 * @template U - 결과 배열의 요소 유형입니다.
 * @param {T[]} arr - 매핑할 요소의 배열.
 * @param {MapFunction<T, U>} MapFunction - T 유형의 요소를 가져와 U 유형의 값이나 U로 확인되는 Promise를 반환하는 매핑 함수입니다.
 * @returns {Promise<U[]>} 매핑 함수를 비동기적으로 적용한 후 반환된 배열의 Promise입니다.
 */
declare function asyncMap<T, U>(arr: T[], MapFunction: MapFunction<T, U>): Promise<U[]>;

/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화하고 사용자 정의한 정렬 함수를 사용하여 결과 그룹을 정렬합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화하고 정렬할 객체의 배열입니다.
 * @param {keyof T} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @param {(a: T[keyof T], b: T[keyof T]) => number} comparator - 그룹을 어떻게 정렬해야 하는지 정의하는 비교 함수입니다.
 * @returns {Array<{ [K in keyof T]: T[K] } & { data: T[] }>} 지정된 키로 그룹화하고 정렬된 객체의 배열입니다.
 */
declare function groupAndSort<T extends object>(arr: T[], key: keyof T, comparator: (a: T[keyof T], b: T[keyof T]) => number): Array<{
    [K in keyof T]: T[K];
} & {
    data: T[];
}>;

/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화합니다.
 * 요소는 객체여야 하며, 키는 객체에 존재해야 합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화할 객체의 배열입니다.
 * @param {string} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @returns {GroupedData<T>} 지정된 키의 값으로 그룹화된 객체입니다.
 */
declare function groupBy<T extends object>(arr: T[], key: string): GroupedData<T>;

/**
 * 여러 개의 필터 함수를 사용하여 배열을 필터링하고 필터링된 결과를 별도의 배열로 반환합니다.
 *
 * @template T - 배열 요소의 유형.
 * @param {T[]} arr - 필터링할 요소의 배열.
 * @param {Array<FilterFunction<T>>} filters - 필터 함수의 배열. 각 함수는 자체 기준에 따라 배열을 필터링합니다.
 * @returns {T[][]} 각 내부 배열에 해당 필터 함수로 필터링한 요소가 포함된 2차원 배열입니다.
 */
declare function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][];

export { FuDate, type IDateProperties, type IFuDate, asyncMap, groupAndSort, groupBy, multiFilter };
