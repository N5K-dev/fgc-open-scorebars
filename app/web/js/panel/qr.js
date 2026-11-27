/**
 * FGC Open Scorebars — Zero-Dependency Offline QR Code Generator (ISO/IEC 18004)
 * Byte Mode, Error Correction Level M (15% recovery), Versions 1–6 (up to 106 UTF-8 bytes).
 * Renders crisp pure-SVG QR codes 100% offline — ideal for LAN mobile/tablet remote control at venues.
 */
(function (global) {
  'use strict';

  // GF(256) lookup tables with primitive polynomial 0x11d (x^8 + x^4 + x^3 + x^2 + 1)
  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  }
  const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]];

  function rsGeneratorPoly(deg) {
    let poly = [1];
    for (let i = 0; i < deg; i++) {
      const next = new Array(poly.length + 1).fill(0);
      const factor = EXP[i];
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], factor);
      }
      poly = next;
    }
    return poly;
  }

  function rsComputeEc(data, ecLen) {
    const gen = rsGeneratorPoly(ecLen);
    const rem = new Uint8Array(ecLen);
    for (let i = 0; i < data.length; i++) {
      const factor = data[i] ^ rem[0];
      for (let j = 0; j < ecLen - 1; j++) rem[j] = rem[j + 1];
      rem[ecLen - 1] = 0;
      if (factor !== 0) {
        for (let j = 0; j < ecLen; j++) rem[j] ^= gfMul(gen[j + 1], factor);
      }
    }
    return rem;
  }

  // ISO/IEC 18004 Table 9 — Error Correction Level M (equal-sized blocks for V1–V6)
  const VERSIONS_M = [
    null,
    { v: 1, size: 21, dataBytes: 16,  ecPerBlock: 10, blocks: 1, align: [] },
    { v: 2, size: 25, dataBytes: 28,  ecPerBlock: 16, blocks: 1, align: [6, 18] },
    { v: 3, size: 29, dataBytes: 44,  ecPerBlock: 26, blocks: 1, align: [6, 22] },
    { v: 4, size: 33, dataBytes: 64,  ecPerBlock: 18, blocks: 2, align: [6, 26] },
    { v: 5, size: 37, dataBytes: 86,  ecPerBlock: 24, blocks: 2, align: [6, 30] },
    { v: 6, size: 41, dataBytes: 108, ecPerBlock: 16, blocks: 4, align: [6, 34] }
  ];

  function toUtf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') return Array.from(new TextEncoder().encode(String(str)));
    const out = [];
    for (let i = 0; i < str.length; i++) out.push(str.charCodeAt(i) & 0xff);
    return out;
  }

  function buildCodewords(bytes, spec) {
    const bits = [];
    const pushBits = (val, n) => {
      for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1);
    };
    pushBits(0b0100, 4);           // Mode indicator: Byte mode
    pushBits(bytes.length, 8);     // Character count (8 bits for Versions 1–9)
    for (const b of bytes) pushBits(b, 8);

    const totalDataBits = spec.dataBytes * 8;
    const term = Math.min(4, totalDataBits - bits.length);
    for (let i = 0; i < term; i++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    const dataCw = [];
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0;
      for (let k = 0; k < 8; k++) b = (b << 1) | bits[i + k];
      dataCw.push(b);
    }
    const padBytes = [0xec, 0x11];
    let pi = 0;
    while (dataCw.length < spec.dataBytes) dataCw.push(padBytes[pi++ & 1]);

    // Split into equal blocks, compute RS EC per block, and interleave
    const dataPerBlock = spec.dataBytes / spec.blocks;
    const dataBlocks = [];
    const ecBlocks = [];
    for (let b = 0; b < spec.blocks; b++) {
      const slice = dataCw.slice(b * dataPerBlock, (b + 1) * dataPerBlock);
      dataBlocks.push(slice);
      ecBlocks.push(rsComputeEc(slice, spec.ecPerBlock));
    }
    const finalCw = [];
    for (let i = 0; i < dataPerBlock; i++) {
      for (let b = 0; b < spec.blocks; b++) finalCw.push(dataBlocks[b][i]);
    }
    for (let i = 0; i < spec.ecPerBlock; i++) {
      for (let b = 0; b < spec.blocks; b++) finalCw.push(ecBlocks[b][i]);
    }
    return finalCw;
  }

  function formatInfoBits(mask) {
    // EC Level M = 00 (2 bits) + mask (3 bits) -> BCH(15, 5) with generator 0x537, XOR 0x5412
    const data5 = mask & 7; // (0b00 << 3) | mask
    let rem = data5 << 10;
    for (let i = 4; i >= 0; i--) {
      if ((rem >>> (i + 10)) & 1) rem ^= (0x537 << i);
    }
    return (((data5 << 10) | rem) ^ 0x5412) & 0x7fff;
  }

  function maskCond(mask, r, c) {
    switch (mask) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return ((r * c) % 2 + (r * c) % 3) === 0;
      case 6: return (((r * c) % 2 + (r * c) % 3) % 2) === 0;
      case 7: return (((r + c) % 2 + (r * c) % 3) % 2) === 0;
      default: return false;
    }
  }

  function penaltyScore(grid, size) {
    let score = 0;
    // Rule 1: 5+ consecutive same-color modules in row/col
    for (let r = 0; r < size; r++) {
      let runR = 1, runC = 1;
      for (let c = 1; c < size; c++) {
        if (grid[r][c] === grid[r][c - 1]) { runR++; if (runR === 5) score += 3; else if (runR > 5) score += 1; } else runR = 1;
        if (grid[c][r] === grid[c - 1][r]) { runC++; if (runC === 5) score += 3; else if (runC > 5) score += 1; } else runC = 1;
      }
    }
    // Rule 2: 2x2 blocks of same color
    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        const v = grid[r][c];
        if (v === grid[r][c + 1] && v === grid[r + 1][c] && v === grid[r + 1][c + 1]) score += 3;
      }
    }
    // Rule 4: dark/light balance
    let dark = 0;
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (grid[r][c]) dark++;
    const pct = Math.abs((dark * 100) / (size * size) - 50);
    score += Math.floor(pct / 5) * 10;
    return score;
  }

  function generateMatrix(text) {
    const bytes = toUtf8Bytes(text);
    const spec = VERSIONS_M.find(s => s && bytes.length <= s.dataBytes - 2);
    if (!spec) throw new Error('Text too long for QR Version 1–6 (max 106 bytes)');

    const size = spec.size;
    const base = Array.from({ length: size }, () => new Uint8Array(size));
    const fixed = Array.from({ length: size }, () => new Uint8Array(size));

    const setFixed = (r, c, val) => {
      if (r < 0 || c < 0 || r >= size || c >= size) return;
      base[r][c] = val ? 1 : 0;
      fixed[r][c] = 1;
    };

    // 1. Finder patterns (7x7) + 1-module white separators
    const drawFinder = (tr, tc) => {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const r = tr + dr, c = tc + dc;
          if (r < 0 || c < 0 || r >= size || c >= size) continue;
          const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
          const dark = inOuter && (
            dr === 0 || dr === 6 || dc === 0 || dc === 6 ||
            (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4)
          );
          setFixed(r, c, dark);
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // 2. Timing patterns
    for (let i = 8; i < size - 8; i++) {
      setFixed(6, i, i % 2 === 0);
      setFixed(i, 6, i % 2 === 0);
    }

    // 3. Alignment patterns (V2–V6: single alignment pattern at (align[1], align[1]))
    for (const r of spec.align) {
      for (const c of spec.align) {
        if ((r === 6 && c === 6) || (r === 6 && c === size - 7) || (r === size - 7 && c === 6)) continue;
        if (fixed[r][c]) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
            setFixed(r + dr, c + dc, dark);
          }
        }
      }
    }

    // 4. Dark module & reserve Format Information modules
    setFixed(size - 8, 8, 1);
    for (let i = 0; i <= 8; i++) {
      if (!fixed[8][i]) setFixed(8, i, 0);
      if (!fixed[i][8]) setFixed(i, 8, 0);
    }
    for (let i = 0; i < 8; i++) {
      if (!fixed[8][size - 1 - i]) setFixed(8, size - 1 - i, 0);
      if (!fixed[size - 1 - i][8]) setFixed(size - 1 - i, 8, 0);
    }

    // 5. Place data + EC bits in zigzag columns
    const cw = buildCodewords(bytes, spec);
    const totalBits = cw.length * 8;
    let bitIdx = 0;
    let upward = true;
    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      for (let step = 0; step < size; step++) {
        const r = upward ? (size - 1 - step) : step;
        for (let dx = 0; dx < 2; dx++) {
          const c = col - dx;
          if (fixed[r][c]) continue;
          let bit = 0;
          if (bitIdx < totalBits) {
            bit = (cw[bitIdx >>> 3] >>> (7 - (bitIdx & 7))) & 1;
            bitIdx++;
          }
          base[r][c] = bit;
        }
      }
      upward = !upward;
    }

    // 6. Evaluate all 8 ISO masks and pick the lowest penalty
    let bestGrid = null;
    let bestScore = Infinity;
    for (let mask = 0; mask < 8; mask++) {
      const g = base.map(row => new Uint8Array(row));
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!fixed[r][c] && maskCond(mask, r, c)) g[r][c] ^= 1;
        }
      }
      const fmt = formatInfoBits(mask);
      const fmtBit = (i) => (fmt >>> i) & 1;
      // Copy 1 (top-left): bits 14..9 at (8,0..5), 8 at (8,7), 7 at (8,8), 6 at (7,8), 5..0 at (5..0,8)
      const c1 = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
        [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
      ];
      for (let k = 0; k < 15; k++) g[c1[k][0]][c1[k][1]] = fmtBit(14 - k);
      // Copy 2: bits 14..8 at (size-1..size-7, 8); bits 7..0 at (8, size-8..size-1)
      for (let k = 0; k < 7; k++) g[size - 1 - k][8] = fmtBit(14 - k);
      for (let k = 0; k < 8; k++) g[8][size - 8 + k] = fmtBit(7 - k);

      const sc = penaltyScore(g, size);
      if (sc < bestScore) { bestScore = sc; bestGrid = g; }
    }
    return { size, version: spec.v, grid: bestGrid };
  }

  function renderSvg(text, opts = {}) {
    const { size, grid } = generateMatrix(text);
    const quiet = Number(opts.quiet ?? 3);
    const total = size + quiet * 2;
    const dark = opts.dark || '#0b0f19';
    const light = opts.light || '#ffffff';
    let pathD = '';
    for (let r = 0; r < size; r++) {
      let c = 0;
      while (c < size) {
        if (!grid[r][c]) { c++; continue; }
        let run = 1;
        while (c + run < size && grid[r][c + run]) run++;
        pathD += `M${c + quiet},${r + quiet}h${run}v1h-${run}z`;
        c += run;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="QR Code"><rect width="${total}" height="${total}" fill="${light}"/><path d="${pathD}" fill="${dark}"/></svg>`;
  }

  global.FGC_QR = { generateMatrix, renderSvg };
})(typeof window !== 'undefined' ? window : globalThis);
