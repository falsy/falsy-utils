import { IDateProperties, IFuDate } from "./IFuDate";
declare class FuDate implements IFuDate {
    private readonly date;
    /**
     * Initializes the class with a given date value or the current date if no value is provided.
     *
     * @param {number | string | Date} [dateValue] - The value used to initialize the date. It can be a timestamp (number), a date string, a Date object, or undefined.
     * - If no value is provided, the current date and time will be used.
     * - If a valid value is provided, it will be parsed into a Date object.
     * @throws {Error} Throws an error if the provided date value cannot be parsed into a valid Date object.
     *
     * @example
     * const instance1 = new FuDate(); // Initializes with the current date and time.
     * const instance2 = new FuDate(1629918000000); // Initializes with a timestamp.
     * const instance3 = new FuDate("2023-08-27T10:15:00Z"); // Initializes with a valid date string.
     * const instance4 = new FuDate("2023-08-27 10:15:00"); // Initializes with a custom date string.
     * const instance5 = new FuDate(new Date()); // Initializes with a Date object.
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
export default FuDate;
