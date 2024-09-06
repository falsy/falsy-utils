import { groupAndSort } from "array/groupAndSort"

describe("groupAndSort", () => {
  test("키를 기준으로 객체 배열을 그룹화하고 정렬합니다.", () => {
    const arr = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 25 }
    ]
    const result = groupAndSort(
      arr,
      "age",
      (a, b) => (a as number) - (b as number)
    )

    expect(result).toEqual([
      {
        age: "25",
        data: [
          { name: "Alice", age: 25 },
          { name: "Charlie", age: 25 }
        ]
      },
      {
        age: "30",
        data: [{ name: "Bob", age: 30 }]
      }
    ])
  })

  test("키로 객체 배열을 그룹화하고 정렬을 사용자 정의할 수 있습니다.", () => {
    const arr = [
      { name: "Alice", age: 25, date: "2020-01-01" },
      { name: "Bob", age: 30, date: "2020-01-01" },
      { name: "Charlie", age: 25, date: "2020-01-02" }
    ]
    const result = groupAndSort(
      arr,
      "date",
      (a, b) =>
        Number((b as string).replaceAll("-", "")) -
        Number((a as string).replaceAll("-", ""))
    )

    expect(result).toEqual([
      {
        date: "2020-01-02",
        data: [{ name: "Charlie", age: 25, date: "2020-01-02" }]
      },
      {
        date: "2020-01-01",
        data: [
          { name: "Alice", age: 25, date: "2020-01-01" },
          { name: "Bob", age: 30, date: "2020-01-01" }
        ]
      }
    ])
  })
})
