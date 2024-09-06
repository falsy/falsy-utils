import FuDate from "date/FuDate"

describe("Constructor", () => {
  test("YYYY-MM-DD HH:MM:SS 형식의 날짜 문자열을 사용하여 FuDate 인스턴스를 생성할 수 있습니다.", () => {
    const dateString = "2023-08-27 15:30:45"
    const fuDate = new FuDate(dateString)

    expect(fuDate.getDate().toISOString()).toBe(
      new Date("2023-08-27T15:30:45").toISOString()
    )
  })

  test("날짜 객체를 사용하여 FuDate 인스턴스를 생성할 수 있습니다.", () => {
    const dateObject = new Date("2023-08-27T15:30:45")
    const fuDate = new FuDate(dateObject)

    expect(fuDate.getDate()).toEqual(dateObject)
  })
})
