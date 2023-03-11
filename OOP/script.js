/*
Приватный Proxy
Напишите конструктор proxyProps со следующими особенностями:
В нём запрещён доступ к методам и свойствам, которые начинаются с _. В случае ошибки доступа выводится текст «Нет прав».
Остальные свойства можно получать, изменять и удалять.

Подсказка 
Нужно перехватывать не только получение и изменение свойств, но и их удаление;
При обращении к свойству объекта, которое содержит функцию, не забудьте вызвать её в контексте этого объекта.
*/

const props = {
  name: 'Abby',
  chat: 'the last of us. Part II',
  getChat() {
    this._privateMethod();
  },
  _privateMethod() {
    console.log(this._privateProp);
  },
  __privateMethodToo() {},
  _privateProp: 'Нельзя получить просто так',
};

function ProxiedObject(obj) {
  const handler = {
    get(target, prop, receiver) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав');
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(target, prop, value, receiver) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав');
      }
      return Reflect.set(target, prop, value, receiver);
    },
    deleteProperty(target, prop) {
      if (prop.startsWith('_')) {
        throw new Error('Нет прав');
      }
      return Reflect.deleteProperty(target, prop);
    },
  };
  return new Proxy(obj, handler);
}
const proxyProps = new ProxiedObject(props);

proxyProps.getChat();
delete proxyProps.chat;

proxyProps.newProp = 2;
console.log(proxyProps.newProp);

try {
  proxyProps._newPrivateProp = 'Super game';
} catch (error) {
  console.log(error);
}

try {
  delete proxyProps._privateProp;
} catch (error) {
  console.log(error); // Error: Нет прав
}


/*
	* Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/
