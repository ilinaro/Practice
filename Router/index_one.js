// 1 часть задания


/// BLOCK
class Block {
  getContent() {}

  show() {
    console.log('show')
  }

  hide() {
    console.log('hide')
  }
}


/// BUTTON
class Button extends Block {
  getContent() {
    return 'Button'
  }
}

function render(query, block) {
  return document.querySelector(query).textContent = block.getContent()
}


/// ROUTE
class Route {
  constructor(pathname, view, props) {
    console.log("pathname: ",pathname)
    console.log("view: ",view)
    console.log("props: ",props)
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname){
    if(this.match(pathname) && this._block !== null) {
      this._block.show()
    }
  }

  leave() {
    if(this._block !== null) {
      this._block.hide()
    }
  }

  match(pathname) {
    return pathname === this._pathname
  }

  render(pathname) {
    if(this.match(pathname)) {
      if(this._block === null){
        this._block = new this._blockClass(this._props)
        render(this._props.rootQuery, this._block)
      } else {
        this._block.show()
      }
    }
  }
}

const route = new Route('/buttons', Button, {rootQuery: '.app'})

route.render('/buttons')
route.navigate('/buttons')
route.navigate('/trash')
route.leave()

console.log(route._pathname, route._props)