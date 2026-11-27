/**
 * FGC Open Scorebars — Native Zero-Dependency Start.gg & Challonge Integration
 *
 * Features:
 *  - Start.gg GraphQL API v4 (https://api.start.gg/gql/alpha)
 *      • Parse any start.gg tournament/event URL or slug
 *      • Fetch Tournament metadata, Events list, and Stream Queue
 *      • Fetch Event Sets (Stream Queue, Active/Pending, Completed) with scores & round names
 *      • Import entire Event Participant Roster with Sponsors & Auto-Mapped Flags (Country + CCAA/State!)
 *      • Report Set Results via `reportBracketSet` mutation (with game-by-game score data)
 *  - Challonge REST API v1 (https://api.challonge.com/v1)
 *      • Parse any challonge.com URL (including subdomain orgs: org.challonge.com/slug -> org-slug)
 *      • Fetch Tournament, Participants (auto-splitting Sponsor | Name), and Matches
 *      • Convert Challonge round integers into clean FGC phase names + [W]/[L] badges
 *      • Report / Sync Match Scores via PUT matches/{id}.json
 *  - Demo Mode (100% offline local test tournament to try every workflow without an API key)
 */

const STARTGG_ENDPOINT = 'https://api.start.gg/gql/alpha';
const CHALLONGE_BASE = 'https://api.challonge.com/v1';

/* =========================================================================
   SEEDING & UPSET FACTOR HELPERS + SHORT TTL CACHE (Protects Start.gg Rate Limit)
   ========================================================================= */
const SEED_CACHE_TTL_MS = 20000;
const seedCache = new Map();

