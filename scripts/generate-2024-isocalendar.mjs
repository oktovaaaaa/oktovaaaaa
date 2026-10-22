import fs from 'fs';

async function main() {
  const username = 'oktovaaaaa';
  console.log(`Fetching 2024 GitHub contribution data for ${username}...`);

  // Fetch 2024 contributions
  const res2024 = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=2024`);
  const data2024 = await res2024.json();
  const days2024 = data2024.contributions; // Array of { date, count, level }

  // Map dates for quick lookup
  const dayMap = new Map();
  days2024.forEach(d => dayMap.set(d.date, d));

  // Compute stats for 2024
  let totalCommits = 0;
  let maxCount = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  days2024.forEach(d => {
    totalCommits += d.count;
    if (d.count > maxCount) maxCount = d.count;
    if (d.count > 0) {
      tempStreak++;
      if (tempStreak > bestStreak) bestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  });

  const avgPerDay = (totalCommits / days2024.length).toFixed(2);

  console.log({
    totalCommits,
    maxCount,
    bestStreak,
    avgPerDay,
    totalDays: days2024.length
  });

  // Build 53 weeks aligned from Sunday 2023-12-31 to Saturday 2025-01-04
  const startDate = new Date(Date.UTC(2023, 11, 31)); // 2023-12-31 is Sunday
  const weeks = [];
  let curr = new Date(startDate);

  for (let w = 0; w < 53; w++) {
    const weekDays = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = curr.toISOString().split('T')[0];
      const dayData = dayMap.get(dateStr) || { date: dateStr, count: 0, level: 0 };
      weekDays.push({
        date: dateStr,
        dayOfWeek: d,
        count: dayData.count,
        level: dayData.level
      });
      curr.setUTCDate(curr.getUTCDate() + 1);
    }
    weeks.push(weekDays);
  }

  // Color mapping based on GitHub contribution levels
  const colorMap = {
    0: '#ebedf0',
    1: '#9be9a8',
    2: '#40c463',
    3: '#30a14e',
    4: '#216e39'
  };

  const maxH = 6;
  const reference = maxCount || 1;

  // Render SVG groups
  let weeksSvg = '';
  weeks.forEach((week, w) => {
    const wx = (w * 1.7).toFixed(1);
    const wy = (w * 1.0).toFixed(1);
    let daysSvg = '';

    week.forEach(day => {
      const d = day.dayOfWeek;
      const count = day.count;
      const dx = (-d * 1.7).toFixed(1);
      const baseY = 6 + d;

      if (count === 0) {
        const dy = baseY.toFixed(2);
        daysSvg += `
                            <g transform="translate(${dx}, ${dy})">
                                <path fill="#ebedf0" d="M1.7,2 0,1 1.7,0 3.4,1 z"/>
                                <path fill="#ebedf0" filter="url(#brightness1)" d="M0,1 1.7,2 1.7,2 0,1 z"/>
                                <path fill="#ebedf0" filter="url(#brightness2)" d="M1.7,2 3.4,1 3.4,1 1.7,2 z"/>
                            </g>`;
      } else {
        // Height proportional to count
        const h = Math.max(1.8, (count / reference) * maxH);
        const dy = (baseY - h).toFixed(4);
        const color = colorMap[day.level] || colorMap[2];
        const hPlus2 = (2 + h).toFixed(4);
        const hPlus1 = (1 + h).toFixed(4);

        daysSvg += `
                            <g transform="translate(${dx}, ${dy})">
                                <path fill="${color}" d="M1.7,2 0,1 1.7,0 3.4,1 z"/>
                                <path fill="${color}" filter="url(#brightness1)" d="M0,1 1.7,2 1.7,${hPlus2} 0,${hPlus1} z"/>
                                <path fill="${color}" filter="url(#brightness2)" d="M1.7,2 3.4,1 3.4,${hPlus1} 1.7,${hPlus2} z"/>
                            </g>`;
      }
    });

    weeksSvg += `
                        <g transform="translate(${wx}, ${wy})">${daysSvg}
                        </g>`;
  });

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="330" class="">
    <defs>
        <style/>
    </defs>
    <style>@keyframes animation-gauge{0%{stroke-dasharray:0 329}}@keyframes animation-rainbow{0%,to{color:#7f00ff;fill:#7f00ff}14%{color:#a933ff;fill:#a933ff}29%{color:#007fff;fill:#007fff}43%{color:#00ff7f;fill:#00ff7f}57%{color:#ff0;fill:#ff0}71%{color:#ff7f00;fill:#ff7f00}86%{color:red;fill:red}}svg{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;color:#777}h2,h3{margin:8px 0 2px;padding:0;color:#0366d6;font-weight:400}h2 svg,h3 svg{fill:currentColor}h2{font-size:16px}h3,svg{font-size:14px}section&gt;.field{margin-left:5px;margin-right:5px}.field{display:flex;align-items:center;margin-bottom:2px;white-space:nowrap}.field svg{margin:0 8px;fill:#959da5;flex-shrink:0}.row{display:flex;flex-wrap:wrap}.row section{flex:1 1 0}.calendar.field{margin:4px 0 4px 7px}.calendar .day{outline:1px solid rgba(27,31,35,.04);outline-offset:-1px}svg.calendar{margin-left:13px;margin-top:4px}:root{--color-calendar-graph-day-bg:#ebedf0;--color-calendar-graph-day-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L1-bg:#9be9a8;--color-calendar-graph-day-L2-bg:#40c463;--color-calendar-graph-day-L3-bg:#30a14e;--color-calendar-graph-day-L4-bg:#216e39;--color-calendar-halloween-graph-day-L1-bg:#ffee4a;--color-calendar-halloween-graph-day-L2-bg:#ffc501;--color-calendar-halloween-graph-day-L3-bg:#fe9600;--color-calendar-halloween-graph-day-L4-bg:#03001c;--color-calendar-winter-graph-day-L1-bg:#0a3069;--color-calendar-winter-graph-day-L2-bg:#0969da;--color-calendar-winter-graph-day-L3-bg:#54aeff;--color-calendar-winter-graph-day-L4-bg:#b6e3ff;--color-calendar-graph-day-L4-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L3-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L2-border:rgba(27,31,35,0.06);--color-calendar-graph-day-L1-border:rgba(27,31,35,0.06)}#metrics-end{width:100%}</style>
    <style/>
    <foreignObject x="0" y="0" width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" class="items-wrapper">
            <section>
                <h2 class="field">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill-rule="evenodd" d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h8.5a.25.25 0 01.25.25V6h-11V3.75a.25.25 0 01.25-.25h2zm-2.25 4v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z"/>
                    </svg>
                    2024 Contributions calendar
                </h2>
                <div class="row">
                    <section>
                        <div class="field" style="margin-top: 6px;">
                            <span style="font-weight: 600; color: #216e39;">${totalCommits}</span>&nbsp;commits in 2024
                        </div>
                    </section>
                    <section>
                        <h3 class="field">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                <path fill-rule="evenodd" d="M7.75 14A1.75 1.75 0 016 12.25v-8.5C6 2.784 6.784 2 7.75 2h6.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14h-6.5zm-.25-1.75c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-6.5a.25.25 0 00-.25.25v8.5zM4.9 3.508a.75.75 0 01-.274 1.025.25.25 0 00-.126.217v6.5a.25.25 0 00.126.217.75.75 0 01-.752 1.298A1.75 1.75 0 013 11.25v-6.5c0-.649.353-1.214.874-1.516a.75.75 0 011.025.274zM1.625 5.533a.75.75 0 10-.752-1.299A1.75 1.75 0 000 5.75v4.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217v-4.5a.25.25 0 01.126-.217z"/>
                            </svg>
                            Commits streaks
                        </h3>
                        <div class="field">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                <path d="M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"/>
                            </svg>
                            Best streak ${bestStreak} days
                        </div>
                        <h3 class="field">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                <path fill-rule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"/>
                            </svg>
                            Commits per day
                        </h3>
                        <div class="field">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                <path d="M7.823 1.677L4.927 4.573A.25.25 0 005.104 5H7.25v3.236a.75.75 0 101.5 0V5h2.146a.25.25 0 00.177-.427L8.177 1.677a.25.25 0 00-.354 0zM13.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-3.75.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM7.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM4 11.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM1.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/>
                            </svg>
                            Highest in a day at ${maxCount}
                        </div>
                        <div class="field">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                                <path d="M10.896 2H8.75V.75a.75.75 0 00-1.5 0V2H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 2zM8.75 15.25a.75.75 0 01-1.5 0V14H5.104a.25.25 0 01-.177-.427l2.896-2.896a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25zm-6.5-6.5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z"/>
                            </svg>
                            Average per day at ~${avgPerDay}
                        </div>
                    </section>
                </div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: -130px;" viewBox="0,0 480,270">
                    <filter id="brightness1">
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="0.6"/>
                            <feFuncG type="linear" slope="0.6"/>
                            <feFuncB type="linear" slope="0.6"/>
                        </feComponentTransfer>
                    </filter>
                    <filter id="brightness2">
                        <feComponentTransfer>
                            <feFuncR type="linear" slope="0.2"/>
                            <feFuncG type="linear" slope="0.2"/>
                            <feFuncB type="linear" slope="0.2"/>
                        </feComponentTransfer>
                    </filter>
                    <g transform="scale(4) translate(12, 0)">${weeksSvg}
                    </g>
                </svg>
            </section>
        </div>
        <div xmlns="http://www.w3.org/1999/xhtml" id="metrics-end"></div>
    </foreignObject>
</svg>`;

  const outputPath = './metrics.plugin.isocalendar.2024.svg';
  fs.writeFileSync(outputPath, svgContent, 'utf-8');
  console.log(`Successfully generated ${outputPath}!`);
}

main().catch(err => {
  console.error('Error generating 2024 isometric calendar:', err);
  process.exit(1);
});
