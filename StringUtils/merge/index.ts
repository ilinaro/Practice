/*
merge
Напишите функцию, которая объединит два объекта с сохранением их уникальных ключей. 
Порядок ключей важен.
*/

type Indexed<T> = {
  [key in string]: T;
};

function merge<T extends Indexed<any>>(lhs: T, rhs: T): T {
  const result: T = {} as T;

  for (const key in lhs) {
    if (rhs.hasOwnProperty(key)) {
      result[key] = merge(lhs[key], rhs[key]);
    } else {
      result[key] = lhs[key];
    }
  }

  for (const key in rhs) {
    if (!lhs.hasOwnProperty(key)) {
      result[key] = rhs[key];
    }
  }

  return result;
}

export default merge;

merge({a: {b: {a: 2}}, d: 5}, {a: {b: {c: 1}}});
/*
{
	a: {
		b: {
			a: 2,
			c: 1,
		}
	},
	d: 5,
}
*/


/*
    Реализация через рекурсию –– эффективное решение, к которому часто прибегают. 
    Но если известно, что вложенность может быть довольно большой, то есть риск 
    достичь максимальной глубины рекурсии (количество вложенных вызовов), которая 
    определяется JavaScript-движком, и получить ошибку выполнения. 
    В таком случае стоит использовать реализацию на основе стека.
*/