import FuDate from "../date/FuDate"

describe("FuDate Class", () => {
  describe("Constructor", () => {
    it("You can create a FuDate instance with a date string in the format YYYY-MM-DD HH:MM:SS.", () => {
      const dateString = "2023-08-27 15:30:45"
      const fuDate = new FuDate(dateString)
      expect(fuDate.getDate().toISOString()).toBe(
        new Date("2023-08-27T15:30:45").toISOString()
      )
    })

    it("You can create a FuDate instance using a date object.", () => {
      const dateObject = new Date("2023-08-27T15:30:45")
      const fuDate = new FuDate(dateObject)
      expect(fuDate.getDate()).toEqual(dateObject)
    })

    it("Invalid date string will result in an error.", () => {
      expect(() => new FuDate("2023-08-27 15:30:61")).toThrow("Invalid date")
    })
  })

  describe("getDateProperties", () => {
    it("You must respond with correct subdate data.", () => {
      const dateString = "2023-08-27 15:30:45"
      const fuDate = new FuDate(dateString)
      const properties = fuDate.getDateProperties()
      expect(properties).toEqual({
        year: "2023",
        month: "08",
        day: "27",
        yearMonthDay: "2023-08-27",
        yearMonth: "2023-08",
        hourMinuteSecond: "15:30:45",
        hourMinute: "15:30",
        dayOfWeek: new Date("2023-08-27T15:30:45").getDay(),
        dayOfWeekLongName: new Date("2023-08-27T15:30:45").toLocaleDateString(
          undefined,
          { weekday: "long" }
        ),
        dayOfWeekShortName: new Date("2023-08-27T15:30:45").toLocaleDateString(
          undefined,
          { weekday: "short" }
        ),
        longTime: new Date("2023-08-27T15:30:45").getTime()
      })
    })
  })
})
