import FuDate from "date/FuDate"

describe("getDateProperties", () => {
  test("올바른 날짜의 하위 속성들을 응답합니다.", () => {
    const dateString = "2023-08-27 15:30:45"
    const fuDate = new FuDate(dateString)
    const locale = "en"
    const properties = fuDate.getDateProperties(locale)
    console.log(properties)
    expect(properties).toEqual({
      year: "2023",
      month: "08",
      day: "27",
      hour: "15",
      minute: "30",
      second: "45",
      yearMonthDay: "2023-08-27",
      yearMonth: "2023-08",
      monthDay: "08-27",
      hourMinuteSecond: "15:30:45",
      hourMinute: "15:30",
      dayOfWeek: new Date("2023-08-27T15:30:45").getDay(),
      dayOfWeekLong: new Date("2023-08-27T15:30:45").toLocaleDateString(
        locale,
        { weekday: "long" }
      ),
      dayOfWeekShort: new Date("2023-08-27T15:30:45").toLocaleDateString(
        locale,
        { weekday: "short" }
      ),
      longTime: new Date("2023-08-27T15:30:45").getTime()
    })
  })
})
