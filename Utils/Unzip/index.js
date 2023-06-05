/*
unzip

Реализуйте функцию, которая группирует значения из
 массивов по индексам. Если хоть один аргумент не массив — 
 нужно выбросить ошибку ${arg} is not array.
*/

// Результирующие массивы должны иметь длину, равную длине массива с максимальным количеством элементов.

/**
 * unzip([1, 2, 3], [4], [5, 6]); // => [[1, 4, 5], [2, undefined, 6], [3, undefined, undefined]]
 * unzip([1, 2, 3]); // => [[1], [2], [3]]
 * unzip([1], [1, 2, 3], [4, 6, 7, 8, 9]); // => [[1, 1, 4], [undefined, 2, 6], [undefined, 3, 7], [undefined, undefined, 8], [undefined, undefined, 9]]
 * unzip({}); // => Error: [object Object] is not array
 */

function unzip(...args) {
  // Проверяем, что все аргументы являются массивами
  if (!args.every(Array.isArray)) {
    const invalidArg = args.find((arg) => !Array.isArray(arg))
    throw new Error(`${invalidArg} is not array`)
  }

  // Находим максимальную длину массива
  const maxLength = Math.max(...args.map((arr) => arr.length))

  // Создаем результирующий массив
  const result = []
  for (let i = 0; i < maxLength; i++) {
    result[i] = args.map((arr) => arr[i])
  }

  // Добавляем undefined в случае, если массивы имеют разную длину
  result.forEach((arr) => {
    while (arr.length < maxLength) {
      arr.push(undefined)
    }
  })

  return result
}

export default unzip


// Элегантное решение Math.max(...result.map(arr => arr.length));
// https://jsfiddle.net/Practicum_mf/obzd9gcm/57/