/*
Задание take
Напишите функцию, которая создаёт часть массива с n элементами, взятыми с начала. Необходимо валидировать входные значения. В случае ошибки — выбросьте исключение ValidationError: bad value. Сделайте реализацию через класс. Ошибка в консоли должна выглядеть в точности как в примере. 

Подсказка 
В решении задачи вам помогут встроенные методы массива как для валидации, так и для получения нужной части массива.


https://jsfiddle.net/Practicum_mf/obzd9gcm/55/
*/


/**
	take([1, 2, 3]); // => [1] 
	take([1, 2, 3], 2); // => [1, 2] 
	take([1, 2, 3], 5); // => [1, 2, 3] 
	take([1, 2, 3], 0); // => []

	const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]]
	const testErrCase2 = [1, [1], '1', true]

	for (let i = 0; i<4; i++) {
	  try {
	    take(testErrCase1[i], testErrCase2[i])
	  }
	  catch(err) {
	    console.log(err.toString()) // ValidationError: bad value
	  }
	 }
*/

/**
	take([1, 2, 3]); // => [1] 
	take([1, 2, 3], 2); // => [1, 2] 
	take([1, 2, 3], 5); // => [1, 2, 3] 
	take([1, 2, 3], 0); // => []

	const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]]
	const testErrCase2 = [1, [1], '1', true]

	for (let i = 0; i<4; i++) {
	  try {
	    take(testErrCase1[i], testErrCase2[i])
	  }
	  catch(err) {
	    console.log(err.toString()) // ValidationError: bad value
	  }
	 }
*/

class ValidationError extends Error {
  constructor() {
    super('ValidationError: bad value')
    this.name = 'ValidationError'
  }
}

function take<T>(list: T[], num: number = 1): T[] {
  if (!Array.isArray(list)) {
    throw new ValidationError()
  }

  if (num < 0) {
    throw new ValidationError()
  }

  //if(num > list.length) {
  //    throw new ValidationError();
  //}

  if (typeof num !== 'number') {
    throw new ValidationError(num)
  }

  return list.slice(0, num)
}

export default take
