import { asyncMap } from "array/asyncMap"

describe("asyncMap", () => {
  test("map을 돌며 async 함수가 수행된 결과 요소의 새로운 배열을 반환합니다.", async () => {
    const arr = [1, 2, 3, 4]
    const asyncFnc = (d: number): Promise<number> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(d * d)
        }, 100)
      })
    }

    const result = await asyncMap(arr, async (n) => {
      return await asyncFnc(n)
    })

    expect(result).toEqual([1, 4, 9, 16])
  })
})
