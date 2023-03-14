/*
cloneDeep
Напишите функцию, которая выполняет глубокое копирование значений.
Сделайте обработку для объектов и массивов;
Не забудьте скопировать вложенные элементы массивов и свойства объектов.

https://playcode.io/874530
*/ 

function cloneDeep<T extends { [key: string]: any }>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
  
    let clone: any = Array.isArray(obj) ? [] : {};
  
    Object.keys(obj).forEach((key) => {
      clone[key] = cloneDeep(obj[key]);
    });
  
    return clone;
  }
  
  export default cloneDeep;
  
  
  
  const objects = [{ 'a': 1 }, { 'b': 2 }];
  const deep = cloneDeep(objects);
  
  console.log(deep[0] === objects[0]); // => false