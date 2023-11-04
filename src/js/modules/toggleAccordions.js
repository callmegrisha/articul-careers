export function toggleAccordions(accordionsSelector, accordionControlSelector, accordionContentSelector) {
  const accordions = document.querySelectorAll(accordionsSelector);

  for (let accordion of accordions) {
    accordion.addEventListener('click', (e) => {
      if (!e.target.closest(accordionContentSelector)) {
        const self = e.currentTarget;
        const control = self.querySelector(accordionControlSelector);
        const content = self.querySelector(accordionContentSelector);
  
        self.classList.toggle('open');
  
        // Если аккордеон открыт
        if (self.classList.contains('open')) {
          control.setAttribute('aria-expanded', true);
          content.setAttribute('aria-hidden', false);
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          control.setAttribute('aria-expanded', false);
          content.setAttribute('aria-hidden', true);
          content.style.maxHeight = null;
        }
      }
    });
  }
}