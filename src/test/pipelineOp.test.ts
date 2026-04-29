import { describe, it, expect } from "vitest";
import { query, where, sort, groupBy, having } from "../main/pipelineOp";
import { Group } from "../main/types";

type User = {
    id: number;
    name: string;
    age: number;
    city: string;
};

const users: User[] = [
    { id: 1, name: "John", age: 30, city: "NY" },
    { id: 2, name: "John", age: 25, city: "NY" },
    { id: 3, name: "Mike", age: 30, city: "LA" },
    { id: 4, name: "Alice", age: 28, city: "LA" },
];

describe('Safe pipeline', () => {
    it('correct order: where -> where -> sort', () => {
        const pipeline = query<User>(
            where('name', "John"),
            where('city', 'NY'),
            sort('age')
        );

        const result = pipeline(users);
        expect(result.length).toBeGreaterThan(0);
        expect(result.every((u: User) => u.name === 'John')).toBe(true);
    });

    it('correct order: where -> groupBy -> having', () => {
        const pipeline = query<User>(
            where('name', 'John'),
            groupBy('city'),
            having((g: Group<User, 'city'>) => g.items.length > 1)
        );

        const result = pipeline(users);
        expect(Array.isArray(result)).toBe(true);
    });
});