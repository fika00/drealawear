const a = { age: 12, name: "John", location: "Australia" };
const b = { location: "Graz" };

console.log(Object.assign(a, b));
const c = { ...a, ...b };

console.log(a, c);
