function identity(num: number): number {
    return num
}

console.log("identity:", identity(118))

let num: number;
let str: string;
let bool: boolean;

num = 123;
str = "hello";
bool = true;

let boolArray: boolean[];

boolArray = [true, false];
console.log("boolArray[0]:", boolArray[0]);
console.log("boolArray[1]:", boolArray[1]);


interface Name {
    first: string;
    second: string;
}

let peopleA: Name = {
    first: "Michael",
    second: "Jordan"
}
console.log("PeopleA is:", peopleA);
