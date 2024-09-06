/**
 * 지정된 키를 기준으로 배열의 요소를 그룹화하고 사용자 정의한 정렬 함수를 사용하여 결과 그룹을 정렬합니다.
 *
 * @template T - 배열의 요소 유형은 객체로 제한됩니다.
 * @param {T[]} arr - 그룹화하고 정렬할 객체의 배열입니다.
 * @param {keyof T} key - 배열 요소가 그룹화되는 키입니다. 이 키는 배열의 각 객체에 존재해야 합니다.
 * @param {(a: T[keyof T], b: T[keyof T]) => number} comparator - 그룹을 어떻게 정렬해야 하는지 정의하는 비교 함수입니다.
 * @returns {Array<{ [K in keyof T]: T[K] } & { data: T[] }>} 지정된 키로 그룹화하고 정렬된 객체의 배열입니다.
 */
declare function groupAndSort<T extends object>(arr: T[], key: keyof T, comparator: (a: T[keyof T], b: T[keyof T]) => number): Array<{
    [K in keyof T]: T[K];
} & {
    data: T[];
}>;
export { groupAndSort };
