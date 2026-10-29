const timeline = document.querySelector<HTMLElement>('.problem-timeline');

if (timeline) {
  const problems = [...timeline.querySelectorAll<HTMLElement>('.problem')];
  const headings = problems.map(problem => problem.querySelector<HTMLElement>('h2')!);
  const artworks = problems.map(problem => problem.querySelector<HTMLElement>('.scene-art'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rail = document.createElement('nav');
  rail.className = 'story-rail';
  rail.setAttribute('aria-label', 'Story timeline');
  rail.style.setProperty('--chapters', String(problems.length));
  const track = document.createElement('div');
  track.className = 'rail-track';
  const cursor = document.createElement('span');
  cursor.className = 'rail-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  rail.append(track, cursor);
  timeline.before(rail);

  const readingLine = () => Math.max(rail.offsetHeight + 40, window.innerHeight * .38);
  const goTo = (index: number, smooth: boolean) => {
    const top = headings[index].getBoundingClientRect().top + window.scrollY - readingLine();
    window.scrollTo({top, behavior: smooth && !reducedMotion.matches ? 'smooth' : 'instant'});
  };
  const links = problems.map((problem, index) => {
    const link = document.createElement('a');
    link.href = `#${problem.id}`;
    link.setAttribute('aria-label', `${problem.querySelector('.problem-date')?.textContent}. ${headings[index].textContent}`);
    const sourceDate = problem.querySelector<HTMLTimeElement>('.problem-date time');
    const date = document.createElement(sourceDate ? 'time' : 'span');
    date.className = 'rail-date';
    if (sourceDate) date.setAttribute('datetime', sourceDate.dateTime);
    const text = sourceDate?.textContent ?? 'Earlier';
    date.append(text.replace(/ \d{4}$/, ''));
    const year = document.createElement('span');
    year.className = 'rail-year';
    year.textContent = text.match(/ \d{4}$/)?.[0] ?? '';
    date.append(year);
    const dot = document.createElement('span');
    dot.className = 'rail-dot';
    dot.setAttribute('aria-hidden', 'true');
    link.append(date, dot);
    track.append(link);
    link.addEventListener('click', event => {
      event.preventDefault();
      goTo(index, true);
      history.replaceState(null, '', `#${problem.id}`);
    });
    link.addEventListener('focus', () => {
      if (link.matches(':focus-visible')) window.requestAnimationFrame(() => goTo(index, false));
    });
    return link;
  });

  let spacing = 220;
  let width = 1;
  let scheduled = false;
  let activeIndex = -1;
  const update = () => {
    scheduled = false;
    const line = readingLine();
    const tops = headings.map(heading => heading.getBoundingClientRect().top);
    let position = 0;
    for (let i = 0; i < tops.length - 1; i++) {
      if (line >= tops[i]) position = i + Math.max(0, Math.min(1, (line - tops[i]) / Math.max(1, tops[i + 1] - tops[i])));
    }
    if (line >= tops[tops.length - 1] || window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) position = problems.length - 1;
    const fraction = position / Math.max(1, problems.length - 1);
    track.style.setProperty('--rail-shift', `${width / 2 - (position + .5) * spacing}px`);
    track.style.setProperty('--rail-progress', String(fraction));
    const nextIndex = Math.min(problems.length - 1, Math.floor(position + .001));
    if (activeIndex !== nextIndex) {
      links.forEach((link, index) => {
        if (index === nextIndex) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      activeIndex = nextIndex;
    }
    artworks.forEach((art, index) => {
      if (!art) return;
      const bounds = problems[index].getBoundingClientRect();
      const phase = Math.max(-1, Math.min(1, (window.innerHeight * .5 - bounds.top - Math.min(bounds.height, window.innerHeight) * .5) / window.innerHeight));
      art.style.setProperty('--art-y', `${reducedMotion.matches ? 0 : phase * (width <= 700 ? 22 : 50)}px`);
      art.style.setProperty('--art-tilt', `${reducedMotion.matches ? 0 : phase * 1.5}deg`);
    });
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  const layout = () => {
    width = document.documentElement.clientWidth;
    spacing = reducedMotion.matches ? width / problems.length : width <= 700 ? 132 : 220;
    rail.style.setProperty('--rail-width', `${width}px`);
    rail.style.setProperty('--rail-step', `${spacing}px`);
    rail.classList.toggle('is-reduced', reducedMotion.matches);
    schedule();
  };
  for (const details of timeline.querySelectorAll('details')) details.addEventListener('toggle', schedule);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', layout, {passive: true});
  reducedMotion.addEventListener('change', layout);
  document.fonts.ready.then(() => {
    layout();
    const index = problems.findIndex(problem => `#${problem.id}` === location.hash);
    if (index >= 0) goTo(index, false);
  });
  layout();
}
