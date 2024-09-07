import LDate from "date/LDate"

describe("Constructor", () => {
  test("YYYY-MM-DD HH:MM:SS 형식의 날짜 문자열을 사용하여 LDate 인스턴스를 생성할 수 있습니다.", () => {
    const dateString = "2023-08-27 15:30:45"
    const lDate = new LDate(dateString)

    expect(lDate.getDate().toISOString()).toBe(
      new Date("2023-08-27T15:30:45").toISOString()
    )
  })

  test("날짜 객체를 사용하여 LDate 인스턴스를 생성할 수 있습니다.", () => {
    const dateObject = new Date("2023-08-27T15:30:45")
    const lDate = new LDate(dateObject)

    expect(lDate.getDate()).toEqual(dateObject)
  })
})
