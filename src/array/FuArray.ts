import { FilterFunction, GroupedData } from "./IFuArray"

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
function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][] {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected the first argument to be an array")
  }

  if (!Array.isArray(filters)) {
    throw new TypeError(
      "Expected the second argument to be an array of filter functions"
    )
  }

  if (!filters.every((fn) => typeof fn === "function")) {
    throw new TypeError(
      "Expected every element in the filters array to be a function"
    )
  }

  if (filters.length === 0 || arr.length === 0) {
    return []
  }

  const results = filters.map(() => [] as T[])
  for (const item of arr) {
    filters.forEach((filter, index) => {
      if (filter(item)) {
        results[index].push(item)
      }
    })
  }
  return results
}

export { multiFilter, groupBy, groupAndSort }
