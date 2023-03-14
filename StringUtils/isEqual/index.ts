/*
isEqual
Напишите функцию, которая выполняет глубокое сравнение между двумя значениями и определяет — являются 
ли они эквивалентными. Аргументами могут быть только объекты.
Не используйте JSON.stringify(). Из-за особенностей его реализации, этот метод — крайне неэффективен 
для решения задач глубокого копирования.
Например, JSON.stringify(a) === JSON.stringify(b) или JSON.parse(JSON.stringify(obj)).

https://playcode.io/874525
*/


type ObjectWithAnyProperties = {
    [key: string]: any;
  }
  
  function isEqual(a: ObjectWithAnyProperties, b: ObjectWithAnyProperties): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
  
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  
    for (const key of aKeys) {
      if (!b.hasOwnProperty(key)) {
        return false;
      }
  
      const aValue = a[key];
      const bValue = b[key];
  
      if (typeof aValue !== typeof bValue) {
        return false;
      }
  
      if (typeof aValue === 'object') {
        if (!isEqual(aValue, bValue)) {
          return false;
        }
      } else if (aValue !== bValue) {
        return false;
      }
    }
  
    return true;
  }
  

const a = { a: 1, b: { c: 2 } };
const b = { a: 1, b: { c: 2 } };
const c = { a: 1, b: { c: 3 } };

isEqual(a, b); // true
isEqual(a, c); // false


  export default isEqual;
  