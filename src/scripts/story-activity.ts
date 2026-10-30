import activity from '../data/story-activity.json';

type Week = { weekStart: string; mergedPRs: number; survivingWorktrees: number | null; partial: boolean };
type Slot = { week: Week; numbers: HTMLElement[]; targets: number[] };

function monday(date: string) {
  const day = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(day.getTime())) return null;
  day.setUTCDate(day.getUTCDate() - (day.getUTCDay() + 6) % 7);
  return day.toISOString().slice(0, 10);
}

export function setupStoryActivity(problems: HTMLElement[], cards: HTMLElement[], reducedMotion: MediaQueryList) {
  const weeks = new Map<string, Week>((activity.weeks as Week[]).map(week => [week.weekStart, week]));
  const dialog = document.querySelector<HTMLDialogElement>('#activity-method');
  const formatter = new Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'short', timeZone: 'UTC'});
  const slots = problems.map((problem, index): Slot | null => {
    const date = problem.querySelector<HTMLTimeElement>('.problem-date time')?.dateTime;
    const start = date ? monday(date) : null;
    const week = start ? weeks.get(start) : null;
    if (!week) return null;
    const panel = document.createElement('aside');
    panel.className = 'story-metrics';
    panel.setAttribute('aria-label', 'Weekly activity');
    const caption = document.createElement('p');
    caption.className = 'metrics-week';
    caption.append('Week of ');
    const time = document.createElement('time');
    time.dateTime = week.weekStart;
    time.textContent = formatter.format(new Date(`${week.weekStart}T12:00:00Z`));
    caption.append(time);
    panel.append(caption);
    const list = document.createElement('dl');
    const numbers: HTMLElement[] = [];
    const targets: number[] = [];
    const measures: [string, number][] = [['PRs merged / week', week.mergedPRs]];
    if (week.survivingWorktrees !== null) measures.push(['Surviving worktrees', week.survivingWorktrees]);
    for (const [label, value] of measures) {
      const group = document.createElement('div');
      const term = document.createElement('dt');
      term.textContent = label;
      const definition = document.createElement('dd');
      const visual = document.createElement('span');
      visual.setAttribute('aria-hidden', 'true');
      visual.textContent = String(value);
      const accessible = document.createElement('span');
      accessible.className = 'sr-only';
      accessible.textContent = String(value);
      definition.append(visual, accessible);
      group.append(term, definition);
      list.append(group);
      numbers.push(visual);
      targets.push(value);
    }
    panel.append(list);
    if (week.partial) {
      const partial = document.createElement('p');
      partial.className = 'metrics-partial';
      partial.textContent = 'Partial week';
      panel.append(partial);
    }
    if (dialog) {
      const info = document.createElement('button');
      info.type = 'button';
      info.className = 'metrics-info';
      info.textContent = 'About the numbers';
      info.addEventListener('click', () => dialog.showModal());
      panel.append(info);
    }
    cards[index].append(panel);
    return {week, numbers, targets};
  });

  dialog?.querySelector('button')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  let active = -1;
  let previous: number[] = [];
  let animation = 0;
  let current: Slot | null = null;
  return (index: number) => {
    if (index === active) return;
    active = index;
    cancelAnimationFrame(animation);
    current?.numbers.forEach((number, i) => { number.textContent = String(current!.targets[i]); });
    current = slots[index];
    const slot = current;
    if (!slot) return;
    const from = slot.targets.map((_, i) => previous[i] ?? 0);
    previous = slot.targets;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = reducedMotion.matches ? 1 : Math.min(1, (now - started) / 550);
      const eased = 1 - Math.pow(1 - progress, 3);
      slot.numbers.forEach((number, i) => {
        number.textContent = String(Math.round(from[i] + (slot.targets[i] - from[i]) * eased));
      });
      if (progress < 1) animation = requestAnimationFrame(tick);
    };
    if (reducedMotion.matches) tick(started);
    else animation = requestAnimationFrame(tick);
  };
}
