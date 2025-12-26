const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const [key, value] = arg.slice(2).split('=');
    if (value !== undefined) {
      args[key] = value;
    } else {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
}

function normalizeTeamName(team, mode) {
  if (mode !== 'upper_snake') return team;
  return String(team)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function formatName(format, team, name) {
  return format.replace('{team}', team).replace('{name}', name);
}

function resolveName({ name, team, existing, force, directives }) {
  const conflict = existing.has(name) || force;
  if (!conflict) return { resolved: name, conflict: false };

  const rule = directives.conflictResolution || {};
  const teamKey = normalizeTeamName(team, rule.teamNormalize);
  const pattern = rule.format || '{team}_{name}';
  let candidate = formatName(pattern, teamKey, name);
  let suffix = 2;
  while (existing.has(candidate)) {
    candidate = `${formatName(pattern, teamKey, name)}_${suffix++}`;
  }

  return { resolved: candidate, conflict: true };
}

function loadDirectives() {
  const configPath = path.resolve(__dirname, '..', 'config', 'general.json');
  const raw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);
  return config.directives || {};
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const directives = loadDirectives();

  if (args.show || Object.keys(args).length === 0) {
    console.log(JSON.stringify({ directives }, null, 2));
    return;
  }

  const name = args.name || args.n;
  const team = args.team || args.t;
  const existingRaw = args.existing || '';
  if (!name || !team) {
    console.error('Usage: node scripts/ask-general.js --name <NAME> --team <TEAM> [--existing a,b,c] [--force]');
    process.exitCode = 1;
    return;
  }

  const existing = new Set(
    existingRaw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  );

  const result = resolveName({
    name,
    team,
    existing,
    force: Boolean(args.force),
    directives
  });

  console.log(
    JSON.stringify(
      {
        input: { name, team },
        decision: {
          resolvedName: result.resolved,
          conflict: result.conflict,
          strategy: directives.conflictResolution?.strategy || 'suffix_team'
        }
      },
      null,
      2
    )
  );
}

main();
