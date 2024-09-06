import { groupBy } from "array/groupBy"

describe("groupBy", () => {
  test("키로 객체 배열을 그룹화합니다.", () => {
    const arr = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 }
    ]
    const result = groupBy(arr, "age")

    expect(result).toEqual({
      "25": [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 25 }
      ],
      "30": [{ name: "Charlie", age: 30 }]
    })
  })
})
