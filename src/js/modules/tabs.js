export class Tabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => { }
    };
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);

    if (this.tabs) {
      this.tabsList = this.tabs.querySelector('.al-tabs__nav');
      this.tabsBtns = this.tabsList.querySelectorAll('.al-tabs__nav-btn');
      this.tabsPanels = this.tabs.querySelectorAll('.al-tabs__panel');
    } else {
      console.error('Селектор data-tabs не найден');
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    const tabs = document.querySelectorAll(`[data-tabs="${this.selector}"]`);
    if (tabs.length > 1) {
      console.error('Количество элементов с одинаковым аттрибутом data-tabs больше одного');
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('Количество кнопок и элементов табов не совпадает');
      return;
    }
  }

  init() {
    this.tabsList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((btn, index) => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('tabindex', '-1');
      btn.setAttribute('id', `${this.selector}-${index + 1}`);
      btn.classList.remove('al-tabs__nav-btn--active');
    });

    this.tabsPanels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', this.tabsBtns[index].id);
      panel.classList.remove('al-tabs__panel--active');
    });

    this.tabsBtns[0].classList.add('al-tabs__nav-btn--active');
    this.tabsBtns[0].removeAttribute('tabindex');
    this.tabsBtns[0].setAttribute('aria-selected', 'true');
    this.tabsPanels[0].classList.add('al-tabs__panel--active');
  }

  events() {
    this.tabsBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        let currentTab = this.tabsList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      btn.addEventListener('keydown', (e) => {
        // находим текущий элемент и помещаем в index
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
        // создали направление: туда или обратно, или вниз
        let dir = null;

        if (e.which === 37) dir = index - 1; 
        if (e.which === 39) dir = index + 1;
        if (e.which === 40) dir = 'down';

        if (dir !== null) {
          dir === 'down' && this.tabsPanels[index].focus();
          this.tabsBtns[dir] && this.switchTabs(this.tabsBtns[dir], e.currentTarget);
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', true);

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    // среди всех кнопок мы находим индекс активного элемента
    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    // то же самое мы делаем для oldTab
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('al-tabs__panel--active');
    this.tabsPanels[index].classList.add('al-tabs__panel--active');

    this.tabsBtns[oldIndex].classList.remove('al-tabs__nav-btn--active');
    this.tabsBtns[index].classList.add('al-tabs__nav-btn--active');

    this.options.isChanged(this);
  }
}