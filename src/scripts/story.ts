const story = document.querySelector<HTMLElement>('[data-story]');
const progress = document.querySelector<HTMLElement>('[data-story-progress]');
const timeline = document.querySelector<HTMLElement>('.problem-timeline');

if (story && progress && timeline) {
  const prose = timeline.parentElement!;
  const problems = [...timeline.querySelectorAll<HTMLElement>('.problem')];
  const artworks = problems.map(problem => problem.querySelector<HTMLElement>('.scene-art'));
  const motion = window.matchMedia('(min-height: 650px) and (prefers-reduced-motion: no-preference)');
  const shell = document.createElement('div');
  shell.className = 'story-scroll';
  const viewport = document.createElement('div');
  viewport.className = 'story-viewport';
  const rail = document.createElement('nav');
  rail.className = 'story-rail';
  rail.setAttribute('aria-label', 'Story dates');
  rail.style.setProperty('--chapters', String(problems.length));
  timeline.before(shell);
  viewport.append(timeline, rail);
  shell.append(viewport);
  const links = problems.map((problem, index) => {
    const number = document.createElement('span');
    number.className = 'panel-number';
    number.setAttribute('aria-hidden', 'true');
    number.textContent = String(index + 1).padStart(2, '0');
    problem.append(number);
    const link = document.createElement('a');
    link.href = `#${problem.id}`;
    link.setAttribute('aria-label', `${problem.querySelector('.problem-date')?.textContent}. ${problem.querySelector('h2')?.textContent}`);
    const sourceDate = problem.querySelector<HTMLTimeElement>('.problem-date time');
    const date = document.createElement(sourceDate ? 'time' : 'span');
    date.className = 'rail-date';
    if (sourceDate) date.setAttribute('datetime', sourceDate.dateTime);
    const dateText = sourceDate?.textContent ?? 'Earlier';
    date.append(dateText.replace(/ \d{4}$/, ''));
    const year = document.createElement('span');
    year.className = 'rail-year';
    year.textContent = dateText.match(/ \d{4}$/)?.[0] ?? '';
    date.append(year);
    const dot = document.createElement('span');
    dot.className = 'rail-dot';
    dot.setAttribute('aria-hidden', 'true');
    link.append(date, dot);
    rail.append(link);
    link.addEventListener('click', event => {
      if (!motion.matches) return;
      event.preventDefault();
      const top = shell.getBoundingClientRect().top + window.scrollY + index * step;
      window.scrollTo({top, behavior: 'smooth'});
      history.replaceState(null, '', `#${problem.id}`);
    });
    return link;
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'story-dialog';
  dialog.setAttribute('aria-labelledby', 'story-dialog-title');
  prose.append(dialog);
  let openedFrom: HTMLElement | undefined;
  dialog.addEventListener('close', () => openedFrom?.focus({preventScroll: true}));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  for (const problem of problems) {
    const details = problem.querySelector('details')!;
    details.addEventListener('toggle', () => {
      if (motion.matches && details.open) {
        details.open = false;
        openedFrom = details.querySelector('summary')!;
        const heading = document.createElement('div');
        heading.className = 'dialog-heading';
        const title = document.createElement('h2');
        title.id = 'story-dialog-title';
        title.textContent = problem.querySelector('h2')!.textContent;
        const close = document.createElement('button');
        close.type = 'button';
        close.textContent = 'Close';
        close.autofocus = true;
        close.addEventListener('click', () => dialog.close());
        heading.append(title, close);
        dialog.replaceChildren(heading, problem.querySelector('.detail-copy')!.cloneNode(true));
        dialog.showModal();
        dialog.scrollTop = 0;
      }
      schedule();
    });
  }

  let scheduled = false;
  let activeIndex = -1;
  let step = 1;
  let width = 1;
  const layout = () => {
    prose.classList.toggle('has-cinema', motion.matches);
    width = document.documentElement.clientWidth;
    const height = viewport.clientHeight || window.innerHeight;
    step = Math.max(500, height * .82);
    shell.style.setProperty('--story-width', `${width}px`);
    shell.style.setProperty('--story-height', `${height + step * (problems.length - 1)}px`);
    activeIndex = -1;
    schedule();
  };
  const update = () => {
    scheduled = false;
    let position = 0;
    let fraction = 0;
    if (motion.matches) {
      position = Math.max(0, Math.min(problems.length - 1, -shell.getBoundingClientRect().top / step));
      fraction = position / (problems.length - 1);
      timeline.style.transform = `translate3d(${-position * width}px, 0, 0)`;
      rail.style.setProperty('--rail-progress', String(fraction));
      artworks.forEach((art, index) => {
        if (!art) return;
        const offset = Math.max(-1, Math.min(1, index - position));
        art.style.setProperty('--scene-x', `${-offset * width * .12}px`);
        art.style.setProperty('--scene-tilt', `${offset * -5}deg`);
      });
    } else {
      timeline.style.removeProperty('transform');
      const rect = timeline.getBoundingClientRect();
      fraction = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      problems.forEach((problem, index) => {
        if (problem.getBoundingClientRect().top <= window.innerHeight * .5) position = index;
      });
    }
    const nextIndex = Math.round(position);
    if (activeIndex !== nextIndex) {
      problems.forEach((problem, index) => {
        problem.classList.toggle('is-current', index === nextIndex);
        problem.inert = motion.matches && index !== nextIndex;
      });
      links.forEach((link, index) => {
        if (index === nextIndex) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      activeIndex = nextIndex;
    }
    progress.style.setProperty('--read-progress', String(fraction));
    progress.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  progress.hidden = false;
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', layout, {passive: true});
  motion.addEventListener('change', layout);
  const followHash = () => {
    const index = problems.findIndex(problem => `#${problem.id}` === location.hash);
    if (motion.matches && index >= 0) {
      window.scrollTo({top: shell.getBoundingClientRect().top + window.scrollY + index * step, behavior: 'instant'});
      viewport.scrollLeft = 0;
    }
  };
  window.addEventListener('hashchange', followHash);
  document.fonts.ready.then(() => { layout(); followHash(); });
  layout();
}
