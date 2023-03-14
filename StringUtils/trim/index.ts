/*
trim
Напишите функцию, которая умеет удалять из начала и конца строки 
пробельные или отдельно заданные пользовательские символы. 
Удаление пробелов из начала и конца строк — поведение по умолчанию. 
Пробел необязательно должен быть передан в качестве аргумента.
*/ 

trim('  abc  '); // => 'abc'
trim('-_-abc-_-', '_-'); // => 'abc'
trim('\xA0foo'); // "foo"
trim('\xA0foo', ' '); // " foo"
trim('-_-ab c -_-', '_-'); // ab c

['  foo  ', '  bar  '].map(value => trim(value)); // => ['foo', 'bar']
function trim(str: string, chars: string = '\\s', flags: string = 'g'): string {
  const pattern = new RegExp(`^[${chars}]+|[${chars}]+$`, flags);
  return str.replace(pattern, '');
}

export default trim;