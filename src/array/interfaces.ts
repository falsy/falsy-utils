export type MapFunction<T, U> = (item: T) => Promise<U>
export type FilterFunction<T> = (item: T) => boolean
export type GroupedData<T> = {
  [key: string | number]: T[]
}
