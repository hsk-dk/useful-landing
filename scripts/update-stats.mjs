#!/usr/bin/env node
// Writes stats.json: stars, release downloads and last push for each project shown on the page.
// Run by .github/workflows/stats.yml (daily); can also be run by hand:
//   GITHUB_TOKEN=$(gh auth token) node scripts/update-stats.mjs
// Node 20+, no dependencies.
import { writeFileSync } from 'node:fs';

const OWNER = 'hsk-dk';
// Keep in sync with the data-repo attributes in index.html.
const REPOS = [
  'home-assistant-thermex',
  'home-assistant-forsyningonline',
  'useful-blueprints',
  'kvittering-app',
  'cornhone-useful',
];

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'useful-landing-stats',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function get(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

// Sum of download_count over every asset of every release (GitHub only counts release files).
async function downloads(repo) {
  let total = 0;
  for (let page = 1; ; page++) {
    const releases = await get(`https://api.github.com/repos/${OWNER}/${repo}/releases?per_page=100&page=${page}`);
    for (const r of releases) for (const a of r.assets) total += a.download_count;
    if (releases.length < 100) return total;
  }
}

const repos = {};
for (const repo of REPOS) {
  const info = await get(`https://api.github.com/repos/${OWNER}/${repo}`);
  repos[repo] = {
    stars: info.stargazers_count,
    downloads: await downloads(repo),
    pushed_at: info.pushed_at,
  };
  console.log(repo, repos[repo]);
}

// The workflow commits stats.json only when it changed, so a quiet day makes no commit.
writeFileSync('stats.json', JSON.stringify({ repos }, null, 2) + '\n');
