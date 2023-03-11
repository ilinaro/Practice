class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_RENDER: "flow:render",
      FLOW_CDU: "flow:component-did-update"
    };
  
    _oldProps = null;
    _element = null;
    _meta = null;
  
    constructor(tagName = "div", props = {}) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
  
      this.props = this._makePropsProxy(props);
  
      this.eventBus = () => eventBus;
  
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
      this.dispatchComponentDidMount();
    }
  
    _componentDidMount() {
      this.componentDidMount();
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  
    componentDidMount(oldProps) {}
  
    dispatchComponentDidMount() {
      this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
  
    _componentDidUpdate(oldProps, newProps) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  
    componentDidUpdate(oldProps, newProps) {
      return true;
    }
  
    setProps = (nextProps) => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      const block = this.render();
      this._element.innerHTML = block;
    }
  
    render() {}
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props) {
      const self = this;
  
      return new Proxy(props, {
        deleteProperty() {
          throw new Error("Отказано в доступе");
        },
        set(target, prop, val) {
          const oldProps = { ...target };
          target[prop] = val;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
          return true;
        },
      });
    }
  
    _createDocumentElement(tagName) {
      return document.createElement(tagName);
    }
  
    show() {
      this._element.style.display = "block";
    }
  
    hide() {
      this._element.style.display = "none";
    }
  }
  