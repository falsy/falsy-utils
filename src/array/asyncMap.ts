import { MapFunction } from "../interfaces/array"

/**
 * 제공된 매핑 함수를 사용하여 요소 배열을 비동기적으로 매핑하고 Promise를 반환합니다.
 *
 * @template T - 입력 배열의 요소 유형입니다.
 * @template U - 결과 배열의 요소 유형입니다.
 * @param {T[]} arr - 매핑할 요소의 배열.
 * @param {MapFunction<T, U>} MapFunction - T 유형의 요소를 가져와 U 유형의 값이나 U로 확인되는 Promise를 반환하는 매핑 함수입니다.
 * @returns {Promise<U[]>} 매핑 함수를 비동기적으로 적용한 후 반환된 배열의 Promise입니다.
 */
function asyncMap<T, U>(
  arr: T[],
  MapFunction: MapFunction<T, U>
): Promise<U[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected the first argument to be an array")
  }

  if (typeof MapFunction !== "function") {
    throw new TypeError("Expected the second argument to be a function")
  }

  return Promise.all(arr.map(MapFunction))
}

export { asyncMap }
