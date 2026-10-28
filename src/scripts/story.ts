const story = document.querySelector<HTMLElement>('[data-story]');
const progress = document.querySelector<HTMLElement>('[data-story-progress]');
const contents = document.querySelector<HTMLDetailsElement>('[data-story-nav]');
const article = document.querySelector<HTMLElement>('.story-content');

if (story && progress && contents && article) {
  const links = [...contents.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const sections = [...article.querySelectorAll<HTMLElement>('.chapter, #public-record')];
  const position = contents.querySelector<HTMLElement>('[data-story-position]');
  const current = contents.querySelector<HTMLElement>('[data-story-current]');
  const mobile = window.matchMedia('(max-width: 800px)');

  // The content and chapter links work without this reading guide.
  story.classList.add('story-enhanced');
  progress.hidden = false;
  if (position) position.hidden = false;
  if (current) current.hidden = false;

  const fitContents = () => { contents.open = !mobile.matches; };
  fitContents();
  mobile.addEventListener('change', fitContents);
  for (const link of links) {
    link.addEventListener('click', () => {
      if (!mobile.matches) return;
      contents.open = false;
      const heading = document.getElementById(link.hash.slice(1));
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({preventScroll: true});
      }
    });
  }

  let scheduled = false;
  let lastProgress = -1;
  const update = () => {
    scheduled = false;
    const start = article.getBoundingClientRect().top + window.scrollY;
    const end = article.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * .6;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;
    const fraction = atBottom ? 1 : Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
    const percent = Math.round(fraction * 100);
    progress.style.setProperty('--read-progress', String(fraction));
    if (percent !== lastProgress) {
      progress.setAttribute('aria-valuenow', String(percent));
      lastProgress = percent;
    }

    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .28) active = section;
    }
    if (atBottom) {
      active = sections[sections.length - 1];
    }
    if (!active) return;
    const id = active.dataset.chapter || active.id;
    const index = links.findIndex(link => link.hash === `#${id}`);
    for (const [i, link] of links.entries()) {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (index >= 0) {
      if (position) position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(links.length).padStart(2, '0')}`;
      if (current) current.textContent = links[index].textContent;
    }
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  document.fonts.ready.then(schedule);
  schedule();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-seen');
          observer.unobserve(entry.target);
        }
      }
    }, {rootMargin: '0px 0px -10% 0px', threshold: 0});
    for (const section of sections) observer.observe(section);
  }
}
