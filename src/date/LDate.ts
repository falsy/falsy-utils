import { IDateParts, ILightKitDate } from "../interfaces/date"

class LDate implements ILightKitDate {
  private readonly date: Date

  /**
   * 주어진 날짜 값으로 클래스를 초기화하거나, 값이 제공되지 않으면 현재 날짜로 클래스를 초기화합니다.
   *
   * @param {number | string | Date} [dateValue] - 날짜를 초기화하는 데 사용되는 값입니다.
   * - 값이 제공되지 않으면 현재 날짜와 시간이 사용됩니다.
   * - 유효한 값이 제공되면 Date 객체로 구문 분석됩니다.
   */
  constructor(dateValue?: number | string | Date) {
    if (typeof dateValue === "undefined") {
      this.date = new Date()
      return
    }
    this.date = this.parse(dateValue)
  }

  /**
   * 현재 날짜를 검색합니다.
   *
   * @returns {Date} 현재 날짜와 시간을 나타내는 Date 객체입니다.
   */
  getDate(): Date {
    return this.date
  }

  /**
   * Date 객체에서 다양한 날짜 및 시간 속성을 추출합니다.
   *
   * @param {string} [locale] - 요일 이름을 포맷하기 위한 선택적 로케일 문자열. 시스템 로케일을 기본값으로 사용합니다.
   * @returns {IDateParts} 다양한 날짜 및 시간 속성을 포함하는 객체입니다.
   */
  getDateParts(locale?: string): IDateParts {
    const localeValue = locale
      ? locale
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
      hour,
      minute,
      second,
      yearMonthDay: `${year}-${month}-${day}`,
      yearMonth: `${year}-${month}`,
      monthDay: `${month}-${day}`,
      hourMinuteSecond: `${hour}:${minute}:${second}`,
      hourMinute: `${hour}:${minute}`,
      dayOfWeek: this.date.getDay(),
      dayOfWeekLong: this.date.toLocaleDateString(localeValue, {
        weekday: "long"
      }),
      dayOfWeekShort: this.date.toLocaleDateString(localeValue, {
        weekday: "short"
      }),
      longTime: this.date.getTime()
    }
  }

  /**
   * 현재 날짜(this.date)와 제공된 날짜(date) 사이의 지정된 단위(unit) 내 차이를 계산합니다.
   *
   * @param {Date} date - 비교할 다른 날짜입니다.
   * @param {"year" | "month" | "day" | "hour" | "minute" | "second"} unit - 차이를 계산할 단위입니다.
   * @returns {number} 지정된 단위 내의 차이입니다.
   */
  differenceIn(
    date: Date,
    unit: "year" | "month" | "day" | "hour" | "minute" | "second"
  ): number {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date provided: must be a valid Date object.")
    }

    if (!["year", "month", "day", "hour", "minute", "second"].includes(unit)) {
      throw new Error(
        "Invalid unit provided: must be 'year', 'month', 'day', 'hour', 'minute', or 'second'."
      )
    }

    const diffInMilliseconds = date.getTime() - this.date.getTime()

    switch (unit) {
      case "year":
        return date.getFullYear() - this.date.getFullYear()

      case "month":
        return (
          (date.getFullYear() - this.date.getFullYear()) * 12 +
          (date.getMonth() - this.date.getMonth())
        )

      case "day": {
        const startOfThisDate = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate()
        )
        const startOfInputDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        )
        const diffInMillisecondsDays =
          startOfInputDate.getTime() - startOfThisDate.getTime()
        return Math.round(diffInMillisecondsDays / (1000 * 60 * 60 * 24))
      }

      case "hour":
        return Math.floor(diffInMilliseconds / (1000 * 60 * 60))

      case "minute":
        return Math.floor(diffInMilliseconds / (1000 * 60))

      case "second":
        return Math.floor(diffInMilliseconds / 1000)

      default:
        throw new Error("Invalid unit provided")
    }
  }

  /**
   * 주어진 Date 객체가 지정된 년, 월, 일, 시, 분, 초와 일치하는지 확인합니다.
   *
   * @param {Date} date - 검증할 Date 객체.
   * @param {number} year - 예상 년도.
   * @param {number} month - 예상 월(1-12).
   * @param {number} [day] - 선택 사항인 해당 월의 예상 일.
   * @param {number} [hour] - 선택 사항인 해당 일의 예상 시간(0-23).
   * @param {number} [minute] - 선택 사항인 예상 분(0-59).
   * @param {number} [second] - 선택 사항인 예상 초(0-59).
   * @returns {boolean} 제공된 모든 날짜 구성 요소가 Date 객체와 일치하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.
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
   * 추가적으로 정의된 날짜 형식의 문자열에 해당하는 경우 Date 객체로 변환합니다.
   *
   * @param {number | string | Date} dateValue - 날짜 문자열 또는 Date 객체.
   * @returns {Date | null} 날짜 문자열이 유효하고 형식과 일치하면 해당 Date 객체를 반환하고, 그렇지 않으면 `null`을 반환합니다.
   */
  private matchDateValue(dateValue: number | string | Date): Date {
    if (typeof dateValue !== "string") return null

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
   * 숫자, 문자열 또는 Date 객체를 유효한 Date 객체로 구문 분석합니다.
   *
   * @param {number | string | Date} dateValue - Date 객체로 파싱할 값입니다. 타임스탬프(숫자), 날짜 문자열 또는 기존 Date 객체가 될 수 있습니다.
   * @returns {Date} 제공된 입력을 기반으로 하는 유효한 Date 객체입니다.
   */
  private parse(dateValue: number | string | Date): Date {
    if (typeof dateValue === "number") {
      if (!isFinite(dateValue)) {
        throw new Error("Invalid number provided for date")
      }
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date: number is not a valid timestamp")
      }
      return date
    }

    if (typeof dateValue === "string") {
      const matchedDate = this.matchDateValue(dateValue)
      if (matchedDate) {
        return matchedDate
      }

      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string")
      }
      return date
    }

    if (dateValue instanceof Date) {
      if (isNaN(dateValue.getTime())) {
        throw new Error("Invalid Date object provided")
      }
      return dateValue
    }

    throw new Error("Invalid input: must be a number, string, or Date")
  }
}

export default LDate
