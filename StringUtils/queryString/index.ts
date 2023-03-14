/*

queryString
Реализуйте функцию, которая преобразует объект в строку в формате GET-запроса. Функция должна:
проверять, что на вход подали объект;
обрабатывать вложенные объекты;
если среди значений объекта есть массив, каждый элемент массива необходимо превращать в параметр;
проверять корректность входа — всегда ожидаем объект, иначе выбрасываем ошибку с текстом: 'input must be an object'.

https://playcode.io/874531
*/


type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
    key: 1,
    key2: 'test',
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: {a: 1},
    key7: {b: {d: 2}},
};


function queryStringifyPrimitive(key: string, value: any): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'boolean') {
    return `${key}=${value ? 'true' : 'false'}`;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return `${key}=${encodeURIComponent(value.toString())}`;
  }

  if (typeof value === 'object') {
    return '';
  }

  throw new Error(`Cannot convert value to query string: ${value}`);
}




function queryStringify(data: StringIndexed, parentKey?: string): string | never {
  if (typeof data !== 'object') {
    throw new Error('input must be an object');
  }

  const keyValuePairs: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      continue;
    }

    const newKey = parentKey ? `${parentKey}[${key}]` : key;

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const arrayValue = value[i];
        const arrayKey = `${newKey}[${i}]`;
        const keyValueString = queryStringifyPrimitive(arrayKey, arrayValue);
        keyValuePairs.push(keyValueString);
      }
    } else if (typeof value === 'object') {
      const nestedQueryString = queryStringify(value, newKey);
      if (nestedQueryString) {
        keyValuePairs.push(nestedQueryString);
      }
    } else {
      const keyValueString = queryStringifyPrimitive(newKey, value);
      keyValuePairs.push(keyValueString);
    }
  }

  return keyValuePairs.join('&');
}


export default queryStringify

console.log(queryStringify(obj))

queryStringify(obj); // 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'


/*
Попробуйте решать задачу по частям: сначала сделать функцию, которая работает только с примитивами, а потом добавить обработку массивов и объектов.
Полученные пары ключ-значение удобно хранить в массиве, и перед возвратом из функции (с помощью метода join и разделителя &) объединить результат в строку.
Значения в объектах и массивах могут быть не примитивами, поэтому не забудьте рекурсивно обработать вложенные элементы.
*/