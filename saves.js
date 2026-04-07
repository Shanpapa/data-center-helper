// Data Center Helper — Save System
// Calculator: localStorage only
// CG Planner: localStorage + JSON export/import with security validation

// ===================== SECURITY =====================

const ALLOWED_TYPES = ['System X', 'RISC', 'Mainframe', 'GPU'];
const ALLOWED_SRV_MODES = ['smart', '3u', 'both'];
const ALLOWED_REDUND = [0, 1, 2];

function sanitizeString(val, maxLen = 50) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/</g, '').replace(/>/g, '')
    .replace(/"/g, '').replace(/'/g, '')
    .replace(/\u0060/g, '').replace(/\//g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, maxLen);
}

function isInt(val, min, max) {
  return Number.isInteger(val) && val >= min && val <= max;
}

function isPositiveNumber(val) {
  return typeof val === 'number' && isFinite(val) && val >= 0;
}

// ===================== STORAGE KEYS =====================

const CALC_KEY   = 'dch_calculator_saves';
const CG_KEY     = 'dch_cgplanner_saves';

// ===================== GENERIC HELPERS =====================

function loadStore(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function nowLabel() {
  const d = new Date();
  return d.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})
    + ' ' + d.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'});
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ===================== CALCULATOR SAVES =====================

window.CalcSaves = {
  list() { return loadStore(CALC_KEY); },

  save(name, state) {
    const clean = sanitizeString(name || 'Unnamed', 40) || 'Unnamed';
    const store = this.list();
    store.unshift({
      id:   generateId(),
      name: clean,
      date: nowLabel(),
      state: {
        requirements: (state.requirements || []).map(r => ({
          id:     generateId(),
          type:   ALLOWED_TYPES.includes(r.type) ? r.type : 'System X',
          raw:    isPositiveNumber(r.raw) ? Math.round(r.raw) : 0,
          redund: ALLOWED_REDUND.includes(r.redund) ? r.redund : 0,
        })),
        srvMode: ALLOWED_SRV_MODES.includes(state.srvMode) ? state.srvMode : 'smart',
      }
    });
    return saveStore(CALC_KEY, store.slice(0, 20)); // max 20 saves
  },

  delete(id) {
    const store = this.list().filter(s => s.id !== id);
    saveStore(CALC_KEY, store);
  },

  get(id) {
    return this.list().find(s => s.id === id) || null;
  }
};

// ===================== CG PLANNER SAVES =====================

window.CGSaves = {
  list() { return loadStore(CG_KEY); },

  save(name, state) {
    const clean = sanitizeString(name || 'Unnamed', 40) || 'Unnamed';
    const store = this.list();
    store.unshift({
      id:   generateId(),
      name: clean,
      date: nowLabel(),
      state: CGSaves._sanitizeState(state),
    });
    return saveStore(CG_KEY, store.slice(0, 20));
  },

  delete(id) {
    const store = this.list().filter(s => s.id !== id);
    saveStore(CG_KEY, store);
  },

  get(id) {
    return this.list().find(s => s.id === id) || null;
  },

  // Validate + sanitize CG state before saving or importing
  _sanitizeState(state) {
    if (!state || typeof state !== 'object') return { cgGroups: [], coreGroups: [] };

    const cgGroups = (Array.isArray(state.cgGroups) ? state.cgGroups : []).map(cg => ({
      id:      generateId(),
      name:    sanitizeString(cg.name || 'CG', 20),
      members: (Array.isArray(cg.members) ? cg.members : [])
        .filter(m => isInt(m.n, 1, 34))
        .map(m => ({
          n:    m.n,
          gbps: isPositiveNumber(m.gbps) ? Math.round(m.gbps * 100) / 100 : 0,
        }))
    }));

    // Build a set of valid CG ids for cross-reference
    const cgIdMap = {};
    cgGroups.forEach((cg, i) => cgIdMap[cg.id] = true);

    const coreGroups = (Array.isArray(state.coreGroups) ? state.coreGroups : []).map(co => ({
      id:       generateId(),
      name:     sanitizeString(co.name || 'Core', 20),
      maxGbps:  isPositiveNumber(co.maxGbps) ? Math.round(co.maxGbps * 100) / 100 : 0,
      cgIds:    [], // will be resolved after mapping
    }));

    // cgIds stored as indices for portability
    (Array.isArray(state.coreGroups) ? state.coreGroups : []).forEach((co, ci) => {
      if (Array.isArray(co.cgIdxs)) {
        coreGroups[ci].cgIds = co.cgIdxs
          .filter(idx => isInt(idx, 0, cgGroups.length - 1))
          .map(idx => cgGroups[idx].id);
      }
    });

    return { cgGroups, coreGroups };
  },

  // Export: convert live state to portable JSON
  exportState(state) {
    const sanitized = CGSaves._sanitizeState(CGSaves._prepareForExport(state));
    return JSON.stringify({
      dch_version: 1,
      exported: nowLabel(),
      ...CGSaves._prepareForExport(state)
    }, null, 2);
  },

  _prepareForExport(state) {
    // Replace live IDs with stable indices for portability
    const cgGroups = (state.cgGroups || []).map(cg => ({
      name:    sanitizeString(cg.name || 'CG', 20),
      members: (cg.members || [])
        .filter(m => isInt(m.n, 1, 34))
        .map(m => ({ n: m.n, gbps: isPositiveNumber(m.gbps) ? m.gbps : 0 }))
    }));

    const cgIdToIdx = {};
    (state.cgGroups || []).forEach((cg, i) => cgIdToIdx[cg.id] = i);

    const coreGroups = (state.coreGroups || []).map(co => ({
      name:    sanitizeString(co.name || 'Core', 20),
      maxGbps: isPositiveNumber(co.maxGbps) ? co.maxGbps : 0,
      cgIdxs:  (co.cgIds || [])
        .map(id => cgIdToIdx[id])
        .filter(idx => idx !== undefined),
    }));

    return { cgGroups, coreGroups };
  },

  // Import: validate JSON string, return sanitized state or throw
  importFromJSON(jsonStr) {
    let raw;
    try {
      raw = JSON.parse(jsonStr);
    } catch {
      throw new Error('Invalid JSON — could not parse the file.');
    }

    if (!raw || typeof raw !== 'object') throw new Error('Invalid format — expected an object.');
    if (raw.dch_version !== 1) throw new Error('Unknown version — this file may be from a different app.');
    if (!Array.isArray(raw.cgGroups)) throw new Error('Missing cgGroups array.');
    if (!Array.isArray(raw.coreGroups)) throw new Error('Missing coreGroups array.');
    if (raw.cgGroups.length > 50) throw new Error('Too many CG groups (max 50).');
    if (raw.coreGroups.length > 20) throw new Error('Too many Core groups (max 20).');

    // Validate each CG group
    raw.cgGroups.forEach((cg, i) => {
      if (typeof cg.name !== 'string') throw new Error('CG group ' + i + ': name must be a string.');
      if (!Array.isArray(cg.members)) throw new Error('CG group ' + i + ': members must be an array.');
      cg.members.forEach((m, j) => {
        if (!isInt(m.n, 1, 34)) throw new Error('CG group ' + i + ', member ' + j + ': customer ID must be 1-34.');
        if (!isPositiveNumber(m.gbps)) throw new Error('CG group ' + i + ', member ' + j + ': gbps must be a positive number.');
      });
    });

    // Validate each Core group
    raw.coreGroups.forEach((co, i) => {
      if (typeof co.name !== 'string') throw new Error('Core group ' + i + ': name must be a string.');
      if (!isPositiveNumber(co.maxGbps)) throw new Error('Core group ' + i + ': maxGbps must be a positive number.');
      if (!Array.isArray(co.cgIdxs)) throw new Error('Core group ' + i + ': cgIdxs must be an array.');
      co.cgIdxs.forEach((idx, j) => {
        if (!isInt(idx, 0, raw.cgGroups.length - 1)) throw new Error('Core group ' + i + ': invalid CG index ' + idx + '.');
      });
    });

    return CGSaves._sanitizeState(raw);
  }
};
