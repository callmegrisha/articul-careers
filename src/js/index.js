import { Tabs } from './modules/tabs';
import { toggleAccordions } from './modules/toggleAccordions';

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация аккордеонов с вакансиями
  toggleAccordions('.al-accordion', '.al-accordion__control', '.al-accordion__content');
  const tabs = document.querySelectorAll('.al-tabs')

  // Инициализация табов на страничке vacancies
  if (tabs.length > 0) {
    for (let tab of tabs) {
      const dataTab = tab.getAttribute('data-tabs');
      new Tabs(dataTab);
    }
  }

  // Анимации для главного экрана с заголовком h1
  const alCareersTop = document.querySelector('.al-careers__top');

  // Колбэк для careersTopObserver
  function alCareersTopCb(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const advItemFirst = entry.target.querySelector('.al-advantages__item--first');
        const advItemSecond = entry.target.querySelector('.al-advantages__item--second');
        const advItemThird = entry.target.querySelector('.al-advantages__item--third');
        const advItemFour = entry.target.querySelector('.al-advantages__item--four');
        const advItemFive = entry.target.querySelector('.al-advantages__item--five');
        const alCareersCircle = entry.target.querySelector('.al-careers__val');
        const alCareersCircleIcon = entry.target.querySelector('.al-careers__val .al-circle__icon');
        const alCareersDescription = entry.target.querySelector('.al-careers__description');

        advItemFirst.style.animation = 'show-first-advantage 2.4s forwards';
        advItemSecond.style.animation = 'show-second-advantage 2.3s forwards';
        advItemThird.style.animation = 'show-third-advantage 2.2s forwards';
        advItemFour.style.animation = 'show-four-advantage 2.1s forwards';
        advItemFive.style.animation = 'show-five-advantage 2s forwards';
        alCareersCircle.style.animation = 'fade-in 2s 1s forwards';
        alCareersCircleIcon.style.animation = 'rotate-circle 2s 1.5s forwards';
        alCareersDescription.style.animation = 'fade-in 2s 1s forwards';
        document.documentElement.style.setProperty('--title-animation', 'reveal-title 2s forwards')
      }
    });
  }

  const careersTopObserver = new IntersectionObserver(alCareersTopCb, {});

  careersTopObserver.observe(alCareersTop);

  // Анимации для блока team со стрелкой и описанием
  const alCareersTeam = document.querySelector('.al-careers__team');

  // Колбэк для teamObserver
  function teamObserverCb(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const arrowItemTop = entry.target.querySelector('.al-career-arrow__item--top');
        const arrowItemMiddle = entry.target.querySelector('.al-career-arrow__item--middle');
        const arrowItemBottom = entry.target.querySelector('.al-career-arrow__item--bottom');
        const teamDescription = entry.target.querySelector('.al-careers__team-desc');

        arrowItemTop.style.animation = 'show-top-arrow-part 1.5s forwards';
        arrowItemMiddle.style.animation = 'show-middle-arrow-part 1.5s forwards';
        arrowItemBottom.style.animation = 'show-bottom-arrow-part 1.5s forwards';
        teamDescription.style.animation = 'show-team-desc 1.5s forwards';
      }
    });
  }

  const teamObserver = new IntersectionObserver(teamObserverCb, {});
  
  teamObserver.observe(alCareersTeam);
});