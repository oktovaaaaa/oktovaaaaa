import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PacmanRenderer, PlayerStyle } from './lib/pacman-contribution-graph.min.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const USERNAME = 'oktovaaaaa';
const YEAR = 2024;

async function generateSvg(theme) {
  return new Promise(async (resolve, reject) => {
    try {
      let generatedSvg = '';
      let stats = null;

      const renderer = new PacmanRenderer({
        platform: 'github',
        username: USERNAME,
        year: YEAR,
        gameTheme: theme,
        playerStyle: PlayerStyle.OPPORTUNISTIC,
        showMonthLabels: true,
        svgCallback: (svg) => {
          generatedSvg = svg;
        },
        gameStatsCallback: (s) => {
          stats = s;
        },
        gameOverCallback: () => {
          resolve({ svg: generatedSvg, stats });
        },
        pointsIncreasedCallback: () => {}
      });

      await renderer.start();
    } catch (err) {
      reject(err);
    }
  });
}

async function main() {
  console.log(`🎮 Generating 2024 Pac-Man Contribution Graphs for @${USERNAME}...`);

  // Light theme
  console.log('Generating Light Theme (github)...');
  const lightResult = await generateSvg('github');
  const lightPath = path.join(rootDir, 'pacman-contribution-graph.svg');
  fs.writeFileSync(lightPath, lightResult.svg, 'utf-8');
  console.log(`✅ Saved light theme to ${lightPath} (${(lightResult.svg.length / 1024).toFixed(1)} KB)`);

  // Dark theme
  console.log('Generating Dark Theme (github-dark)...');
  const darkResult = await generateSvg('github-dark');
  const darkPath = path.join(rootDir, 'pacman-contribution-graph-dark.svg');
  fs.writeFileSync(darkPath, darkResult.svg, 'utf-8');
  console.log(`✅ Saved dark theme to ${darkPath} (${(darkResult.svg.length / 1024).toFixed(1)} KB)`);

  console.log('\nGame Stats:');
  console.log('Light:', lightResult.stats);
  console.log('Dark:', darkResult.stats);
  console.log('\n🎉 Successfully generated 2024 Pac-Man contribution SVGs!');
}

main().catch((err) => {
  console.error('❌ Error generating Pac-Man contribution graph:', err);
  process.exit(1);
});
