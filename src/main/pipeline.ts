import {Transform, Where, Sort, Group, GroupBy, GroupTransform, Having} from "./types"

export const where: Where<any> = (key, value) => (data) => {
    return data.filter((item) => item[key] === value)
};

export const sort: Sort<any> = (key) => (data) => {
    return [...data].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if( av < bv) return -1;
        if( av > bv) return 1;
        return 0;
    });
};

export const groupBy :GroupBy<any> = (key) => (data) => {
    const groups = data.reduce((acc, item) => {
        const k = item[key] as unknown as string;
        if(!acc[k]) {
            acc[k] = {key: item[key], items: []};
        }
        acc[k].items.push(item);
        return acc;
    }, {} as Record<string, Group<any, any>>);

    return Object.values(groups);
};

export const having: Having<any> = <T, K extends keyof T>(predicate: (group : Group<T, K>) => boolean) => {
    return (groups : Group<T,K>[]) => {
        return groups.filter(predicate)
    };
};

export function query<T>(...steps: Function[]) : (data: T[]) => any {
    return (data) => {
        return steps.reduce((acc, step) => {
            return step(acc);
        }, data);
    };
}