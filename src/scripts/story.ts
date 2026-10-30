import { setupStoryPosts } from './story-posts';

const timeline = document.querySelector<HTMLElement>('.problem-timeline');

if (timeline) {
  const problems = [...timeline.querySelectorAll<HTMLElement>('.problem')];
  const headings = problems.map(problem => problem.querySelector<HTMLElement>('h2')!);
  const dates = problems.map(problem => problem.querySelector<HTMLElement>('.problem-date')!);
  dates.forEach((date, index) => {
    const column = document.createElement('div');
    column.className = 'date-column';
    problems[index].prepend(column);
    column.append(date);
  });
  const links = dates.map((date, index) => {
    const link = document.createElement('a');
    link.href = `#${problems[index].id}`;
    link.setAttribute('aria-label', `${date.textContent}. ${headings[index].textContent}`);
    link.append(...date.childNodes);
    date.append(link);
    return link;
  });
  const artworks = problems.map(problem => problem.querySelector<HTMLElement>('.scene-art'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const readingLine = () => Math.max(80, window.innerHeight * .28);
  let scheduled = false;

  const update = () => {
    scheduled = false;
    const bounds = timeline.getBoundingClientRect();
    const inset = parseFloat(getComputedStyle(timeline).getPropertyValue('--timeline-inset'));
    const firstDot = problems[0].getBoundingClientRect().top + inset + 10;
    const lastDot = problems[problems.length - 1].getBoundingClientRect().bottom - inset - dates[dates.length - 1].offsetHeight + 10;
    const length = Math.max(1, lastDot - firstDot);
    timeline.style.setProperty('--timeline-start', `${firstDot - bounds.top}px`);
    timeline.style.setProperty('--timeline-length', `${length}px`);
    timeline.style.setProperty('--story-progress', String(Math.max(0, Math.min(1, (readingLine() - firstDot) / length))));

    let active = 0;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= readingLine()) active = index;
    });
    problems.forEach((problem, index) => {
      problem.classList.toggle('is-active', index === active);
      problem.classList.toggle('is-past', index < active);
      if (index === active) links[index].setAttribute('aria-current', 'step');
      else links[index].removeAttribute('aria-current');
    });
    artworks.forEach((art, index) => {
      if (!art) return;
      const bounds = problems[index].getBoundingClientRect();
      const phase = Math.max(-1, Math.min(1, (window.innerHeight * .5 - bounds.top - Math.min(bounds.height, window.innerHeight) * .5) / window.innerHeight));
      art.style.setProperty('--art-y', `${reducedMotion.matches ? 0 : phase * (window.innerWidth <= 700 ? 22 : 50)}px`);
      art.style.setProperty('--art-tilt', `${reducedMotion.matches ? 0 : phase * 1.5}deg`);
    });
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  const scrollToHashTarget = () => {
    const index = problems.findIndex(problem => `#${problem.id}` === location.hash);
    if (index < 0) return;
    const top = headings[index].getBoundingClientRect().top + window.scrollY - 50;
    window.scrollTo({top, behavior: 'instant'});
  };
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  reducedMotion.addEventListener('change', schedule);
  window.addEventListener('hashchange', scrollToHashTarget);
  window.addEventListener('load', () => window.requestAnimationFrame(scrollToHashTarget), {once: true});
  document.fonts.ready.then(schedule);
  new ResizeObserver(schedule).observe(timeline);
  setupStoryPosts(schedule);
  schedule();
  scrollToHashTarget();
}
