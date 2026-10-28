const story = document.querySelector<HTMLElement>('[data-story]');
const progress = document.querySelector<HTMLElement>('[data-story-progress]');
const timeline = document.querySelector<HTMLElement>('.problem-timeline');

if (story && progress && timeline) {
  const problems = [...timeline.querySelectorAll<HTMLElement>('.problem')];
  const stage = document.createElement('div');
  stage.className = 'story-stage';
  const canvas = document.createElement('div');
  canvas.className = 'stage-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const nav = document.createElement('nav');
  nav.className = 'stage-nav';
  nav.setAttribute('aria-label', 'Story chapters');

  const layers = problems.map((problem, index) => {
    const number = String(index + 1).padStart(2, '0');
    const layer = document.createElement('div');
    layer.className = 'stage-layer';
    const image = problem.querySelector<HTMLImageElement>('.scene-art img')?.cloneNode(true) as HTMLImageElement | undefined;
    if (image) {
      image.loading = 'eager';
      layer.append(image);
    }
    const counter = document.createElement('span');
    counter.className = 'stage-number';
    counter.textContent = number;
    const date = document.createElement('span');
    date.className = 'stage-date';
    date.textContent = problem.querySelector('time')?.textContent ?? '';
    layer.append(counter, date);
    canvas.append(layer);
    const link = document.createElement('a');
    link.href = `#${problem.id}`;
    link.textContent = number;
    link.setAttribute('aria-label', problem.querySelector('h2')?.textContent ?? `Chapter ${number}`);
    nav.append(link);
    return layer;
  });
  stage.append(canvas, nav);
  timeline.parentElement?.append(stage);
  timeline.parentElement?.classList.add('has-story-stage');
  const links = [...nav.querySelectorAll('a')];
  progress.hidden = false;
  let scheduled = false;
  let lastProgress = -1;
  let activeIndex = -1;

  const update = () => {
    scheduled = false;
    const timelineRect = timeline.getBoundingClientRect();
    const start = timelineRect.top + window.scrollY;
    const end = timelineRect.bottom + window.scrollY - window.innerHeight * .6;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;
    const fraction = atBottom ? 1 : Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
    const percent = Math.round(fraction * 100);
    progress.style.setProperty('--read-progress', String(fraction));
    if (percent !== lastProgress) {
      progress.setAttribute('aria-valuenow', String(percent));
      lastProgress = percent;
    }

    // Change scenes when the next problem reaches the reading position.
    let nextIndex = 0;
    const readingPosition = window.innerHeight * .6;
    problems.forEach((problem, index) => {
      if ((problem.querySelector('h2') ?? problem).getBoundingClientRect().top <= readingPosition) nextIndex = index;
    });
    if (atBottom) nextIndex = problems.length - 1;
    if (nextIndex !== activeIndex) {
      problems.forEach((problem, index) => problem.classList.toggle('is-current', index === nextIndex));
      layers.forEach((layer, index) => {
        layer.classList.toggle('was-current', index === activeIndex);
        layer.classList.toggle('is-current', index === nextIndex);
      });
      links.forEach((link, index) => {
        if (index === nextIndex) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      activeIndex = nextIndex;
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };

  for (const details of timeline.querySelectorAll('details')) details.addEventListener('toggle', schedule);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  document.fonts.ready.then(schedule);
  schedule();
}
