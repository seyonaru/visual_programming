export type Transform<T> = (data: T[]) => T[];

export type Where<T> = <K extends keyof T> (key: K, value: T[K]) => Transform<T>;

export type Sort<T> = <K extends keyof T> (key: K) => Transform<T>;

export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};

export type GroupBy<T> = <K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];

export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

export type Having<T> = <K extends keyof T> (predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>;

//lab5
export type WhereOp<T> = {
    _type: 'where',
    transform: Transform<T>;
};

export type GroupByOp<T, K extends keyof T> = {
    _type: 'groupBy';
    transform: (data: T[]) => Group<T,K>[];
};

export type HavingOp<T,K extends keyof T> = {
    _type: 'having';
    transform: (groups: Group<T,K>[]) => Group<T, K>[];
};

export type SortOp<T> = {
    _type: 'sort';
    transform: Transform<T>;
}
export type GroupSortOp<T, K extends keyof T> = {
    _type: 'groupSort';
    transform: (groups: Group<T, K>[]) => Group<T, K>[];
};

export type PipelineOp<T> =
    | WhereOp<T>
    | GroupByOp<T, keyof T>
    | HavingOp<T, keyof T>
    | SortOp<T>
    | GroupSortOp<T, keyof T>;

export type OpType = 'where' | 'groupBy' | 'having' | 'sort' | 'groupSort';

export type IsValidSequence<Ops extends readonly PipelineOp<any>[]> = true;

export type IsValidTransition<Current extends OpType, Next extends OpType> =
    Current extends 'where'
        ? Next extends 'where' | 'sort' | 'groupBy'
            ? true
            : false
        : Current extends 'sort'
        ? Next extends 'sort'
            ? true
            : false
        : Current extends 'groupBy'
        ? Next extends 'having' | 'groupSort'
            ? true
            : false
        : Current extends 'having'
        ? Next extends 'groupSort'
            ? true
            : false
        : Current extends 'groupSort'
        ? Next extends 'groupSort'
            ? true
        : false
    : false;
