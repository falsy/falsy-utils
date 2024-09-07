# LightKit

![NPM Version](https://img.shields.io/npm/v/lightkit?color=%23F38D9B) ![NPM Downloads](https://img.shields.io/npm/dm/lightkit?color=%23F4D94E) ![NPM License](https://img.shields.io/npm/l/lightkit?color=%23BEA6F9)

This is a small and lightweight utility library that brings together commonly used functions during development. While there are already many major and excellent libraries available, they often include a lot of unused methods. Therefore, we are developing this library by focusing on only the essential features, keeping it lightweight.

## Install

```shell
$ npm install lightkit
```

# All Methods

All the methods provided so far are listed below.

# Array

## multiFilter

Filters an array using multiple filter functions and returns the filtered results in separate arrays.

```ts
import { multiFilter } from "lightkit"

const array = [1, 2, 3, 4, 5, 6]
const filters = [
  (n) => n % 2 === 0, // Filter even numbers
  (n) => n % 2 !== 0 // Filter odd numbers
]
const result = multiFilter(array, filters)

console.log(result)
// [[2, 4, 6], [1, 3, 5]]
```

## asyncMap

Returns a Promise that resolves with a new array containing the results of asynchronously applying the mapping function to each element.

```ts
import { asyncMap } from "lightkit"

const array = [1, 2, 3, 4]
const asyncFnc = (d: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(d * d)
    }, 100)
  })
}

const result = await asyncMap(array, async (n) => {
  return await asyncFnc(n)
})

console.log(result)
// [1, 4, 9, 16]
```

## groupBy

Groups the elements of an array based on the specified key.  
The elements must be objects, and the key must exist in the objects.

```ts
import { groupBy } from "lightkit"

const array = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
]
const result = groupBy(array, "age")

console.log(result)
// {
//   "25": [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ],
//   "30": [ { name: 'Bob', age: 30 } ]
// }
```

## groupAndSort

Groups the elements of an array based on the specified key and sorts the resulting groups using a custom comparator.

```ts
import { groupAndSort } from "lightkit"

const array = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
]
const result = groupAndSort(
  array,
  "age",
  (a, b) => (a as number) - (b as number)
)

console.log(result)
// [
//   { age: 25, data: [ { name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 } ] },
//   { age: 30, data: [ { name: 'Bob', age: 30 } ] }
// ]
```

# Date

## Constructor

Initializes the class with a given date value or the current date if no value is provided.

> The `LDate` class also supports the `"YYYY-MM-DD HH:MM:SS"` format as a local date.

```ts
import { LDate } from "lightkit"

const instance1 = new LDate()
// Initializes with the current date and time.
const instance2 = new LDate(1629918000000)
// Initializes with a timestamp.
const instance3 = new LDate("2023-08-27T10:15:00Z")
// Initializes with a valid date string.
const instance4 = new LDate("2023-08-27 10:15:00")
// Initializes with a custom date string.
const instance5 = new LDate(new Date())
// Initializes with a Date object.
```

## getDate

Retrieves the current date.

```ts
import { LDate } from "lightkit"

const dateString = "2023-08-27T10:15:00Z"
const dateTime = new Date(dateString).getTime()
const lDateTime = new LDate(dateString).getDate().getTime()

console.log(new LDate(dateString).getDate() instanceof Date) // true
console.log(dateTime === lDateTime) // true
```

## getDateParts

Extracts various date and time properties from the Date object.

```ts
import { LDate } from "lightkit"

const dateString = "2023-08-27 15:30:45"
const dateProperties = new LDate(dateString).getDateParts("en")

console.log(dateProperties)
// {
//   year: '2023',
//   month: '08',
//   day: '27',
//   hour: '15',
//   minute: '30',
//   second: '45',
//   yearMonthDay: '2023-08-27',
//   yearMonth: '2023-08',
//   monthDay: '08-27',
//   hourMinuteSecond: '15:30:45',
//   hourMinute: '15:30',
//   dayOfWeek: 0,
//   dayOfWeekLong: 'Sunday',
//   dayOfWeekShort: 'Sun',
//   longTime: 1693117845000
// }
```

## differenceIn

Calculates the difference between the current date and the provided date in the specified unit.

```ts
import { LDate } from "lightkit"

const lDate = new LDate("2023-01-01T00:00:00Z")
const targetDate = new Date("2024-01-01T00:00:00Z")

const diffInYears = lDate.differenceIn(targetDate, "year")
console.log(diffInYears) // 1

const diffInMonths = lDate.differenceIn(targetDate, "month")
console.log(diffInMonths) // 2

const diffInDays = lDate.differenceIn(targetDate, "day")
console.log(diffInDays) // 365

const diffInHours = lDate.differenceIn(targetDate, "hour")
console.log(diffInHours) // 8760

const diffInMinutes = lDate.differenceIn(targetDate, "minute")
console.log(diffInMinutes) // 525600

const diffInSeconds = lDate.differenceIn(targetDate, "second")
console.log(diffInSeconds) // 31536000
```
