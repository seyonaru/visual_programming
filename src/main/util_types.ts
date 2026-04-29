export type DeepReadonly<T> = T extends object
? T extends Function
    ? T
    : {readonly [K in keyof T]: DeepReadonly<T[K]> }
: T;

export type PickedByType<T, U> = Pick<
    T,
    {
        [K in keyof T]: T[K] extends U ? K : never;
    }[keyof T]
>;

export type EventHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};