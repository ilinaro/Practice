/*

set
Напишите функцию set, которая получает путь к вложенному свойству объекта
и устанавливает значение в это свойство. Если поля не существует, его нужно создать по указанному пути.
Проверьте, что path — строка, иначе нужно выбросить ошибку 'path must be string'. 
Если object не объект, то метод set должен вернуть значение object.
В решении можно переиспользовать функцию слияния объектов — merge.
Обратите внимание, что в решении вам нужно мутировать исходный объект, 
который передали в качестве аргумента, а потом вернуть его из функции при помощи return.

https://playcode.io/880134
*/


type Indexed = { [key: string]: any };

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isIndexed(object)) {
    return object;
  }

  const keys = path.split('.');
  let currentObject = object;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!currentObject.hasOwnProperty(key)) {
      currentObject[key] = {};
    }
    currentObject = currentObject[key];
  }

  currentObject[keys[keys.length - 1]] = value;

  return object;
}

function isIndexed(object: unknown): object is Indexed {
  return typeof object === 'object' && object !== null;
}


export default set

/**
  * set({ foo: 5 }, 'bar.baz', 10); // { foo: 5, bar: { baz: 10 } }
  * set(3, 'foo.bar', 'baz'); // 3
*/