export function cleanSeedNum(val) {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(String(val).replace(/^seeds*/i, '').replace(/^#/, '').trim());
  return Number.isInteger(n) && n >= 1 ? n : null;
}

// PGStats / Start.gg standard bracket seed tier (1->0, 2->1, 3-4->2, 5-6->3, 7-8->4, 9-12->5, 13-16->6, ...)
function seedToBracketTier(seed) {
  const s = cleanSeedNum(seed);
  if (!s) return null;
  if (s === 1) return 0;
  if (s === 2) return 1;
  const p = Math.floor(Math.log2(s - 1));
  const base = 1 << p;
  const mid = base + (base >> 1);
  return (2 * p) + (s > mid ? 1 : 0);
}

export function computeUpsetInfo(p1Seed, p2Seed, winnerSide) {
  const s1 = cleanSeedNum(p1Seed);
  const s2 = cleanSeedNum(p2Seed);
  if (!s1 || !s2 || !winnerSide) return null;
  const winSeed = winnerSide === 'p1' ? s1 : s2;
  const loseSeed = winnerSide === 'p1' ? s2 : s1;
  if (winSeed <= loseSeed) return null;
  const tWin = seedToBracketTier(winSeed);
  const tLose = seedToBracketTier(loseSeed);
  const upsetFactor = Math.max(0, (tWin ?? 0) - (tLose ?? 0));
  return {
    isUpset: true,
    winnerSeed: winSeed,
    loserSeed: loseSeed,
    seedGap: winSeed - loseSeed,
    upsetFactor
  };
}

function getCachedSeeds(key) {
  const hit = seedCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > SEED_CACHE_TTL_MS) {
    seedCache.delete(key);
    return null;
  }
  return hit.data;
}

function setCachedSeeds(key, data) {
  seedCache.set(key, { ts: Date.now(), data });
  if (seedCache.size > 40) {
    const oldest = seedCache.keys().next().value;
    if (oldest) seedCache.delete(oldest);
  }
}

/* =========================================================================
   SMART LOCATION -> 114-FLAG AUTO-MAPPER (Country + Spanish CCAA / US States / EU Regions)
   ========================================================================= */
function norm(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const COUNTRY_NAME_MAP = {
  spain: 'ES', espana: 'ES', es: 'ES', esp: 'ES',
  japan: 'JP', japon: 'JP', jp: 'JP', jpn: 'JP',
  'south korea': 'KR', 'korea, republic of': 'KR', korea: 'KR', 'corea del sur': 'KR', kr: 'KR', kor: 'KR',
  pakistan: 'PK', pk: 'PK', pak: 'PK',
  'united states': 'US', 'united states of america': 'US', usa: 'US', us: 'US', 'estados unidos': 'US',
  'united kingdom': 'GB', uk: 'GB', gb: 'GB', 'great britain': 'GB', 'reino unido': 'GB',
  france: 'FR', francia: 'FR', fr: 'FR', fra: 'FR',
  germany: 'DE', alemania: 'DE', deutschland: 'DE', de: 'DE', ger: 'DE',
  italy: 'IT', italia: 'IT', it: 'IT', ita: 'IT',
  portugal: 'PT', pt: 'PT', por: 'PT',
  netherlands: 'NL', holland: 'NL', 'paises bajos': 'NL', nl: 'NL', ned: 'NL',
  belgium: 'BE', belgica: 'BE', be: 'BE',
  switzerland: 'CH', suiza: 'CH', ch: 'CH',
  austria: 'AT', at: 'AT',
  ireland: 'IE', irlanda: 'IE', ie: 'IE',
  sweden: 'SE', suecia: 'SE', se: 'SE',
  norway: 'NO', noruega: 'NO', no: 'NO',
  finland: 'FI', finlandia: 'FI', fi: 'FI',
  denmark: 'DK', dinamarca: 'DK', dk: 'DK',
  poland: 'PL', polonia: 'PL', pl: 'PL',
  'czech republic': 'CZ', czechia: 'CZ', cz: 'CZ',
  greece: 'GR', grecia: 'GR', gr: 'GR',
  hungary: 'HU', hungria: 'HU', hu: 'HU',
  romania: 'RO', rumania: 'RO', ro: 'RO',
  ukraine: 'UA', ucrania: 'UA', ua: 'UA',
  croatia: 'HR', croacia: 'HR', hr: 'HR',
  serbia: 'RS', rs: 'RS',
  bulgaria: 'BG', bg: 'BG',
  slovakia: 'SK', eslovaquia: 'SK', sk: 'SK',
  iceland: 'IS', islandia: 'IS', is: 'IS',
  luxembourg: 'LU', luxemburgo: 'LU', lu: 'LU',
  turkey: 'TR', turkiye: 'TR', turquia: 'TR', tr: 'TR',
  canada: 'CA', ca: 'CA',
  mexico: 'MX', mx: 'MX',
  brazil: 'BR', brasil: 'BR', br: 'BR',
  argentina: 'AR', ar: 'AR',
  chile: 'CL', cl: 'CL',
  colombia: 'CO', co: 'CO',
  peru: 'PE', pe: 'PE',
  venezuela: 'VE', ve: 'VE',
  ecuador: 'EC', ec: 'EC',
  uruguay: 'UY', uy: 'UY',
  'dominican republic': 'DO', 'republica dominicana': 'DO', do: 'DO',
  'costa rica': 'CR', cr: 'CR',
  'puerto rico': 'PR', pr: 'PR',
  australia: 'AU', au: 'AU',
  'new zealand': 'NZ', 'nueva zelanda': 'NZ', nz: 'NZ',
  philippines: 'PH', filipinas: 'PH', ph: 'PH', phl: 'PH',
  indonesia: 'ID', id: 'ID',
  'hong kong': 'HK', hk: 'HK',
  taiwan: 'TW', tw: 'TW',
  china: 'CN', cn: 'CN',
  singapore: 'SG', singapur: 'SG', sg: 'SG',
  malaysia: 'MY', malasia: 'MY', my: 'MY',
  thailand: 'TH', tailandia: 'TH', th: 'TH', tha: 'TH',
  india: 'IN', in: 'IN',
  'saudi arabia': 'SA', 'arabia saudi': 'SA', sa: 'SA',
  'united arab emirates': 'AE', uae: 'AE', ae: 'AE',
  morocco: 'MA', marruecos: 'MA', ma: 'MA',
  egypt: 'EG', egipto: 'EG', eg: 'EG',
  'south africa': 'ZA', sudafrica: 'ZA', za: 'ZA'
};

const SPAIN_REGION_KEYWORDS = [
  ['ES-AN', ['andalucia', 'andalusia', 'an', 'sevilla', 'seville', 'malaga', 'granada', 'cadiz', 'cordoba', 'huelva', 'jaen', 'almeria', 'jerez', 'marbella']],
  ['ES-AR', ['aragon', 'ar', 'zaragoza', 'huesca', 'teruel']],
  ['ES-AS', ['asturias', 'as', 'oviedo', 'gijon', 'aviles']],
  ['ES-IB', ['baleares', 'balears', 'balearic', 'ib', 'mallorca', 'palma', 'menorca', 'ibiza']],
  ['ES-CN', ['canarias', 'canary', 'cn', 'tenerife', 'las palmas', 'gran canaria', 'santa cruz', 'lanzarote']],
  ['ES-CB', ['cantabria', 'cb', 'santander', 'torrelavega']],
  ['ES-CM', ['castilla-la mancha', 'castilla la mancha', 'cm', 'toledo', 'albacete', 'ciudad real', 'cuenca', 'guadalajara']],
  ['ES-CL', ['castilla y leon', 'castile and leon', 'cl', 'valladolid', 'salamanca', 'burgos', 'leon', 'segovia', 'avila', 'zamora', 'soria', 'palencia']],
  ['ES-CT', ['cataluna', 'catalunya', 'catalonia', 'ct', 'barcelona', 'girona', 'tarragona', 'lleida', 'hospitalet', 'badalona', 'sabadell']],
  ['ES-VC', ['valenciana', 'valencia', 'vc', 'alicante', 'alacant', 'castellon', 'elche', 'elx']],
  ['ES-EX', ['extremadura', 'ex', 'badajoz', 'caceres', 'merida']],
  ['ES-GA', ['galicia', 'galiza', 'ga', 'vigo', 'coruna', 'santiago', 'lugo', 'ourense', 'pontevedra']],
  ['ES-MD', ['madrid', 'md', 'm', 'getafe', 'alcala', 'leganes', 'mostoles', 'fuenlabrada', 'alcorcon']],
  ['ES-MC', ['murcia', 'mc', 'cartagena', 'lorca']],
  ['ES-NC', ['navarra', 'navarre', 'nafarroa', 'nc', 'pamplona', 'iruna', 'tudela']],
  ['ES-PV', ['pais vasco', 'euskadi', 'basque', 'pv', 'bilbao', 'bilbo', 'donostia', 'san sebastian', 'vitoria', 'gasteiz', 'barakaldo']],
  ['ES-RI', ['la rioja', 'rioja', 'ri', 'logrono', 'calahorra']],
  ['ES-CE', ['ceuta', 'ce']],
  ['ES-ML', ['melilla', 'ml']]
];

const US_STATE_CODES = new Set([
  'CA', 'TX', 'NY', 'FL', 'IL', 'NV', 'GA', 'WA', 'NJ', 'PA',
  'MA', 'MI', 'OH', 'MD', 'AZ', 'CO', 'NC', 'TN', 'HI', 'VA', 'DC'
]);

const US_STATE_NAMES = {
  california: 'US-CA', texas: 'US-TX', 'new york': 'US-NY', florida: 'US-FL',
  illinois: 'US-IL', nevada: 'US-NV', georgia: 'US-GA', washington: 'US-WA',
  'new jersey': 'US-NJ', pennsylvania: 'US-PA', massachusetts: 'US-MA',
  michigan: 'US-MI', ohio: 'US-OH', maryland: 'US-MD', arizona: 'US-AZ',
  colorado: 'US-CO', 'north carolina': 'US-NC', tennessee: 'US-TN',
  hawaii: 'US-HI', virginia: 'US-VA', 'district of columbia': 'US-DC'
};

export function mapLocationToFlags(country, state, city) {
  const cNorm = norm(country);
  const sNorm = norm(state);
  const ciNorm = norm(city);
  let flag = COUNTRY_NAME_MAP[cNorm] || '';
  let region = '';

  // Auto-detect UK constituent nations even if country is listed as England/Scotland/Wales
  if (cNorm === 'scotland' || sNorm === 'scotland' || sNorm === 'sct') { flag = 'GB'; region = 'GB-SCT'; }
  else if (cNorm === 'wales' || sNorm === 'wales' || sNorm === 'wls') { flag = 'GB'; region = 'GB-WLS'; }
  else if (cNorm === 'england' || sNorm === 'england' || sNorm === 'eng') { flag = 'GB'; region = 'GB-ENG'; }
  else if (cNorm === 'northern ireland' || sNorm === 'northern ireland') { flag = 'GB'; region = 'GB-NIR'; }

  // Spanish Autonomous Communities (match state OR city!)
  if (flag === 'ES') {
    const combined = `${sNorm} ${ciNorm}`.trim();
    for (const [code, kws] of SPAIN_REGION_KEYWORDS) {
      if (kws.some(k => k.length <= 2 ? (sNorm === k) : combined.includes(k))) {
        region = code;
        break;
      }
    }
  } else if (flag === 'US') {
    const stUp = String(state || '').trim().toUpperCase();
    if (US_STATE_CODES.has(stUp)) region = `US-${stUp}`;
    else if (US_STATE_NAMES[sNorm]) region = US_STATE_NAMES[sNorm];
    else if (ciNorm.includes('las vegas')) region = 'US-NV';
    else if (ciNorm.includes('los angeles') || ciNorm.includes('san francisco')) region = 'US-CA';
    else if (ciNorm.includes('chicago')) region = 'US-IL';
    else if (ciNorm.includes('new york') || ciNorm.includes('brooklyn')) region = 'US-NY';
  } else if (flag === 'CA' && (sNorm === 'qc' || sNorm === 'quebec' || ciNorm.includes('montreal'))) {
    region = 'CA-QC';
  } else if (flag === 'DE' && (sNorm === 'by' || sNorm.includes('bavaria') || sNorm.includes('bayern') || ciNorm.includes('munich'))) {
    region = 'DE-BY';
  } else if (flag === 'FR') {
    if (sNorm.includes('bretagne') || sNorm.includes('brittany') || ciNorm.includes('rennes')) region = 'FR-BRE';
    else if (sNorm.includes('corse') || sNorm.includes('corsica')) region = 'FR-20R';
  } else if (flag === 'IT') {
    if (sNorm.includes('sicil') || ciNorm.includes('palermo')) region = 'IT-82';
    else if (sNorm.includes('sard') || ciNorm.includes('cagliari')) region = 'IT-88';
  } else if (flag === 'BE') {
    if (sNorm.includes('fland') || sNorm.includes('vlaand') || ciNorm.includes('antwerp')) region = 'BE-VLG';
    else if (sNorm.includes('wallon') || ciNorm.includes('liege')) region = 'BE-WAL';
  }

  return { flag, region };
}

/* =========================================================================
   URL PARSERS (Start.gg & Challonge)
   ========================================================================= */
export function parseStartGGUrl(input) {
  const raw = String(input || '').trim();
  if (!raw) return { tournamentSlug: '', eventSlug: '' };
  const clean = raw.replace(/^https?:\/\/(www\.)?(start|smash)\.gg\//i, '').replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '');
  const parts = clean.split('/').filter(Boolean);
  let tournamentSlug = '';
  let eventSlug = '';

  const tIdx = parts.findIndex(p => p.toLowerCase() === 'tournament');
  if (tIdx >= 0 && parts[tIdx + 1]) {
    tournamentSlug = parts[tIdx + 1];
    const eIdx = parts.findIndex((p, i) => i > tIdx + 1 && p.toLowerCase() === 'event');
    if (eIdx >= 0 && parts[eIdx + 1]) {
      eventSlug = `tournament/${tournamentSlug}/event/${parts[eIdx + 1]}`;
    }
  } else if (parts.length >= 1) {
    tournamentSlug = parts[0];
  }
  return { tournamentSlug, eventSlug };
}

export function parseChallongeUrl(input) {
  const raw = String(input || '').trim();
  if (!raw) return { slug: '' };
  // Handle org subdomain: https://myorg.challonge.com/es/my_tourney -> myorg-my_tourney
  const subMatch = raw.match(/^https?:\/\/([a-z0-9-]+)\.challonge\.com\/(.+)$/i);
  if (subMatch) {
    const sub = subMatch[1].toLowerCase();
    const rest = subMatch[2].replace(/[?#].*$/, '').split('/').filter(Boolean);
    const langs = new Set(['es', 'en', 'fr', 'de', 'ja', 'ko', 'pt', 'it', 'zh_cn', 'ru']);
    const filtered = rest.filter(p => !langs.has(p.toLowerCase()) && p.toLowerCase() !== 'tournaments' && p.toLowerCase() !== 'standings' && p.toLowerCase() !== 'module');
    const tourney = filtered[0] || '';
    if (!tourney) return { slug: '' };
    return { slug: sub === 'www' ? tourney : `${sub}-${tourney}` };
  }
  // Plain challonge.com/slug or raw slug
  const clean = raw.replace(/^https?:\/\/(www\.)?challonge\.com\//i, '').replace(/[?#].*$/, '');
  const parts = clean.split('/').filter(Boolean);
  const langs = new Set(['es', 'en', 'fr', 'de', 'ja', 'ko', 'pt', 'it']);
  const filtered = parts.filter(p => !langs.has(p.toLowerCase()) && p.toLowerCase() !== 'tournaments' && p.toLowerCase() !== 'standings');
  return { slug: filtered[0] || '' };
}

/* =========================================================================
   HELPER: SPLIT SPONSOR / TAG & DETECT [W] / [L] BRACKET BADGES
   ========================================================================= */
function splitSponsorAndName(displayName, explicitPrefix) {
  if (explicitPrefix && String(explicitPrefix).trim()) {
    return { sponsor: String(explicitPrefix).trim(), name: String(displayName || '').trim() };
  }
  const raw = String(displayName || '').trim();
  // Match "TAG | PlayerName" or "[TAG] PlayerName"
  const pipe = raw.match(/^([^|]{1,16})\s*\|\s*(.+)$/);
  if (pipe) return { sponsor: pipe[1].trim(), name: pipe[2].trim() };
  const brk = raw.match(/^\[([^\]]{1,16})\]\s*(.+)$/);
  if (brk) return { sponsor: brk[1].trim(), name: brk[2].trim() };
  return { sponsor: '', name: raw };
}

function inferBracketBadges(roundText, roundNum) {
  const rt = norm(roundText);
  if (rt.includes('grand final') && rt.includes('reset')) return { p1Bracket: 'L', p2Bracket: 'L' };
  if (rt.includes('grand final')) return { p1Bracket: 'W', p2Bracket: 'L' };
  if (rt.includes('loser') || (typeof roundNum === 'number' && roundNum < 0)) return { p1Bracket: 'L', p2Bracket: 'L' };
  if (rt.includes('winner')) return { p1Bracket: 'W', p2Bracket: 'W' };
  return { p1Bracket: '', p2Bracket: '' };
}

/* =========================================================================
   START.GG GRAPHQL V4 CLIENT
   ========================================================================= */
async function startggQuery(token, query, variables = {}) {
  if (!token || !String(token).trim()) {
    throw new Error('Please paste your free start.gg API token (start.gg/admin/profile/developer).');
  }
  const res = await fetch(STARTGG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${String(token).trim()}`
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(12000)
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Start.gg HTTP ${res.status}: ${json?.message || res.statusText}`);
  }
  if (json?.errors?.length) {
    throw new Error(`Start.gg GraphQL: ${json.errors.map(e => e.message).join(' · ')}`);
  }
  return json.data;
}

function extractProfileAvatar(user) {
  const imgs = user?.images;
  if (!Array.isArray(imgs) || !imgs.length) return '';
  const prof = imgs.find(i => i?.type === 'profile' && i?.url) || imgs.find(i => i?.url);
  return prof?.url ? String(prof.url).trim() : '';
}

function extractTournamentImages(t) {
  const imgs = Array.isArray(t?.images) ? t.images.filter(i => i?.url) : [];
  const profile = imgs.find(i => String(i.type || '').toLowerCase() === 'profile');
  const banner = imgs.find(i => String(i.type || '').toLowerCase() === 'banner');
  const fallback = imgs.find(i => String(i.type || '').toLowerCase() !== 'banner') || imgs[0];
  return {
    logoUrl: String(profile?.url || fallback?.url || '').trim(),
    bannerUrl: String(banner?.url || '').trim()
  };
}

function extractTwitterHandle(user) {
  const tw = user?.authorizations?.find?.(a => a?.externalUsername)?.externalUsername || '';
  return tw ? `@${String(tw).replace(/^@/, '').trim()}` : '';
}

function normalizeEntrantInfo(entrant, explicitPhaseSeed = null) {
  if (!entrant) return null;
  const parts = Array.isArray(entrant.participants) ? entrant.participants : [];
  const part = parts[0];
  const rawName = part?.gamerTag || entrant.name || 'TBD';
  const { sponsor, name } = splitSponsorAndName(rawName, part?.prefix);
  const loc = part?.user?.location || {};
  const { flag, region } = mapLocationToFlags(loc.country, loc.state, loc.city);
  const avatar = extractProfileAvatar(part?.user);
  const pronouns = String(part?.user?.genderPronoun || '').trim();
  const handle = extractTwitterHandle(part?.user);
  const initialSeed = cleanSeedNum(entrant.initialSeedNum);
  const phaseSeed = cleanSeedNum(explicitPhaseSeed);
  const seed = initialSeed ?? phaseSeed;

  // Optional 2v2 Doubles / Team teammate (Start.gg returns 2 participants on team entrants!)
  let partnerName = '';
  let partnerSponsor = '';
  let partnerFlag = '';
  let partnerRegion = '';
  let partnerPronouns = '';
  if (parts.length > 1 && parts[1]) {
    const p2 = parts[1];
    const sp2 = splitSponsorAndName(p2.gamerTag || '', p2.prefix);
    const loc2 = p2.user?.location || {};
    const fl2 = mapLocationToFlags(loc2.country, loc2.state, loc2.city);
    partnerName = sp2.name;
    partnerSponsor = sp2.sponsor;
    partnerFlag = fl2.flag;
    partnerRegion = fl2.region;
    partnerPronouns = String(p2.user?.genderPronoun || '').trim();
  }

  return {
    entrantId: entrant.id != null ? String(entrant.id) : null,
    name,
    sponsor,
    flag,
    region,
    avatar,
    pronouns,
    handle,
    seed,
    initialSeed,
    phaseSeed,
    partnerName,
    partnerSponsor,
    partnerFlag,
    partnerRegion,
    partnerPronouns
  };
}

function normalizeStartGGSlot(slot) {
  const info = normalizeEntrantInfo(slot?.entrant, slot?.seed?.seedNum);
  if (!info) return null;
  const scoreVal = slot?.standing?.stats?.score?.value;
  return {
    ...info,
    prereqId: slot?.prereqId != null ? String(slot.prereqId) : null,
    prereqType: slot?.prereqType || null,
    score: (typeof scoreVal === 'number' && scoreVal >= 0) ? scoreVal : 0
  };
}

function normalizeStartGGSet(s, streamNameOverride = '') {
  const p1 = normalizeStartGGSlot(s.slots?.[0]);
  const p2 = normalizeStartGGSlot(s.slots?.[1]);
  const roundText = s.fullRoundText || (s.round < 0 ? `Losers Round ${Math.abs(s.round)}` : `Winners Round ${s.round || 1}`);
  const { p1Bracket, p2Bracket } = inferBracketBadges(roundText, s.round);
  // Start.gg states: 1=Created/Open, 2=Active/In Progress, 3=Completed, 6=Called
  const stateMap = { 1: 'open', 2: 'active', 3: 'complete', 6: 'called' };
  const st = stateMap[s.state] || 'open';
  const winnerId = s.winnerId ? String(s.winnerId) : null;
  const p1Obj = p1
    ? { ...p1, bracket: p1Bracket }
    : { entrantId: null, name: 'TBD', sponsor: '', flag: '', region: '', pronouns: '', handle: '', seed: null, initialSeed: null, phaseSeed: null, prereqId: s.slots?.[0]?.prereqId ? String(s.slots[0].prereqId) : null, prereqType: s.slots?.[0]?.prereqType || null, score: 0, bracket: p1Bracket };
  const p2Obj = p2
    ? { ...p2, bracket: p2Bracket }
    : { entrantId: null, name: 'TBD', sponsor: '', flag: '', region: '', pronouns: '', handle: '', seed: null, initialSeed: null, phaseSeed: null, prereqId: s.slots?.[1]?.prereqId ? String(s.slots[1].prereqId) : null, prereqType: s.slots?.[1]?.prereqType || null, score: 0, bracket: p2Bracket };
  const winnerSide = winnerId && p1Obj.entrantId && winnerId === String(p1Obj.entrantId)
    ? 'p1'
    : (winnerId && p2Obj.entrantId && winnerId === String(p2Obj.entrantId) ? 'p2' : null);
  return {
    id: String(s.id),
    provider: 'startgg',
    roundText: roundText.toUpperCase(),
    roundNum: s.round || 0,
    phaseName: s.phaseGroup?.phase?.name || '',
    phaseId: s.phaseGroup?.phase?.id ? String(s.phaseGroup.phase.id) : null,
    state: st,
    winnerId,
    streamName: streamNameOverride || s.stream?.streamName || '',
    upset: st === 'complete' ? computeUpsetInfo(p1Obj.seed, p2Obj.seed, winnerSide) : null,
    p1: p1Obj,
    p2: p2Obj
  };
}

function enrichSetsWithSeeds(sets, seedsList) {
  if (!Array.isArray(sets) || !Array.isArray(seedsList) || !seedsList.length) return sets;
  const byEntrantId = new Map();
  const byName = new Map();
  for (const row of seedsList) {
    if (row.entrantId) byEntrantId.set(String(row.entrantId), row);
    if (row.name) byName.set(norm(row.name), row);
  }
  const patchSlot = (slot) => {
    if (!slot || !slot.name || slot.name === 'TBD') return slot;
    const ref = (slot.entrantId && byEntrantId.get(String(slot.entrantId))) || byName.get(norm(slot.name));
    if (!ref) return slot;
    const initialSeed = slot.initialSeed ?? ref.initialSeed ?? null;
    const phaseSeed = slot.phaseSeed ?? ref.phaseSeed ?? null;
    return {
      ...slot,
      initialSeed,
      phaseSeed,
      seed: initialSeed ?? phaseSeed ?? slot.seed ?? null,
      pronouns: slot.pronouns || ref.pronouns || '',
      handle: slot.handle || ref.handle || '',
      flag: slot.flag || ref.flag || '',
      region: slot.region || ref.region || '',
      avatar: slot.avatar || ref.avatar || ''
    };
  };
  return sets.map(s => {
    const p1 = patchSlot(s.p1);
    const p2 = patchSlot(s.p2);
    const winnerSide = s.winnerId && p1?.entrantId && String(s.winnerId) === String(p1.entrantId)
      ? 'p1'
      : (s.winnerId && p2?.entrantId && String(s.winnerId) === String(p2.entrantId) ? 'p2' : null);
    return {
      ...s,
      p1,
      p2,
      upset: s.state === 'complete' ? computeUpsetInfo(p1?.seed, p2?.seed, winnerSide) : null
    };
  });
}

export async function connectStartGG(urlOrSlug, token) {
  const { tournamentSlug, eventSlug } = parseStartGGUrl(urlOrSlug);
  if (!tournamentSlug) throw new Error('Invalid start.gg URL or slug. Example: https://www.start.gg/tournament/my-tournament');

  // 1. Ultra-lightweight metadata + events + tournament logo query (~35 objects, never hits 1000-object limit)
  const metaQuery = `
    query ConnectTournamentMeta($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
        city
        countryCode
        images {
          url
          type
        }
        events {
          id
          name
          slug
          numEntrants
          videogame { name }
          phases {
            id
            name
            numSeeds
            phaseOrder
          }
        }
      }
    }`;

  const data = await startggQuery(token, metaQuery, { slug: tournamentSlug });
  const t = data?.tournament;
  if (!t) throw new Error(`Tournament "${tournamentSlug}" was not found on start.gg.`);
  const { logoUrl, bannerUrl } = extractTournamentImages(t);

  const events = (t.events || []).map(ev => ({
    id: String(ev.id),
    name: ev.name,
    slug: ev.slug,
    numEntrants: ev.numEntrants || 0,
    game: ev.videogame?.name || '',
    phases: (ev.phases || [])
      .map(ph => ({ id: String(ph.id), name: ph.name || 'Bracket', numSeeds: Number(ph.numSeeds || 0), phaseOrder: Number(ph.phaseOrder || 0) }))
      .sort((a, b) => a.phaseOrder - b.phaseOrder)
  }));

  // Pick matched event from URL, else Tekken/SF6/2XKO/Smash/FGC event, else first event
  let selectedEvent = events.find(e => eventSlug && e.slug.toLowerCase() === eventSlug.toLowerCase());
  if (!selectedEvent) selectedEvent = events.find(e => /tekken|street fighter|2xko|smash|fatal fury|mortal kombat/i.test(`${e.name} ${e.game}`));
  if (!selectedEvent) selectedEvent = events[0] || null;

  // 2. Separate Stream Queue query (with automatic low-complexity fallback for huge majors)
  let streamSets = await fetchStartGGStreamQueue(tournamentSlug, token, selectedEvent?.id);

  // 3. Paginated Event Sets + Phase Seeding (strictly <500 objects per request, cached 20s)
  let sets = [];
  let seeding = { phases: selectedEvent?.phases || [], selectedPhaseId: null, seedingAvailable: false, seeds: [] };
  if (selectedEvent) {
    sets = await fetchStartGGEventSets(selectedEvent.id, token);
    try {
      seeding = await fetchStartGGEventSeeds(selectedEvent.id, token, null, selectedEvent.phases);
    } catch {
      seeding = { phases: selectedEvent.phases || [], selectedPhaseId: selectedEvent.phases?.[0]?.id || null, seedingAvailable: false, seeds: [] };
    }
    if (seeding.seeds.length) {
      sets = enrichSetsWithSeeds(sets, seeding.seeds);
      streamSets = enrichSetsWithSeeds(streamSets, seeding.seeds);
    }
  }

  return {
    provider: 'startgg',
    tournament: {
      id: String(t.id),
      name: t.name,
      slug: t.slug,
      location: [t.city, t.countryCode].filter(Boolean).join(', '),
      logoUrl,
      bannerUrl
    },
    events,
    selectedEventId: selectedEvent?.id || null,
    phases: seeding.phases,
    selectedPhaseId: seeding.selectedPhaseId,
    seedingAvailable: seeding.seedingAvailable,
    seeds: seeding.seeds,
    streamQueue: streamSets,
    sets
  };
}

export async function fetchStartGGTournamentLogo(urlOrSlug, token) {
  const { tournamentSlug } = parseStartGGUrl(urlOrSlug);
  if (!tournamentSlug) throw new Error('Enter a valid start.gg tournament URL or slug first.');
  const q = `
    query TournamentLogoOnly($slug: String!) {
      tournament(slug: $slug) {
        id
        name
        slug
        images { url type }
      }
    }`;
  const data = await startggQuery(token, q, { slug: tournamentSlug });
  const t = data?.tournament;
  if (!t) throw new Error(`Tournament "${tournamentSlug}" not found on start.gg.`);
  const { logoUrl, bannerUrl } = extractTournamentImages(t);
  return { name: t.name, slug: t.slug, logoUrl, bannerUrl };
}

async function fetchStartGGStreamQueue(tournamentSlug, token, preferredEventId) {
  const fullQuery = `
    query TournamentStreamQueue($slug: String!) {
      tournament(slug: $slug) {
        streamQueue {
          stream { streamName }
          sets {
            id
            state
            round
            fullRoundText
            winnerId
            event { id name }
            slots {
              prereqId
              prereqType
              seed { id seedNum }
              standing { stats { score { value } } }
              entrant {
                id
                name
                initialSeedNum
                participants {
                  gamerTag
                  prefix
                  user {
                    genderPronoun
                    location { country state city }
                    images(type: "profile") { url type }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const slimQuery = `
    query TournamentStreamQueueSlim($slug: String!) {
      tournament(slug: $slug) {
        streamQueue {
          stream { streamName }
          sets {
            id
            state
            round
            fullRoundText
            winnerId
            event { id name }
            slots {
              prereqId
              prereqType
              seed { seedNum }
              standing { stats { score { value } } }
              entrant {
                id
                name
                initialSeedNum
                participants { gamerTag prefix }
              }
            }
          }
        }
      }
    }`;

  let sqData = null;
  try {
    sqData = await startggQuery(token, fullQuery, { slug: tournamentSlug });
  } catch (err) {
    if (/complexity/i.test(err.message)) {
      sqData = await startggQuery(token, slimQuery, { slug: tournamentSlug });
    } else {
      throw err;
    }
  }

  const streamSets = [];
  for (const q of (sqData?.tournament?.streamQueue || [])) {
    const sName = q.stream?.streamName || 'Stream';
    for (const s of (q.sets || [])) {
      const evId = s.event?.id ? String(s.event.id) : null;
      const normSet = normalizeStartGGSet(s, sName);
      normSet.eventId = evId;
      streamSets.push(normSet);
    }
  }

  // If the tournament has multiple games on streamQueue, keep selected event sets first (or only them if present)
  if (preferredEventId) {
    const matching = streamSets.filter(s => s.eventId === String(preferredEventId));
    if (matching.length > 0) return matching;
  }
  return streamSets;
}

export async function fetchStartGGEventSets(eventId, token) {
  const buildQuery = (includeLocation) => `
    query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        id
        sets(page: $page, perPage: $perPage, sortType: MAGIC) {
          pageInfo { totalPages }
          nodes {
            id
            state
            round
            fullRoundText
            winnerId
            stream { streamName }
            phaseGroup { phase { id name } }
            slots {
              prereqId
              prereqType
              seed { id seedNum }
              standing { stats { score { value } } }
              entrant {
                id
                name
                initialSeedNum
                participants {
                  gamerTag
                  prefix
                  ${includeLocation ? 'user { genderPronoun location { country state city } images(type: "profile") { url type } }' : ''}
                }
              }
            }
          }
        }
      }
    }`;

  // Fetch up to 2 pages x 20 sets (= 40 sets), keeping every single GraphQL request ~380 objects (<1000 max!)
  const fetchPage = async (page, perPage, includeLocation) => {
    try {
      return await startggQuery(token, buildQuery(includeLocation), { eventId, page, perPage });
    } catch (err) {
      if (/complexity/i.test(err.message)) {
        if (perPage > 10) return fetchPage(page, 10, includeLocation);
        if (includeLocation) return fetchPage(page, 15, false);
      }
      throw err;
    }
  };

  const allNodes = [];
  for (let page = 1; page <= 2; page++) {
    const data = await fetchPage(page, 20, true);
    const conn = data?.event?.sets;
    const nodes = conn?.nodes || [];
    allNodes.push(...nodes);
    if (!conn?.pageInfo?.totalPages || page >= conn.pageInfo.totalPages) break;
  }

  return allNodes
    .filter(s => s.slots?.some(sl => sl?.entrant))
    .map(s => normalizeStartGGSet(s));
}

export async function fetchStartGGEventSeeds(eventId, token, phaseId = null, knownPhases = null, forceRefresh = false) {
  if (!eventId) throw new Error('Connect a start.gg event first.');
  const cacheKey = `startgg:${eventId}:${phaseId || 'auto'}`;
  if (!forceRefresh) {
    const cached = getCachedSeeds(cacheKey);
    if (cached) return cached;
  }

  let phases = Array.isArray(knownPhases) && knownPhases.length ? knownPhases : null;
  if (!phases) {
    const phQuery = `
      query EventPhases($eventId: ID!) {
        event(id: $eventId) {
          id
          name
          phases {
            id
            name
            numSeeds
            phaseOrder
          }
        }
      }`;
    const phData = await startggQuery(token, phQuery, { eventId });
    phases = (phData?.event?.phases || [])
      .map(ph => ({ id: String(ph.id), name: ph.name || 'Bracket', numSeeds: Number(ph.numSeeds || 0), phaseOrder: Number(ph.phaseOrder || 0) }))
      .sort((a, b) => a.phaseOrder - b.phaseOrder);
  }

  const chosenPhase = (phaseId && phases.find(p => String(p.id) === String(phaseId)))
    || phases.find(p => p.numSeeds > 0)
    || phases[0]
    || null;

  if (!chosenPhase) {
    const emptyRes = { phases, selectedPhaseId: null, seedingAvailable: false, seeds: [] };
    setCachedSeeds(cacheKey, emptyRes);
    return emptyRes;
  }

  const buildSeedsQuery = (includeUserDetails) => `
    query PhaseSeeds($phaseId: ID!, $page: Int!, $perPage: Int!) {
      phase(id: $phaseId) {
        id
        name
        numSeeds
        seeds(query: { page: $page, perPage: $perPage }) {
          pageInfo { totalPages }
          nodes {
            id
            seedNum
            entrant {
              id
              name
              initialSeedNum
              participants {
                id
                gamerTag
                prefix
                ${includeUserDetails ? 'user { genderPronoun location { country state city } images(type: "profile") { url type } authorizations(types: [TWITTER]) { externalUsername } }' : ''}
              }
            }
          }
        }
      }
    }`;

  const fetchSeedPage = async (page, perPage, includeUserDetails) => {
    try {
      return await startggQuery(token, buildSeedsQuery(includeUserDetails), { phaseId: chosenPhase.id, page, perPage });
    } catch (err) {
      if (/complexity/i.test(err.message)) {
        if (perPage > 20) return fetchSeedPage(page, 20, includeUserDetails);
        if (includeUserDetails) return fetchSeedPage(page, 40, false);
      }
      throw err;
    }
  };

  const seeds = [];
  for (let page = 1; page <= 5; page++) {
    const data = await fetchSeedPage(page, 40, true);
    const conn = data?.phase?.seeds;
    const nodes = conn?.nodes || [];
    for (const node of nodes) {
      const info = normalizeEntrantInfo(node?.entrant, node?.seedNum);
      if (info && info.name && info.name !== 'TBD') {
        seeds.push({
          ...info,
          phaseId: chosenPhase.id,
          phaseName: chosenPhase.name
        });
      }
    }
    if (!conn?.pageInfo?.totalPages || page >= conn.pageInfo.totalPages) break;
  }

  seeds.sort((a, b) => {
    const sa = a.phaseSeed ?? a.initialSeed ?? 99999;
    const sb = b.phaseSeed ?? b.initialSeed ?? 99999;
    return sa - sb;
  });

  const seedingAvailable = seeds.some(s => Boolean(s.initialSeed || s.phaseSeed));
  const out = {
    phases,
    selectedPhaseId: chosenPhase.id,
    seedingAvailable,
    seeds
  };
  setCachedSeeds(cacheKey, out);
  return out;
}

export async function fetchStartGGEntrants(eventId, token) {
  const buildQuery = (includeLocation) => `
    query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        entrants(query: { page: $page, perPage: $perPage }) {
          pageInfo { totalPages }
          nodes {
            id
            name
            initialSeedNum
            participants {
              gamerTag
              prefix
              ${includeLocation ? 'user { genderPronoun location { country state city } images(type: "profile") { url type } authorizations(types: [TWITTER]) { externalUsername } }' : ''}
            }
          }
        }
      }
    }`;

  const fetchPage = async (page, perPage, includeLocation) => {
    try {
      return await startggQuery(token, buildQuery(includeLocation), { eventId, page, perPage });
    } catch (err) {
      if (/complexity/i.test(err.message)) {
        if (perPage > 20) return fetchPage(page, 20, includeLocation);
        if (includeLocation) return fetchPage(page, 30, false);
      }
      throw err;
    }
  };

  const results = [];
  for (let page = 1; page <= 5; page++) {
    const data = await fetchPage(page, 45, true);
    const conn = data?.event?.entrants;
    const nodes = conn?.nodes || [];
    for (const ent of nodes) {
      const info = normalizeEntrantInfo(ent);
      if (info?.name) {
        results.push({
          name: info.name,
          sponsor: info.sponsor,
          flag: info.flag,
          region: info.region,
          avatar: info.avatar,
          pronouns: info.pronouns,
          handle: info.handle,
          seed: info.initialSeed ?? null,
          character: ''
        });
      }
    }
    if (!conn?.pageInfo?.totalPages || page >= conn.pageInfo.totalPages) break;
  }
  return results;
}

export async function fetchStartGGStandings(eventId, token) {
  if (!eventId) throw new Error('Connect a start.gg event first.');
  const q = `
    query EventStandings($eventId: ID!) {
      event(id: $eventId) {
        id
        name
        state
        numEntrants
        videogame { name }
        tournament {
          name
          slug
          city
          countryCode
          images { url type }
        }
        standings(query: { perPage: 12, page: 1 }) {
          nodes {
            placement
            entrant {
              id
              name
              initialSeedNum
              participants {
                gamerTag
                prefix
                user {
                  genderPronoun
                  location { country state city }
                  images(type: "profile") { url type }
                  authorizations(types: [TWITTER]) { externalUsername }
                }
              }
            }
          }
        }
      }
    }`;
  const data = await startggQuery(token, q, { eventId });
  const ev = data?.event;
  if (!ev) throw new Error('Event standings not found on start.gg.');
  const t = ev.tournament || {};
  const { logoUrl } = extractTournamentImages(t);
  const nodes = ev.standings?.nodes || [];
  const rawState = String(ev.state || '').toUpperCase();
  const isCompleted = rawState === 'COMPLETED';
  const status = isCompleted ? 'completed' : (rawState === 'ACTIVE' || nodes.length > 0 ? 'live' : 'upcoming');
  const placements = nodes.slice(0, 12).map((n, idx) => {
    const ent = n.entrant || {};
    const p = ent.participants?.[0];
    const { sponsor, name } = splitSponsorAndName(p?.gamerTag || ent.name || `Player ${idx + 1}`, p?.prefix);
    const loc = p?.user?.location || {};
    const { flag, region } = mapLocationToFlags(loc.country, loc.state, loc.city);
    const avatar = extractProfileAvatar(p?.user);
    const tw = p?.user?.authorizations?.[0]?.externalUsername || '';
    const initialSeed = cleanSeedNum(ent.initialSeedNum);
    return {
      place: Number(n.placement || (idx + 1)),
      name,
      sponsor,
      flag,
      region,
      seed: initialSeed,
      initialSeed,
      character: '',
      avatar,
      handle: tw ? `@${String(tw).replace(/^@/, '')}` : ''
    };
  });
  return {
    provider: 'startgg',
    tournamentName: t.name || ev.name || 'Tournament',
    tournamentSlug: t.slug || '',
    eventName: ev.name || '',
    gameName: ev.videogame?.name || '',
    entrantsCount: Number(ev.numEntrants || 0),
    location: [t.city, t.countryCode].filter(Boolean).join(', '),
    logoUrl,
    status,
    isCompleted,
    placements
  };
}

export async function reportStartGGSet({ setId, winnerEntrantId, p1EntrantId, p2EntrantId, p1Score, p2Score, token }) {
  if (!setId || !winnerEntrantId) throw new Error('Missing setId or winnerEntrantId for start.gg report.');
  const s1 = Math.max(0, Number(p1Score || 0));
  const s2 = Math.max(0, Number(p2Score || 0));

  // Build game-by-game records so start.gg records the exact score (e.g., 3-1)
  const gameData = [];
  let gameNum = 1;
  const winnerIsP1 = String(winnerEntrantId) === String(p1EntrantId);
  const loserId = winnerIsP1 ? p2EntrantId : p1EntrantId;
  const loserWins = winnerIsP1 ? s2 : s1;
  const winnerWins = winnerIsP1 ? s1 : s2;

  for (let i = 0; i < loserWins; i++) {
    if (loserId) gameData.push({ winnerId: loserId, gameNum: gameNum++ });
  }
  for (let i = 0; i < Math.max(1, winnerWins); i++) {
    gameData.push({ winnerId: winnerEntrantId, gameNum: gameNum++ });
  }

  const mutation = `
    mutation ReportSet($setId: ID!, $winnerId: ID!, $gameData: [BracketSetGameDataInput]) {
      reportBracketSet(setId: $setId, winnerId: $winnerId, gameData: $gameData) {
        id
        state
      }
    }`;

  const data = await startggQuery(token, mutation, {
    setId,
    winnerId: winnerEntrantId,
    gameData
  });
  return { ok: true, result: data?.reportBracketSet };
}

/* =========================================================================
   CHALLONGE REST API V1 CLIENT
   ========================================================================= */
function mapChallongeRoundName(round, maxWinRound, minLosRound, totalMatchesAtMax) {
  if (round > 0) {
    if (round === maxWinRound) return totalMatchesAtMax > 1 ? 'GRAND FINALS' : 'GRAND FINALS';
    if (round === maxWinRound - 1) return 'WINNERS FINALS';
    if (round === maxWinRound - 2) return 'WINNERS SEMIS';
    return `WINNERS ROUND ${round}`;
  }
  if (round < 0) {
    if (round === minLosRound) return 'LOSERS FINALS';
    if (round === minLosRound + 1) return 'LOSERS SEMIS';
    return `LOSERS ROUND ${Math.abs(round)}`;
  }
  return 'POOLS';
}

function parseChallongeScores(scoresCsv) {
  const raw = String(scoresCsv || '').trim();
  if (!raw) return [0, 0];
  const first = raw.split(',')[0].trim();
  const m = first.match(/^(-?\d+)\s*-\s*(-?\d+)$/);
  if (!m) return [0, 0];
  return [Math.max(0, parseInt(m[1], 10)), Math.max(0, parseInt(m[2], 10))];
}

export async function connectChallonge(urlOrSlug, apiKey) {
  const { slug } = parseChallongeUrl(urlOrSlug);
  if (!slug) throw new Error('Invalid Challonge URL or slug. Example: https://challonge.com/my_tournament');
  if (!apiKey || !String(apiKey).trim()) {
    throw new Error('Please paste your free Challonge API key (challonge.com/settings/developer).');
  }

  const url = `${CHALLONGE_BASE}/tournaments/${encodeURIComponent(slug)}.json?api_key=${encodeURIComponent(String(apiKey).trim())}&include_participants=1&include_matches=1`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(12000) });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errMsg = Array.isArray(json?.errors) ? json.errors.join(' · ') : res.statusText;
    throw new Error(`Challonge HTTP ${res.status}: ${errMsg}`);
  }

  const t = json?.tournament;
  if (!t) throw new Error('Unexpected response from Challonge.');

  const participantsById = new Map();
  const participantsList = [];
  for (const wrap of (t.participants || [])) {
    const p = wrap.participant || wrap;
    const { sponsor, name } = splitSponsorAndName(p.display_name || p.name || p.username || 'Player');
    const sNum = cleanSeedNum(p.seed);
    const info = {
      entrantId: String(p.id),
      name,
      sponsor,
      flag: '',
      region: '',
      pronouns: '',
      handle: p.challonge_username ? `@${p.challonge_username}` : '',
      seed: sNum,
      initialSeed: sNum,
      phaseSeed: sNum,
      character: ''
    };
    participantsById.set(String(p.id), info);
    if (name) participantsList.push(info);
  }

  const rawMatches = (t.matches || []).map(w => w.match || w);
  const winRounds = rawMatches.map(m => m.round).filter(r => r > 0);
  const losRounds = rawMatches.map(m => m.round).filter(r => r < 0);
  const maxWin = winRounds.length ? Math.max(...winRounds) : 1;
  const minLos = losRounds.length ? Math.min(...losRounds) : -1;
  const maxRoundCount = rawMatches.filter(m => m.round === maxWin).length;

  let gfSeen = 0;
  const sets = rawMatches
    .filter(m => m.player1_id || m.player2_id)
    .map(m => {
      let roundText = mapChallongeRoundName(m.round, maxWin, minLos, maxRoundCount);
      if (m.round === maxWin && maxRoundCount > 1) {
        gfSeen++;
        if (gfSeen === 2) roundText = 'GRAND FINALS RESET';
      }
      const [s1, s2] = parseChallongeScores(m.scores_csv);
      const { p1Bracket, p2Bracket } = inferBracketBadges(roundText, m.round);
      const p1Info = participantsById.get(String(m.player1_id)) || { entrantId: null, name: 'TBD', sponsor: '', flag: '', region: '', seed: null, initialSeed: null, phaseSeed: null };
      const p2Info = participantsById.get(String(m.player2_id)) || { entrantId: null, name: 'TBD', sponsor: '', flag: '', region: '', seed: null, initialSeed: null, phaseSeed: null };
      const st = m.state === 'complete' ? 'complete' : (m.underway_at ? 'active' : (m.state === 'open' ? 'open' : 'pending'));
      const winnerId = m.winner_id ? String(m.winner_id) : null;
      const winnerSide = winnerId && p1Info.entrantId && winnerId === String(p1Info.entrantId)
        ? 'p1'
        : (winnerId && p2Info.entrantId && winnerId === String(p2Info.entrantId) ? 'p2' : null);

      return {
        id: String(m.id),
        provider: 'challonge',
        roundText,
        roundNum: m.round || 0,
        state: st,
        winnerId,
        streamName: m.underway_at ? 'Live' : '',
        upset: st === 'complete' ? computeUpsetInfo(p1Info.seed, p2Info.seed, winnerSide) : null,
        p1: { ...p1Info, prereqId: m.player1_prereq_match_id ? String(m.player1_prereq_match_id) : null, score: s1, bracket: p1Bracket },
        p2: { ...p2Info, prereqId: m.player2_prereq_match_id ? String(m.player2_prereq_match_id) : null, score: s2, bracket: p2Bracket }
      };
    });

  const seedsSorted = [...participantsList].sort((a, b) => (a.seed ?? 99999) - (b.seed ?? 99999));
  const seedingAvailable = seedsSorted.some(p => Boolean(p.seed));
  const phases = [{ id: 'main', name: 'Main Bracket', numSeeds: seedsSorted.length, phaseOrder: 1 }];
  const challongeLogo = String(t.organization_logo_url || t.logo_url || t.avatar_url || t.image_url || '').trim();

  return {
    provider: 'challonge',
    tournament: {
      id: String(t.id),
      name: t.name,
      slug,
      location: t.game_name || 'Challonge',
      logoUrl: challongeLogo
    },
    events: [{ id: slug, name: t.game_name || t.name, slug, numEntrants: participantsList.length, game: t.game_name || '', phases }],
    selectedEventId: slug,
    phases,
    selectedPhaseId: 'main',
    seedingAvailable,
    seeds: seedsSorted,
    streamQueue: sets.filter(s => s.state === 'active' || s.state === 'open').slice(0, 6),
    sets,
    participants: participantsList
  };
}

export async function fetchChallongeTournamentLogo(urlOrSlug, apiKey) {
  const { slug } = parseChallongeUrl(urlOrSlug);
  if (!slug) throw new Error('Enter a valid Challonge tournament URL or slug first.');
  if (!apiKey || !String(apiKey).trim()) throw new Error('Missing Challonge API key.');
  const url = `${CHALLONGE_BASE}/tournaments/${encodeURIComponent(slug)}.json?api_key=${encodeURIComponent(String(apiKey).trim())}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.tournament) throw new Error(`Challonge HTTP ${res.status}`);
  const t = json.tournament;
  const logoUrl = String(t.organization_logo_url || t.logo_url || t.avatar_url || t.image_url || '').trim();
  return { name: t.name, slug, logoUrl };
}

