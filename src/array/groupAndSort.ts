import { groupBy } from "array/groupBy"
import { GroupedData } from "./interfaces"

/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화하고 사용자 정의한 정렬 함수를 사용하여 결과 그룹을 정렬합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화하고 정렬할 객체의 배열입니다.
 * @param {keyof T} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @param {(a: T[keyof T], b: T[keyof T]) => number} comparator - 그룹을 어떻게 정렬해야 하는지 정의하는 비교 함수입니다.
 * @returns {Array<{ [K in keyof T]: T[K] } & { data: T[] }>} 지정된 키로 그룹화하고 정렬된 객체의 배열입니다.
 */
function groupAndSort<T extends object>(
  arr: T[],
  key: keyof T,
  comparator: (a: T[keyof T], b: T[keyof T]) => number
): Array<{ [K in keyof T]: T[K] } & { data: T[] }> {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected the first argument to be an array")
  }

  if (arr.length > 0 && typeof arr[0] !== "object") {
    throw new TypeError("Expected array elements to be objects")
  }

  if (
    typeof key !== "string" &&
    typeof key !== "symbol" &&
    typeof key !== "number"
  ) {
    throw new TypeError(
      "Expected the second argument to be a valid object key (string, symbol, or number)"
    )
  }

  if (arr.length > 0 && !(key in arr[0])) {
    throw new Error(`Key "${String(key)}" does not exist in array elements`)
  }

  if (typeof comparator !== "function") {
    throw new TypeError("Expected the third argument to be a function")
  }

  const grouped: GroupedData<T> = groupBy(arr, key as string)
  const result = Object.keys(grouped)
    .map((groupKey) => ({
      ...({ [key]: groupKey } as { [K in keyof T]: T[K] }),
      data: grouped[groupKey]
    }))
    .sort((a, b) =>
      comparator(
        a[key] as unknown as T[keyof T],
        b[key] as unknown as T[keyof T]
      )
    )

  return result
}

export { groupAndSort }
