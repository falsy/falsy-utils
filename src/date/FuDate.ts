import { IDateComponents, IDateProperties, IFuDate } from "./IFuDate"

class FuDate implements IFuDate {
  private readonly date: Date

  /**
   * Initializes the class with a given date value.
   *
   * @param {string | Date} dateValue - A Date object or a string representing a date. This value is parsed and used to set the internal date.
   * @throws {Error} Throws an error if the provided date string or Date object is invalid.
   */
  constructor(dateValue: string | Date) {
    this.date = this.parse(dateValue)
  }

  /**
   * Retrieves the current date.
   *
   * @returns {Date} A Date object representing the current date and time.
   */
  getDate(): Date {
    return this.date
  }

  /**
   * Extracts various date and time properties from the Date object.
   *
   * @param {string} [locales] - Optional locale string for formatting the day of the week name. Defaults to the system's locale.
   * @returns {IDateProperties} An object containing various date and time properties such as year, month, day, day of the week, and formatted strings.
   */
  getDateProperties(locales?: string): IDateProperties {
    const localeValue = locales
      ? locales
      : Intl.DateTimeFormat().resolvedOptions().locale
    const year = this.date.getFullYear().toString()
    const month = (this.date.getMonth() + 1).toString().padStart(2, "0")
    const day = this.date.getDate().toString().padStart(2, "0")
    const hour = this.date.getHours().toString().padStart(2, "0")
    const minute = this.date.getMinutes().toString().padStart(2, "0")
    const second = this.date.getSeconds().toString().padStart(2, "0")

    return {
      year,
      month,
      day,
      yearMonthDay: `${year}-${month}-${day}`,
      yearMonth: `${year}-${month}`,
      hourMinuteSecond: `${hour}:${minute}:${second}`,
      hourMinute: `${hour}:${minute}`,
      dayOfWeek: this.date.getDay(),
      dayOfWeekLongName: this.date.toLocaleDateString(localeValue, {
        weekday: "long"
      }),
      dayOfWeekShortName: this.date.toLocaleDateString(localeValue, {
        weekday: "short"
      }),
      longTime: this.date.getTime()
    }
  }

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
  private validationDate(
    date: Date,
    year: number,
    month: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number
  ): boolean {
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      (day && date.getDate() !== day) ||
      (hour && date.getHours() !== hour) ||
      (minute && date.getMinutes() !== minute) ||
      (second && date.getSeconds() !== second)
    ) {
      return false
    }
    return true
  }

  /**
   * Matches a date string in the format 'YYYY-MM-DD HH:MM:SS' and converts it to a Date object if valid.
   *
   * @param {string | Date} dateValue - A date string in 'YYYY-MM-DD HH:MM:SS' format or a Date object.
   * @returns {Date | null} Returns the corresponding Date object if the date string is valid and matches the format, otherwise returns `null`.
   * @throws {Error} Throws an error if the date string is invalid or does not match the expected format.
   */
  private matchDateValue(dateValue: string | Date): Date {
    if (typeof dateValue !== "string") return

    // Date Format:
    // YYYY-MM-DD HH:MM:SS
    if (
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) ([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/.test(
        dateValue
      )
    ) {
      const [datePart, timePart] = dateValue.split(" ")
      const [year, month, day] = datePart.split("-").map(Number)
      const [hour, minute, second] = timePart.split(":").map(Number)

      const date = new Date(year, month - 1, day, hour, minute, second)

      if (this.validationDate(date, year, month, day, hour, minute, second)) {
        return date
      } else {
        throw new Error("Invalid date")
      }
    }

    return null
  }

  /**
   * Split Date data into year, month, day, hour, minute, and second formats.
   *
   * @param {string | Date} dateValue A Date object or a string in date format.
   * @returns {IDateComponents} Object with year, month, day, hour, minute, and second values.
   * @throws {Error} Throws an error if the provided date string or Date object is invalid.
   */
  private extractDateTimeComponents(dateValue: string | Date): IDateComponents {
    const dateMatch = this.matchDateValue(dateValue) || null
    const date = dateMatch ? dateMatch : new Date(dateValue)

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date")
    }

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }

  /**
   * Converts the input date object or date format string to a date object.
   *
   * @param {string | Date} dateValue A Date object or a string in date format.
   * @returns {Date} Date object of the input value.
   */
  private parse(dateValue: string | Date): Date {
    const { year, month, day, hour, minute, second } =
      this.extractDateTimeComponents(dateValue)
    return new Date(year, month - 1, day, hour, minute, second)
  }
}

export default FuDate
