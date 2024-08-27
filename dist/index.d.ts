interface IDateProperties {
    year: string;
    month: string;
    day: string;
    yearMonthDay: string;
    yearMonth: string;
    hourMinuteSecond: string;
    hourMinute: string;
    dayOfWeek: number;
    dayOfWeekLongName: string;
    dayOfWeekShortName: string;
    longTime: number;
}
interface IFuDate {
    getDate(): Date;
    getDateProperties(locales?: string): IDateProperties;
}

declare class FuDate implements IFuDate {
    private readonly date;
    /**
     * Initializes the class with a given date value.
     *
     * @param {number | string | Date} dateValue - A Date object or a string representing a date. This value is parsed and used to set the internal date.
     * @throws {Error} Throws an error if the provided date string or Date object is invalid.
     */
    constructor(dateValue: number | string | Date);
    /**
     * Retrieves the current date.
     *
     * @returns {Date} A Date object representing the current date and time.
     */
    getDate(): Date;
    /**
     * Extracts various date and time properties from the Date object.
     *
     * @param {string} [locales] - Optional locale string for formatting the day of the week name. Defaults to the system's locale.
     * @returns {IDateProperties} An object containing various date and time properties such as year, month, day, day of the week, and formatted strings.
     */
    getDateProperties(locales?: string): IDateProperties;
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
     *
     * @example
     * // Parsing a timestamp
     * const date1 = parse(1629918000000); // Valid timestamp
     *
     * // Parsing a valid date string
     * const date2 = parse("2023-08-27T10:15:00Z"); // Valid date string
     *
     * // Parsing an existing Date object
     * const date3 = parse(new Date()); // Valid Date object
     *
     * // Throws an error for invalid input
     * parse("invalid-date"); // Throws: "Invalid date string"
     */
    private parse;
}

type FilterFunction<T> = (item: T) => boolean;
type GroupedData<T> = {
    [key: string | number]: T[];
};

/**
 * Groups the elements of an array based on the specified key.
 * The elements must be objects, and the key must exist in the objects.
 *
 * @template T - The type of elements in the array, constrained to objects.
 * @param {T[]} arr - The array of objects to be grouped.
 * @param {string} key - The key by which the array elements will be grouped. This key must exist in each object in the array.
 * @returns {GroupedData<T>} An object where the keys are the unique values of the specified key in the array, and the values are arrays of objects that share that key.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the elements of the array are not objects.
 * @throws {TypeError} Throws an error if the second argument is not a string.
 * @throws {Error} Throws an error if the specified key does not exist in the elements of the array.
 *
 * @example
 * const arr = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const result = groupBy(arr, 'age');
 * // result will be:
 * // {
 * //   "25": [
 * //     { name: 'Alice', age: 25 },
 * //     { name: 'Charlie', age: 25 }
 * //   ],
 * //   "30": [
 * //     { name: 'Bob', age: 30 }
 * //   ]
 * // }
 */
declare function groupBy<T extends object>(arr: T[], key: string): GroupedData<T>;
/**
 * Groups the elements of an array based on the specified key and sorts the resulting groups using a custom comparator.
 *
 * @template T - The type of elements in the array, constrained to objects.
 * @param {T[]} arr - The array of objects to be grouped and sorted.
 * @param {keyof T} key - The key by which the array elements will be grouped. This key must exist in the objects inside the array.
 * @param {(a: T[keyof T], b: T[keyof T]) => number} comparator - A comparator function that defines how the groups should be sorted. It takes two values of the specified key and returns a negative number, zero, or a positive number to determine the sort order.
 * @returns {Array<{ [K in keyof T]: T[K] } & { data: T[] }>} An array of objects where each object represents a group. Each group contains the key (with the grouped value) and a `data` array containing the grouped elements.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the elements of the array are not objects.
 * @throws {TypeError} Throws an error if the second argument is not a valid object key (string, symbol, or number).
 * @throws {Error} Throws an error if the specified key does not exist in the elements of the array.
 * @throws {TypeError} Throws an error if the third argument is not a function.
 *
 * @example
 * const arr = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const result = groupAndSort(arr, 'age', (a, b) => (a as number) - (b as number));
 * // result will be:
 * // [
 * //   { age: 25, data: [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ] },
 * //   { age: 30, data: [ { name: 'Bob', age: 30 } ] }
 * // ]
 */
declare function groupAndSort<T extends object>(arr: T[], key: keyof T, comparator: (a: T[keyof T], b: T[keyof T]) => number): Array<{
    [K in keyof T]: T[K];
} & {
    data: T[];
}>;
/**
 * Filters an array using multiple filter functions and returns the filtered results in separate arrays.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array of elements to be filtered.
 * @param {Array<FilterFunction<T>>} filters - An array of filter functions. Each function filters the array by its own criteria.
 * @returns {T[][]} A two-dimensional array where each inner array contains the elements filtered by the corresponding filter function.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the second argument is not an array of functions.
 * @throws {TypeError} Throws an error if any element in the filters array is not a function.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6];
 * const filters = [
 *   (n) => n % 2 === 0,  // Filter even numbers
 *   (n) => n % 2 !== 0   // Filter odd numbers
 * ];
 * const result = multiFilter(arr, filters);
 * // result will be [[2, 4, 6], [1, 3, 5]]
 */
declare function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][];

export { FuDate, type IDateProperties, type IFuDate, groupAndSort, groupBy, multiFilter };
