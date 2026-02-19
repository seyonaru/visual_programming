"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFormatterNoSpace = exports.StringFormatterUpper = void 0;
exports.createUser = createUser;
exports.createBook = createBook;
exports.calculateArea = calculateArea;
exports.getStatusColor = getStatusColor;
exports.getFirstElement = getFirstElement;
exports.findById = findById;
function createUser(id, name, email, isActive) {
    if (isActive === void 0) { isActive = true; }
    if (email === undefined) {
        return {
            id: id,
            name: name,
            isActive: isActive
        };
    }
    return {
        id: id,
        name: name,
        email: email,
        isActive: isActive
    };
}
console.log('Task 1');
console.log(createUser(1, "Asdf", undefined, false));
console.log(createUser(2, "ILUGH", "email_example@local.com"));
function createBook(book) {
    return book;
}
console.log('Task 2');
console.log(createBook({ title: "title1", author: "author1", genre: "fiction" }));
console.log(createBook({ title: "title2", author: "author2", year: 1974, genre: "non-fiction" }));
function calculateArea(shape, param) {
    if (shape === 'square') {
        return param * param;
    }
    else {
        return Math.PI * param * param;
    }
}
console.log('Task 3');
console.log(calculateArea('circle', 4));
console.log(calculateArea('square', 8));
function getStatusColor(status) {
    if (status === 'active') {
        return 'green';
    }
    else if (status === 'inactive') {
        return 'red';
    }
    else {
        return 'blue';
    }
}
console.log('Task 4');
console.log(getStatusColor('new'));
console.log(getStatusColor('active'));
console.log(getStatusColor('inactive'));
var StringFormatterUpper = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    return uppercase ? str.toUpperCase() : str.charAt(0).toUpperCase() + str.slice(1);
};
exports.StringFormatterUpper = StringFormatterUpper;
var StringFormatterNoSpace = function (str, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    var res = str.replace(/\s+/g, '');
    if (uppercase) {
        res = res.toUpperCase();
    }
    return res;
};
exports.StringFormatterNoSpace = StringFormatterNoSpace;
console.log('Task 5');
console.log((0, exports.StringFormatterUpper)('sgtjSynsNgh', false));
console.log((0, exports.StringFormatterUpper)('sgtjsynsngh', true));
console.log((0, exports.StringFormatterNoSpace)('sgtj sy nsn gh', true));
console.log((0, exports.StringFormatterNoSpace)('sgtj Sy Nsn Gh', false));
//6
function getFirstElement(arr) {
    return arr[0];
}
var arr1 = [1.08, 6, 9, 10];
var arr2 = ['wehb', 'arhf', 'wrdhbv'];
console.log('Task 6');
console.log(getFirstElement(arr1));
console.log(getFirstElement(arr2));
function findById(items, id) {
    return items.find(function (item) { return item.id === id; });
}
var users = [{ id: 1, name: "asfdb", isActive: true }, { id: 2, name: "dhndm", isActive: false }, { id: 3, name: "dm,j,jfjd", isActive: true }];
console.log('Task 7');
console.log(findById(users, 1));
console.log(findById(users, 4));
