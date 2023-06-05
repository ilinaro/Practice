// Хелпер

/*
 полезен в любом фронтенд-проекте.

 А если верстаете компоненты по методологии БЭМ, то добавить поддержку элементов и 
 модификаторов не составит труда — и тогда этот метод станет незаменимым.


 Авторское решение 
 https://jsfiddle.net/Practicum_mf/obzd9gcm/53/

*/

console.log(classNames('foo', 'bar')) // => 'foo bar'
console.log(classNames('foo', { bar: true })) // => 'foo bar'
console.log(classNames({ 'foo-bar': true })) // => 'foo-bar'
console.log(classNames({ 'foo-bar': false })) // => ''
console.log(classNames({ foo: true }, { bar: true })) // => 'foo bar'
console.log(classNames({ foo: true, bar: true })) // => 'foo bar'
console.log(
  classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }),
) // => 'foo bar baz quux'
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')) // => 'bar 1'
console.log(classNames('bar', [1, null, 'baz'], { baz: true }, '3')) // => 'bar 1 baz baz 3'
console.log(
  classNames('bar', [1, null, 'baz', ['foo', 'test']], { baz: true }, '3'),
) // => 'bar 1 baz foo test baz 3'

function classNames(...args) {
  const classes = []

  function processArg(arg) {
    if (typeof arg === 'string' || typeof arg === 'number') {
      if (arg !== '' && arg !== 0) {
        classes.push(arg)
      }
    } else if (Array.isArray(arg)) {
      arg.forEach(processArg)
    } else if (typeof arg === 'object' && arg !== null) {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes.push(key)
        }
      }
    }
  }

  args.forEach(processArg)
  return classes.join(' ')
}

/*

classnames
Напишите утилиту для объединения имён классов. Функция должна обрабатывать:
объекты,
строки,
числа, но не 0,
массивы любой вложенности.
Полученные классы удобно добавлять в массив. Затем преобразовывать его в строку методом join.

*/