export async function fetchChallongeStandings(urlOrSlug, apiKey) {
  const { slug } = parseChallongeUrl(urlOrSlug);
  if (!slug) throw new Error('Enter a valid Challonge tournament URL or slug first.');
  if (!apiKey || !String(apiKey).trim()) throw new Error('Missing Challonge API key.');
  const url = `${CHALLONGE_BASE}/tournaments/${encodeURIComponent(slug)}.json?api_key=${encodeURIComponent(String(apiKey).trim())}&include_participants=1&include_matches=1`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.tournament) throw new Error(`Challonge HTTP ${res.status}`);
  const t = json.tournament;
  const parts = (t.participants || []).map(w => w.participant || w);
  const matches = (t.matches || []).map(w => w.match || w);
  const winsById = new Map();
  for (const m of matches) {
    if (m.winner_id) winsById.set(String(m.winner_id), (winsById.get(String(m.winner_id)) || 0) + 1);
  }
  const tState = String(t.state || '').toLowerCase();
  const isCompleted = tState === 'complete' || tState === 'awaiting_review';
  const status = isCompleted ? 'completed' : (tState === 'underway' || winsById.size > 0 ? 'live' : 'upcoming');

  const ranked = parts
    .filter(p => p.final_rank != null || p.seed != null)
    .sort((a, b) => {
      const ra = a.final_rank ?? 999;
      const rb = b.final_rank ?? 999;
      if (ra !== rb) return ra - rb;
      const wa = winsById.get(String(a.id)) || 0;
      const wb = winsById.get(String(b.id)) || 0;
      if (wa !== wb) return wb - wa;
      return (a.seed ?? 999) - (b.seed ?? 999);
    })
    .slice(0, 12);
  const placements = ranked.map((p, idx) => {
    const { sponsor, name } = splitSponsorAndName(p.display_name || p.name || p.username || `Player ${idx + 1}`);
    const sNum = cleanSeedNum(p.seed);
    return {
      place: Number(p.final_rank || [1, 2, 3, 4, 5, 5, 7, 7, 9, 9, 9, 9][idx] || (idx + 1)),
      name,
      sponsor,
      flag: '',
      region: '',
      seed: sNum,
      initialSeed: sNum,
      character: '',
      avatar: '',
      handle: p.challonge_username ? `@${p.challonge_username}` : ''
    };
  });
  return {
    provider: 'challonge',
    tournamentName: t.name || slug,
    tournamentSlug: slug,
    eventName: t.game_name || t.name || '',
    gameName: t.game_name || '',
    entrantsCount: parts.length,
    location: 'Challonge',
    logoUrl: String(t.organization_logo_url || t.logo_url || t.avatar_url || t.image_url || '').trim(),
    status,
    isCompleted,
    placements
  };
}

