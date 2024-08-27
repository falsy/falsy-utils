import { groupAndSort, groupBy, multiFilter } from "array/FuArray"

describe("FuArray Functions", () => {
  describe("multiFilter", () => {
    it("You can filter an array with multiple filters.", () => {
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

    it("You can filter an array with a single filter.", () => {
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

    it("You can filter an array with no filters.", () => {
      const arr = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 35 }
      ]
      const filters = []
      const results = multiFilter(arr, filters)

      expect(results).toEqual([])
    })
  })

  describe("groupBy", () => {
    it("You can group an array of objects by a key.", () => {
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

  describe("groupAndSort", () => {
    it("You can group and sort an array of objects by a key.", () => {
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

    it("You can group arrays of objects by key and customize sorting.", () => {
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
})
