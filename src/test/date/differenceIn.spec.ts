import LDate from "date/LDate"

describe("differenceIn", () => {
  let lDate: LDate
  let targetDate: Date

  test("연도 차이 계산", () => {
    lDate = new LDate("2020-01-01T00:00:00")
    targetDate = new Date("2021-01-01T00:00:00")
    expect(lDate.differenceIn(targetDate, "year")).toBe(1)
  })

  test("월 차이 계산", () => {
    lDate = new LDate("2020-01-01T00:00:00")
    targetDate = new Date("2020-05-01T00:00:00")
    expect(lDate.differenceIn(targetDate, "month")).toBe(4)
  })

  test("일 차이 계산", () => {
    lDate = new LDate("2020-01-01T00:00:00")
    targetDate = new Date("2020-01-08T00:00:00")
    expect(lDate.differenceIn(targetDate, "day")).toBe(7) // 2020년은 윤년
  })

  test("시간 차이 계산", () => {
    lDate = new LDate("2020-01-01T10:00:00")
    targetDate = new Date("2020-01-01T08:00:00")
    expect(lDate.differenceIn(targetDate, "hour")).toBe(-2) // 366일 * 24시간
  })

  test("분 차이 계산", () => {
    lDate = new LDate("2020-01-01T00:20:00")
    targetDate = new Date("2020-01-01T00:10:00")
    expect(lDate.differenceIn(targetDate, "minute")).toBe(-10) // 8784시간 * 60분
  })

  test("초 차이 계산", () => {
    lDate = new LDate("2020-01-01T00:00:00")
    targetDate = new Date("2020-01-01T00:00:30")
    expect(lDate.differenceIn(targetDate, "second")).toBe(30) // 527040분 * 60초
  })
})