export async function reportChallongeMatch({ tournamentSlug, matchId, winnerEntrantId, p1Score, p2Score, apiKey, liveOnly = false }) {
  if (!tournamentSlug || !matchId) throw new Error('Missing Challonge tournament slug or matchId.');
  if (!apiKey || !String(apiKey).trim()) throw new Error('Missing Challonge API key.');

  const scoresCsv = `${Math.max(0, Number(p1Score || 0))}-${Math.max(0, Number(p2Score || 0))}`;
  const params = new URLSearchParams();
  params.set('api_key', String(apiKey).trim());
  params.set('match[scores_csv]', scoresCsv);
  if (!liveOnly && winnerEntrantId) {
    params.set('match[winner_id]', String(winnerEntrantId));
  }

  const url = `${CHALLONGE_BASE}/tournaments/${encodeURIComponent(tournamentSlug)}/matches/${encodeURIComponent(matchId)}.json`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: params.toString(),
    signal: AbortSignal.timeout(12000)
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errMsg = Array.isArray(json?.errors) ? json.errors.join(' · ') : res.statusText;
    throw new Error(`Challonge HTTP ${res.status}: ${errMsg}`);
  }
  return { ok: true, match: json?.match };
}

/* =========================================================================
   OFFLINE DEMO TOURNAMENT — 64 ENTRANTS · MULTI-GAME CONFIGURATIONS
   Lets TOs test Start.gg/Challonge workflows across Tekken 8, SSBU, SF6, GGST,
   2XKO, Fatal Fury CotW, MK1, GBVSR, DBFZ, UNI2, UMvC3, DNF Duel & Avatar!
   ========================================================================= */
