import { it, describe, expect} from 'vitest';
import {User, createUser, createBook, calculateArea, getFirstElement, getStatusColor, findById, StringFormatterNoSpace, StringFormatterUpper } from '../main';

describe('User creation', () => {
    it('Creates Users', () => {
        expect(createUser(1, "Asdf", false, undefined)).toEqual({ id: 1, name: "Asdf", isActive: false});
        expect(createUser(2, "ILUGH", true, "email_example@local.com")).toEqual({ id: 2, name: "ILUGH", email: "email_example@local.com", isActive: true });
    });
});

describe('Book creation', () => {
    it('Creates Books', () => {
        expect(createBook({ title: "title1", author: "author1", genre: "fiction" })).toEqual({ title: "title1", author: "author1", genre: "fiction" });
        expect(createBook({ title: "title2", author: "author2", year: 1974, genre: "non-fiction" })).toEqual({ title: "title2", author: "author2", year: 1974, genre: "non-fiction" });
    });
});

describe('Area calculation', () => {
    it('Calculates area', () => {
        expect(calculateArea('circle', 4)).toBe(50.26548245743669),
            expect(calculateArea('square', 8)).toBe(64)
    });
});

describe('Status color mapping', () => {
    it('Gets color of status', () => {
        expect(getStatusColor('new')).toBe('blue'),
            expect(getStatusColor('active')).toBe('green'),
            expect(getStatusColor('inactive')).toBe('red')
    });
});

describe('String formatting', () => {
    it('Formats strings', () => {
        expect(StringFormatterNoSpace('sgtj sy nsn gh', true)).toBe('SGTJSYNSNGH'),
            expect(StringFormatterNoSpace('sgtj Sy Nsn Gh', false)).toBe('sgtjSyNsnGh'),
            expect(StringFormatterUpper('sgtjSynsNgh', false)).toBe('SgtjSynsNgh'),
            expect(StringFormatterUpper('sgtjsynsngh', true)).toBe('SGTJSYNSNGH')
    });
});

describe('First element extraction', () => {
    it('Gets first element', () => {
        let arr1 = [1.08, 6, 9, 10];
        let arr2 = ['wehb', 'arhf', 'wrdhbv'];
        expect(getFirstElement(arr1)).toBe(1.08),
        expect(getFirstElement(arr2)).toBe('wehb')
    });
});

describe('Finding by ID', () => {
    it('Finds by ID', () => {
        let users: User[] = [
            { id: 1, name: "asfdb", isActive: true },
            { id: 2, name: "dhndm", isActive: false },
            { id: 3, name: "dm,j,jfjd", isActive: true }
        ];
        expect(findById(users, 1)).toEqual(users[0]);
    });
});