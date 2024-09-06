import { GroupedData } from "./interfaces"

/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화합니다.
 * 요소는 객체여야 하며, 키는 객체에 존재해야 합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화할 객체의 배열입니다.
 * @param {string} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @returns {GroupedData<T>} 지정된 키의 값으로 그룹화된 객체입니다.
 */
function groupBy<T extends object>(arr: T[], key: string): GroupedData<T> {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected the first argument to be an array")
  }

  if (arr.length > 0 && typeof arr[0] !== "object") {
    throw new TypeError("Expected array elements to be objects")
  }

  if (typeof key !== "string") {
    throw new TypeError("Expected the second argument to be a string")
  }

  if (arr.length > 0 && !(key in arr[0])) {
    throw new Error(`Key "${key}" does not exist in array elements`)
  }

  return arr.reduce((acc, item) => {
    const group = item[key]
    if (!acc[group]) {
      acc[group] = []
    }
    acc[group].push(item)
    return acc
  }, {} as GroupedData<T>)
}

export { groupBy }