export const DEMO_GAME_CONFIGS = {
  tekken8: {
    id: 'tekken8',
    name: 'Tekken 8',
    eventName: 'Tekken 8 Singles',
    chars: [
      'Jin Kazama', 'Kazuya Mishima', 'Reina', 'Jun Kazama', 'Bryan Fury', 'Sergei Dragunov', 'Victor', 'King II',
      'Lee Chaolan', 'Emilie "Lili" de Rochefort', 'Steve Fox', 'Eddy', 'Raven', 'Lars Alexandersson', 'Hwoarang', 'Ling Xiaoyu',
      'Nina Williams', 'Paul Phoenix', 'Marshall Law', 'Heihachi', 'Devil Jin', 'Asuka Kazama', 'Alisa', 'Feng Wei',
      'Claudio Serafino', 'Yoshimitsu', 'Leroy Smith', 'Lidia', 'Azucena Milagros Ortiz Castillo', 'Jack-8', 'Shaheen', 'Leo Kliesen',
      'Zafina', 'Anna', 'Armor King', 'Kuma II', 'Panda', 'Fahkumram', 'Clive'
    ]
  },
  ssbu: {
    id: 'ssbu',
    name: 'Super Smash Bros. Ultimate',
    eventName: 'Super Smash Bros. Ultimate Singles',
    chars: [
      'Steve', 'Sonic', 'Kazuya', 'Pyra / Mythra', 'Cloud', 'Fox', 'Joker', 'Pikachu',
      'Mario', 'Sora', 'Dark Samus', 'Captain Falcon', 'Roy', 'Bayonetta', 'R.O.B.', 'Snake',
      'Wolf', 'Palutena', 'Falco', 'Samus', 'Link', 'Diddy Kong', 'Peach', 'Donkey Kong',
      'Kirby', 'Ness', 'Luigi', 'Shulk', 'Terry', 'Sephiroth', 'Byleth', 'Min Min',
      'Mr. Game & Watch', 'Pac-Man', 'Lucina', 'Chrom', 'Ryu', 'Ken', 'Hero', 'Banjo & Kazooie',
      'Wario', 'Greninja', 'Zero Suit Samus', 'Inkling', 'Bowser', 'Yoshi', 'Marth', 'Mewtwo',
      'Sheik', 'Zelda', 'Ganondorf', 'King Dedede', 'Olimar', 'Lucario', 'Mega Man', 'Meta Knight',
      'Pit', 'Dark Pit', 'Ike', 'Pokémon Trainer', 'Corrin', 'Ridley', 'King K. Rool', 'Incineroar'
    ]
  },
  sf6: {
    id: 'sf6',
    name: 'Street Fighter 6',
    eventName: 'Street Fighter 6 Singles',
    chars: [
      'Ken', 'Akuma', 'Ryu', 'Chun-Li', 'Luke', 'Cammy', 'Rashid', 'Juri',
      'Guile', 'Ed', 'Zangief', 'Dee Jay', 'Marisa', 'JP', 'Jamie', 'Kimberly',
      'Blanka', 'E. Honda', 'Dhalsim', 'Lily', 'Manon', 'A.K.I.', 'M. Bison', 'Terry',
      'Mai', 'Elena', 'Sagat', 'Ingrid'
    ]
  },
  ggst: {
    id: 'ggst',
    name: 'Guilty Gear -STRIVE-',
    eventName: 'Guilty Gear -STRIVE- Singles',
    chars: [
      'Sol Badguy', 'Ky Kiske', 'Nagoriyuki', 'Happy Chaos', 'Slayer', 'Sin Kiske', 'Ramlethal Valentine', 'May',
      'Chipp Zanuff', 'Potemkin', 'Millia Rage', 'Zato=1', 'Axl Low', 'Leo Whitefang', 'Faust', 'Giovanna',
      'Anji Mito', 'I-No', 'Goldlewis Dickinson', 'Jack-O\'', 'Baiken', 'Testament', 'Bridget', 'Bedman?',
      'Asuka R#', 'Johnny', 'Elphelt Valentine', 'A.B.A'
    ]
  },
  riotpl: {
    id: 'riotpl',
    name: '2XKO',
    eventName: '2XKO Singles',
    chars: [
      'Ahri', 'Ekko', 'Darius', 'Yasuo', 'Illaoi', 'Braum', 'Jinx', 'Vi',
      'Blitzcrank', 'Teemo', 'Warwick', 'Caitlyn', 'Akali', 'Senna', 'Thresh', 'Lux', 'Samira', 'Sett'
    ]
  },
  ffcotw: {
    id: 'ffcotw',
    name: 'Fatal Fury: City of the Wolves',
    eventName: 'Fatal Fury: CotW Singles',
    chars: [
      'Terry Bogard', 'Rock Howard', 'Hotaru Futaba', 'Tizoc', 'Preecha', 'Marco Rodrigues', 'B. Jenet', 'Kevin Rian',
      'Vox Reaper', 'Billy Kane', 'Mai Shiranui', 'Kim Dong Hwan', 'Gato', 'Kain R. Heinlein', 'Andy Bogard', 'Joe Higashi',
      'Ken Masters', 'Chun-Li', 'Hokutomaru', 'Blue Mary', 'Kim Jae Hoon', 'Mr. Big', 'Nightmare Geese', 'Wolfgang Krauser'
    ]
  },
  mk1: {
    id: 'mk1',
    name: 'Mortal Kombat 1',
    eventName: 'Mortal Kombat 1 Singles',
    chars: [
      'Liu Kang', 'Scorpion', 'Sub-Zero', 'Johnny Cage', 'Kenshi Takahashi', 'Kitana', 'Mileena', 'Raiden',
      'Kung Lao', 'Baraka', 'Reptile', 'Smoke', 'Rain', 'Li Mei', 'Tanya', 'Sindel',
      'General Shao', 'Geras', 'Havik', 'Ashrah', 'Nitara', 'Reiko', 'Shang Tsung', 'Quan Chi',
      'Ermac', 'Takeda Takahashi', 'Homelander', 'Omni-Man', 'Peacemaker'
    ]
  },
  gbvsr: {
    id: 'gbvsr',
    name: 'Granblue Fantasy Versus: Rising',
    eventName: 'GBVSR Singles',
    chars: [
      'Gran', 'Djeeta', 'Katalina', 'Charlotta', 'Lancelot', 'Percival', 'Ferry', 'Lowain',
      'Ladiva', 'Metera', 'Zeta', 'Vaseraga', 'Beelzebub', 'Narmaya', 'Soriz', 'Zooey',
      'Belial', 'Cagliostro', 'Yuel', 'Anre', 'Eustace', 'Seox', 'Vira', 'Anila',
      'Siegfried', 'Nier', 'Grimnir', '2B', 'Lucilius', 'Vane', 'Beatrix', 'Versusia'
    ]
  },
  dbfz: {
    id: 'dbfz',
    name: 'Dragon Ball FighterZ',
    eventName: 'Dragon Ball FighterZ Singles',
    chars: [
      'Goku', 'Vegeta', 'Gohan', 'Piccolo', 'Frieza', 'Cell', 'Majin Buu', 'Trunks',
      'Android 18', 'Android 16', 'Krillin', 'Tien', 'Yamcha', 'Beerus', 'Hit', 'Goku Black',
      'Broly', 'Bardock', 'Vegito', 'Zamasu', 'Cooler', 'Gogeta', 'Janemba', 'Jiren'
    ]
  },
  uni2: {
    id: 'uni2',
    name: 'Under Night In-Birth II [Sys:Celes]',
    eventName: 'UNI2 Singles',
    chars: [
      'Hyde', 'Linne', 'Waldstein', 'Carmine', 'Orie', 'Gordeau', 'Merkava', 'Vatista',
      'Seth', 'Yuzuriha', 'Hilda', 'Chaos', 'Nanase', 'Byakuya', 'Phonon', 'Mika',
      'Wagner', 'Enkidu', 'Londrekia', 'Tsurugi', 'Kaguya', 'Kuon', 'Uzuki', 'Akatsuki'
    ]
  },
  umvc3: {
    id: 'umvc3',
    name: 'Ultimate Marvel vs. Capcom 3',
    eventName: 'UMvC3 Singles',
    chars: [
      'Vergil', 'Dante', 'Zero', 'Doctor Doom', 'Magneto', 'Morrigan', 'Phoenix', 'Wolverine',
      'Wesker', 'Nova', 'Spencer', 'Strider Hiryu', 'Amaterasu', 'Akuma', 'Sentinel', 'Storm',
      'Hawkeye', 'Taskmaster', 'Haggar', 'Chun-Li', 'Ryu', 'Iron Man', 'Captain America', 'Deadpool'
    ]
  },
  dnfduel: {
    id: 'dnfduel',
    name: 'DNF Duel',
    eventName: 'DNF Duel Singles',
    chars: [
      'Berserker', 'Striker', 'Grappler', 'Inquisitor', 'Dragon Knight', 'Ranger', 'Hitman', 'Kunoichi',
      'Crusader', 'Vanguard', 'Swift Master', 'Ghostblade', 'Enchantress', 'Troubleshooter', 'Launcher', 'Lost Warrior',
      'Spectre', 'Brawler', 'Battle Mage', 'Monk', 'Nen Master'
    ]
  },
  altfg: {
    id: 'altfg',
    name: 'Avatar Legends: The Fighting Game',
    eventName: 'Avatar Legends Singles',
    chars: [
      'Aang', 'Zuko', 'Katara', 'Toph', 'Sokka', 'Azula', 'Korra', 'Iroh',
      'Kyoshi', 'Ozai', 'Zaheer', 'Ty Lee', 'Lin', 'Bolin', 'Avatar State Aang', 'Nightmare Korra'
    ]
  }
};

