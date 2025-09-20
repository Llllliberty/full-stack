// 作业1. Let， Const， Var
const name = "Alice";
if (true) {
  const name = "Bob";
  console.log(name); //Bob
}
console.log(name); // Alice
// 外层的 name 初始化后不会被重新赋值

// 作业2. 箭头函数 (Arrow Functions)
const add = (a, b) => a + b;
// 箭头函数会把创建时的外部 this 直接使用，所以在写回调、定时器这类代码时，不会因为调用方式不同而突然找不到该用哪个对象

// 作业3: 模板字面量 (Template Literals)
const greeting = `Hello, ${name}!\nWelcome to the course.`;

// 作业4.解构赋值 (Destructuring)
const { name, age } = person;
const introduce = ({ name, age }) => `${name} is ${age} years old.`;

// 作业5. 默认参数（Default Parameters）
const calculateArea = (width, height = width) => width * height;

// 作业6. Rest/Spread 运算符
const sum = (...nums) => nums.reduce((total, n) => total + n, 0);
const merged = [...arr1, ...arr2];
