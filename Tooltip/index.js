// https://playcode.io/880124

(function () {
    class Tooltip {
      constructor() {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.listeners = [];
        this.el.classList.add(this.name);
        document.body.appendChild(this.el);
        this.onHide = this.onHide.bind(this);
      }
  
      get name() {
        return 'tooltip';
      }
  
      get indent() {
        return 5;
      }
  
      delegate(eventName, element, cssSelector, callback) {
        console.log(eventName);
        const fn = (event) => {
          if (!event.target.matches(cssSelector)) {
            return;
          }
  
          callback(event);
        };
  
        element.addEventListener(eventName, fn);
        this.listeners.push({ fn, element, eventName });
  
        return this;
      }
  
      onShow = (event) => {
        console.log('onShow ', event);
        const tooltipText = event.target.dataset.tooltip;
        if (!tooltipText) return;
  
        this.el.textContent = tooltipText;
        this.el.style.display = 'block';
  
        const targetRect = event.target.getBoundingClientRect();
        const tooltipRect = this.el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
        if (targetRect.top - tooltipRect.height - this.indent > 0) {
          // Если подсказка помещается сверху
          this.el.style.top = scrollTop + targetRect.top - tooltipRect.height - this.indent + 'px';
        } else {
          // Если подсказка не помещается сверху, показываем её снизу
          this.el.style.top = scrollTop + targetRect.bottom + this.indent + 'px';
        }
  
        if (targetRect.left + tooltipRect.width + this.indent < document.documentElement.clientWidth) {
          // Если подсказка помещается справа от элемента
          this.el.style.left = scrollLeft + targetRect.left + 'px';
        } else {
          // Если подсказка не помещается справа, показываем её слева
          this.el.style.left = scrollLeft + targetRect.right - tooltipRect.width + 'px';
        }
  
        // Добавляем класс tooltip_active
        this.el.classList.add('tooltip_active');
      };
  
      onHide() {
        this.el.style.display = 'none';
  
        // Удаляем класс tooltip_active
        this.el.classList.remove('tooltip_active');
      }
  
      attach(root) {
        this.delegate('mouseover', root, '[data-tooltip]', this.onShow).delegate(
          'mouseout',
          root,
          '[data-tooltip]',
          this.onHide,
        );
      }
  
      detach() {
        // Реализуйте этот метод
        this.listeners.forEach(({ fn, element, eventName }) => {
          element.removeEventListener(eventName, fn)
        })
      }
  
    }
  
    window.Tooltip = Tooltip;
  })();
  
  const tooltip = new Tooltip();
  tooltip.attach(document.body);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  