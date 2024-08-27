import { FilterFunction, GroupedData } from "./IFuArray";
/**
 * Groups the elements of an array based on the specified key.
 * The elements must be objects, and the key must exist in the objects.
 *
 * @template T - The type of elements in the array, constrained to objects.
 * @param {T[]} arr - The array of objects to be grouped.
 * @param {string} key - The key by which the array elements will be grouped. This key must exist in each object in the array.
 * @returns {GroupedData<T>} An object where the keys are the unique values of the specified key in the array, and the values are arrays of objects that share that key.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the elements of the array are not objects.
 * @throws {TypeError} Throws an error if the second argument is not a string.
 * @throws {Error} Throws an error if the specified key does not exist in the elements of the array.
 *
 * @example
 * const arr = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const result = groupBy(arr, 'age');
 * // result will be:
 * // {
 * //   "25": [
 * //     { name: 'Alice', age: 25 },
 * //     { name: 'Charlie', age: 25 }
 * //   ],
 * //   "30": [
 * //     { name: 'Bob', age: 30 }
 * //   ]
 * // }
 */
declare function groupBy<T extends object>(arr: T[], key: string): GroupedData<T>;
/**
 * Groups the elements of an array based on the specified key and sorts the resulting groups using a custom comparator.
 *
 * @template T - The type of elements in the array, constrained to objects.
 * @param {T[]} arr - The array of objects to be grouped and sorted.
 * @param {keyof T} key - The key by which the array elements will be grouped. This key must exist in the objects inside the array.
 * @param {(a: T[keyof T], b: T[keyof T]) => number} comparator - A comparator function that defines how the groups should be sorted. It takes two values of the specified key and returns a negative number, zero, or a positive number to determine the sort order.
 * @returns {Array<{ [K in keyof T]: T[K] } & { data: T[] }>} An array of objects where each object represents a group. Each group contains the key (with the grouped value) and a `data` array containing the grouped elements.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the elements of the array are not objects.
 * @throws {TypeError} Throws an error if the second argument is not a valid object key (string, symbol, or number).
 * @throws {Error} Throws an error if the specified key does not exist in the elements of the array.
 * @throws {TypeError} Throws an error if the third argument is not a function.
 *
 * @example
 * const arr = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 }
 * ];
 * const result = groupAndSort(arr, 'age', (a, b) => (a as number) - (b as number));
 * // result will be:
 * // [
 * //   { age: 25, data: [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ] },
 * //   { age: 30, data: [ { name: 'Bob', age: 30 } ] }
 * // ]
 */
declare function groupAndSort<T extends object>(arr: T[], key: keyof T, comparator: (a: T[keyof T], b: T[keyof T]) => number): Array<{
    [K in keyof T]: T[K];
} & {
    data: T[];
}>;
/**
 * Filters an array using multiple filter functions and returns the filtered results in separate arrays.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array of elements to be filtered.
 * @param {Array<FilterFunction<T>>} filters - An array of filter functions. Each function filters the array by its own criteria.
 * @returns {T[][]} A two-dimensional array where each inner array contains the elements filtered by the corresponding filter function.
 * @throws {TypeError} Throws an error if the first argument is not an array.
 * @throws {TypeError} Throws an error if the second argument is not an array of functions.
 * @throws {TypeError} Throws an error if any element in the filters array is not a function.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6];
 * const filters = [
 *   (n) => n % 2 === 0,  // Filter even numbers
 *   (n) => n % 2 !== 0   // Filter odd numbers
 * ];
 * const result = multiFilter(arr, filters);
 * // result will be [[2, 4, 6], [1, 3, 5]]
 */
declare function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][];
export { multiFilter, groupBy, groupAndSort };
