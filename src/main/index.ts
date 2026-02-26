//1
export interface User {
    id : number;
    name : string;
    isActive : boolean;
    email?: string;
}

export function createUser(
    id: number, 
    name: string,  
    isActive: boolean = true,
    email?: string) : User {
    console.log(`EMAIL: ${email}`);
    if (email === undefined) {
        return {
            id,
            name,
            isActive
        }
    }
    return {
        id,
        name, 
        isActive,
        email
    }
}
console.log('Task 1');
console.log(createUser(1, "Asdf", false));
console.log(createUser(2, "ILUGH", true, "email_example@local.com"));

//2
interface Book {
    title : string;
    author : string;
    year? : number | undefined;
    genre : "fiction" | "non-fiction";
}

export function createBook(book : Book) : Book {
    return book;
}

console.log('Task 2');
console.log(createBook({title : "title1", author : "author1", genre: "fiction"}));
console.log(createBook({ title: "title2", author: "author2",year : 1974, genre: "non-fiction" }));
//3
export function calculateArea(shape : 'circle', radius : number) : number;
export function calculateArea(shape : 'square', side : number) : number;
export function calculateArea(shape : 'circle' | 'square', param : number) : number {
    if (shape === 'square') {
        return param * param;
    } else { 
        return Math.PI * param * param;
    }
}

console.log('Task 3');
console.log(calculateArea('circle', 4));
console.log(calculateArea('square', 8));

//4
type Status = 'active' | 'inactive' | 'new';

export function getStatusColor(status : Status) : string {
    if (status === 'active') {
        return 'green';
    } else if (status === 'inactive'){
        return 'red';
    } else {
        return 'blue';
    } 
}
console.log('Task 4');
console.log(getStatusColor('new'));
console.log(getStatusColor('active'));
console.log(getStatusColor('inactive'));

//5
type StringFormatter = (string : string, uppercase? :boolean | undefined) => string;

export const StringFormatterUpper : StringFormatter = (str, uppercase = false) => {
    return uppercase ? str.toUpperCase() : str.charAt(0).toUpperCase() + str.slice(1);
}

export const StringFormatterNoSpace : StringFormatter = (str, uppercase = false) => {
    let res = str.replace(/\s+/g, '');
    if (uppercase){
        res = res.toUpperCase();
    }
    return res;
}

console.log('Task 5');
console.log(StringFormatterUpper('sgtjSynsNgh', false));
console.log(StringFormatterUpper('sgtjsynsngh', true));
console.log(StringFormatterNoSpace('sgtj sy nsn gh', true));
console.log(StringFormatterNoSpace('sgtj Sy Nsn Gh', false));
//6
export function getFirstElement<T>(arr : T[]) : T | undefined {
    return arr[0];
    
}

let arr1 = [1.08, 6, 9, 10];
let arr2 = ['wehb', 'arhf', 'wrdhbv'];

console.log('Task 6');
console.log(getFirstElement(arr1));
console.log(getFirstElement(arr2));

//7
interface HasId {
    id : number;
}

export function findById<T extends HasId>(items : T[], id : number) : T | undefined {
    return items.find(item => item.id === id);    
}

let users: User[] = [{ id: 1, name: "asfdb", isActive: true }, { id: 2, name: "dhndm", isActive: false }, { id: 3, name: "dm,j,jfjd", isActive: true }];
console.log('Task 7');
console.log(findById(users, 1));
console.log(findById(users, 4));
