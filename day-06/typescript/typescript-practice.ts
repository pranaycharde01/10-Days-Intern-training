// TypeScript Practice

// 1. Primitive Types
let employeeName: string = "Rahul";
let age: number = 25;
let active: boolean = true;

// 2. Array
let skills: string[] = ["Java", "React", "TypeScript"];

// 3. Object
let employee: { id: number; name: string } = {
    id: 1,
    name: "Rahul"
};

// 4. Interface
interface User {
    id: number;
    name: string;
    email?: string;
}

let user: User = {
    id: 1,
    name: "Pranay"
};

// 5. Type Alias + Union
type ID = number | string;
let userId: ID = 101;

// 6. Enum
enum Department {
    IT,
    HR,
    Finance
}

let department: Department = Department.IT;

// 7. Function
function add(a: number, b: number): number {
    return a + b;
}

// 8. Class
class Employee {
    constructor(public name: string, public salary: number) {}

    show(): void {
        console.log(this.name, this.salary);
    }
}

// 9. Generic
function identity<T>(value: T): T {
    return value;
}

// 10. Type Narrowing
function showValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value + 10);
    }
}

// 11. Type Guard
function isString(value: unknown): value is string {
    return typeof value === "string";
}

// Output
console.log(employeeName, age, active);
console.log(skills);
console.log(employee);
console.log(user);
console.log(userId, department);
console.log(add(10, 20));

let emp = new Employee("Rahul", 35000);
emp.show();

console.log(identity<string>("Hello"));
showValue("TypeScript");

if (isString("Hello")) {
    console.log("It is a string");
}
