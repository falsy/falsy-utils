import { FilterFunction } from "./interfaces";
/**
 * 여러 개의 필터 함수를 사용하여 배열을 필터링하고 필터링된 결과를 별도의 배열로 반환합니다.
 *
 * @template T - 배열 요소의 유형.
 * @param {T[]} arr - 필터링할 요소의 배열.
 * @param {Array<FilterFunction<T>>} filters - 필터 함수의 배열. 각 함수는 자체 기준에 따라 배열을 필터링합니다.
 * @returns {T[][]} 각 내부 배열에 해당 필터 함수로 필터링한 요소가 포함된 2차원 배열입니다.
 */
declare function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][];
export { multiFilter };
