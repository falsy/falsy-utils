interface IDateParts {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    second: string;
    yearMonthDay: string;
    yearMonth: string;
    monthDay: string;
    hourMinuteSecond: string;
    hourMinute: string;
    dayOfWeek: number;
    dayOfWeekLong: string;
    dayOfWeekShort: string;
    longTime: number;
}
interface ILightKitDate {
    getDate(): Date;
    getDateParts(locales?: string): IDateParts;
    differenceIn(date: Date, unit: "year" | "month" | "day" | "hour" | "minute" | "second"): number;
}

declare class LDate implements ILightKitDate {
    private readonly date;
    /**
     * 주어진 날짜 값으로 클래스를 초기화하거나, 값이 제공되지 않으면 현재 날짜로 클래스를 초기화합니다.
     *
     * @param {number | string | Date} [dateValue] - 날짜를 초기화하는 데 사용되는 값입니다.
     * - 값이 제공되지 않으면 현재 날짜와 시간이 사용됩니다.
     * - 유효한 값이 제공되면 Date 객체로 구문 분석됩니다.
     */
    constructor(dateValue?: number | string | Date);
    /**
     * 현재 날짜를 검색합니다.
     *
     * @returns {Date} 현재 날짜와 시간을 나타내는 Date 객체입니다.
     */
    getDate(): Date;
    /**
     * Date 객체에서 다양한 날짜 및 시간 속성을 추출합니다.
     *
     * @param {string} [locale] - 요일 이름을 포맷하기 위한 선택적 로케일 문자열. 시스템 로케일을 기본값으로 사용합니다.
     * @returns {IDateParts} 다양한 날짜 및 시간 속성을 포함하는 객체입니다.
     */
    getDateParts(locale?: string): IDateParts;
    /**
     * 현재 날짜(this.date)와 제공된 날짜(date) 사이의 지정된 단위(unit) 내 차이를 계산합니다.
     *
     * @param {Date} date - 비교할 다른 날짜입니다.
     * @param {"year" | "month" | "day" | "hour" | "minute" | "second"} unit - 차이를 계산할 단위입니다.
     * @returns {number} 지정된 단위 내의 차이입니다.
     */
    differenceIn(date: Date, unit: "year" | "month" | "day" | "hour" | "minute" | "second"): number;
    /**
     * 주어진 Date 객체가 지정된 년, 월, 일, 시, 분, 초와 일치하는지 확인합니다.
     *
     * @param {Date} date - 검증할 Date 객체.
     * @param {number} year - 예상 년도.
     * @param {number} month - 예상 월(1-12).
     * @param {number} [day] - 선택 사항인 해당 월의 예상 일.
     * @param {number} [hour] - 선택 사항인 해당 일의 예상 시간(0-23).
     * @param {number} [minute] - 선택 사항인 예상 분(0-59).
     * @param {number} [second] - 선택 사항인 예상 초(0-59).
     * @returns {boolean} 제공된 모든 날짜 구성 요소가 Date 객체와 일치하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.
     */
    private validationDate;
    /**
     * 추가적으로 정의된 날짜 형식의 문자열에 해당하는 경우 Date 객체로 변환합니다.
     *
     * @param {number | string | Date} dateValue - 날짜 문자열 또는 Date 객체.
     * @returns {Date | null} 날짜 문자열이 유효하고 형식과 일치하면 해당 Date 객체를 반환하고, 그렇지 않으면 `null`을 반환합니다.
     */
    private matchDateValue;
    /**
     * 숫자, 문자열 또는 Date 객체를 유효한 Date 객체로 구문 분석합니다.
     *
     * @param {number | string | Date} dateValue - Date 객체로 파싱할 값입니다. 타임스탬프(숫자), 날짜 문자열 또는 기존 Date 객체가 될 수 있습니다.
     * @returns {Date} 제공된 입력을 기반으로 하는 유효한 Date 객체입니다.
     */
    private parse;
}

type MapFunction<T, U> = (item: T) => Promise<U>;
type FilterFunction<T> = (item: T) => boolean;
type GroupedData<T> = {
    [key: string | number]: T[];
};

/**
 * 제공된 매핑 함수를 사용하여 요소 배열을 비동기적으로 매핑하고 Promise를 반환합니다.
 *
 * @template T - 입력 배열의 요소 유형입니다.
 * @template U - 결과 배열의 요소 유형입니다.
 * @param {T[]} arr - 매핑할 요소의 배열.
 * @param {MapFunction<T, U>} MapFunction - T 유형의 요소를 가져와 U 유형의 값이나 U로 확인되는 Promise를 반환하는 매핑 함수입니다.
 * @returns {Promise<U[]>} 매핑 함수를 비동기적으로 적용한 후 반환된 배열의 Promise입니다.
 */
declare function asyncMap<T, U>(arr: T[], MapFunction: MapFunction<T, U>): Promise<U[]>;

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

/**
 * 여러 개의 필터 함수를 사용하여 배열을 필터링하고 필터링된 결과를 별도의 배열로 반환합니다.
 *
 * @template T - 배열 요소의 유형.
 * @param {T[]} arr - 필터링할 요소의 배열.
 * @param {Array<FilterFunction<T>>} filters - 필터 함수의 배열. 각 함수는 자체 기준에 따라 배열을 필터링합니다.
 * @returns {T[][]} 각 내부 배열에 해당 필터 함수로 필터링한 요소가 포함된 2차원 배열입니다.
 */
declare function multiFilter<T>(arr: T[], filters: FilterFunction<T>[]): T[][];

export { type IDateParts, type ILightKitDate, LDate, asyncMap, groupAndSort, groupBy, multiFilter };
