import { multiFilter } from "array/multiFilter"

describe("multiFilter", () => {
  test("배열을 여러 개의 필터로 한번에 필터링할 수 있습니다.", () => {
    const arr = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 35 }
    ]
    const filters = [
      (item: { name: string; age: number }) => item.age > 25,
      (item: { name: string; age: number }) => item.name.startsWith("B")
    ]
    const results = multiFilter(arr, filters)

    expect(results).toEqual([
      [
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 35 }
      ],
      [{ name: "Bob", age: 30 }]
    ])
  })

  test("배열을 하나의 필터로 필터링할 수 있습니다.", () => {
    const arr = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 35 }
    ]
    const filters = [(item: { name: string; age: number }) => item.age > 25]
    const results = multiFilter(arr, filters)

    expect(results).toEqual([
      [
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 35 }
      ]
    ])
  })
})
