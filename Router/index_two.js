// https://playcode.io/874517
// Определение класса Block
class Block {
    getContent() { }
    
    show() {
      console.log('show');
    }
    
    hide() {
      console.log('hide');
    }
  }
  
  // Определение класса Chats, который наследует класс Block
  class Chats extends Block {
    getContent() {
      return 'chats';
    }
    
    show() {
      console.log('show chats');
    }
    
    hide() {
      console.log('hide chats');
    }
  }
  
  // Определение класса Users, который наследует класс Block
  class Users extends Block {
    getContent() {
      return 'users';
    }
    
    show() {
      console.log('show users');
    }
    
    hide() {
      console.log('hide users');
    }
  }
  

// Определение функции isEqual, которая проверяет равенство двух значений
  function isEqual(lhs, rhs) {
    return lhs === rhs;
  }
  

// Определение функции render, которая отрисовывает блок на странице
  function render(query, block) {
    const root = document.querySelector(query);
    root.textContent = block.getContent();
    return root;
  }
  

  // Определение класса Route, который хранит информацию о роуте и блоке, а также управляет отображением блока
  class Route {
      constructor(pathname, view, props) {
          this._pathname = pathname;
          this._blockClass = view;
          this._block = null;
          this._props = props;
      }
  
      navigate(pathname) {
          if (this.match(pathname)) {
              this._pathname = pathname;
              this.render();
          }
      }
  
      leave() {
          if (this._block) {
              this._block.hide();
          }
      }
  
      match(pathname) {
          return isEqual(pathname, this._pathname);
      }
  
      render() {
          if (!this._block) {
              this._block = new this._blockClass();
              render(this._props.rootQuery, this._block);
              return;
          }
  
          this._block.show();
      }
  }
  
  // Определение класса Router, который управляет роутами и блоками на странице
  class Router {
    constructor(rootQuery) {
      if (Router.__instance) {
        return Router.__instance
      }
      this.routes = []
      this.history = window.history
      this._currentRoute = null
      this._rootQuery = rootQuery
  
      Router.__instance = this
    }
  
    use(pathname, block) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery })
      this.routes.push(route)
      return this
    }
  
    start() {
      window.onpopstate = (event) => {
        if (
          event.currentTarget.location.pathname !== this._currentRoute._pathname
        ) {
          this._onRoute(event.currentTarget.location.pathname)
        }
      }
      this._onRoute(window.location.pathname)
    }
  
    go(pathname) {
      this.history.pushState({}, '', pathname)
      this._onRoute(pathname)
    }
  
    back() {
      this.history.back()
    }
  
    forward() {
      this.history.forward()
    }
  
    _onRoute(pathname) {
      const route = this.getRoute(pathname)
      if (this._currentRoute) {
        this._currentRoute.leave()
      }
      this._currentRoute = route
      route.render()
    }
  
    getRoute(pathname) {
      return this.routes.find((route) => route.match(pathname))
    }
  }
  
  
  // Необходимо оставить в силу особенностей тренажёра
  history.pushState({}, '', '/');
  
  const router = new Router(".app");
  
  // Можно обновиться на /user и получить сразу пользователя
  router
    .use("/", Chats)
    .use("/users", Users)
    .start();
  
  // Через секунду контент изменится сам, достаточно дёрнуть переход
  setTimeout(() => {
    router.go("/users");
  }, 1000);
  
  // А можно и назад
  setTimeout(() => {
    router.back();
  }, 3000);
  
  // И снова вперёд
  setTimeout(() => {
    router.forward();
  }, 5000);