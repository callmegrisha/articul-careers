import { Tabs } from './modules/tabs';
import { toggleAccordions } from './modules/toggleAccordions';

document.addEventListener('DOMContentLoaded', () => {
  toggleAccordions('.al-accordion', '.al-accordion__control', '.al-accordion__content');
  const tabs = document.querySelectorAll('.al-tabs')

  if (tabs.length > 0) {
    for (let tab of tabs) {
      const dataTab = tab.getAttribute('data-tabs');
      new Tabs(dataTab);
    }
  }
});