export function resolveDemoGameId(gameId) {
  const g = String(gameId || '').trim().toLowerCase();
  return DEMO_GAME_CONFIGS[g] ? g : 'tekken8';
}

const DEMO_PHASES = [
  { id: 'demo-ph-pools', name: 'Pools / Top 64 (64 Entrants)', numSeeds: 64, phaseOrder: 1 },
  { id: 'demo-ph-top16', name: 'Top 16 Bracket', numSeeds: 16, phaseOrder: 2 },
  { id: 'demo-ph-top8', name: 'Top 8 Finals', numSeeds: 8, phaseOrder: 3 }
];

// Core 12 seeded showcase players (preserving iconic Top 8/12 seeds + upsets!)
const DEMO_CORE_PLAYERS = [
  { entrantId: 'd1', name: 'PLAYER ALPHA', sponsor: 'TEAM A', flag: 'JP', region: '', pronouns: 'He/Him', handle: '@player_alpha', initialSeed: 1, phaseSeed: 1, charIdx: 0 },
  { entrantId: 'd2', name: 'PLAYER BRAVO', sponsor: 'TEAM B', flag: 'KR', region: '', pronouns: 'He/Him', handle: '@player_bravo', initialSeed: 2, phaseSeed: 2, charIdx: 1 },
  { entrantId: 'd3', name: 'PLAYER CHARLIE', sponsor: 'FGC', flag: 'US', region: 'US-CA', pronouns: 'They/Them', handle: '@player_charlie', initialSeed: 3, phaseSeed: 3, charIdx: 2 },
  { entrantId: 'd4', name: 'PLAYER DELTA', sponsor: 'PRO', flag: 'ES', region: 'ES-MD', pronouns: 'She/Her', handle: '@player_delta', initialSeed: 4, phaseSeed: 4, charIdx: 3 },
  { entrantId: 'd6', name: 'PLAYER FOXTROT', sponsor: 'FGC', flag: 'PK', region: '', pronouns: 'He/Him', handle: '@player_foxtrot', initialSeed: 6, phaseSeed: 6, charIdx: 5 },
  { entrantId: 'd8', name: 'PLAYER HOTEL', sponsor: 'EAST', flag: 'FR', region: 'FR-BRE', pronouns: 'He/Him', handle: '@player_hotel', initialSeed: 9, phaseSeed: 8, charIdx: 7 },
  { entrantId: 'd5', name: 'PLAYER ECHO', sponsor: 'UK', flag: 'GB', region: 'GB-SCT', pronouns: 'He/Him', handle: '@player_echo', initialSeed: 12, phaseSeed: 5, charIdx: 4 },
  { entrantId: 'd7', name: 'PLAYER GULF', sponsor: 'WEST', flag: 'US', region: 'US-NV', pronouns: 'He/Him', handle: '@player_gulf', initialSeed: 15, phaseSeed: 7, charIdx: 6 },
  { entrantId: 'd9', name: 'PLAYER INDIA', sponsor: 'BCN', flag: 'ES', region: 'ES-CT', pronouns: 'He/Him', handle: '@player_india', initialSeed: 18, phaseSeed: null, charIdx: 8 },
  { entrantId: 'd10', name: 'PLAYER JULIET', sponsor: 'MX', flag: 'MX', region: '', pronouns: 'She/Her', handle: '@player_juliet', initialSeed: 22, phaseSeed: null, charIdx: 9 },
  { entrantId: 'd11', name: 'PLAYER KILO', sponsor: 'DE', flag: 'DE', region: 'DE-BY', pronouns: 'He/Him', handle: '@player_kilo', initialSeed: 27, phaseSeed: null, charIdx: 10 },
  { entrantId: 'd12', name: 'PLAYER LIMA', sponsor: 'BR', flag: 'BR', region: '', pronouns: 'They/Them', handle: '@player_lima', initialSeed: 34, phaseSeed: null, charIdx: 11 }
];

// 52 additional realistic FGC entrants so the Offline Demo Tournament ALWAYS has a full 64-entrant bracket (seeds #1-#64!)
const DEMO_EXTRA_PROFILES = [
  ['RAVEN_X', 'FR', 'FR', ''], ['KAZE_PRO', 'DE', 'DE', ''], ['NORD_STRIKE', 'SE', 'SE', ''], ['SAKURABLAST', 'JP', 'JP', ''],
  ['VALKYRIE_ES', 'MAD', 'ES', 'ES-MD'], ['NEO_SHORYU', 'TYO', 'JP', ''], ['CRIMSON_K', 'SEO', 'KR', ''], ['SOLARIS_JP', 'OSA', 'JP', ''],
  ['AETHER_MX', 'CDMX', 'MX', ''], ['FROSTBYTE', 'LDN', 'GB', 'GB-ENG'], ['KRAKEN_UK', 'MAN', 'GB', 'GB-ENG'], ['VELVET_FR', 'PAR', 'FR', ''],
  ['ZENITH_KR', 'BUS', 'KR', ''], ['HYPERION', 'NYC', 'US', 'US-NY'], ['SHADOW_CL', 'SCL', 'CL', ''], ['DRIFTKING', 'LA', 'US', 'US-CA'],
  ['MISTRAL', 'MRS', 'FR', ''], ['ION_STORM', 'TX', 'US', 'US-TX'], ['RONIN_ZERO', 'KYO', 'JP', ''], ['ECLIPSE_AR', 'BUE', 'AR', ''],
  ['VORTEX_NL', 'AMS', 'NL', ''], ['PHANTOM_IT', 'MIL', 'IT', ''], ['TEMPEST_AU', 'SYD', 'AU', ''], ['TITAN_CA', 'TOR', 'CA', ''],
  ['COBALT_PL', 'WAW', 'PL', ''], ['APEX_TW', 'TPE', 'TW', ''], ['NOVA_PH', 'MNL', 'PH', ''], ['STRIKER_ES', 'VAL', 'ES', 'ES-VC'],
  ['BLITZ_DE', 'BER', 'DE', ''], ['ORION_US', 'FL', 'US', 'US-FL'], ['KITSUNE_JP', 'FUK', 'JP', ''], ['SPECTRE_GB', 'GLA', 'GB', 'GB-SCT'],
  ['REAPER_BR', 'SP', 'BR', ''], ['LYNX_SE', 'STO', 'SE', ''], ['CYBER_KR', 'INC', 'KR', ''], ['OMEN_PK', 'LHE', 'PK', ''],
  ['PRISM_CA', 'VAN', 'CA', ''], ['ARC_LIGHT', 'SEA', 'US', 'US-WA'], ['IGNIS_ES', 'SEV', 'ES', 'ES-AN'], ['PULSE_FR', 'LYO', 'FR', ''],
  ['DELTA_NL', 'RTM', 'NL', ''], ['VECTOR_IT', 'ROM', 'IT', ''], ['SHOGUN_JP', 'NAG', 'JP', ''], ['MIRAGE_MX', 'MTY', 'MX', ''],
  ['QUASAR_AU', 'MEL', 'AU', ''], ['KNIGHT_UK', 'BIR', 'GB', 'GB-ENG'], ['FANG_BR', 'RIO', 'BR', ''], ['AURA_ES', 'BIL', 'ES', 'ES-PV'],
  ['VOLT_DE', 'HAM', 'DE', ''], ['ZEPHYR_US', 'CHI', 'US', 'US-IL'], ['ECHO_KR', 'DAE', 'KR', ''], ['STARFALL', 'SGP', 'SG', '']
];

const DEMO_PRONOUNS_CYCLE = ['He/Him', 'She/Her', 'He/Him', 'They/Them', 'He/Him', 'She/Her'];

let activeDemoGame = 'tekken8';
const demoSetsLiveByGame = new Map();

