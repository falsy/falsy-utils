# Falsy's Utilities

![NPM Version](https://img.shields.io/npm/v/falsys-utilities?color=%23F38D9B) ![NPM Downloads](https://img.shields.io/npm/dm/falsys-utilities?color=%23F4D94E) ![NPM License](https://img.shields.io/npm/l/falsys-utilities?color=%23BEA6F9)

This is a small and lightweight utility library that brings together commonly used functions during development. While there are already many major and excellent libraries available, they often include a lot of unused methods. Therefore, we are developing this library by focusing on only the essential features, keeping it lightweight.

> It's still in the early stages of development, so there's much room for improvement. ☺️

## All Methods

All the methods provided so far are listed below.

## Date

### Constructor()

Initializes the class with a given date value or the current date if no value is provided.

```ts
import { FuDate } from "falsys-utilities"

const instance1 = new FuDate()
// Initializes with the current date and time.
const instance2 = new FuDate(1629918000000)
// Initializes with a timestamp.
const instance3 = new FuDate("2023-08-27T10:15:00Z")
// Initializes with a valid date string.
const instance4 = new FuDate("2023-08-27 10:15:00")
// Initializes with a custom date string.
const instance5 = new FuDate(new Date())
// Initializes with a Date object.
```

### getDate()

Retrieves the current date.

```ts
import { FuDate } from "falsys-utilities"

const dateString = "2023-08-27T10:15:00Z"
const dateTime = new Date(dateString).getTime()
const fuDateTime = new FuDate(dateString).getDate().getTime()

console.log(new FuDate(dateString).getDate() instanceof Date)
// true
console.log(dateTime === fuDateTime)
// true
```

### getDateProperties(locales?: string)

Extracts various date and time properties from the Date object.

```ts
import { FuDate } from "falsys-utilities"

const dateString = "2023-08-27T10:15:00Z"
const dateProperties = new FuDate(dateString).getDateProperties("en")

console.log(dateProperties)
//{
//  "year": "2023",
//  "month": "08",
//  "day": "27",
//  "yearMonthDay":" 2023-08-27",
//  "yearMonth": "2023-08",
//  "hourMinuteSecond": "19:15:00",
//  "hourMinute": "19:15",
//  "dayOfWeek": 0,
//  "dayOfWeekLongName": "Sunday",
//  "dayOfWeekShortName": "Sun",
//  "longTime": 1693131300000
//}
```

## Array

### multiFilter<T>(arr: T[], filters: FilterFunction<T>[])

Filters an array using multiple filter functions and returns the filtered results in separate arrays.

```ts
import { multiFilter } from "falsys-utilities"

const arr = [1, 2, 3, 4, 5, 6]
const filters = [
  (n) => n % 2 === 0, // Filter even numbers
  (n) => n % 2 !== 0 // Filter odd numbers
]
const result = multiFilter(arr, filters)

console.log(result)
// [[2, 4, 6], [1, 3, 5]]
```

### groupBy<T extends object>(arr: T[], key: string)

Groups the elements of an array based on the specified key.  
The elements must be objects, and the key must exist in the objects.

```ts
import { groupBy } from "falsys-utilities"

const arr = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
]
const result = groupBy(arr, "age")

console.log(result)
// {
//   "25": [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ],
//   "30": [ { name: 'Bob', age: 30 } ]
// }
```

### groupAndSort<T extends object>(arr: T[], key: keyof T, comparator: (a: T[keyof T], b: T[keyof T]) => number)

Groups the elements of an array based on the specified key and sorts the resulting groups using a custom comparator.

```ts
import { groupAndSort } from "falsys-utilities"

const arr = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
]
const result = groupAndSort(arr, "age", (a, b) => (a as number) - (b as number))

console.log(result)
// [
//   { age: 25, data: [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ] },
//   { age: 30, data: [ { name: 'Bob', age: 30 } ] }
// ]
```
