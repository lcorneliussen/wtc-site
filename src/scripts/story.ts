const story = document.querySelector<HTMLElement>('[data-story]');
const progress = document.querySelector<HTMLElement>('[data-story-progress]');
const timeline = document.querySelector<HTMLElement>('.problem-timeline');

if (story && progress && timeline) {
  const problems = [...timeline.querySelectorAll<HTMLElement>('.problem')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  progress.hidden = false;
  let scheduled = false;
  let lastProgress = -1;

  const update = () => {
    scheduled = false;
    const start = timeline.getBoundingClientRect().top + window.scrollY;
    const end = timeline.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * .6;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;
    const fraction = atBottom ? 1 : Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
    const percent = Math.round(fraction * 100);
    progress.style.setProperty('--read-progress', String(fraction));
    if (percent !== lastProgress) {
      progress.setAttribute('aria-valuenow', String(percent));
      lastProgress = percent;
    }

    let active = problems[0];
    for (const problem of problems) {
      if (problem.getBoundingClientRect().top <= Math.min(300, window.innerHeight * .35)) active = problem;
    }
    if (atBottom) active = problems[problems.length - 1];
    for (const problem of problems) {
      problem.classList.toggle('is-current', problem === active);
      const artwork = problem.querySelector<HTMLElement>('.scene-art');
      if (artwork) {
        const top = problem.getBoundingClientRect().top;
        const shift = reducedMotion.matches || window.innerWidth <= 700 ? 0 : Math.max(-14, Math.min(14, (window.innerHeight * .35 - top) * .045));
        artwork.style.setProperty('--art-shift', `${shift}px`);
      }
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };

  // Disclosures are native HTML. JavaScript only updates the reading guide.
  for (const details of timeline.querySelectorAll('details')) details.addEventListener('toggle', schedule);
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  document.fonts.ready.then(schedule);
  schedule();
}