function buildDemoEntrants(gameId) {
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const cfg = DEMO_GAME_CONFIGS[g];
  const chars = cfg.chars;
  const takenSeeds = new Set(DEMO_CORE_PLAYERS.map(p => p.initialSeed));
  const bySeed = new Map();

  for (const core of DEMO_CORE_PLAYERS) {
    bySeed.set(core.initialSeed, {
      entrantId: core.entrantId,
      name: core.name,
      sponsor: core.sponsor,
      flag: core.flag,
      region: core.region,
      pronouns: core.pronouns,
      handle: core.handle,
      initialSeed: core.initialSeed,
      phaseSeed: core.phaseSeed,
      seed: core.initialSeed,
      character: chars[core.charIdx % chars.length]
    });
  }

  let extraIdx = 0;
  for (let seedNum = 1; seedNum <= 64; seedNum++) {
    if (takenSeeds.has(seedNum)) continue;
    const prof = DEMO_EXTRA_PROFILES[extraIdx % DEMO_EXTRA_PROFILES.length];
    const entrantNum = 13 + extraIdx;
    const name = prof[0];
    bySeed.set(seedNum, {
      entrantId: `d${entrantNum}`,
      name,
      sponsor: prof[1],
      flag: prof[2],
      region: prof[3],
      pronouns: DEMO_PRONOUNS_CYCLE[extraIdx % DEMO_PRONOUNS_CYCLE.length],
      handle: `@${name.toLowerCase()}`,
      initialSeed: seedNum,
      phaseSeed: null,
      seed: seedNum,
      character: chars[(12 + extraIdx) % chars.length]
    });
    extraIdx++;
  }

  return Array.from({ length: 64 }, (_, i) => bySeed.get(i + 1));
}

function getDemoEntrantMap(gameId) {
  const entrants = buildDemoEntrants(gameId);
  return { entrants, byId: Object.fromEntries(entrants.map(e => [e.entrantId, e])) };
}

function buildDemoSetsForGame(gameId) {
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const { byId } = getDemoEntrantMap(g);
  const mkP = (id, bracket, score = 0) => ({ ...byId[id], bracket, score });
  return [
    {
      id: `demo-set-${g}-1`, provider: 'demo', roundText: 'WINNERS FINALS', roundNum: 5, phaseId: 'demo-ph-top8', phaseName: 'Top 8 Finals', state: 'active', winnerId: null, streamName: 'Main Stream', upset: null,
      p1: mkP('d1', 'W', 0), p2: mkP('d2', 'W', 0)
    },
    {
      id: `demo-set-${g}-2`, provider: 'demo', roundText: 'LOSERS SEMIS', roundNum: -4, phaseId: 'demo-ph-top8', phaseName: 'Top 8 Finals', state: 'called', winnerId: null, streamName: 'Main Stream', upset: null,
      p1: mkP('d3', 'L', 0), p2: mkP('d5', 'L', 0)
    },
    {
      id: `demo-set-${g}-3`, provider: 'demo', roundText: 'LOSERS QUARTERFINAL', roundNum: -3, phaseId: 'demo-ph-top8', phaseName: 'Top 8 Finals', state: 'open', winnerId: null, streamName: 'Main Stream', upset: null,
      p1: mkP('d6', 'L', 0), p2: mkP('d7', 'L', 0)
    },
    {
      id: `demo-set-${g}-4`, provider: 'demo', roundText: 'GRAND FINALS', roundNum: 6, phaseId: 'demo-ph-top8', phaseName: 'Top 8 Finals', state: 'open', winnerId: null, streamName: 'Main Stream', upset: null,
      p1: mkP('d1', 'W', 0), p2: mkP('d8', 'L', 0)
    },
    {
      id: `demo-set-${g}-5`, provider: 'demo', roundText: 'LOSERS ROUND 1', roundNum: -2, phaseId: 'demo-ph-top8', phaseName: 'Top 8 Finals', state: 'complete', winnerId: 'd5', streamName: 'Main Stream',
      upset: computeUpsetInfo(4, 12, 'p2'),
      p1: mkP('d4', 'L', 2), p2: mkP('d5', 'L', 3)
    }
  ];
}

function getDemoSetsLive(gameId) {
  const g = resolveDemoGameId(gameId || activeDemoGame);
  if (!demoSetsLiveByGame.has(g)) {
    demoSetsLiveByGame.set(g, buildDemoSetsForGame(g));
  }
  return demoSetsLiveByGame.get(g);
}

const DEMO_EVENT_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 84"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f97316"/><stop offset="50%" stop-color="#facc15"/><stop offset="100%" stop-color="#ef4444"/></linearGradient></defs><rect x="3" y="3" width="214" height="78" rx="14" fill="#0b0f1c" stroke="url(#g)" stroke-width="5"/><polygon points="22,42 36,20 50,42 36,64" fill="url(#g)"/><text x="64" y="40" fill="#ffffff" font-family="Arial Black,Impact,sans-serif" font-size="24" font-weight="900" letter-spacing="1">FGC OPEN</text><text x="65" y="62" fill="#facc15" font-family="Arial,sans-serif" font-size="13" font-weight="800" letter-spacing="3">CHAMPIONSHIP</text></svg>`)}`;

export function getDemoSeeding(phaseId = 'demo-ph-pools', gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const entrants = buildDemoEntrants(g);
  const chosen = DEMO_PHASES.find(p => p.id === phaseId) || DEMO_PHASES[0];
  let rows;
  if (chosen.id === 'demo-ph-top8') {
    rows = entrants.filter(s => s.phaseSeed != null).sort((a, b) => a.phaseSeed - b.phaseSeed);
  } else if (chosen.id === 'demo-ph-top16') {
    const top16Ids = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14', 'd15', 'd16'];
    const byId = Object.fromEntries(entrants.map(e => [e.entrantId, e]));
    rows = top16Ids.map((id, i) => ({ ...byId[id], phaseSeed: i + 1 }));
  } else {
    rows = entrants;
  }
  return {
    gameId: g,
    phases: DEMO_PHASES,
    selectedPhaseId: chosen.id,
    seedingAvailable: true,
    seeds: rows.map(r => ({ ...r, phaseId: chosen.id, phaseName: chosen.name }))
  };
}

export function getDemoTournament(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const cfg = DEMO_GAME_CONFIGS[g];
  const seeding = getDemoSeeding('demo-ph-pools', g);
  const setsLive = getDemoSetsLive(g);
  const entrants = buildDemoEntrants(g);
  return {
    provider: 'demo',
    gameId: g,
    tournament: {
      id: `demo-open-${g}`,
      name: `DEMO TOURNAMENT — ${cfg.name.toUpperCase()}`,
      slug: `demo-${g}`,
      location: 'Offline Demo · 64 Entrants',
      logoUrl: DEMO_EVENT_LOGO_SVG
    },
    events: [{ id: `demo-ev-${g}`, name: cfg.eventName, slug: g, numEntrants: 64, game: cfg.name, gameId: g, phases: DEMO_PHASES }],
    selectedEventId: `demo-ev-${g}`,
    phases: seeding.phases,
    selectedPhaseId: seeding.selectedPhaseId,
    seedingAvailable: true,
    seeds: seeding.seeds,
    streamQueue: setsLive.filter(s => s.state !== 'complete'),
    sets: setsLive,
    participants: entrants.map(r => ({ ...r }))
  };
}

export function getDemoStandings(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const cfg = DEMO_GAME_CONFIGS[g];
  const { byId } = getDemoEntrantMap(g);
  const order = [
    [1, 'd1'], [2, 'd2'], [3, 'd3'], [4, 'd4'],
    [5, 'd5'], [5, 'd6'], [7, 'd7'], [7, 'd8'],
    [9, 'd9'], [9, 'd10'], [9, 'd11'], [9, 'd12']
  ];
  const placements = order.map(([place, id]) => {
    const p = byId[id];
    return {
      place,
      name: p.name,
      sponsor: p.sponsor,
      flag: p.flag,
      region: p.region,
      seed: p.initialSeed,
      initialSeed: p.initialSeed,
      character: p.character,
      avatar: '',
      handle: p.handle
    };
  });
  return {
    provider: 'demo',
    gameId: g,
    tournamentName: 'FGC OPEN CHAMPIONSHIP',
    tournamentSlug: `demo-${g}`,
    eventName: `${cfg.eventName} · Top 8`,
    gameName: cfg.name,
    entrantsCount: 64,
    location: 'Offline Demo · 64 Entrants',
    logoUrl: DEMO_EVENT_LOGO_SVG,
    status: 'completed',
    isCompleted: true,
    placements
  };
}

export function reportDemoSet({ setId, winnerEntrantId, p1Score, p2Score }) {
  let target = null;
  for (const list of demoSetsLiveByGame.values()) {
    target = list.find(s => s.id === setId);
    if (target) break;
  }
  if (!target) target = getDemoSetsLive(activeDemoGame).find(s => s.id === setId);
  if (!target) throw new Error('Demo set not found');
  target.p1.score = Number(p1Score || 0);
  target.p2.score = Number(p2Score || 0);
  target.winnerId = String(winnerEntrantId);
  target.state = 'complete';
  const wSide = String(winnerEntrantId) === String(target.p1?.entrantId) ? 'p1' : 'p2';
  target.upset = computeUpsetInfo(target.p1?.seed, target.p2?.seed, wSide);
  return { ok: true, set: target };
}

/* =========================================================================
   CANONICAL 11-SLOT TOP 8 DOUBLE-ELIMINATION BRACKET BUILDER (Start.gg + Challonge + Demo)
   Slots: wsf1, wsf2, wf, gf, gfr, lr1_1, lr1_2, lqf1, lqf2, lsf, lf
   ========================================================================= */
function toBracketPlayer(p) {
  if (!p) return { name: 'TBD', sponsor: '', flag: '', region: '', seed: '', character: '', avatar: '', handle: '', score: 0 };
  const s = cleanSeedNum(p.initialSeed ?? p.seed ?? p.phaseSeed);
  return {
    entrantId: p.entrantId ? String(p.entrantId) : null,
    name: p.name || 'TBD',
    sponsor: p.sponsor || '',
    flag: p.flag || '',
    region: p.region || '',
    seed: s ? String(s) : '',
    character: p.character || '',
    avatar: p.avatar || '',
    handle: p.handle || '',
    score: Number(p.score ?? 0)
  };
}

function toBracketSlot(slotId, fallbackLabel, s) {
  if (!s) {
    return {
      id: slotId,
      roundText: fallbackLabel,
      state: 'open',
      winnerSide: null,
      p1: toBracketPlayer(null),
      p2: toBracketPlayer(null)
    };
  }
  const p1 = toBracketPlayer(s.p1);
  const p2 = toBracketPlayer(s.p2);
  let winnerSide = null;
  if (s.winnerId) {
    if (p1.entrantId && String(s.winnerId) === p1.entrantId) winnerSide = 'p1';
    else if (p2.entrantId && String(s.winnerId) === p2.entrantId) winnerSide = 'p2';
  } else if (s.state === 'complete' && p1.score !== p2.score) {
    winnerSide = p1.score > p2.score ? 'p1' : 'p2';
  }
  return {
    id: slotId,
    setId: s.id ? String(s.id) : null,
    roundText: (s.roundText || fallbackLabel).toUpperCase(),
    state: s.state || 'open',
    winnerSide,
    p1,
    p2
  };
}

