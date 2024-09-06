import { GroupedData } from "./interfaces";
/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화합니다.
 * 요소는 객체여야 하며, 키는 객체에 존재해야 합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화할 객체의 배열입니다.
 * @param {string} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @returns {GroupedData<T>} 지정된 키의 값으로 그룹화된 객체입니다.
 */
declare function groupBy<T extends object>(arr: T[], key: string): GroupedData<T>;
export { groupBy };
