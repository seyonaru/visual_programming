import {describe, it, expect} from "vitest";
import { query, where, sort, groupBy, having} from "../main/pipeline";
import { Group, GroupBy } from "../main/types";

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

describe ('where', () => {
    it('filters by name', () => {
        const fn = query<User>(where("name", "John"));
        const res = fn(users);
        expect(res).toHaveLength(2);
        expect(res.every((u: User) => u.name === "John")).toBe(true);
    });

    it('filters by city', () => {
        const fn = query<User>(where("city", "LA"));
        const res = fn(users);
        expect(res).toHaveLength(2);
        expect(res.every((u: User) => u.city === "LA")).toBe(true);
    });

    it('returns empty array', () => {
        const fn = query<User>(where("name", "NonExistent"));
        const res = fn(users);
        expect(res).toHaveLength(0);
    });
})

describe('sort', () => {
    it('sorts by age', () => {
    const fn = query<User>(sort("age"));
    const res = fn(users);
    expect(res[0].age).toBe(25);
    expect(res[res.length - 1].age).toBe(30);
    });

    it('sorts by name', () => {
        const fn = query<User>(sort("name"));
        const res = fn(users);
        expect(res[0].name).toBe("Alice");
        expect(res[res.length - 1].name).toBe("Mike");
    });

    it("doesn't change original array", () => {
        const original = [...users];
        const fn = query<User>(sort("age"));
        fn(users);
        expect(users).toEqual(original);
    })
})

describe('groupBy', () => {
    it('groups by city', () => {
        const fn = query<User>(groupBy("city"));
        const res = fn(users);

        expect(res).toHaveLength(2);
        
        const nyGroup = res.find((g: Group<User, "city">) => g.key === "NY");
        const laGroup = res.find((g: Group<User, "city">) => g.key === "LA");

        expect(nyGroup?.items).toHaveLength(2);
        expect(laGroup?.items).toHaveLength(2);
    });

    it('each group has right items', () => {
        const fn = query<User>(groupBy("city"));
        const res = fn(users);
        
        const nyGroup = res.find((g: Group<User, "city">) => g.key === "NY");
        expect(nyGroup?.items.every((u : User) => u.city === "NY")).toBe(true);
    })
});

describe('having', () => {
    it('filters groups by number of elements', () => {
        const fn = query<User>(
            groupBy("city"),
            having(group => group.items.length > 1)
        );
        const res = fn(users);
        expect(res).toHaveLength(2); 
    });

    it('filters by predicate', () => {
        const fn = query<User>(
            groupBy("city"),
            having(group => 
                group.items.some((u : User) => u.age > 29))
        );
        const res = fn(users);
        expect(res.length).toBeGreaterThan(0);
    });
});

describe('query', ()=> {
    it('filters + sorting', () => {
        const fn = query<User>(
            where("name", "John"),
            sort("age")
        );
        const res = fn(users);
        expect(res).toHaveLength(2);
        expect(res[0].age).toBeLessThanOrEqual(res[1].age);
    });

    it("filters + grouping + having", () => {
        const fn = query<User>(
            where("name", "John"),
            groupBy("city"),
            having(group => group.items.length >=1)
        );

        const res = fn(users);
        expect(res.length).toBeGreaterThan(0);
        expect(res.every((group: Group<User, "city">) => group.items.every((user: User) => user.name === "John"))).toBe(true);
    });

    it("full conveyer", () => {
        const pipeline = query<User>(
            where("city", "NY"),
            groupBy("name"),
            having(group => group.items.length > 1)
        );

        const res = pipeline(users);
        expect(res).toHaveLength(1);
        expect(res[0].key).toBe("John");
    });
});

describe("types", () => {
    it("type tests", () => {
        const typedWhere: typeof where = where;
        const typedSort: typeof sort = sort;
        const typedGroupBy: typeof groupBy = groupBy;
        const typedHaving: typeof having = having;

        expect(typedWhere).toBeDefined();
        expect(typedSort).toBeDefined();
        expect(typedGroupBy).toBeDefined();
        expect(typedHaving).toBeDefined();
    })
})
