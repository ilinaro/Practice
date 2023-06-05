/*
omit
Реализуйте функцию, которая исключает из объекта указанные свойства.

Примените чистую функцию — ту, которая не вносит изменений в переданный объект.

Интересно, что вспомогательный тип Omit  реализован в TypeScript и создаёт новый тип без указанных свойств.

Авторское решение - https://jsfiddle.net/Practicum_mf/obzd9gcm/52/

*/

function omit<T extends object>(obj: T, fields: (keyof T)[]): T {
  const newObj: T = {} as T

  for (const key in obj) {
    if (!fields.includes(key)) {
      newObj[key] = obj[key]
    }
  }

  return newObj
}

export default omit