export function buildTop8BracketFromSets(rawSets = [], seeds = []) {
  const sets = enrichSetsWithSeeds(Array.isArray(rawSets) ? rawSets : [], seeds);
  const normR = (s) => norm(s?.roundText || '');

  const pickByText = (pred) => sets.filter(pred);

  const gfrList = pickByText(s => normR(s).includes('grand final') && normR(s).includes('reset'));
  const gfList = pickByText(s => normR(s).includes('grand final') && !normR(s).includes('reset'));
  const wfList = pickByText(s => normR(s).includes('winners final') || normR(s).includes('winner final'));
  const wsfList = pickByText(s => normR(s).includes('winners semi') || normR(s).includes('winner semi'));
  const lfList = pickByText(s => normR(s).includes('losers final') || normR(s).includes('loser final'));
  const lsfList = pickByText(s => normR(s).includes('losers semi') || normR(s).includes('loser semi'));
  const lqfList = pickByText(s => normR(s).includes('losers quarter') || normR(s).includes('loser quarter') || normR(s).includes('top 8 losers quarter'));
  const lr1List = pickByText(s => (normR(s).includes('losers round 1') || normR(s).includes('losers top 8') || normR(s).includes('top 8 losers')) && !normR(s).includes('quarter'));

  // Numeric fallback for Challonge or non-English round labels when explicit names didn't match
  const winNums = [...new Set(sets.map(s => s.roundNum).filter(r => r > 0))].sort((a, b) => b - a);
  const losNums = [...new Set(sets.map(s => s.roundNum).filter(r => r < 0))].sort((a, b) => a - b);

  const gf = gfList[0] || (winNums[0] ? sets.find(s => s.roundNum === winNums[0] && s !== gfrList[0]) : null);
  const gfr = gfrList[0] || (winNums[0] ? sets.filter(s => s.roundNum === winNums[0])[1] : null);
  const wf = wfList[0] || (winNums[1] ? sets.find(s => s.roundNum === winNums[1]) : null);
  const wsfs = wsfList.length ? wsfList : (winNums[2] ? sets.filter(s => s.roundNum === winNums[2]) : []);
  const lf = lfList[0] || (losNums[0] ? sets.find(s => s.roundNum === losNums[0]) : null);
  const lsf = lsfList[0] || (losNums[1] ? sets.find(s => s.roundNum === losNums[1]) : null);
  const lqfs = lqfList.length ? lqfList : (losNums[2] ? sets.filter(s => s.roundNum === losNums[2]) : []);
  const lr1s = lr1List.length ? lr1List : (losNums[3] ? sets.filter(s => s.roundNum === losNums[3]) : []);

  const slots = {
    wsf1: toBracketSlot('wsf1', 'WINNERS SEMI-FINAL 1', wsfs[0]),
    wsf2: toBracketSlot('wsf2', 'WINNERS SEMI-FINAL 2', wsfs[1]),
    wf: toBracketSlot('wf', 'WINNERS FINAL', wf),
    gf: toBracketSlot('gf', 'GRAND FINAL', gf),
    gfr: toBracketSlot('gfr', 'GRAND FINAL RESET', gfr),
    lr1_1: toBracketSlot('lr1_1', 'LOSERS ROUND 1 · A', lr1s[0]),
    lr1_2: toBracketSlot('lr1_2', 'LOSERS ROUND 1 · B', lr1s[1]),
    lqf1: toBracketSlot('lqf1', 'LOSERS QUARTER-FINAL 1', lqfs[0]),
    lqf2: toBracketSlot('lqf2', 'LOSERS QUARTER-FINAL 2', lqfs[1]),
    lsf: toBracketSlot('lsf', 'LOSERS SEMI-FINAL', lsf),
    lf: toBracketSlot('lf', 'LOSERS FINAL', lf)
  };
  const hasReset = Boolean(gfr && (gfr.p1?.name !== 'TBD' || gfr.p2?.name !== 'TBD'));
  return { slots, hasReset };
}

export function getDemoPools(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const cfg = DEMO_GAME_CONFIGS[g];
  const { byId } = getDemoEntrantMap(g);
  const mkRow = (id, wins, losses, status) => {
    const p = byId[id];
    return { name: p.name, sponsor: p.sponsor, flag: p.flag, seed: p.initialSeed, wins, losses, status, character: p.character };
  };
  return {
    provider: 'demo',
    gameId: g,
    tournamentName: 'FGC OPEN CHAMPIONSHIP',
    eventName: `${cfg.eventName} · Pools Stage (64 Entrants)`,
    pools: [
      {
        id: 'pool-a1', name: 'POOL A1', subtitle: 'WAVE A · STREAM 1', status: 'live', advanceWinners: 1, advanceLosers: 1,
        players: [mkRow('d1', 3, 0, 'winners'), mkRow('d5', 2, 1, 'losers'), mkRow('d9', 1, 2, 'out'), mkRow('d13', 0, 2, 'out')]
      },
      {
        id: 'pool-a2', name: 'POOL A2', subtitle: 'WAVE A · STATION 4', status: 'complete', advanceWinners: 1, advanceLosers: 1,
        players: [mkRow('d2', 3, 0, 'winners'), mkRow('d7', 2, 1, 'losers'), mkRow('d10', 1, 2, 'out'), mkRow('d14', 0, 2, 'out')]
      },
      {
        id: 'pool-b1', name: 'POOL B1', subtitle: 'WAVE B · STREAM 1', status: 'live', advanceWinners: 1, advanceLosers: 1,
        players: [mkRow('d3', 2, 0, 'winners'), mkRow('d6', 2, 1, 'losers'), mkRow('d11', 1, 1, 'alive'), mkRow('d15', 0, 2, 'out')]
      },
      {
        id: 'pool-b2', name: 'POOL B2', subtitle: 'WAVE B · STATION 8', status: 'complete', advanceWinners: 1, advanceLosers: 1,
        players: [mkRow('d4', 3, 0, 'winners'), mkRow('d8', 2, 1, 'losers'), mkRow('d12', 1, 2, 'out'), mkRow('d16', 0, 2, 'out')]
      }
    ]
  };
}

export function getDemoPoolTree(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const { byId } = getDemoEntrantMap(g);
  const mkP = (id, score) => {
    const p = byId[id];
    return { name: p.name, sponsor: p.sponsor, flag: p.flag, region: p.region || '', seed: String(p.initialSeed || ''), character: p.character || '', avatar: '', handle: p.handle || '', score };
  };
  return {
    pqf1: { id: 'pqf1', roundText: 'POOL QF 1', state: 'complete', winnerSide: 'p1', p1: mkP('d1', 2), p2: mkP('d13', 0) },
    pqf2: { id: 'pqf2', roundText: 'POOL QF 2', state: 'complete', winnerSide: 'p1', p1: mkP('d5', 2), p2: mkP('d9', 1) },
    pqf3: { id: 'pqf3', roundText: 'POOL QF 3', state: 'complete', winnerSide: 'p1', p1: mkP('d4', 2), p2: mkP('d14', 0) },
    pqf4: { id: 'pqf4', roundText: 'POOL QF 4', state: 'complete', winnerSide: 'p2', p1: mkP('d8', 1), p2: mkP('d6', 2) },
    psf1: { id: 'psf1', roundText: 'POOL SF 1', state: 'complete', winnerSide: 'p1', p1: mkP('d1', 2), p2: mkP('d5', 1) },
    psf2: { id: 'psf2', roundText: 'POOL SF 2', state: 'complete', winnerSide: 'p1', p1: mkP('d4', 2), p2: mkP('d6', 1) },
    pwf: { id: 'pwf', roundText: 'POOL WINNERS FINAL', state: 'active', winnerSide: null, p1: mkP('d1', 1), p2: mkP('d4', 1) },
    plqf1: { id: 'plqf1', roundText: 'POOL LOSERS R1 A', state: 'complete', winnerSide: 'p1', p1: mkP('d9', 2), p2: mkP('d13', 0) },
    plqf2: { id: 'plqf2', roundText: 'POOL LOSERS R1 B', state: 'complete', winnerSide: 'p1', p1: mkP('d8', 2), p2: mkP('d14', 1) },
    plsf: { id: 'plsf', roundText: 'POOL LOSERS SEMI', state: 'complete', winnerSide: 'p1', p1: mkP('d5', 2), p2: mkP('d8', 1) },
    plf: { id: 'plf', roundText: 'POOL LOSERS FINAL', state: 'active', winnerSide: null, p1: mkP('d6', 1), p2: mkP('d5', 2) }
  };
}

export function getDemoTop16(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const { byId } = getDemoEntrantMap(g);
  const spec = [
    [1, 'd1', 6, 0, 'winners'], [2, 'd2', 5, 1, 'winners'], [3, 'd3', 5, 1, 'winners'], [4, 'd4', 4, 1, 'winners'],
    [5, 'd5', 5, 1, 'losers'], [5, 'd6', 4, 1, 'losers'], [7, 'd7', 4, 2, 'losers'], [7, 'd8', 3, 2, 'losers'],
    [9, 'd9', 3, 2, 'out'], [9, 'd10', 3, 2, 'out'], [9, 'd11', 2, 2, 'out'], [9, 'd12', 2, 2, 'out'],
    [13, 'd13', 2, 2, 'out'], [13, 'd14', 1, 2, 'out'], [13, 'd15', 1, 2, 'out'], [13, 'd16', 1, 2, 'out']
  ];
  return spec.map(([place, id, wins, losses, status]) => {
    const p = byId[id];
    return { place, name: p.name, sponsor: p.sponsor, flag: p.flag, seed: p.initialSeed, wins, losses, status, character: p.character };
  });
}

export async function fetchStartGGPools(eventId, token) {
  if (!eventId) throw new Error('Connect a start.gg event first.');
  const q = `
    query EventPools($eventId: ID!) {
      event(id: $eventId) {
        id
        name
        tournament { name }
        phases {
          id
          name
          phaseOrder
          phaseGroups(query: { page: 1, perPage: 8 }) {
            nodes {
              id
              displayIdentifier
              state
              standings(query: { page: 1, perPage: 6 }) {
                nodes {
                  placement
                  entrant {
                    id
                    name
                    initialSeedNum
                    participants {
                      gamerTag
                      prefix
                      user { location { country } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const data = await startggQuery(token, q, { eventId });
  const ev = data?.event;
  const phases = (ev?.phases || []).sort((a, b) => (a.phaseOrder || 0) - (b.phaseOrder || 0));
  const poolPhase = phases.find(p => (p.phaseGroups?.nodes || []).length > 1) || phases[0];
  const groups = poolPhase?.phaseGroups?.nodes || [];
  const pools = groups.map((g, gi) => {
    const stNodes = g.standings?.nodes || [];
    const players = stNodes.map((n, idx) => {
      const info = normalizeEntrantInfo(n.entrant, n.entrant?.initialSeedNum);
      return {
        name: info?.name || `Player ${idx + 1}`,
        sponsor: info?.sponsor || '',
        flag: info?.flag || '',
        seed: info?.initialSeed || '',
        wins: Math.max(0, 3 - idx),
        losses: idx === 0 ? 0 : idx === 1 ? 1 : 2,
        status: idx === 0 ? 'winners' : idx === 1 ? 'losers' : 'out'
      };
    });
    const st = g.state === 3 ? 'complete' : g.state === 2 ? 'live' : 'upcoming';
    return {
      id: String(g.id || `pool-${gi + 1}`),
      name: `POOL ${g.displayIdentifier || (gi + 1)}`,
      subtitle: poolPhase?.name || 'POOLS',
      status: st,
      advanceWinners: 1,
      advanceLosers: 1,
      players
    };
  });
  return {
    provider: 'startgg',
    tournamentName: ev?.tournament?.name || '',
    eventName: ev?.name || '',
    pools
  };
}

export function getDemoTop8Bracket(gameId = null) {
  if (gameId && DEMO_GAME_CONFIGS[gameId]) activeDemoGame = gameId;
  const g = resolveDemoGameId(gameId || activeDemoGame);
  const cfg = DEMO_GAME_CONFIGS[g];
  const { byId } = getDemoEntrantMap(g);
  const mk = (id, roundText, state, winnerSide, p1Id, s1, p2Id, s2) => ({
    id,
    roundText,
    state,
    winnerSide,
    p1: p1Id ? { ...toBracketPlayer(byId[p1Id]), score: s1 } : toBracketPlayer(null),
    p2: p2Id ? { ...toBracketPlayer(byId[p2Id]), score: s2 } : toBracketPlayer(null)
  });
  return {
    provider: 'demo',
    gameId: g,
    gameName: cfg.name,
    tournamentName: 'FGC OPEN CHAMPIONSHIP',
    eventName: `${cfg.eventName} · Top 8`,
    entrantsCount: 64,
    logoUrl: DEMO_EVENT_LOGO_SVG,
    hasReset: false,
    slots: {
      wsf1: mk('wsf1', 'WINNERS SEMI-FINAL 1', 'complete', 'p1', 'd1', 3, 'd4', 1),
      wsf2: mk('wsf2', 'WINNERS SEMI-FINAL 2', 'complete', 'p1', 'd2', 3, 'd3', 2),
      wf: mk('wf', 'WINNERS FINAL', 'active', null, 'd1', 2, 'd2', 1),
      gf: mk('gf', 'GRAND FINAL', 'open', null, null, 0, null, 0),
      gfr: mk('gfr', 'GRAND FINAL RESET', 'open', null, null, 0, null, 0),
      lr1_1: mk('lr1_1', 'LOSERS ROUND 1 · A', 'complete', 'p1', 'd5', 3, 'd7', 1),
      lr1_2: mk('lr1_2', 'LOSERS ROUND 1 · B', 'complete', 'p1', 'd6', 3, 'd8', 2),
      lqf1: mk('lqf1', 'LOSERS QUARTER-FINAL 1', 'complete', 'p2', 'd4', 2, 'd5', 3),
      lqf2: mk('lqf2', 'LOSERS QUARTER-FINAL 2', 'active', null, 'd3', 2, 'd6', 2),
      lsf: mk('lsf', 'LOSERS SEMI-FINAL', 'open', null, 'd5', 0, null, 0),
      lf: mk('lf', 'LOSERS FINAL', 'open', null, null, 0, null, 0)
    }
  };
}
