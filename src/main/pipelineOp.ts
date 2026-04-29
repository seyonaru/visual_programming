import { Transform, Where, Sort, Group, GroupBy, GroupTransform, Having } from "./types"
import { WhereOp, GroupSortOp, GroupByOp, HavingOp, SortOp, PipelineOp, IsValidSequence, IsValidTransition } from "./types"

export const where = (
    key: string,
    value: any,
): WhereOp<any> => {
    return {
        _type: 'where',
        transform: (data: any[]): any[] => data.filter((item) => item[key] === value),
    };
};

export const groupBy = (
    key: string
): GroupByOp<any, string> => {
    return {
        _type: 'groupBy',
        transform: (data: any[]) => {
            const groups = data.reduce((acc: Record<string, Group<any, string>>, item: any) => {
                const k = String(item[key]);
                if (!acc[k]) {
                    acc[k] = { key: item[key], items: [] };
                }
                acc[k].items.push(item);
                return acc;
            }, {} as Record<string, Group<any,string>>);
            return Object.values(groups);
        },
    };
};

export const having = (
    predicate: (group: Group<any, any>) => boolean
): HavingOp<any, any> => {
    return {
        _type: 'having',
        transform: (groups: Group<any, any>[]): Group<any, any>[] => groups.filter(predicate),
    };
};

export const sort = (
    key: string
): SortOp<any> => {
    return {
        _type: 'sort',
        transform: (data: any[]) => 
        [...data].sort((a, b) => {
            const av = a[key];
            const bv = b[key];
            if (av <bv) return -1;
            if (av > bv) return 1;
            return 0;
        }),
    };
};

export const groupSort =  (
    key: string
): GroupSortOp<any, string> => ({
    _type: 'groupSort',
    transform: (groups: Group<any, string>[]): Group<any, string>[] => 
    [...groups].sort((a,b) => {
        const av = a.key;
        const bv = b.key;
        if (av < bv) return -1;
        if (av > bv) return 1;
        return 0;
    }),
})

export function query<T>(
        ...operations: any[]
    ) : (data: T[]) => any {
        return (data: T[]) => {
            return operations.reduce((acc: any, op: any) => {
                return op.transform(acc);
            }, data);
        };
    }