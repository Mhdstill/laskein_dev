'use strict';
var Ll = Object.create;
var cr = Object.defineProperty;
var Nl = Object.getOwnPropertyDescriptor;
var _l = Object.getOwnPropertyNames;
var jl = Object.getPrototypeOf,
  ql = Object.prototype.hasOwnProperty;
var _ = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  pr = (e, t) => {
    for (var r in t) cr(e, r, { get: t[r], enumerable: !0 });
  },
  Zi = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let i of _l(t))
        !ql.call(e, i) &&
          i !== r &&
          cr(e, i, {
            get: () => t[i],
            enumerable: !(n = Nl(t, i)) || n.enumerable,
          });
    return e;
  };
var R = (e, t, r) => (
    (r = e != null ? Ll(jl(e)) : {}),
    Zi(
      t || !e || !e.__esModule
        ? cr(r, 'default', { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  Bl = e => Zi(cr({}, '__esModule', { value: !0 }), e);
var uo = _((jd, lo) => {
  var at = 1e3,
    lt = at * 60,
    ut = lt * 60,
    et = ut * 24,
    Ul = et * 7,
    Ql = et * 365.25;
  lo.exports = function (e, t) {
    t = t || {};
    var r = typeof e;
    if (r === 'string' && e.length > 0) return Jl(e);
    if (r === 'number' && isFinite(e)) return t.long ? Kl(e) : Gl(e);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(e)
    );
  };
  function Jl(e) {
    if (((e = String(e)), !(e.length > 100))) {
      var t =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          e
        );
      if (!!t) {
        var r = parseFloat(t[1]),
          n = (t[2] || 'ms').toLowerCase();
        switch (n) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return r * Ql;
          case 'weeks':
          case 'week':
          case 'w':
            return r * Ul;
          case 'days':
          case 'day':
          case 'd':
            return r * et;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return r * ut;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return r * lt;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return r * at;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return r;
          default:
            return;
        }
      }
    }
  }
  function Gl(e) {
    var t = Math.abs(e);
    return t >= et
      ? Math.round(e / et) + 'd'
      : t >= ut
      ? Math.round(e / ut) + 'h'
      : t >= lt
      ? Math.round(e / lt) + 'm'
      : t >= at
      ? Math.round(e / at) + 's'
      : e + 'ms';
  }
  function Kl(e) {
    var t = Math.abs(e);
    return t >= et
      ? dr(e, t, et, 'day')
      : t >= ut
      ? dr(e, t, ut, 'hour')
      : t >= lt
      ? dr(e, t, lt, 'minute')
      : t >= at
      ? dr(e, t, at, 'second')
      : e + ' ms';
  }
  function dr(e, t, r, n) {
    var i = t >= r * 1.5;
    return Math.round(e / r) + ' ' + n + (i ? 's' : '');
  }
});
var An = _((qd, co) => {
  function Wl(e) {
    (r.debug = r),
      (r.default = r),
      (r.coerce = l),
      (r.disable = o),
      (r.enable = i),
      (r.enabled = s),
      (r.humanize = uo()),
      (r.destroy = u),
      Object.keys(e).forEach(c => {
        r[c] = e[c];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {});
    function t(c) {
      let p = 0;
      for (let f = 0; f < c.length; f++)
        (p = (p << 5) - p + c.charCodeAt(f)), (p |= 0);
      return r.colors[Math.abs(p) % r.colors.length];
    }
    r.selectColor = t;
    function r(c) {
      let p,
        f = null,
        d,
        m;
      function g(...b) {
        if (!g.enabled) return;
        let h = g,
          x = Number(new Date()),
          w = x - (p || x);
        (h.diff = w),
          (h.prev = p),
          (h.curr = x),
          (p = x),
          (b[0] = r.coerce(b[0])),
          typeof b[0] != 'string' && b.unshift('%O');
        let E = 0;
        (b[0] = b[0].replace(/%([a-zA-Z%])/g, (O, q) => {
          if (O === '%%') return '%';
          E++;
          let k = r.formatters[q];
          if (typeof k == 'function') {
            let U = b[E];
            (O = k.call(h, U)), b.splice(E, 1), E--;
          }
          return O;
        })),
          r.formatArgs.call(h, b),
          (h.log || r.log).apply(h, b);
      }
      return (
        (g.namespace = c),
        (g.useColors = r.useColors()),
        (g.color = r.selectColor(c)),
        (g.extend = n),
        (g.destroy = r.destroy),
        Object.defineProperty(g, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () =>
            f !== null
              ? f
              : (d !== r.namespaces && ((d = r.namespaces), (m = r.enabled(c))),
                m),
          set: b => {
            f = b;
          },
        }),
        typeof r.init == 'function' && r.init(g),
        g
      );
    }
    function n(c, p) {
      let f = r(this.namespace + (typeof p > 'u' ? ':' : p) + c);
      return (f.log = this.log), f;
    }
    function i(c) {
      r.save(c), (r.namespaces = c), (r.names = []), (r.skips = []);
      let p,
        f = (typeof c == 'string' ? c : '').split(/[\s,]+/),
        d = f.length;
      for (p = 0; p < d; p++)
        !f[p] ||
          ((c = f[p].replace(/\*/g, '.*?')),
          c[0] === '-'
            ? r.skips.push(new RegExp('^' + c.slice(1) + '$'))
            : r.names.push(new RegExp('^' + c + '$')));
    }
    function o() {
      let c = [...r.names.map(a), ...r.skips.map(a).map(p => '-' + p)].join(
        ','
      );
      return r.enable(''), c;
    }
    function s(c) {
      if (c[c.length - 1] === '*') return !0;
      let p, f;
      for (p = 0, f = r.skips.length; p < f; p++)
        if (r.skips[p].test(c)) return !1;
      for (p = 0, f = r.names.length; p < f; p++)
        if (r.names[p].test(c)) return !0;
      return !1;
    }
    function a(c) {
      return c
        .toString()
        .substring(2, c.toString().length - 2)
        .replace(/\.\*\?$/, '*');
    }
    function l(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function u() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
      );
    }
    return r.enable(r.load()), r;
  }
  co.exports = Wl;
});
var po = _((fe, mr) => {
  fe.formatArgs = zl;
  fe.save = Yl;
  fe.load = Zl;
  fe.useColors = Hl;
  fe.storage = Xl();
  fe.destroy = (() => {
    let e = !1;
    return () => {
      e ||
        ((e = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        ));
    };
  })();
  fe.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ];
  function Hl() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function zl(e) {
    if (
      ((e[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        e[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        mr.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let t = 'color: ' + this.color;
    e.splice(1, 0, t, 'color: inherit');
    let r = 0,
      n = 0;
    e[0].replace(/%[a-zA-Z%]/g, i => {
      i !== '%%' && (r++, i === '%c' && (n = r));
    }),
      e.splice(n, 0, t);
  }
  fe.log = console.debug || console.log || (() => {});
  function Yl(e) {
    try {
      e ? fe.storage.setItem('debug', e) : fe.storage.removeItem('debug');
    } catch {}
  }
  function Zl() {
    let e;
    try {
      e = fe.storage.getItem('debug');
    } catch {}
    return (
      !e && typeof process < 'u' && 'env' in process && (e = process.env.DEBUG),
      e
    );
  }
  function Xl() {
    try {
      return localStorage;
    } catch {}
  }
  mr.exports = An()(fe);
  var { formatters: eu } = mr.exports;
  eu.j = function (e) {
    try {
      return JSON.stringify(e);
    } catch (t) {
      return '[UnexpectedJSONParseError]: ' + t.message;
    }
  };
});
var On = _((Bd, fo) => {
  'use strict';
  fo.exports = (e, t = process.argv) => {
    let r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--',
      n = t.indexOf(r + e),
      i = t.indexOf('--');
    return n !== -1 && (i === -1 || n < i);
  };
});
var Dn = _((Vd, go) => {
  'use strict';
  var tu = require('os'),
    mo = require('tty'),
    ye = On(),
    { env: Y } = process,
    qe;
  ye('no-color') || ye('no-colors') || ye('color=false') || ye('color=never')
    ? (qe = 0)
    : (ye('color') || ye('colors') || ye('color=true') || ye('color=always')) &&
      (qe = 1);
  'FORCE_COLOR' in Y &&
    (Y.FORCE_COLOR === 'true'
      ? (qe = 1)
      : Y.FORCE_COLOR === 'false'
      ? (qe = 0)
      : (qe =
          Y.FORCE_COLOR.length === 0
            ? 1
            : Math.min(parseInt(Y.FORCE_COLOR, 10), 3)));
  function Rn(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  function $n(e, t) {
    if (qe === 0) return 0;
    if (ye('color=16m') || ye('color=full') || ye('color=truecolor')) return 3;
    if (ye('color=256')) return 2;
    if (e && !t && qe === void 0) return 0;
    let r = qe || 0;
    if (Y.TERM === 'dumb') return r;
    if (process.platform === 'win32') {
      let n = tu.release().split('.');
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586
        ? Number(n[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ('CI' in Y)
      return [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some(n => n in Y) || Y.CI_NAME === 'codeship'
        ? 1
        : r;
    if ('TEAMCITY_VERSION' in Y)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(Y.TEAMCITY_VERSION) ? 1 : 0;
    if (Y.COLORTERM === 'truecolor') return 3;
    if ('TERM_PROGRAM' in Y) {
      let n = parseInt((Y.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (Y.TERM_PROGRAM) {
        case 'iTerm.app':
          return n >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    return /-256(color)?$/i.test(Y.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          Y.TERM
        ) || 'COLORTERM' in Y
      ? 1
      : r;
  }
  function ru(e) {
    let t = $n(e, e && e.isTTY);
    return Rn(t);
  }
  go.exports = {
    supportsColor: ru,
    stdout: Rn($n(!0, mo.isatty(1))),
    stderr: Rn($n(!0, mo.isatty(2))),
  };
});
var yo = _((Z, hr) => {
  var nu = require('tty'),
    gr = require('util');
  Z.init = cu;
  Z.log = au;
  Z.formatArgs = ou;
  Z.save = lu;
  Z.load = uu;
  Z.useColors = iu;
  Z.destroy = gr.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  Z.colors = [6, 2, 3, 4, 5, 1];
  try {
    let e = Dn();
    e &&
      (e.stderr || e).level >= 2 &&
      (Z.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]);
  } catch {}
  Z.inspectOpts = Object.keys(process.env)
    .filter(e => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (i, o) => o.toUpperCase()),
        n = process.env[t];
      return (
        /^(yes|on|true|enabled)$/i.test(n)
          ? (n = !0)
          : /^(no|off|false|disabled)$/i.test(n)
          ? (n = !1)
          : n === 'null'
          ? (n = null)
          : (n = Number(n)),
        (e[r] = n),
        e
      );
    }, {});
  function iu() {
    return 'colors' in Z.inspectOpts
      ? Boolean(Z.inspectOpts.colors)
      : nu.isatty(process.stderr.fd);
  }
  function ou(e) {
    let { namespace: t, useColors: r } = this;
    if (r) {
      let n = this.color,
        i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
        o = `  ${i};1m${t} \x1B[0m`;
      (e[0] =
        o +
        e[0]
          .split(
            `
`
          )
          .join(
            `
` + o
          )),
        e.push(i + 'm+' + hr.exports.humanize(this.diff) + '\x1B[0m');
    } else e[0] = su() + t + ' ' + e[0];
  }
  function su() {
    return Z.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
  }
  function au(...e) {
    return process.stderr.write(
      gr.format(...e) +
        `
`
    );
  }
  function lu(e) {
    e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
  }
  function uu() {
    return process.env.DEBUG;
  }
  function cu(e) {
    e.inspectOpts = {};
    let t = Object.keys(Z.inspectOpts);
    for (let r = 0; r < t.length; r++)
      e.inspectOpts[t[r]] = Z.inspectOpts[t[r]];
  }
  hr.exports = An()(Z);
  var { formatters: ho } = hr.exports;
  ho.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      gr
        .inspect(e, this.inspectOpts)
        .split(
          `
`
        )
        .map(t => t.trim())
        .join(' ')
    );
  };
  ho.O = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      gr.inspect(e, this.inspectOpts)
    );
  };
});
var bo = _((Ud, kn) => {
  typeof process > 'u' ||
  process.type === 'renderer' ||
  process.browser === !0 ||
  process.__nwjs
    ? (kn.exports = po())
    : (kn.exports = yo());
});
var Eo = _((Jd, du) => {
  du.exports = {
    name: 'dotenv',
    version: '16.0.3',
    description: 'Loads environment variables from .env file',
    main: 'lib/main.js',
    types: 'lib/main.d.ts',
    exports: {
      '.': {
        require: './lib/main.js',
        types: './lib/main.d.ts',
        default: './lib/main.js',
      },
      './config': './config.js',
      './config.js': './config.js',
      './lib/env-options': './lib/env-options.js',
      './lib/env-options.js': './lib/env-options.js',
      './lib/cli-options': './lib/cli-options.js',
      './lib/cli-options.js': './lib/cli-options.js',
      './package.json': './package.json',
    },
    scripts: {
      'dts-check': 'tsc --project tests/types/tsconfig.json',
      lint: 'standard',
      'lint-readme': 'standard-markdown',
      pretest: 'npm run lint && npm run dts-check',
      test: 'tap tests/*.js --100 -Rspec',
      prerelease: 'npm test',
      release: 'standard-version',
    },
    repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
    keywords: [
      'dotenv',
      'env',
      '.env',
      'environment',
      'variables',
      'config',
      'settings',
    ],
    readmeFilename: 'README.md',
    license: 'BSD-2-Clause',
    devDependencies: {
      '@types/node': '^17.0.9',
      decache: '^4.6.1',
      dtslint: '^3.7.0',
      sinon: '^12.0.1',
      standard: '^16.0.4',
      'standard-markdown': '^7.1.0',
      'standard-version': '^9.3.2',
      tap: '^15.1.6',
      tar: '^6.1.11',
      typescript: '^4.5.4',
    },
    engines: { node: '>=12' },
  };
});
var vo = _((Gd, wr) => {
  var mu = require('fs'),
    To = require('path'),
    gu = require('os'),
    hu = Eo(),
    yu = hu.version,
    bu =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;
  function wu(e) {
    let t = {},
      r = e.toString();
    r = r.replace(
      /\r\n?/gm,
      `
`
    );
    let n;
    for (; (n = bu.exec(r)) != null; ) {
      let i = n[1],
        o = n[2] || '';
      o = o.trim();
      let s = o[0];
      (o = o.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
        s === '"' &&
          ((o = o.replace(
            /\\n/g,
            `
`
          )),
          (o = o.replace(/\\r/g, '\r'))),
        (t[i] = o);
    }
    return t;
  }
  function Ln(e) {
    console.log(`[dotenv@${yu}][DEBUG] ${e}`);
  }
  function xu(e) {
    return e[0] === '~' ? To.join(gu.homedir(), e.slice(1)) : e;
  }
  function Eu(e) {
    let t = To.resolve(process.cwd(), '.env'),
      r = 'utf8',
      n = Boolean(e && e.debug),
      i = Boolean(e && e.override);
    e &&
      (e.path != null && (t = xu(e.path)),
      e.encoding != null && (r = e.encoding));
    try {
      let o = br.parse(mu.readFileSync(t, { encoding: r }));
      return (
        Object.keys(o).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? (i === !0 && (process.env[s] = o[s]),
              n &&
                Ln(
                  i === !0
                    ? `"${s}" is already defined in \`process.env\` and WAS overwritten`
                    : `"${s}" is already defined in \`process.env\` and was NOT overwritten`
                ))
            : (process.env[s] = o[s]);
        }),
        { parsed: o }
      );
    } catch (o) {
      return n && Ln(`Failed to load ${t} ${o.message}`), { error: o };
    }
  }
  var br = { config: Eu, parse: wu };
  wr.exports.config = br.config;
  wr.exports.parse = br.parse;
  wr.exports = br;
});
var Ao = _((Xd, So) => {
  'use strict';
  So.exports = e => {
    let t = e.match(/^[ \t]*(?=\S)/gm);
    return t ? t.reduce((r, n) => Math.min(r, n.length), 1 / 0) : 0;
  };
});
var qn = _((em, Oo) => {
  'use strict';
  var Mu = Ao();
  Oo.exports = e => {
    let t = Mu(e);
    if (t === 0) return e;
    let r = new RegExp(`^[ \\t]{${t}}`, 'gm');
    return e.replace(r, '');
  };
});
var Do = _((pm, Au) => {
  Au.exports = {
    name: '@prisma/engines-version',
    version: '4.14.0-67.d9a4c5988f480fa576d43970d5a23641aa77bc9c',
    main: 'index.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    author: 'Tim Suchanek <suchanek@prisma.io>',
    prisma: { enginesVersion: 'd9a4c5988f480fa576d43970d5a23641aa77bc9c' },
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/engines-wrapper.git',
      directory: 'packages/engines-version',
    },
    devDependencies: { '@types/node': '18.16.1', typescript: '4.9.5' },
    files: ['index.js', 'index.d.ts'],
    scripts: { build: 'tsc -d' },
  };
});
var Un = _(Tr => {
  'use strict';
  Object.defineProperty(Tr, '__esModule', { value: !0 });
  Tr.enginesVersion = void 0;
  Tr.enginesVersion = Do().prisma.enginesVersion;
});
var Io = _((mm, Qn) => {
  'use strict';
  var $ = Qn.exports;
  Qn.exports.default = $;
  var I = '\x1B[',
    It = '\x1B]',
    ft = '\x07',
    Pr = ';',
    ko = process.env.TERM_PROGRAM === 'Apple_Terminal';
  $.cursorTo = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required');
    return typeof t != 'number'
      ? I + (e + 1) + 'G'
      : I + (t + 1) + ';' + (e + 1) + 'H';
  };
  $.cursorMove = (e, t) => {
    if (typeof e != 'number')
      throw new TypeError('The `x` argument is required');
    let r = '';
    return (
      e < 0 ? (r += I + -e + 'D') : e > 0 && (r += I + e + 'C'),
      t < 0 ? (r += I + -t + 'A') : t > 0 && (r += I + t + 'B'),
      r
    );
  };
  $.cursorUp = (e = 1) => I + e + 'A';
  $.cursorDown = (e = 1) => I + e + 'B';
  $.cursorForward = (e = 1) => I + e + 'C';
  $.cursorBackward = (e = 1) => I + e + 'D';
  $.cursorLeft = I + 'G';
  $.cursorSavePosition = ko ? '\x1B7' : I + 's';
  $.cursorRestorePosition = ko ? '\x1B8' : I + 'u';
  $.cursorGetPosition = I + '6n';
  $.cursorNextLine = I + 'E';
  $.cursorPrevLine = I + 'F';
  $.cursorHide = I + '?25l';
  $.cursorShow = I + '?25h';
  $.eraseLines = e => {
    let t = '';
    for (let r = 0; r < e; r++)
      t += $.eraseLine + (r < e - 1 ? $.cursorUp() : '');
    return e && (t += $.cursorLeft), t;
  };
  $.eraseEndLine = I + 'K';
  $.eraseStartLine = I + '1K';
  $.eraseLine = I + '2K';
  $.eraseDown = I + 'J';
  $.eraseUp = I + '1J';
  $.eraseScreen = I + '2J';
  $.scrollUp = I + 'S';
  $.scrollDown = I + 'T';
  $.clearScreen = '\x1Bc';
  $.clearTerminal =
    process.platform === 'win32'
      ? `${$.eraseScreen}${I}0f`
      : `${$.eraseScreen}${I}3J${I}H`;
  $.beep = ft;
  $.link = (e, t) => [It, '8', Pr, Pr, t, ft, e, It, '8', Pr, Pr, ft].join('');
  $.image = (e, t = {}) => {
    let r = `${It}1337;File=inline=1`;
    return (
      t.width && (r += `;width=${t.width}`),
      t.height && (r += `;height=${t.height}`),
      t.preserveAspectRatio === !1 && (r += ';preserveAspectRatio=0'),
      r + ':' + e.toString('base64') + ft
    );
  };
  $.iTerm = {
    setCwd: (e = process.cwd()) => `${It}50;CurrentDir=${e}${ft}`,
    annotation: (e, t = {}) => {
      let r = `${It}1337;`,
        n = typeof t.x < 'u',
        i = typeof t.y < 'u';
      if ((n || i) && !(n && i && typeof t.length < 'u'))
        throw new Error(
          '`x`, `y` and `length` must be defined when `x` or `y` is defined'
        );
      return (
        (e = e.replace(/\|/g, '')),
        (r += t.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation='),
        t.length > 0
          ? (r += (n ? [e, t.length, t.x, t.y] : [t.length, e]).join('|'))
          : (r += e),
        r + ft
      );
    },
  };
});
var _o = _((gm, No) => {
  'use strict';
  var Ou = Dn(),
    dt = On();
  function Lo(e) {
    if (/^\d{3,4}$/.test(e)) {
      let r = /(\d{1,2})(\d{2})/.exec(e);
      return { major: 0, minor: parseInt(r[1], 10), patch: parseInt(r[2], 10) };
    }
    let t = (e || '').split('.').map(r => parseInt(r, 10));
    return { major: t[0], minor: t[1], patch: t[2] };
  }
  function Jn(e) {
    let { env: t } = process;
    if ('FORCE_HYPERLINK' in t)
      return !(
        t.FORCE_HYPERLINK.length > 0 && parseInt(t.FORCE_HYPERLINK, 10) === 0
      );
    if (
      dt('no-hyperlink') ||
      dt('no-hyperlinks') ||
      dt('hyperlink=false') ||
      dt('hyperlink=never')
    )
      return !1;
    if (dt('hyperlink=true') || dt('hyperlink=always') || 'NETLIFY' in t)
      return !0;
    if (
      !Ou.supportsColor(e) ||
      (e && !e.isTTY) ||
      process.platform === 'win32' ||
      'CI' in t ||
      'TEAMCITY_VERSION' in t
    )
      return !1;
    if ('TERM_PROGRAM' in t) {
      let r = Lo(t.TERM_PROGRAM_VERSION);
      switch (t.TERM_PROGRAM) {
        case 'iTerm.app':
          return r.major === 3 ? r.minor >= 1 : r.major > 3;
        case 'WezTerm':
          return r.major >= 20200620;
        case 'vscode':
          return r.major > 1 || (r.major === 1 && r.minor >= 72);
      }
    }
    if ('VTE_VERSION' in t) {
      if (t.VTE_VERSION === '0.50.0') return !1;
      let r = Lo(t.VTE_VERSION);
      return r.major > 0 || r.minor >= 50;
    }
    return !1;
  }
  No.exports = {
    supportsHyperlink: Jn,
    stdout: Jn(process.stdout),
    stderr: Jn(process.stderr),
  };
});
var qo = _((hm, Lt) => {
  'use strict';
  var Ru = Io(),
    Gn = _o(),
    jo = (e, t, { target: r = 'stdout', ...n } = {}) =>
      Gn[r]
        ? Ru.link(e, t)
        : n.fallback === !1
        ? e
        : typeof n.fallback == 'function'
        ? n.fallback(e, t)
        : `${e} (\u200B${t}\u200B)`;
  Lt.exports = (e, t, r = {}) => jo(e, t, r);
  Lt.exports.stderr = (e, t, r = {}) => jo(e, t, { target: 'stderr', ...r });
  Lt.exports.isSupported = Gn.stdout;
  Lt.exports.stderr.isSupported = Gn.stderr;
});
var jt = _((Jm, Xo) => {
  'use strict';
  Xo.exports = (e, t = 1, r) => {
    if (
      ((r = { indent: ' ', includeEmptyLines: !1, ...r }), typeof e != 'string')
    )
      throw new TypeError(
        `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
      );
    if (typeof t != 'number')
      throw new TypeError(
        `Expected \`count\` to be a \`number\`, got \`${typeof t}\``
      );
    if (typeof r.indent != 'string')
      throw new TypeError(
        `Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``
      );
    if (t === 0) return e;
    let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return e.replace(n, r.indent.repeat(t));
  };
});
var ns = _((Wm, rs) => {
  'use strict';
  rs.exports = ({ onlyFirst: e = !1 } = {}) => {
    let t = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    ].join('|');
    return new RegExp(t, e ? void 0 : 'g');
  };
});
var Vt = _((Hm, is) => {
  'use strict';
  var tc = ns();
  is.exports = e => (typeof e == 'string' ? e.replace(tc(), '') : e);
});
var os = _((Zm, Ar) => {
  'use strict';
  Ar.exports = (e = {}) => {
    let t;
    if (e.repoUrl) t = e.repoUrl;
    else if (e.user && e.repo) t = `https://github.com/${e.user}/${e.repo}`;
    else
      throw new Error(
        'You need to specify either the `repoUrl` option or both the `user` and `repo` options'
      );
    let r = new URL(`${t}/issues/new`),
      n = [
        'body',
        'title',
        'labels',
        'template',
        'milestone',
        'assignee',
        'projects',
      ];
    for (let i of n) {
      let o = e[i];
      if (o !== void 0) {
        if (i === 'labels' || i === 'projects') {
          if (!Array.isArray(o))
            throw new TypeError(`The \`${i}\` option should be an array`);
          o = o.join(',');
        }
        r.searchParams.set(i, o);
      }
    }
    return r.toString();
  };
  Ar.exports.default = Ar.exports;
});
var _r = _((Ug, Ps) => {
  'use strict';
  Ps.exports = (function () {
    function e(t, r, n, i, o) {
      return t < r || n < r ? (t > n ? n + 1 : t + 1) : i === o ? r : r + 1;
    }
    return function (t, r) {
      if (t === r) return 0;
      if (t.length > r.length) {
        var n = t;
        (t = r), (r = n);
      }
      for (
        var i = t.length, o = r.length;
        i > 0 && t.charCodeAt(i - 1) === r.charCodeAt(o - 1);

      )
        i--, o--;
      for (var s = 0; s < i && t.charCodeAt(s) === r.charCodeAt(s); ) s++;
      if (((i -= s), (o -= s), i === 0 || o < 3)) return o;
      var a = 0,
        l,
        u,
        c,
        p,
        f,
        d,
        m,
        g,
        b,
        h,
        x,
        w,
        E = [];
      for (l = 0; l < i; l++) E.push(l + 1), E.push(t.charCodeAt(s + l));
      for (var C = E.length - 1; a < o - 3; )
        for (
          b = r.charCodeAt(s + (u = a)),
            h = r.charCodeAt(s + (c = a + 1)),
            x = r.charCodeAt(s + (p = a + 2)),
            w = r.charCodeAt(s + (f = a + 3)),
            d = a += 4,
            l = 0;
          l < C;
          l += 2
        )
          (m = E[l]),
            (g = E[l + 1]),
            (u = e(m, u, c, b, g)),
            (c = e(u, c, p, h, g)),
            (p = e(c, p, f, x, g)),
            (d = e(p, f, d, w, g)),
            (E[l] = d),
            (f = p),
            (p = c),
            (c = u),
            (u = m);
      for (; a < o; )
        for (b = r.charCodeAt(s + (u = a)), d = ++a, l = 0; l < C; l += 2)
          (m = E[l]), (E[l] = d = e(m, u, d, b, E[l + 1])), (u = m);
      return d;
    };
  })();
});
var As = _((yi, bi) => {
  (function (e, t) {
    typeof require == 'function' &&
    typeof yi == 'object' &&
    typeof bi == 'object'
      ? (bi.exports = t())
      : (e.pluralize = t());
  })(yi, function () {
    var e = [],
      t = [],
      r = {},
      n = {},
      i = {};
    function o(d) {
      return typeof d == 'string' ? new RegExp('^' + d + '$', 'i') : d;
    }
    function s(d, m) {
      return d === m
        ? m
        : d === d.toLowerCase()
        ? m.toLowerCase()
        : d === d.toUpperCase()
        ? m.toUpperCase()
        : d[0] === d[0].toUpperCase()
        ? m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()
        : m.toLowerCase();
    }
    function a(d, m) {
      return d.replace(/\$(\d{1,2})/g, function (g, b) {
        return m[b] || '';
      });
    }
    function l(d, m) {
      return d.replace(m[0], function (g, b) {
        var h = a(m[1], arguments);
        return s(g === '' ? d[b - 1] : g, h);
      });
    }
    function u(d, m, g) {
      if (!d.length || r.hasOwnProperty(d)) return m;
      for (var b = g.length; b--; ) {
        var h = g[b];
        if (h[0].test(m)) return l(m, h);
      }
      return m;
    }
    function c(d, m, g) {
      return function (b) {
        var h = b.toLowerCase();
        return m.hasOwnProperty(h)
          ? s(b, h)
          : d.hasOwnProperty(h)
          ? s(b, d[h])
          : u(h, b, g);
      };
    }
    function p(d, m, g, b) {
      return function (h) {
        var x = h.toLowerCase();
        return m.hasOwnProperty(x)
          ? !0
          : d.hasOwnProperty(x)
          ? !1
          : u(x, x, g) === x;
      };
    }
    function f(d, m, g) {
      var b = m === 1 ? f.singular(d) : f.plural(d);
      return (g ? m + ' ' : '') + b;
    }
    return (
      (f.plural = c(i, n, e)),
      (f.isPlural = p(i, n, e)),
      (f.singular = c(n, i, t)),
      (f.isSingular = p(n, i, t)),
      (f.addPluralRule = function (d, m) {
        e.push([o(d), m]);
      }),
      (f.addSingularRule = function (d, m) {
        t.push([o(d), m]);
      }),
      (f.addUncountableRule = function (d) {
        if (typeof d == 'string') {
          r[d.toLowerCase()] = !0;
          return;
        }
        f.addPluralRule(d, '$0'), f.addSingularRule(d, '$0');
      }),
      (f.addIrregularRule = function (d, m) {
        (m = m.toLowerCase()), (d = d.toLowerCase()), (i[d] = m), (n[m] = d);
      }),
      [
        ['I', 'we'],
        ['me', 'us'],
        ['he', 'they'],
        ['she', 'they'],
        ['them', 'them'],
        ['myself', 'ourselves'],
        ['yourself', 'yourselves'],
        ['itself', 'themselves'],
        ['herself', 'themselves'],
        ['himself', 'themselves'],
        ['themself', 'themselves'],
        ['is', 'are'],
        ['was', 'were'],
        ['has', 'have'],
        ['this', 'these'],
        ['that', 'those'],
        ['echo', 'echoes'],
        ['dingo', 'dingoes'],
        ['volcano', 'volcanoes'],
        ['tornado', 'tornadoes'],
        ['torpedo', 'torpedoes'],
        ['genus', 'genera'],
        ['viscus', 'viscera'],
        ['stigma', 'stigmata'],
        ['stoma', 'stomata'],
        ['dogma', 'dogmata'],
        ['lemma', 'lemmata'],
        ['schema', 'schemata'],
        ['anathema', 'anathemata'],
        ['ox', 'oxen'],
        ['axe', 'axes'],
        ['die', 'dice'],
        ['yes', 'yeses'],
        ['foot', 'feet'],
        ['eave', 'eaves'],
        ['goose', 'geese'],
        ['tooth', 'teeth'],
        ['quiz', 'quizzes'],
        ['human', 'humans'],
        ['proof', 'proofs'],
        ['carve', 'carves'],
        ['valve', 'valves'],
        ['looey', 'looies'],
        ['thief', 'thieves'],
        ['groove', 'grooves'],
        ['pickaxe', 'pickaxes'],
        ['passerby', 'passersby'],
      ].forEach(function (d) {
        return f.addIrregularRule(d[0], d[1]);
      }),
      [
        [/s?$/i, 's'],
        [/[^\u0000-\u007F]$/i, '$0'],
        [/([^aeiou]ese)$/i, '$1'],
        [/(ax|test)is$/i, '$1es'],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
        [/(e[mn]u)s?$/i, '$1s'],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          '$1i',
        ],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
        [/(seraph|cherub)(?:im)?$/i, '$1im'],
        [/(her|at|gr)o$/i, '$1oes'],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
          '$1a',
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
          '$1a',
        ],
        [/sis$/i, 'ses'],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
        [/([^aeiouy]|qu)y$/i, '$1ies'],
        [/([^ch][ieo][ln])ey$/i, '$1ies'],
        [/(x|ch|ss|sh|zz)$/i, '$1es'],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
        [/(pe)(?:rson|ople)$/i, '$1ople'],
        [/(child)(?:ren)?$/i, '$1ren'],
        [/eaux$/i, '$0'],
        [/m[ae]n$/i, 'men'],
        ['thou', 'you'],
      ].forEach(function (d) {
        return f.addPluralRule(d[0], d[1]);
      }),
      [
        [/s$/i, ''],
        [/(ss)$/i, '$1'],
        [
          /(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,
          '$1fe',
        ],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
        [/ies$/i, 'y'],
        [
          /\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,
          '$1ie',
        ],
        [/\b(mon|smil)ies$/i, '$1ey'],
        [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
        [/(seraph|cherub)im$/i, '$1'],
        [
          /(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,
          '$1',
        ],
        [
          /(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,
          '$1sis',
        ],
        [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
        [/(test)(?:is|es)$/i, '$1is'],
        [
          /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
          '$1us',
        ],
        [
          /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,
          '$1um',
        ],
        [
          /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,
          '$1on',
        ],
        [/(alumn|alg|vertebr)ae$/i, '$1a'],
        [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
        [/(matr|append)ices$/i, '$1ix'],
        [/(pe)(rson|ople)$/i, '$1rson'],
        [/(child)ren$/i, '$1'],
        [/(eau)x?$/i, '$1'],
        [/men$/i, 'man'],
      ].forEach(function (d) {
        return f.addSingularRule(d[0], d[1]);
      }),
      [
        'adulthood',
        'advice',
        'agenda',
        'aid',
        'aircraft',
        'alcohol',
        'ammo',
        'analytics',
        'anime',
        'athletics',
        'audio',
        'bison',
        'blood',
        'bream',
        'buffalo',
        'butter',
        'carp',
        'cash',
        'chassis',
        'chess',
        'clothing',
        'cod',
        'commerce',
        'cooperation',
        'corps',
        'debris',
        'diabetes',
        'digestion',
        'elk',
        'energy',
        'equipment',
        'excretion',
        'expertise',
        'firmware',
        'flounder',
        'fun',
        'gallows',
        'garbage',
        'graffiti',
        'hardware',
        'headquarters',
        'health',
        'herpes',
        'highjinks',
        'homework',
        'housework',
        'information',
        'jeans',
        'justice',
        'kudos',
        'labour',
        'literature',
        'machinery',
        'mackerel',
        'mail',
        'media',
        'mews',
        'moose',
        'music',
        'mud',
        'manga',
        'news',
        'only',
        'personnel',
        'pike',
        'plankton',
        'pliers',
        'police',
        'pollution',
        'premises',
        'rain',
        'research',
        'rice',
        'salmon',
        'scissors',
        'series',
        'sewage',
        'shambles',
        'shrimp',
        'software',
        'species',
        'staff',
        'swine',
        'tennis',
        'traffic',
        'transportation',
        'trout',
        'tuna',
        'wealth',
        'welfare',
        'whiting',
        'wildebeest',
        'wildlife',
        'you',
        /pok[eé]mon$/i,
        /[^aeiou]ese$/i,
        /deer$/i,
        /fish$/i,
        /measles$/i,
        /o[iu]s$/i,
        /pox$/i,
        /sheep$/i,
      ].forEach(f.addUncountableRule),
      f
    );
  });
});
var la = _((My, aa) => {
  'use strict';
  aa.exports = e => Object.prototype.toString.call(e) === '[object RegExp]';
});
var ca = _((Fy, ua) => {
  'use strict';
  ua.exports = e => {
    let t = typeof e;
    return e !== null && (t === 'object' || t === 'function');
  };
});
var pa = _(vi => {
  'use strict';
  Object.defineProperty(vi, '__esModule', { value: !0 });
  vi.default = e =>
    Object.getOwnPropertySymbols(e).filter(t =>
      Object.prototype.propertyIsEnumerable.call(e, t)
    );
});
var Oa = _((Ib, cf) => {
  cf.exports = {
    name: '@prisma/client',
    version: '4.14.1',
    description:
      "Prisma Client is an auto-generated, type-safe and modern JavaScript/TypeScript ORM for Node.js that's tailored to your data. Supports MySQL, PostgreSQL, MariaDB, SQLite databases.",
    keywords: [
      'orm',
      'prisma2',
      'prisma',
      'client',
      'query',
      'database',
      'sql',
      'postgres',
      'postgresql',
      'mysql',
      'sqlite',
      'mariadb',
      'mssql',
      'typescript',
      'query-builder',
    ],
    main: 'index.js',
    browser: 'index-browser.js',
    types: 'index.d.ts',
    license: 'Apache-2.0',
    engines: { node: '>=14.17' },
    homepage: 'https://www.prisma.io',
    repository: {
      type: 'git',
      url: 'https://github.com/prisma/prisma.git',
      directory: 'packages/client',
    },
    author: 'Tim Suchanek <suchanek@prisma.io>',
    bugs: 'https://github.com/prisma/prisma/issues',
    scripts: {
      dev: 'DEV=true node -r esbuild-register helpers/build.ts',
      build: 'node -r esbuild-register helpers/build.ts',
      test: 'jest --silent',
      'test:e2e': 'node -r esbuild-register tests/e2e/_utils/run.ts',
      'test:functional':
        'node -r esbuild-register helpers/functional-test/run-tests.ts',
      'test:memory': 'node -r esbuild-register helpers/memory-tests.ts',
      'test:functional:code':
        'node -r esbuild-register helpers/functional-test/run-tests.ts --no-types',
      'test:functional:types':
        'node -r esbuild-register helpers/functional-test/run-tests.ts --types-only',
      'test-notypes':
        'jest --silent --testPathIgnorePatterns src/__tests__/types/types.test.ts',
      generate: 'node scripts/postinstall.js',
      postinstall: 'node scripts/postinstall.js',
      prepublishOnly: 'pnpm run build',
      'new-test':
        "NODE_OPTIONS='-r ts-node/register' yo ./helpers/generator-test/index.ts",
    },
    files: [
      'README.md',
      'runtime',
      '!runtime/*.map',
      'scripts',
      'generator-build',
      'edge.js',
      'edge.d.ts',
      'index.js',
      'index.d.ts',
      'index-browser.js',
    ],
    devDependencies: {
      '@codspeed/benchmark.js-plugin': '1.1.0',
      '@faker-js/faker': '7.6.0',
      '@fast-check/jest': '1.6.1',
      '@jest/create-cache-key-function': '29.5.0',
      '@jest/globals': '29.5.0',
      '@jest/test-sequencer': '29.5.0',
      '@opentelemetry/api': '1.4.1',
      '@opentelemetry/context-async-hooks': '1.12.0',
      '@opentelemetry/instrumentation': '0.38.0',
      '@opentelemetry/resources': '1.12.0',
      '@opentelemetry/sdk-trace-base': '1.12.0',
      '@opentelemetry/semantic-conventions': '1.12.0',
      '@prisma/debug': 'workspace:*',
      '@prisma/engines': 'workspace:*',
      '@prisma/fetch-engine': 'workspace:*',
      '@prisma/generator-helper': 'workspace:*',
      '@prisma/get-platform': 'workspace:*',
      '@prisma/instrumentation': 'workspace:*',
      '@prisma/internals': 'workspace:*',
      '@prisma/migrate': 'workspace:*',
      '@prisma/mini-proxy': '0.7.0',
      '@swc-node/register': '1.5.5',
      '@swc/core': '1.3.32',
      '@swc/jest': '0.2.26',
      '@timsuchanek/copy': '1.4.5',
      '@types/debug': '4.1.7',
      '@types/fs-extra': '9.0.13',
      '@types/jest': '29.5.1',
      '@types/js-levenshtein': '1.1.1',
      '@types/mssql': '8.1.2',
      '@types/node': '18.16.3',
      '@types/pg': '8.6.6',
      '@types/yeoman-generator': '5.2.11',
      arg: '5.0.2',
      benchmark: '2.1.4',
      'ci-info': '3.8.0',
      'decimal.js': '10.4.3',
      esbuild: '0.15.13',
      execa: '5.1.1',
      'expect-type': '0.15.0',
      'flat-map-polyfill': '0.3.8',
      'fs-extra': '11.1.0',
      'fs-monkey': '1.0.3',
      'get-own-enumerable-property-symbols': '3.0.2',
      'get-stream': '6.0.1',
      globby: '11.1.0',
      'indent-string': '4.0.0',
      'is-obj': '2.0.0',
      'is-regexp': '2.1.0',
      jest: '29.5.0',
      'jest-junit': '16.0.0',
      'jest-serializer-ansi-escapes': '2.0.1',
      'jest-snapshot': '29.5.0',
      'js-levenshtein': '1.1.6',
      kleur: '4.1.5',
      klona: '2.0.6',
      'lz-string': '1.4.4',
      mariadb: '3.0.2',
      memfs: '3.4.13',
      mssql: '9.1.1',
      'new-github-issue-url': '0.2.1',
      'node-fetch': '2.6.9',
      'p-retry': '4.6.2',
      pg: '8.9.0',
      'pkg-up': '3.1.0',
      pluralize: '8.0.0',
      resolve: '1.22.1',
      rimraf: '3.0.2',
      'simple-statistics': '7.8.2',
      'sort-keys': '4.2.0',
      'source-map-support': '0.5.21',
      'sql-template-tag': '5.0.3',
      'stacktrace-parser': '0.1.10',
      'strip-ansi': '6.0.1',
      'strip-indent': '3.0.0',
      'ts-node': '10.9.1',
      'ts-pattern': '4.1.3',
      tsd: '0.28.1',
      typescript: '4.9.5',
      undici: '5.22.0',
      'yeoman-generator': '5.7.0',
      yo: '4.3.1',
      zx: '7.1.1',
    },
    peerDependencies: { prisma: '*' },
    peerDependenciesMeta: { prisma: { optional: !0 } },
    dependencies: {
      '@prisma/engines-version':
        '4.14.0-67.d9a4c5988f480fa576d43970d5a23641aa77bc9c',
    },
    sideEffects: !1,
  };
});
var hd = {};
pr(hd, {
  DMMF: () => be,
  DMMFClass: () => Ke,
  Debug: () => In,
  Decimal: () => ge,
  Extensions: () => Fn,
  MetricsClient: () => gt,
  NotFoundError: () => Ee,
  PrismaClientInitializationError: () => G,
  PrismaClientKnownRequestError: () => ne,
  PrismaClientRustPanicError: () => me,
  PrismaClientUnknownRequestError: () => ie,
  PrismaClientValidationError: () => W,
  Sql: () => he,
  Types: () => Cn,
  decompressFromBase64: () => kl,
  defineDmmfProperty: () => ls,
  empty: () => il,
  getPrismaClient: () => $l,
  join: () => nl,
  makeDocument: () => en,
  makeStrictEnum: () => Dl,
  objectEnumValues: () => bt,
  raw: () => Ji,
  sqltag: () => Gi,
  transformDocument: () => ma,
  unpack: () => tn,
  warnEnvConflicts: () => Il,
  warnOnce: () => Ut,
});
module.exports = Bl(hd);
var Fn = {};
pr(Fn, { defineExtension: () => Xi, getExtensionContext: () => eo });
function Xi(e) {
  return typeof e == 'function' ? e : t => t.$extends(e);
}
function eo(e) {
  return e;
}
var Cn = {};
pr(Cn, { Extensions: () => to, Public: () => ro, Utils: () => no });
var to = {};
var ro = {};
var no = {};
var Sn,
  io,
  oo,
  so,
  ao = !0;
typeof process < 'u' &&
  (({
    FORCE_COLOR: Sn,
    NODE_DISABLE_COLORS: io,
    NO_COLOR: oo,
    TERM: so,
  } = process.env || {}),
  (ao = process.stdout && process.stdout.isTTY));
var Vl = {
  enabled:
    !io && oo == null && so !== 'dumb' && ((Sn != null && Sn !== '0') || ao),
};
function j(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, 'g'),
    n = `\x1B[${e}m`,
    i = `\x1B[${t}m`;
  return function (o) {
    return !Vl.enabled || o == null
      ? o
      : n + (~('' + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
  };
}
var Td = j(0, 0),
  P = j(1, 22),
  D = j(2, 22),
  vd = j(3, 23),
  K = j(4, 24),
  Pd = j(7, 27),
  Md = j(8, 28),
  Fd = j(9, 29),
  Cd = j(30, 39),
  A = j(31, 39),
  S = j(32, 39),
  Se = j(33, 39),
  st = j(34, 39),
  Sd = j(35, 39),
  je = j(36, 39),
  Ot = j(37, 39),
  fr = j(90, 39),
  Ad = j(90, 39),
  Od = j(40, 49),
  Rd = j(41, 49),
  $d = j(42, 49),
  Dd = j(43, 49),
  kd = j(44, 49),
  Id = j(45, 49),
  Ld = j(46, 49),
  Nd = j(47, 49);
var yr = R(bo()),
  pu = 100,
  Rt = [];
typeof process < 'u' &&
  typeof process.stderr?.write != 'function' &&
  (yr.default.log = console.debug ?? console.log);
function fu(e) {
  let t = (0, yr.default)(e),
    r = Object.assign(
      (...n) => (
        (t.log = r.log),
        n.length !== 0 && Rt.push([e, ...n]),
        Rt.length > pu && Rt.shift(),
        t('', ...n)
      ),
      t
    );
  return r;
}
var In = Object.assign(fu, yr.default);
function wo(e = 7500) {
  let t = Rt.map(r =>
    r.map(n => (typeof n == 'string' ? n : JSON.stringify(n))).join(' ')
  ).join(`
`);
  return t.length < e ? t : t.slice(-e);
}
function xo() {
  Rt.length = 0;
}
var J = In;
var _n = R(vo()),
  xr = R(require('fs'));
var ct = R(require('path'));
function Po(e) {
  let t = e.ignoreProcessEnv ? {} : process.env,
    r = n =>
      n.match(/(.?\${(?:[a-zA-Z0-9_]+)?})/g)?.reduce(function (o, s) {
        let a = /(.?)\${([a-zA-Z0-9_]+)?}/g.exec(s);
        if (!a) return o;
        let l = a[1],
          u,
          c;
        if (l === '\\') (c = a[0]), (u = c.replace('\\$', '$'));
        else {
          let p = a[2];
          (c = a[0].substring(l.length)),
            (u = Object.hasOwnProperty.call(t, p) ? t[p] : e.parsed[p] || ''),
            (u = r(u));
        }
        return o.replace(c, u);
      }, n) ?? n;
  for (let n in e.parsed) {
    let i = Object.hasOwnProperty.call(t, n) ? t[n] : e.parsed[n];
    e.parsed[n] = r(i);
  }
  for (let n in e.parsed) t[n] = e.parsed[n];
  return e;
}
var Nn = J('prisma:tryLoadEnv');
function $t(
  { rootEnvPath: e, schemaEnvPath: t },
  r = { conflictCheck: 'none' }
) {
  let n = Mo(e);
  r.conflictCheck !== 'none' && Tu(n, t, r.conflictCheck);
  let i = null;
  return (
    Fo(n?.path, t) || (i = Mo(t)),
    !n && !i && Nn('No Environment variables loaded'),
    i?.dotenvResult.error
      ? console.error(A(P('Schema Env Error: ')) + i.dotenvResult.error)
      : {
          message: [n?.message, i?.message].filter(Boolean).join(`
`),
          parsed: { ...n?.dotenvResult?.parsed, ...i?.dotenvResult?.parsed },
        }
  );
}
function Tu(e, t, r) {
  let n = e?.dotenvResult.parsed,
    i = !Fo(e?.path, t);
  if (n && t && i && xr.default.existsSync(t)) {
    let o = _n.default.parse(xr.default.readFileSync(t)),
      s = [];
    for (let a in o) n[a] === o[a] && s.push(a);
    if (s.length > 0) {
      let a = ct.default.relative(process.cwd(), e.path),
        l = ct.default.relative(process.cwd(), t);
      if (r === 'error') {
        let u = `There is a conflict between env var${
          s.length > 1 ? 's' : ''
        } in ${K(a)} and ${K(l)}
Conflicting env vars:
${s.map(c => `  ${P(c)}`).join(`
`)}

We suggest to move the contents of ${K(l)} to ${K(
          a
        )} to consolidate your env vars.
`;
        throw new Error(u);
      } else if (r === 'warn') {
        let u = `Conflict for env var${s.length > 1 ? 's' : ''} ${s
          .map(c => P(c))
          .join(', ')} in ${K(a)} and ${K(l)}
Env vars from ${K(l)} overwrite the ones from ${K(a)}
      `;
        console.warn(`${Se('warn(prisma)')} ${u}`);
      }
    }
  }
}
function Mo(e) {
  return vu(e)
    ? (Nn(`Environment variables loaded from ${e}`),
      {
        dotenvResult: Po(
          _n.default.config({
            path: e,
            debug: process.env.DOTENV_CONFIG_DEBUG ? !0 : void 0,
          })
        ),
        message: D(
          `Environment variables loaded from ${ct.default.relative(
            process.cwd(),
            e
          )}`
        ),
        path: e,
      })
    : (Nn(`Environment variables not found at ${e}`), null);
}
function Fo(e, t) {
  return e && t && ct.default.resolve(e) === ct.default.resolve(t);
}
function vu(e) {
  return Boolean(e && xr.default.existsSync(e));
}
var Co = 'library';
function jn(e) {
  let t = Pu();
  return (
    t ||
    (e?.config.engineType === 'library'
      ? 'library'
      : e?.config.engineType === 'binary'
      ? 'binary'
      : Co)
  );
}
function Pu() {
  let e = process.env.PRISMA_CLIENT_ENGINE_TYPE;
  return e === 'library' ? 'library' : e === 'binary' ? 'binary' : void 0;
}
var Fu = R(qn());
function Dt(e) {
  return e instanceof Error;
}
function Bn(e) {
  let t = process.env.PRISMA_ENGINE_PROTOCOL;
  if (t === 'json' || t == 'graphql') return t;
  if (t !== void 0)
    throw new Error(
      `Invalid PRISMA_ENGINE_PROTOCOL env variable value. Expected 'graphql' or 'json', got '${t}'`
    );
  return e?.previewFeatures?.includes('jsonProtocol') ? 'json' : 'graphql';
}
var Er = Symbol('@ts-pattern/matcher'),
  Ro = '@ts-pattern/anonymous-select-key',
  $o = function (e) {
    return Boolean(e && typeof e == 'object');
  },
  Vn = function (e) {
    return e && !!e[Er];
  },
  Cu = function e(t, r, n) {
    if ($o(t)) {
      if (Vn(t)) {
        var i = t[Er]().match(r),
          o = i.matched,
          s = i.selections;
        return (
          o &&
            s &&
            Object.keys(s).forEach(function (l) {
              return n(l, s[l]);
            }),
          o
        );
      }
      if (!$o(r)) return !1;
      if (Array.isArray(t))
        return (
          !!Array.isArray(r) &&
          t.length === r.length &&
          t.every(function (l, u) {
            return e(l, r[u], n);
          })
        );
      if (t instanceof Map)
        return (
          r instanceof Map &&
          Array.from(t.keys()).every(function (l) {
            return e(t.get(l), r.get(l), n);
          })
        );
      if (t instanceof Set) {
        if (!(r instanceof Set)) return !1;
        if (t.size === 0) return r.size === 0;
        if (t.size === 1) {
          var a = Array.from(t.values())[0];
          return Vn(a)
            ? Array.from(r.values()).every(function (l) {
                return e(a, l, n);
              })
            : r.has(a);
        }
        return Array.from(t.values()).every(function (l) {
          return r.has(l);
        });
      }
      return Object.keys(t).every(function (l) {
        var u,
          c = t[l];
        return (
          (l in r || (Vn((u = c)) && u[Er]().matcherType === 'optional')) &&
          e(c, r[l], n)
        );
      });
    }
    return Object.is(r, t);
  };
function tt(e) {
  var t;
  return (
    ((t = {})[Er] = function () {
      return {
        match: function (r) {
          return { matched: Boolean(e(r)) };
        },
      };
    }),
    t
  );
}
var nm = tt(function (e) {
  return !0;
});
var im = tt(function (e) {
    return typeof e == 'string';
  }),
  om = tt(function (e) {
    return typeof e == 'number';
  }),
  sm = tt(function (e) {
    return typeof e == 'boolean';
  }),
  am = tt(function (e) {
    return typeof e == 'bigint';
  }),
  lm = tt(function (e) {
    return typeof e == 'symbol';
  }),
  um = tt(function (e) {
    return e == null;
  });
function pt(e) {
  return new Su(e, []);
}
var Su = (function () {
  function e(r, n) {
    (this.value = void 0),
      (this.cases = void 0),
      (this.value = r),
      (this.cases = n);
  }
  var t = e.prototype;
  return (
    (t.with = function () {
      var r = [].slice.call(arguments),
        n = r[r.length - 1],
        i = [r[0]],
        o = [];
      return (
        r.length === 3 && typeof r[1] == 'function'
          ? (i.push(r[0]), o.push(r[1]))
          : r.length > 2 && i.push.apply(i, r.slice(1, r.length - 1)),
        new e(
          this.value,
          this.cases.concat([
            {
              match: function (s) {
                var a = {},
                  l = Boolean(
                    i.some(function (u) {
                      return Cu(u, s, function (c, p) {
                        a[c] = p;
                      });
                    }) &&
                      o.every(function (u) {
                        return u(s);
                      })
                  );
                return {
                  matched: l,
                  value: l && Object.keys(a).length ? (Ro in a ? a[Ro] : a) : s,
                };
              },
              handler: n,
            },
          ])
        )
      );
    }),
    (t.when = function (r, n) {
      return new e(
        this.value,
        this.cases.concat([
          {
            match: function (i) {
              return { matched: Boolean(r(i)), value: i };
            },
            handler: n,
          },
        ])
      );
    }),
    (t.otherwise = function (r) {
      return new e(
        this.value,
        this.cases.concat([
          {
            match: function (n) {
              return { matched: !0, value: n };
            },
            handler: r,
          },
        ])
      ).run();
    }),
    (t.exhaustive = function () {
      return this.run();
    }),
    (t.run = function () {
      for (var r = this.value, n = void 0, i = 0; i < this.cases.length; i++) {
        var o = this.cases[i],
          s = o.match(this.value);
        if (s.matched) {
          (r = s.value), (n = o.handler);
          break;
        }
      }
      if (!n) {
        var a;
        try {
          a = JSON.stringify(this.value);
        } catch {
          a = this.value;
        }
        throw new Error(
          'Pattern matching error: no pattern matches value ' + a
        );
      }
      return n(r, this.value);
    }),
    e
  );
})();
var Gu = R(Un());
var vr = 'libquery_engine';
function kt(e, t) {
  let r = t === 'url';
  return e.includes('windows')
    ? r
      ? 'query_engine.dll.node'
      : `query_engine-${e}.dll.node`
    : e.includes('darwin')
    ? r
      ? `${vr}.dylib.node`
      : `${vr}-${e}.dylib.node`
    : r
    ? `${vr}.so.node`
    : `${vr}-${e}.so.node`;
}
var Qo = R(require('child_process')),
  Kn = R(require('fs/promises')),
  Fr = R(require('os'));
var Jo = require('util');
var Bo = R(qo());
function Nt(e) {
  return (0, Bo.default)(e, e, { fallback: K });
}
var $u = { warn: Se('prisma:warn') },
  Du = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
function _t(e, ...t) {
  Du.warn() && console.warn(`${$u.warn} ${e}`, ...t);
}
var ku = (0, Jo.promisify)(Qo.default.exec),
  de = J('prisma:get-platform'),
  Iu = ['1.0.x', '1.1.x', '3.0.x'];
async function Go() {
  let e = Fr.default.platform(),
    t = process.arch;
  if (e === 'freebsd') {
    let s = await Cr('freebsd-version');
    if (s && s.trim().length > 0) {
      let l = /^(\d+)\.?/.exec(s);
      if (l)
        return { platform: 'freebsd', targetDistro: `freebsd${l[1]}`, arch: t };
    }
  }
  if (e !== 'linux') return { platform: e, arch: t };
  let r = await Nu(),
    n = await Ju(),
    i = ju({ arch: t, archFromUname: n, familyDistro: r.familyDistro }),
    { libssl: o } = await qu(i);
  return { platform: 'linux', libssl: o, arch: t, archFromUname: n, ...r };
}
function Lu(e) {
  let t = /^ID="?([^"\n]*)"?$/im,
    r = /^ID_LIKE="?([^"\n]*)"?$/im,
    n = t.exec(e),
    i = (n && n[1] && n[1].toLowerCase()) || '',
    o = r.exec(e),
    s = (o && o[1] && o[1].toLowerCase()) || '',
    a = pt({ id: i, idLike: s })
      .with({ id: 'alpine' }, ({ id: l }) => ({
        targetDistro: 'musl',
        familyDistro: l,
        originalDistro: l,
      }))
      .with({ id: 'raspbian' }, ({ id: l }) => ({
        targetDistro: 'arm',
        familyDistro: 'debian',
        originalDistro: l,
      }))
      .with({ id: 'nixos' }, ({ id: l }) => ({
        targetDistro: 'nixos',
        originalDistro: l,
        familyDistro: 'nixos',
      }))
      .with({ id: 'debian' }, { id: 'ubuntu' }, ({ id: l }) => ({
        targetDistro: 'debian',
        familyDistro: 'debian',
        originalDistro: l,
      }))
      .with(
        { id: 'rhel' },
        { id: 'centos' },
        { id: 'fedora' },
        ({ id: l }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: l,
        })
      )
      .when(
        ({ idLike: l }) => l.includes('debian') || l.includes('ubuntu'),
        ({ id: l }) => ({
          targetDistro: 'debian',
          familyDistro: 'debian',
          originalDistro: l,
        })
      )
      .when(
        ({ idLike: l }) => i === 'arch' || l.includes('arch'),
        ({ id: l }) => ({
          targetDistro: 'debian',
          familyDistro: 'arch',
          originalDistro: l,
        })
      )
      .when(
        ({ idLike: l }) =>
          l.includes('centos') ||
          l.includes('fedora') ||
          l.includes('rhel') ||
          l.includes('suse'),
        ({ id: l }) => ({
          targetDistro: 'rhel',
          familyDistro: 'rhel',
          originalDistro: l,
        })
      )
      .otherwise(({ id: l }) => ({
        targetDistro: void 0,
        familyDistro: void 0,
        originalDistro: l,
      }));
  return (
    de(`Found distro info:
${JSON.stringify(a, null, 2)}`),
    a
  );
}
async function Nu() {
  let e = '/etc/os-release';
  try {
    let t = await Kn.default.readFile(e, { encoding: 'utf-8' });
    return Lu(t);
  } catch {
    return {
      targetDistro: void 0,
      familyDistro: void 0,
      originalDistro: void 0,
    };
  }
}
function _u(e) {
  let t = /^OpenSSL\s(\d+\.\d+)\.\d+/.exec(e);
  if (t) {
    let r = `${t[1]}.x`;
    return Ko(r);
  }
}
function Vo(e) {
  let t = /libssl\.so\.(\d)(\.\d)?/.exec(e);
  if (t) {
    let r = `${t[1]}${t[2] ?? '.0'}.x`;
    return Ko(r);
  }
}
function Ko(e) {
  let t = (() => {
    if (Ho(e)) return e;
    let r = e.split('.');
    return (r[1] = '0'), r.join('.');
  })();
  if (Iu.includes(t)) return t;
}
function ju(e) {
  return pt(e)
    .with(
      { familyDistro: 'musl' },
      () => (de('Trying platform-specific paths for "alpine"'), ['/lib'])
    )
    .with(
      { familyDistro: 'debian' },
      ({ archFromUname: t }) => (
        de('Trying platform-specific paths for "debian" (and "ubuntu")'),
        [`/usr/lib/${t}-linux-gnu`, `/lib/${t}-linux-gnu`]
      )
    )
    .with(
      { familyDistro: 'rhel' },
      () => (
        de('Trying platform-specific paths for "rhel"'),
        ['/lib64', '/usr/lib64']
      )
    )
    .otherwise(
      ({ familyDistro: t, arch: r, archFromUname: n }) => (
        de(`Don't know any platform-specific paths for "${t}" on ${r} (${n})`),
        []
      )
    );
}
async function qu(e) {
  let t = 'grep -v "libssl.so.0"',
    r = await Uo(e);
  if (r) {
    de(`Found libssl.so file using platform-specific paths: ${r}`);
    let o = Vo(r);
    if ((de(`The parsed libssl version is: ${o}`), o))
      return { libssl: o, strategy: 'libssl-specific-path' };
  }
  de('Falling back to "ldconfig" and other generic paths');
  let n = await Cr(
    `ldconfig -p | sed "s/.*=>s*//" | sed "s|.*/||" | grep libssl | sort | ${t}`
  );
  if ((n || (n = await Uo(['/lib64', '/usr/lib64', '/lib'])), n)) {
    de(`Found libssl.so file using "ldconfig" or other generic paths: ${n}`);
    let o = Vo(n);
    if (o) return { libssl: o, strategy: 'ldconfig' };
  }
  let i = await Cr('openssl version -v');
  if (i) {
    de(`Found openssl binary with version: ${i}`);
    let o = _u(i);
    if ((de(`The parsed openssl version is: ${o}`), o))
      return { libssl: o, strategy: 'openssl-binary' };
  }
  return de("Couldn't find any version of libssl or OpenSSL in the system"), {};
}
async function Uo(e) {
  for (let t of e) {
    let r = await Bu(t);
    if (r) return r;
  }
}
async function Bu(e) {
  try {
    return (await Kn.default.readdir(e)).find(
      r => r.startsWith('libssl.so') && !r.startsWith('libssl.so.0')
    );
  } catch (t) {
    if (t.code === 'ENOENT') return;
    throw t;
  }
}
async function Be() {
  let { binaryTarget: e } = await Wo();
  return e;
}
function Vu(e) {
  return e.binaryTarget !== void 0;
}
async function Wn() {
  let { memoized: e, ...t } = await Wo();
  return t;
}
var Mr = {};
async function Wo() {
  if (Vu(Mr)) return Promise.resolve({ ...Mr, memoized: !0 });
  let e = await Go(),
    t = Uu(e);
  return (Mr = { ...e, binaryTarget: t }), { ...Mr, memoized: !1 };
}
function Uu(e) {
  let {
    platform: t,
    arch: r,
    archFromUname: n,
    libssl: i,
    targetDistro: o,
    familyDistro: s,
    originalDistro: a,
  } = e;
  t === 'linux' &&
    !['x64', 'arm64'].includes(r) &&
    _t(
      `Prisma only officially supports Linux on amd64 (x86_64) and arm64 (aarch64) system architectures. If you are using your own custom Prisma engines, you can ignore this warning, as long as you've compiled the engines for your system architecture "${n}".`
    );
  let l = '1.1.x';
  if (t === 'linux' && i === void 0) {
    let c = pt({ familyDistro: s })
      .with(
        { familyDistro: 'debian' },
        () =>
          "Please manually install OpenSSL via `apt-get update -y && apt-get install -y openssl` and try installing Prisma again. If you're running Prisma on Docker, you may also try to replace your base image with `node:lts-slim`, which already ships with OpenSSL installed."
      )
      .otherwise(
        () => 'Please manually install OpenSSL and try installing Prisma again.'
      );
    _t(`Prisma failed to detect the libssl/openssl version to use, and may not work as expected. Defaulting to "openssl-${l}".
${c}`);
  }
  let u = 'debian';
  if (
    (t === 'linux' &&
      o === void 0 &&
      _t(`Prisma doesn't know which engines to download for the Linux distro "${a}". Falling back to Prisma engines built "${u}".
Please report your experience by creating an issue at ${Nt(
        'https://github.com/prisma/prisma/issues'
      )} so we can add your distro to the list of known supported distros.`),
    t === 'darwin' && r === 'arm64')
  )
    return 'darwin-arm64';
  if (t === 'darwin') return 'darwin';
  if (t === 'win32') return 'windows';
  if (t === 'freebsd') return o;
  if (t === 'openbsd') return 'openbsd';
  if (t === 'netbsd') return 'netbsd';
  if (t === 'linux' && o === 'nixos') return 'linux-nixos';
  if (t === 'linux' && r === 'arm64')
    return `${o === 'musl' ? 'linux-musl-arm64' : 'linux-arm64'}-openssl-${
      i || l
    }`;
  if (t === 'linux' && r === 'arm') return `linux-arm-openssl-${i || l}`;
  if (t === 'linux' && o === 'musl') {
    let c = 'linux-musl';
    return !i || Ho(i) ? c : `${c}-openssl-${i}`;
  }
  return t === 'linux' && o && i
    ? `${o}-openssl-${i}`
    : (t !== 'linux' &&
        _t(
          `Prisma detected unknown OS "${t}" and may not work as expected. Defaulting to "linux".`
        ),
      i ? `${u}-openssl-${i}` : o ? `${o}-openssl-${l}` : `${u}-openssl-${l}`);
}
async function Qu(e) {
  try {
    return await e();
  } catch {
    return;
  }
}
function Cr(e) {
  return Qu(async () => {
    let t = await ku(e);
    return de(`Command "${e}" successfully returned "${t.stdout}"`), t.stdout;
  });
}
async function Ju() {
  return typeof Fr.default.machine == 'function'
    ? Fr.default.machine()
    : (await Cr('uname -m'))?.trim();
}
function Ho(e) {
  return e.startsWith('1.');
}
var zo = R(require('fs'));
function Hn() {
  let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY;
  if (!(e && zo.default.existsSync(e)) && process.arch === 'ia32')
    throw new Error(
      'The default query engine type (Node-API, "library") is currently not supported for 32bit Node. Please set `engineType = "binary"` in the "generator" block of your "schema.prisma" file (or use the environment variables "PRISMA_CLIENT_ENGINE_TYPE=binary" and/or "PRISMA_CLI_QUERY_ENGINE_TYPE=binary".)'
    );
}
var zn = [
  'darwin',
  'darwin-arm64',
  'debian-openssl-1.0.x',
  'debian-openssl-1.1.x',
  'debian-openssl-3.0.x',
  'rhel-openssl-1.0.x',
  'rhel-openssl-1.1.x',
  'rhel-openssl-3.0.x',
  'linux-arm64-openssl-1.1.x',
  'linux-arm64-openssl-1.0.x',
  'linux-arm64-openssl-3.0.x',
  'linux-arm-openssl-1.1.x',
  'linux-arm-openssl-1.0.x',
  'linux-arm-openssl-3.0.x',
  'linux-musl',
  'linux-musl-openssl-3.0.x',
  'linux-musl-arm64-openssl-1.1.x',
  'linux-musl-arm64-openssl-3.0.x',
  'linux-nixos',
  'windows',
  'freebsd11',
  'freebsd12',
  'freebsd13',
  'openbsd',
  'netbsd',
  'arm',
];
var B = R(require('path')),
  Ku = R(Un()),
  Lm = J('prisma:engines');
function Yo() {
  return B.default.join(__dirname, '../');
}
var Nm = 'libquery-engine';
B.default.join(__dirname, '../query-engine-darwin');
B.default.join(__dirname, '../query-engine-darwin-arm64');
B.default.join(__dirname, '../query-engine-debian-openssl-1.0.x');
B.default.join(__dirname, '../query-engine-debian-openssl-1.1.x');
B.default.join(__dirname, '../query-engine-debian-openssl-3.0.x');
B.default.join(__dirname, '../query-engine-rhel-openssl-1.0.x');
B.default.join(__dirname, '../query-engine-rhel-openssl-1.1.x');
B.default.join(__dirname, '../query-engine-rhel-openssl-3.0.x');
B.default.join(__dirname, '../libquery_engine-darwin.dylib.node');
B.default.join(__dirname, '../libquery_engine-darwin-arm64.dylib.node');
B.default.join(__dirname, '../libquery_engine-debian-openssl-1.0.x.so.node');
B.default.join(__dirname, '../libquery_engine-debian-openssl-1.1.x.so.node');
B.default.join(__dirname, '../libquery_engine-debian-openssl-3.0.x.so.node');
B.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.0.x.so.node'
);
B.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-1.1.x.so.node'
);
B.default.join(
  __dirname,
  '../libquery_engine-linux-arm64-openssl-3.0.x.so.node'
);
B.default.join(__dirname, '../libquery_engine-linux-musl.so.node');
B.default.join(
  __dirname,
  '../libquery_engine-linux-musl-openssl-3.0.x.so.node'
);
B.default.join(__dirname, '../libquery_engine-rhel-openssl-1.0.x.so.node');
B.default.join(__dirname, '../libquery_engine-rhel-openssl-1.1.x.so.node');
B.default.join(__dirname, '../libquery_engine-rhel-openssl-3.0.x.so.node');
B.default.join(__dirname, '../query_engine-windows.dll.node');
function Yn(e) {
  let t = e.e,
    r = a =>
      `Prisma cannot find the required \`${a}\` system library in your system`,
    n = t.message.includes('cannot open shared object file'),
    i = `Please refer to the documentation about Prisma's system requirements: ${Nt(
      'https://pris.ly/d/system-requirements'
    )}`,
    o = `Unable to require(\`${D(e.id)}\`).`,
    s = pt({ message: t.message, code: t.code })
      .with({ code: 'ENOENT' }, () => 'File does not exist.')
      .when(
        ({ message: a }) => n && a.includes('libz'),
        () => `${r('libz')}. Please install it and try again.`
      )
      .when(
        ({ message: a }) => n && a.includes('libgcc_s'),
        () => `${r('libgcc_s')}. Please install it and try again.`
      )
      .when(
        ({ message: a }) => n && a.includes('libssl'),
        () => {
          let a = e.platformInfo.libssl
            ? `openssl-${e.platformInfo.libssl}`
            : 'openssl';
          return `${r('libssl')}. Please install ${a} and try again.`;
        }
      )
      .when(
        ({ message: a }) => a.includes('GLIBC'),
        () =>
          `Prisma has detected an incompatible version of the \`glibc\` C standard library installed in your system. This probably means your system may be too old to run Prisma. ${i}`
      )
      .when(
        ({ message: a }) =>
          e.platformInfo.platform === 'linux' && a.includes('symbol not found'),
        () =>
          `The Prisma engines are not compatible with your system ${e.platformInfo.originalDistro} on (${e.platformInfo.archFromUname}) which uses the \`${e.platformInfo.binaryTarget}\` binaryTarget by default. ${i}`
      )
      .otherwise(
        () =>
          `The Prisma engines do not seem to be compatible with your system. ${i}`
      );
  return `${o}
${s}

Details: ${t.message}`;
}
var be;
(t => {
  let e;
  (w => (
    (w.findUnique = 'findUnique'),
    (w.findUniqueOrThrow = 'findUniqueOrThrow'),
    (w.findFirst = 'findFirst'),
    (w.findFirstOrThrow = 'findFirstOrThrow'),
    (w.findMany = 'findMany'),
    (w.create = 'create'),
    (w.createMany = 'createMany'),
    (w.update = 'update'),
    (w.updateMany = 'updateMany'),
    (w.upsert = 'upsert'),
    (w.delete = 'delete'),
    (w.deleteMany = 'deleteMany'),
    (w.groupBy = 'groupBy'),
    (w.count = 'count'),
    (w.aggregate = 'aggregate'),
    (w.findRaw = 'findRaw'),
    (w.aggregateRaw = 'aggregateRaw')
  ))((e = t.ModelAction || (t.ModelAction = {})));
})(be || (be = {}));
function Zo(e) {
  return { fromEnvVar: null, value: e };
}
function Zn(e, t) {
  return (
    (e = e || []),
    e.find(r => r.value === 'native') ? [...e, Zo(t)] : [Zo('native'), ...e]
  );
}
var es = R(jt());
function ei(e) {
  return String(new Xn(e));
}
var Xn = class {
  constructor(t) {
    this.config = t;
  }
  toString() {
    let { config: t } = this,
      r = t.provider.fromEnvVar
        ? `env("${t.provider.fromEnvVar}")`
        : t.provider.value,
      n = JSON.parse(
        JSON.stringify({ provider: r, binaryTargets: Wu(t.binaryTargets) })
      );
    return `generator ${t.name} {
${(0, es.default)(Hu(n), 2)}
}`;
  }
};
function Wu(e) {
  let t;
  if (e.length > 0) {
    let r = e.find(n => n.fromEnvVar !== null);
    r ? (t = `env("${r.fromEnvVar}")`) : (t = e.map(n => n.value));
  } else t = void 0;
  return t;
}
function Hu(e) {
  let t = Object.keys(e).reduce((r, n) => Math.max(r, n.length), 0);
  return Object.entries(e).map(([r, n]) => `${r.padEnd(t)} = ${zu(n)}`).join(`
`);
}
function zu(e) {
  return JSON.parse(
    JSON.stringify(e, (t, r) =>
      Array.isArray(r)
        ? `[${r.map(n => JSON.stringify(n)).join(', ')}]`
        : JSON.stringify(r)
    )
  );
}
var Bt = {};
pr(Bt, {
  error: () => Xu,
  info: () => Zu,
  log: () => Yu,
  query: () => ec,
  should: () => ts,
  tags: () => qt,
  warn: () => ti,
});
var qt = {
    error: A('prisma:error'),
    warn: Se('prisma:warn'),
    info: je('prisma:info'),
    query: st('prisma:query'),
  },
  ts = { warn: () => !process.env.PRISMA_DISABLE_WARNINGS };
function Yu(...e) {
  console.log(...e);
}
function ti(e, ...t) {
  ts.warn() && console.warn(`${qt.warn} ${e}`, ...t);
}
function Zu(e, ...t) {
  console.info(`${qt.info} ${e}`, ...t);
}
function Xu(e, ...t) {
  console.error(`${qt.error} ${e}`, ...t);
}
function ec(e, ...t) {
  console.log(`${qt.query} ${e}`, ...t);
}
function Ie(e, t) {
  throw new Error(t);
}
function Sr(e) {
  let t;
  return (...r) => t ?? (t = e(...r));
}
function ri(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var ni = (e, t) => e.reduce((r, n) => ((r[t(n)] = n), r), {});
function mt(e, t) {
  let r = {};
  for (let n of Object.keys(e)) r[n] = t(e[n], n);
  return r;
}
function ii(e, t) {
  if (e.length === 0) return;
  let r = e[0],
    n = t(e[0]);
  for (let i = 1; i < e.length; i++) {
    let o = t(e[i]);
    o > n && ((n = o), (r = e[i]));
  }
  return r;
}
function ce(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 });
}
var ss = new Set(),
  Ut = (e, t, ...r) => {
    ss.has(e) || (ss.add(e), ti(t, ...r));
  };
var G = class extends Error {
  constructor(r, n, i) {
    super(r);
    (this.clientVersion = n), (this.errorCode = i), Error.captureStackTrace(G);
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientInitializationError';
  }
};
ce(G, 'PrismaClientInitializationError');
var ne = class extends Error {
  constructor(r, { code: n, clientVersion: i, meta: o, batchRequestIdx: s }) {
    super(r);
    (this.code = n),
      (this.clientVersion = i),
      (this.meta = o),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: s,
        enumerable: !1,
        writable: !0,
      });
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientKnownRequestError';
  }
};
ce(ne, 'PrismaClientKnownRequestError');
var me = class extends Error {
  constructor(r, n) {
    super(r);
    this.clientVersion = n;
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientRustPanicError';
  }
};
ce(me, 'PrismaClientRustPanicError');
var ie = class extends Error {
  constructor(r, { clientVersion: n, batchRequestIdx: i }) {
    super(r);
    (this.name = 'PrismaClientUnknownRequestError'),
      (this.clientVersion = n),
      Object.defineProperty(this, 'batchRequestIdx', {
        value: i,
        writable: !0,
        enumerable: !1,
      });
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientUnknownRequestError';
  }
};
ce(ie, 'PrismaClientUnknownRequestError');
var gt = class {
  constructor(t) {
    this._engine = t;
  }
  prometheus(t) {
    return this._engine.metrics({ format: 'prometheus', ...t });
  }
  json(t) {
    return this._engine.metrics({ format: 'json', ...t });
  }
};
function Or(e) {
  let t;
  return {
    get() {
      return t || (t = { value: e() }), t.value;
    },
  };
}
function as(e) {
  return { models: oi(e.models), enums: oi(e.enums), types: oi(e.types) };
}
function oi(e) {
  let t = {};
  for (let { name: r, ...n } of e) t[r] = n;
  return t;
}
function ls(e, t) {
  let r = Or(() => nc(t));
  Object.defineProperty(e, 'dmmf', { get: () => r.get() });
}
function nc(e) {
  return {
    datamodel: { models: si(e.models), enums: si(e.enums), types: si(e.types) },
  };
}
function si(e) {
  return Object.entries(e).map(([t, r]) => ({ name: t, ...r }));
}
function us(e, t) {
  for (let r of t)
    for (let n of Object.getOwnPropertyNames(r.prototype))
      Object.defineProperty(
        e.prototype,
        n,
        Object.getOwnPropertyDescriptor(r.prototype, n) ?? Object.create(null)
      );
}
var ht = 9e15,
  Je = 1e9,
  ai = '0123456789abcdef',
  $r =
    '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058',
  Dr =
    '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789',
  li = {
    precision: 20,
    rounding: 4,
    modulo: 1,
    toExpNeg: -7,
    toExpPos: 21,
    minE: -ht,
    maxE: ht,
    crypto: !1,
  },
  ds,
  Le,
  M = !0,
  Ir = '[DecimalError] ',
  Qe = Ir + 'Invalid argument: ',
  ms = Ir + 'Precision limit exceeded',
  gs = Ir + 'crypto unavailable',
  hs = '[object Decimal]',
  oe = Math.floor,
  H = Math.pow,
  ic = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
  oc = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
  sc = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
  ys = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
  ve = 1e7,
  v = 7,
  ac = 9007199254740991,
  lc = $r.length - 1,
  ui = Dr.length - 1,
  y = { toStringTag: hs };
y.absoluteValue = y.abs = function () {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), T(e);
};
y.ceil = function () {
  return T(new this.constructor(this), this.e + 1, 2);
};
y.clampedTo = y.clamp = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  if (((e = new i(e)), (t = new i(t)), !e.s || !t.s)) return new i(NaN);
  if (e.gt(t)) throw Error(Qe + t);
  return (r = n.cmp(e)), r < 0 ? e : n.cmp(t) > 0 ? t : new i(n);
};
y.comparedTo = y.cmp = function (e) {
  var t,
    r,
    n,
    i,
    o = this,
    s = o.d,
    a = (e = new o.constructor(e)).d,
    l = o.s,
    u = e.s;
  if (!s || !a)
    return !l || !u ? NaN : l !== u ? l : s === a ? 0 : !s ^ (l < 0) ? 1 : -1;
  if (!s[0] || !a[0]) return s[0] ? l : a[0] ? -u : 0;
  if (l !== u) return l;
  if (o.e !== e.e) return (o.e > e.e) ^ (l < 0) ? 1 : -1;
  for (n = s.length, i = a.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (s[t] !== a[t]) return (s[t] > a[t]) ^ (l < 0) ? 1 : -1;
  return n === i ? 0 : (n > i) ^ (l < 0) ? 1 : -1;
};
y.cosine = y.cos = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.d
    ? r.d[0]
      ? ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + v),
        (n.rounding = 1),
        (r = uc(n, Ts(n, r))),
        (n.precision = e),
        (n.rounding = t),
        T(Le == 2 || Le == 3 ? r.neg() : r, e, t, !0))
      : new n(1)
    : new n(NaN);
};
y.cubeRoot = y.cbrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c = this,
    p = c.constructor;
  if (!c.isFinite() || c.isZero()) return new p(c);
  for (
    M = !1,
      o = c.s * H(c.s * c, 1 / 3),
      !o || Math.abs(o) == 1 / 0
        ? ((r = X(c.d)),
          (e = c.e),
          (o = (e - r.length + 1) % 3) && (r += o == 1 || o == -2 ? '0' : '00'),
          (o = H(r, 1 / 3)),
          (e = oe((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
          o == 1 / 0
            ? (r = '5e' + e)
            : ((r = o.toExponential()),
              (r = r.slice(0, r.indexOf('e') + 1) + e)),
          (n = new p(r)),
          (n.s = c.s))
        : (n = new p(o.toString())),
      s = (e = p.precision) + 3;
    ;

  )
    if (
      ((a = n),
      (l = a.times(a).times(a)),
      (u = l.plus(c)),
      (n = N(u.plus(c).times(a), u.plus(l), s + 2, 1)),
      X(a.d).slice(0, s) === (r = X(n.d)).slice(0, s))
    )
      if (((r = r.slice(s - 3, s + 1)), r == '9999' || (!i && r == '4999'))) {
        if (!i && (T(a, e + 1, 0), a.times(a).times(a).eq(c))) {
          n = a;
          break;
        }
        (s += 4), (i = 1);
      } else {
        (!+r || (!+r.slice(1) && r.charAt(0) == '5')) &&
          (T(n, e + 1, 1), (t = !n.times(n).times(n).eq(c)));
        break;
      }
  return (M = !0), T(n, e, p.rounding, t);
};
y.decimalPlaces = y.dp = function () {
  var e,
    t = this.d,
    r = NaN;
  if (t) {
    if (((e = t.length - 1), (r = (e - oe(this.e / v)) * v), (e = t[e]), e))
      for (; e % 10 == 0; e /= 10) r--;
    r < 0 && (r = 0);
  }
  return r;
};
y.dividedBy = y.div = function (e) {
  return N(this, new this.constructor(e));
};
y.dividedToIntegerBy = y.divToInt = function (e) {
  var t = this,
    r = t.constructor;
  return T(N(t, new r(e), 0, 1, 1), r.precision, r.rounding);
};
y.equals = y.eq = function (e) {
  return this.cmp(e) === 0;
};
y.floor = function () {
  return T(new this.constructor(this), this.e + 1, 3);
};
y.greaterThan = y.gt = function (e) {
  return this.cmp(e) > 0;
};
y.greaterThanOrEqualTo = y.gte = function (e) {
  var t = this.cmp(e);
  return t == 1 || t === 0;
};
y.hyperbolicCosine = y.cosh = function () {
  var e,
    t,
    r,
    n,
    i,
    o = this,
    s = o.constructor,
    a = new s(1);
  if (!o.isFinite()) return new s(o.s ? 1 / 0 : NaN);
  if (o.isZero()) return a;
  (r = s.precision),
    (n = s.rounding),
    (s.precision = r + Math.max(o.e, o.sd()) + 4),
    (s.rounding = 1),
    (i = o.d.length),
    i < 32
      ? ((e = Math.ceil(i / 3)), (t = (1 / Nr(4, e)).toString()))
      : ((e = 16), (t = '2.3283064365386962890625e-10')),
    (o = yt(s, 1, o.times(t), new s(1), !0));
  for (var l, u = e, c = new s(8); u--; )
    (l = o.times(o)), (o = a.minus(l.times(c.minus(l.times(c)))));
  return T(o, (s.precision = r), (s.rounding = n), !0);
};
y.hyperbolicSine = y.sinh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  if (!i.isFinite() || i.isZero()) return new o(i);
  if (
    ((t = o.precision),
    (r = o.rounding),
    (o.precision = t + Math.max(i.e, i.sd()) + 4),
    (o.rounding = 1),
    (n = i.d.length),
    n < 3)
  )
    i = yt(o, 2, i, i, !0);
  else {
    (e = 1.4 * Math.sqrt(n)),
      (e = e > 16 ? 16 : e | 0),
      (i = i.times(1 / Nr(5, e))),
      (i = yt(o, 2, i, i, !0));
    for (var s, a = new o(5), l = new o(16), u = new o(20); e--; )
      (s = i.times(i)), (i = i.times(a.plus(s.times(l.times(s).plus(u)))));
  }
  return (o.precision = t), (o.rounding = r), T(i, t, r, !0);
};
y.hyperbolicTangent = y.tanh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 7),
        (n.rounding = 1),
        N(r.sinh(), r.cosh(), (n.precision = e), (n.rounding = t)))
    : new n(r.s);
};
y.inverseCosine = y.acos = function () {
  var e,
    t = this,
    r = t.constructor,
    n = t.abs().cmp(1),
    i = r.precision,
    o = r.rounding;
  return n !== -1
    ? n === 0
      ? t.isNeg()
        ? Te(r, i, o)
        : new r(0)
      : new r(NaN)
    : t.isZero()
    ? Te(r, i + 4, o).times(0.5)
    : ((r.precision = i + 6),
      (r.rounding = 1),
      (t = t.asin()),
      (e = Te(r, i + 4, o).times(0.5)),
      (r.precision = i),
      (r.rounding = o),
      e.minus(t));
};
y.inverseHyperbolicCosine = y.acosh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.lte(1)
    ? new n(r.eq(1) ? 0 : NaN)
    : r.isFinite()
    ? ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4),
      (n.rounding = 1),
      (M = !1),
      (r = r.times(r).minus(1).sqrt().plus(r)),
      (M = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln())
    : new n(r);
};
y.inverseHyperbolicSine = y.asinh = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return !r.isFinite() || r.isZero()
    ? new n(r)
    : ((e = n.precision),
      (t = n.rounding),
      (n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
      (n.rounding = 1),
      (M = !1),
      (r = r.times(r).plus(1).sqrt().plus(r)),
      (M = !0),
      (n.precision = e),
      (n.rounding = t),
      r.ln());
};
y.inverseHyperbolicTangent = y.atanh = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  return i.isFinite()
    ? i.e >= 0
      ? new o(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
      : ((e = o.precision),
        (t = o.rounding),
        (n = i.sd()),
        Math.max(n, e) < 2 * -i.e - 1
          ? T(new o(i), e, t, !0)
          : ((o.precision = r = n - i.e),
            (i = N(i.plus(1), new o(1).minus(i), r + e, 1)),
            (o.precision = e + 4),
            (o.rounding = 1),
            (i = i.ln()),
            (o.precision = e),
            (o.rounding = t),
            i.times(0.5)))
    : new o(NaN);
};
y.inverseSine = y.asin = function () {
  var e,
    t,
    r,
    n,
    i = this,
    o = i.constructor;
  return i.isZero()
    ? new o(i)
    : ((t = i.abs().cmp(1)),
      (r = o.precision),
      (n = o.rounding),
      t !== -1
        ? t === 0
          ? ((e = Te(o, r + 4, n).times(0.5)), (e.s = i.s), e)
          : new o(NaN)
        : ((o.precision = r + 6),
          (o.rounding = 1),
          (i = i.div(new o(1).minus(i.times(i)).sqrt().plus(1)).atan()),
          (o.precision = r),
          (o.rounding = n),
          i.times(2)));
};
y.inverseTangent = y.atan = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = this,
    c = u.constructor,
    p = c.precision,
    f = c.rounding;
  if (u.isFinite()) {
    if (u.isZero()) return new c(u);
    if (u.abs().eq(1) && p + 4 <= ui)
      return (s = Te(c, p + 4, f).times(0.25)), (s.s = u.s), s;
  } else {
    if (!u.s) return new c(NaN);
    if (p + 4 <= ui) return (s = Te(c, p + 4, f).times(0.5)), (s.s = u.s), s;
  }
  for (
    c.precision = a = p + 10,
      c.rounding = 1,
      r = Math.min(28, (a / v + 2) | 0),
      e = r;
    e;
    --e
  )
    u = u.div(u.times(u).plus(1).sqrt().plus(1));
  for (
    M = !1, t = Math.ceil(a / v), n = 1, l = u.times(u), s = new c(u), i = u;
    e !== -1;

  )
    if (
      ((i = i.times(l)),
      (o = s.minus(i.div((n += 2)))),
      (i = i.times(l)),
      (s = o.plus(i.div((n += 2)))),
      s.d[t] !== void 0)
    )
      for (e = t; s.d[e] === o.d[e] && e--; );
  return (
    r && (s = s.times(2 << (r - 1))),
    (M = !0),
    T(s, (c.precision = p), (c.rounding = f), !0)
  );
};
y.isFinite = function () {
  return !!this.d;
};
y.isInteger = y.isInt = function () {
  return !!this.d && oe(this.e / v) > this.d.length - 2;
};
y.isNaN = function () {
  return !this.s;
};
y.isNegative = y.isNeg = function () {
  return this.s < 0;
};
y.isPositive = y.isPos = function () {
  return this.s > 0;
};
y.isZero = function () {
  return !!this.d && this.d[0] === 0;
};
y.lessThan = y.lt = function (e) {
  return this.cmp(e) < 0;
};
y.lessThanOrEqualTo = y.lte = function (e) {
  return this.cmp(e) < 1;
};
y.logarithm = y.log = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = this,
    c = u.constructor,
    p = c.precision,
    f = c.rounding,
    d = 5;
  if (e == null) (e = new c(10)), (t = !0);
  else {
    if (((e = new c(e)), (r = e.d), e.s < 0 || !r || !r[0] || e.eq(1)))
      return new c(NaN);
    t = e.eq(10);
  }
  if (((r = u.d), u.s < 0 || !r || !r[0] || u.eq(1)))
    return new c(r && !r[0] ? -1 / 0 : u.s != 1 ? NaN : r ? 0 : 1 / 0);
  if (t)
    if (r.length > 1) o = !0;
    else {
      for (i = r[0]; i % 10 === 0; ) i /= 10;
      o = i !== 1;
    }
  if (
    ((M = !1),
    (a = p + d),
    (s = Ue(u, a)),
    (n = t ? kr(c, a + 10) : Ue(e, a)),
    (l = N(s, n, a, 1)),
    Qt(l.d, (i = p), f))
  )
    do
      if (
        ((a += 10),
        (s = Ue(u, a)),
        (n = t ? kr(c, a + 10) : Ue(e, a)),
        (l = N(s, n, a, 1)),
        !o)
      ) {
        +X(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = T(l, p + 1, 0));
        break;
      }
    while (Qt(l.d, (i += 10), f));
  return (M = !0), T(l, p, f);
};
y.minus = y.sub = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    f,
    d = this,
    m = d.constructor;
  if (((e = new m(e)), !d.d || !e.d))
    return (
      !d.s || !e.s
        ? (e = new m(NaN))
        : d.d
        ? (e.s = -e.s)
        : (e = new m(e.d || d.s !== e.s ? d : NaN)),
      e
    );
  if (d.s != e.s) return (e.s = -e.s), d.plus(e);
  if (
    ((u = d.d), (f = e.d), (a = m.precision), (l = m.rounding), !u[0] || !f[0])
  ) {
    if (f[0]) e.s = -e.s;
    else if (u[0]) e = new m(d);
    else return new m(l === 3 ? -0 : 0);
    return M ? T(e, a, l) : e;
  }
  if (((r = oe(e.e / v)), (c = oe(d.e / v)), (u = u.slice()), (o = c - r), o)) {
    for (
      p = o < 0,
        p
          ? ((t = u), (o = -o), (s = f.length))
          : ((t = f), (r = c), (s = u.length)),
        n = Math.max(Math.ceil(a / v), s) + 2,
        o > n && ((o = n), (t.length = 1)),
        t.reverse(),
        n = o;
      n--;

    )
      t.push(0);
    t.reverse();
  } else {
    for (n = u.length, s = f.length, p = n < s, p && (s = n), n = 0; n < s; n++)
      if (u[n] != f[n]) {
        p = u[n] < f[n];
        break;
      }
    o = 0;
  }
  for (
    p && ((t = u), (u = f), (f = t), (e.s = -e.s)),
      s = u.length,
      n = f.length - s;
    n > 0;
    --n
  )
    u[s++] = 0;
  for (n = f.length; n > o; ) {
    if (u[--n] < f[n]) {
      for (i = n; i && u[--i] === 0; ) u[i] = ve - 1;
      --u[i], (u[n] += ve);
    }
    u[n] -= f[n];
  }
  for (; u[--s] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --r;
  return u[0]
    ? ((e.d = u), (e.e = Lr(u, r)), M ? T(e, a, l) : e)
    : new m(l === 3 ? -0 : 0);
};
y.modulo = y.mod = function (e) {
  var t,
    r = this,
    n = r.constructor;
  return (
    (e = new n(e)),
    !r.d || !e.s || (e.d && !e.d[0])
      ? new n(NaN)
      : !e.d || (r.d && !r.d[0])
      ? T(new n(r), n.precision, n.rounding)
      : ((M = !1),
        n.modulo == 9
          ? ((t = N(r, e.abs(), 0, 3, 1)), (t.s *= e.s))
          : (t = N(r, e, 0, n.modulo, 1)),
        (t = t.times(e)),
        (M = !0),
        r.minus(t))
  );
};
y.naturalExponential = y.exp = function () {
  return ci(this);
};
y.naturalLogarithm = y.ln = function () {
  return Ue(this);
};
y.negated = y.neg = function () {
  var e = new this.constructor(this);
  return (e.s = -e.s), T(e);
};
y.plus = y.add = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p = this,
    f = p.constructor;
  if (((e = new f(e)), !p.d || !e.d))
    return (
      !p.s || !e.s
        ? (e = new f(NaN))
        : p.d || (e = new f(e.d || p.s === e.s ? p : NaN)),
      e
    );
  if (p.s != e.s) return (e.s = -e.s), p.minus(e);
  if (
    ((u = p.d), (c = e.d), (a = f.precision), (l = f.rounding), !u[0] || !c[0])
  )
    return c[0] || (e = new f(p)), M ? T(e, a, l) : e;
  if (((o = oe(p.e / v)), (n = oe(e.e / v)), (u = u.slice()), (i = o - n), i)) {
    for (
      i < 0
        ? ((r = u), (i = -i), (s = c.length))
        : ((r = c), (n = o), (s = u.length)),
        o = Math.ceil(a / v),
        s = o > s ? o + 1 : s + 1,
        i > s && ((i = s), (r.length = 1)),
        r.reverse();
      i--;

    )
      r.push(0);
    r.reverse();
  }
  for (
    s = u.length,
      i = c.length,
      s - i < 0 && ((i = s), (r = c), (c = u), (u = r)),
      t = 0;
    i;

  )
    (t = ((u[--i] = u[i] + c[i] + t) / ve) | 0), (u[i] %= ve);
  for (t && (u.unshift(t), ++n), s = u.length; u[--s] == 0; ) u.pop();
  return (e.d = u), (e.e = Lr(u, n)), M ? T(e, a, l) : e;
};
y.precision = y.sd = function (e) {
  var t,
    r = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(Qe + e);
  return (
    r.d ? ((t = bs(r.d)), e && r.e + 1 > t && (t = r.e + 1)) : (t = NaN), t
  );
};
y.round = function () {
  var e = this,
    t = e.constructor;
  return T(new t(e), e.e + 1, t.rounding);
};
y.sine = y.sin = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + Math.max(r.e, r.sd()) + v),
        (n.rounding = 1),
        (r = pc(n, Ts(n, r))),
        (n.precision = e),
        (n.rounding = t),
        T(Le > 2 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
y.squareRoot = y.sqrt = function () {
  var e,
    t,
    r,
    n,
    i,
    o,
    s = this,
    a = s.d,
    l = s.e,
    u = s.s,
    c = s.constructor;
  if (u !== 1 || !a || !a[0])
    return new c(!u || (u < 0 && (!a || a[0])) ? NaN : a ? s : 1 / 0);
  for (
    M = !1,
      u = Math.sqrt(+s),
      u == 0 || u == 1 / 0
        ? ((t = X(a)),
          (t.length + l) % 2 == 0 && (t += '0'),
          (u = Math.sqrt(t)),
          (l = oe((l + 1) / 2) - (l < 0 || l % 2)),
          u == 1 / 0
            ? (t = '5e' + l)
            : ((t = u.toExponential()),
              (t = t.slice(0, t.indexOf('e') + 1) + l)),
          (n = new c(t)))
        : (n = new c(u.toString())),
      r = (l = c.precision) + 3;
    ;

  )
    if (
      ((o = n),
      (n = o.plus(N(s, o, r + 2, 1)).times(0.5)),
      X(o.d).slice(0, r) === (t = X(n.d)).slice(0, r))
    )
      if (((t = t.slice(r - 3, r + 1)), t == '9999' || (!i && t == '4999'))) {
        if (!i && (T(o, l + 1, 0), o.times(o).eq(s))) {
          n = o;
          break;
        }
        (r += 4), (i = 1);
      } else {
        (!+t || (!+t.slice(1) && t.charAt(0) == '5')) &&
          (T(n, l + 1, 1), (e = !n.times(n).eq(s)));
        break;
      }
  return (M = !0), T(n, l, c.rounding, e);
};
y.tangent = y.tan = function () {
  var e,
    t,
    r = this,
    n = r.constructor;
  return r.isFinite()
    ? r.isZero()
      ? new n(r)
      : ((e = n.precision),
        (t = n.rounding),
        (n.precision = e + 10),
        (n.rounding = 1),
        (r = r.sin()),
        (r.s = 1),
        (r = N(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0)),
        (n.precision = e),
        (n.rounding = t),
        T(Le == 2 || Le == 4 ? r.neg() : r, e, t, !0))
    : new n(NaN);
};
y.times = y.mul = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c = this,
    p = c.constructor,
    f = c.d,
    d = (e = new p(e)).d;
  if (((e.s *= c.s), !f || !f[0] || !d || !d[0]))
    return new p(
      !e.s || (f && !f[0] && !d) || (d && !d[0] && !f)
        ? NaN
        : !f || !d
        ? e.s / 0
        : e.s * 0
    );
  for (
    r = oe(c.e / v) + oe(e.e / v),
      l = f.length,
      u = d.length,
      l < u && ((o = f), (f = d), (d = o), (s = l), (l = u), (u = s)),
      o = [],
      s = l + u,
      n = s;
    n--;

  )
    o.push(0);
  for (n = u; --n >= 0; ) {
    for (t = 0, i = l + n; i > n; )
      (a = o[i] + d[n] * f[i - n - 1] + t),
        (o[i--] = a % ve | 0),
        (t = (a / ve) | 0);
    o[i] = (o[i] + t) % ve | 0;
  }
  for (; !o[--s]; ) o.pop();
  return (
    t ? ++r : o.shift(),
    (e.d = o),
    (e.e = Lr(o, r)),
    M ? T(e, p.precision, p.rounding) : e
  );
};
y.toBinary = function (e, t) {
  return fi(this, 2, e, t);
};
y.toDecimalPlaces = y.toDP = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    (r = new n(r)),
    e === void 0
      ? r
      : (pe(e, 0, Je),
        t === void 0 ? (t = n.rounding) : pe(t, 0, 8),
        T(r, e + r.e + 1, t))
  );
};
y.toExponential = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  return (
    e === void 0
      ? (r = Ae(n, !0))
      : (pe(e, 0, Je),
        t === void 0 ? (t = i.rounding) : pe(t, 0, 8),
        (n = T(new i(n), e + 1, t)),
        (r = Ae(n, !0, e + 1))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  );
};
y.toFixed = function (e, t) {
  var r,
    n,
    i = this,
    o = i.constructor;
  return (
    e === void 0
      ? (r = Ae(i))
      : (pe(e, 0, Je),
        t === void 0 ? (t = o.rounding) : pe(t, 0, 8),
        (n = T(new o(i), e + i.e + 1, t)),
        (r = Ae(n, !1, e + n.e + 1))),
    i.isNeg() && !i.isZero() ? '-' + r : r
  );
};
y.toFraction = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    f,
    d = this,
    m = d.d,
    g = d.constructor;
  if (!m) return new g(d);
  if (
    ((u = r = new g(1)),
    (n = l = new g(0)),
    (t = new g(n)),
    (o = t.e = bs(m) - d.e - 1),
    (s = o % v),
    (t.d[0] = H(10, s < 0 ? v + s : s)),
    e == null)
  )
    e = o > 0 ? t : u;
  else {
    if (((a = new g(e)), !a.isInt() || a.lt(u))) throw Error(Qe + a);
    e = a.gt(t) ? (o > 0 ? t : u) : a;
  }
  for (
    M = !1,
      a = new g(X(m)),
      c = g.precision,
      g.precision = o = m.length * v * 2;
    (p = N(a, t, 0, 1, 1)), (i = r.plus(p.times(n))), i.cmp(e) != 1;

  )
    (r = n),
      (n = i),
      (i = u),
      (u = l.plus(p.times(i))),
      (l = i),
      (i = t),
      (t = a.minus(p.times(i))),
      (a = i);
  return (
    (i = N(e.minus(r), n, 0, 1, 1)),
    (l = l.plus(i.times(u))),
    (r = r.plus(i.times(n))),
    (l.s = u.s = d.s),
    (f =
      N(u, n, o, 1).minus(d).abs().cmp(N(l, r, o, 1).minus(d).abs()) < 1
        ? [u, n]
        : [l, r]),
    (g.precision = c),
    (M = !0),
    f
  );
};
y.toHexadecimal = y.toHex = function (e, t) {
  return fi(this, 16, e, t);
};
y.toNearest = function (e, t) {
  var r = this,
    n = r.constructor;
  if (((r = new n(r)), e == null)) {
    if (!r.d) return r;
    (e = new n(1)), (t = n.rounding);
  } else {
    if (((e = new n(e)), t === void 0 ? (t = n.rounding) : pe(t, 0, 8), !r.d))
      return e.s ? r : e;
    if (!e.d) return e.s && (e.s = r.s), e;
  }
  return (
    e.d[0]
      ? ((M = !1), (r = N(r, e, 0, t, 1).times(e)), (M = !0), T(r))
      : ((e.s = r.s), (r = e)),
    r
  );
};
y.toNumber = function () {
  return +this;
};
y.toOctal = function (e, t) {
  return fi(this, 8, e, t);
};
y.toPower = y.pow = function (e) {
  var t,
    r,
    n,
    i,
    o,
    s,
    a = this,
    l = a.constructor,
    u = +(e = new l(e));
  if (!a.d || !e.d || !a.d[0] || !e.d[0]) return new l(H(+a, u));
  if (((a = new l(a)), a.eq(1))) return a;
  if (((n = l.precision), (o = l.rounding), e.eq(1))) return T(a, n, o);
  if (((t = oe(e.e / v)), t >= e.d.length - 1 && (r = u < 0 ? -u : u) <= ac))
    return (i = ws(l, a, r, n)), e.s < 0 ? new l(1).div(i) : T(i, n, o);
  if (((s = a.s), s < 0)) {
    if (t < e.d.length - 1) return new l(NaN);
    if (
      ((e.d[t] & 1) == 0 && (s = 1), a.e == 0 && a.d[0] == 1 && a.d.length == 1)
    )
      return (a.s = s), a;
  }
  return (
    (r = H(+a, u)),
    (t =
      r == 0 || !isFinite(r)
        ? oe(u * (Math.log('0.' + X(a.d)) / Math.LN10 + a.e + 1))
        : new l(r + '').e),
    t > l.maxE + 1 || t < l.minE - 1
      ? new l(t > 0 ? s / 0 : 0)
      : ((M = !1),
        (l.rounding = a.s = 1),
        (r = Math.min(12, (t + '').length)),
        (i = ci(e.times(Ue(a, n + r)), n)),
        i.d &&
          ((i = T(i, n + 5, 1)),
          Qt(i.d, n, o) &&
            ((t = n + 10),
            (i = T(ci(e.times(Ue(a, t + r)), t), t + 5, 1)),
            +X(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = T(i, n + 1, 0)))),
        (i.s = s),
        (M = !0),
        (l.rounding = o),
        T(i, n, o))
  );
};
y.toPrecision = function (e, t) {
  var r,
    n = this,
    i = n.constructor;
  return (
    e === void 0
      ? (r = Ae(n, n.e <= i.toExpNeg || n.e >= i.toExpPos))
      : (pe(e, 1, Je),
        t === void 0 ? (t = i.rounding) : pe(t, 0, 8),
        (n = T(new i(n), e, t)),
        (r = Ae(n, e <= n.e || n.e <= i.toExpNeg, e))),
    n.isNeg() && !n.isZero() ? '-' + r : r
  );
};
y.toSignificantDigits = y.toSD = function (e, t) {
  var r = this,
    n = r.constructor;
  return (
    e === void 0
      ? ((e = n.precision), (t = n.rounding))
      : (pe(e, 1, Je), t === void 0 ? (t = n.rounding) : pe(t, 0, 8)),
    T(new n(r), e, t)
  );
};
y.toString = function () {
  var e = this,
    t = e.constructor,
    r = Ae(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() && !e.isZero() ? '-' + r : r;
};
y.truncated = y.trunc = function () {
  return T(new this.constructor(this), this.e + 1, 1);
};
y.valueOf = y.toJSON = function () {
  var e = this,
    t = e.constructor,
    r = Ae(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);
  return e.isNeg() ? '-' + r : r;
};
function X(e) {
  var t,
    r,
    n,
    i = e.length - 1,
    o = '',
    s = e[0];
  if (i > 0) {
    for (o += s, t = 1; t < i; t++)
      (n = e[t] + ''), (r = v - n.length), r && (o += Ve(r)), (o += n);
    (s = e[t]), (n = s + ''), (r = v - n.length), r && (o += Ve(r));
  } else if (s === 0) return '0';
  for (; s % 10 === 0; ) s /= 10;
  return o + s;
}
function pe(e, t, r) {
  if (e !== ~~e || e < t || e > r) throw Error(Qe + e);
}
function Qt(e, t, r, n) {
  var i, o, s, a;
  for (o = e[0]; o >= 10; o /= 10) --t;
  return (
    --t < 0 ? ((t += v), (i = 0)) : ((i = Math.ceil((t + 1) / v)), (t %= v)),
    (o = H(10, v - t)),
    (a = e[i] % o | 0),
    n == null
      ? t < 3
        ? (t == 0 ? (a = (a / 100) | 0) : t == 1 && (a = (a / 10) | 0),
          (s =
            (r < 4 && a == 99999) ||
            (r > 3 && a == 49999) ||
            a == 5e4 ||
            a == 0))
        : (s =
            (((r < 4 && a + 1 == o) || (r > 3 && a + 1 == o / 2)) &&
              ((e[i + 1] / o / 100) | 0) == H(10, t - 2) - 1) ||
            ((a == o / 2 || a == 0) && ((e[i + 1] / o / 100) | 0) == 0))
      : t < 4
      ? (t == 0
          ? (a = (a / 1e3) | 0)
          : t == 1
          ? (a = (a / 100) | 0)
          : t == 2 && (a = (a / 10) | 0),
        (s = ((n || r < 4) && a == 9999) || (!n && r > 3 && a == 4999)))
      : (s =
          (((n || r < 4) && a + 1 == o) || (!n && r > 3 && a + 1 == o / 2)) &&
          ((e[i + 1] / o / 1e3) | 0) == H(10, t - 3) - 1),
    s
  );
}
function Rr(e, t, r) {
  for (var n, i = [0], o, s = 0, a = e.length; s < a; ) {
    for (o = i.length; o--; ) i[o] *= t;
    for (i[0] += ai.indexOf(e.charAt(s++)), n = 0; n < i.length; n++)
      i[n] > r - 1 &&
        (i[n + 1] === void 0 && (i[n + 1] = 0),
        (i[n + 1] += (i[n] / r) | 0),
        (i[n] %= r));
  }
  return i.reverse();
}
function uc(e, t) {
  var r, n, i;
  if (t.isZero()) return t;
  (n = t.d.length),
    n < 32
      ? ((r = Math.ceil(n / 3)), (i = (1 / Nr(4, r)).toString()))
      : ((r = 16), (i = '2.3283064365386962890625e-10')),
    (e.precision += r),
    (t = yt(e, 1, t.times(i), new e(1)));
  for (var o = r; o--; ) {
    var s = t.times(t);
    t = s.times(s).minus(s).times(8).plus(1);
  }
  return (e.precision -= r), t;
}
var N = (function () {
  function e(n, i, o) {
    var s,
      a = 0,
      l = n.length;
    for (n = n.slice(); l--; )
      (s = n[l] * i + a), (n[l] = s % o | 0), (a = (s / o) | 0);
    return a && n.unshift(a), n;
  }
  function t(n, i, o, s) {
    var a, l;
    if (o != s) l = o > s ? 1 : -1;
    else
      for (a = l = 0; a < o; a++)
        if (n[a] != i[a]) {
          l = n[a] > i[a] ? 1 : -1;
          break;
        }
    return l;
  }
  function r(n, i, o, s) {
    for (var a = 0; o--; )
      (n[o] -= a), (a = n[o] < i[o] ? 1 : 0), (n[o] = a * s + n[o] - i[o]);
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function (n, i, o, s, a, l) {
    var u,
      c,
      p,
      f,
      d,
      m,
      g,
      b,
      h,
      x,
      w,
      E,
      C,
      O,
      q,
      k,
      U,
      Q,
      te,
      ot,
      ur = n.constructor,
      Mn = n.s == i.s ? 1 : -1,
      re = n.d,
      L = i.d;
    if (!re || !re[0] || !L || !L[0])
      return new ur(
        !n.s || !i.s || (re ? L && re[0] == L[0] : !L)
          ? NaN
          : (re && re[0] == 0) || !L
          ? Mn * 0
          : Mn / 0
      );
    for (
      l
        ? ((d = 1), (c = n.e - i.e))
        : ((l = ve), (d = v), (c = oe(n.e / d) - oe(i.e / d))),
        te = L.length,
        U = re.length,
        h = new ur(Mn),
        x = h.d = [],
        p = 0;
      L[p] == (re[p] || 0);
      p++
    );
    if (
      (L[p] > (re[p] || 0) && c--,
      o == null
        ? ((O = o = ur.precision), (s = ur.rounding))
        : a
        ? (O = o + (n.e - i.e) + 1)
        : (O = o),
      O < 0)
    )
      x.push(1), (m = !0);
    else {
      if (((O = (O / d + 2) | 0), (p = 0), te == 1)) {
        for (f = 0, L = L[0], O++; (p < U || f) && O--; p++)
          (q = f * l + (re[p] || 0)), (x[p] = (q / L) | 0), (f = q % L | 0);
        m = f || p < U;
      } else {
        for (
          f = (l / (L[0] + 1)) | 0,
            f > 1 &&
              ((L = e(L, f, l)),
              (re = e(re, f, l)),
              (te = L.length),
              (U = re.length)),
            k = te,
            w = re.slice(0, te),
            E = w.length;
          E < te;

        )
          w[E++] = 0;
        (ot = L.slice()), ot.unshift(0), (Q = L[0]), L[1] >= l / 2 && ++Q;
        do
          (f = 0),
            (u = t(L, w, te, E)),
            u < 0
              ? ((C = w[0]),
                te != E && (C = C * l + (w[1] || 0)),
                (f = (C / Q) | 0),
                f > 1
                  ? (f >= l && (f = l - 1),
                    (g = e(L, f, l)),
                    (b = g.length),
                    (E = w.length),
                    (u = t(g, w, b, E)),
                    u == 1 && (f--, r(g, te < b ? ot : L, b, l)))
                  : (f == 0 && (u = f = 1), (g = L.slice())),
                (b = g.length),
                b < E && g.unshift(0),
                r(w, g, E, l),
                u == -1 &&
                  ((E = w.length),
                  (u = t(L, w, te, E)),
                  u < 1 && (f++, r(w, te < E ? ot : L, E, l))),
                (E = w.length))
              : u === 0 && (f++, (w = [0])),
            (x[p++] = f),
            u && w[0] ? (w[E++] = re[k] || 0) : ((w = [re[k]]), (E = 1));
        while ((k++ < U || w[0] !== void 0) && O--);
        m = w[0] !== void 0;
      }
      x[0] || x.shift();
    }
    if (d == 1) (h.e = c), (ds = m);
    else {
      for (p = 1, f = x[0]; f >= 10; f /= 10) p++;
      (h.e = p + c * d - 1), T(h, a ? o + h.e + 1 : o, s, m);
    }
    return h;
  };
})();
function T(e, t, r, n) {
  var i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    f,
    d = e.constructor;
  e: if (t != null) {
    if (((p = e.d), !p)) return e;
    for (i = 1, a = p[0]; a >= 10; a /= 10) i++;
    if (((o = t - i), o < 0))
      (o += v),
        (s = t),
        (c = p[(f = 0)]),
        (l = (c / H(10, i - s - 1)) % 10 | 0);
    else if (((f = Math.ceil((o + 1) / v)), (a = p.length), f >= a))
      if (n) {
        for (; a++ <= f; ) p.push(0);
        (c = l = 0), (i = 1), (o %= v), (s = o - v + 1);
      } else break e;
    else {
      for (c = a = p[f], i = 1; a >= 10; a /= 10) i++;
      (o %= v),
        (s = o - v + i),
        (l = s < 0 ? 0 : (c / H(10, i - s - 1)) % 10 | 0);
    }
    if (
      ((n =
        n ||
        t < 0 ||
        p[f + 1] !== void 0 ||
        (s < 0 ? c : c % H(10, i - s - 1))),
      (u =
        r < 4
          ? (l || n) && (r == 0 || r == (e.s < 0 ? 3 : 2))
          : l > 5 ||
            (l == 5 &&
              (r == 4 ||
                n ||
                (r == 6 &&
                  (o > 0 ? (s > 0 ? c / H(10, i - s) : 0) : p[f - 1]) % 10 &
                    1) ||
                r == (e.s < 0 ? 8 : 7)))),
      t < 1 || !p[0])
    )
      return (
        (p.length = 0),
        u
          ? ((t -= e.e + 1), (p[0] = H(10, (v - (t % v)) % v)), (e.e = -t || 0))
          : (p[0] = e.e = 0),
        e
      );
    if (
      (o == 0
        ? ((p.length = f), (a = 1), f--)
        : ((p.length = f + 1),
          (a = H(10, v - o)),
          (p[f] = s > 0 ? ((c / H(10, i - s)) % H(10, s) | 0) * a : 0)),
      u)
    )
      for (;;)
        if (f == 0) {
          for (o = 1, s = p[0]; s >= 10; s /= 10) o++;
          for (s = p[0] += a, a = 1; s >= 10; s /= 10) a++;
          o != a && (e.e++, p[0] == ve && (p[0] = 1));
          break;
        } else {
          if (((p[f] += a), p[f] != ve)) break;
          (p[f--] = 0), (a = 1);
        }
    for (o = p.length; p[--o] === 0; ) p.pop();
  }
  return (
    M &&
      (e.e > d.maxE
        ? ((e.d = null), (e.e = NaN))
        : e.e < d.minE && ((e.e = 0), (e.d = [0]))),
    e
  );
}
function Ae(e, t, r) {
  if (!e.isFinite()) return Es(e);
  var n,
    i = e.e,
    o = X(e.d),
    s = o.length;
  return (
    t
      ? (r && (n = r - s) > 0
          ? (o = o.charAt(0) + '.' + o.slice(1) + Ve(n))
          : s > 1 && (o = o.charAt(0) + '.' + o.slice(1)),
        (o = o + (e.e < 0 ? 'e' : 'e+') + e.e))
      : i < 0
      ? ((o = '0.' + Ve(-i - 1) + o), r && (n = r - s) > 0 && (o += Ve(n)))
      : i >= s
      ? ((o += Ve(i + 1 - s)),
        r && (n = r - i - 1) > 0 && (o = o + '.' + Ve(n)))
      : ((n = i + 1) < s && (o = o.slice(0, n) + '.' + o.slice(n)),
        r && (n = r - s) > 0 && (i + 1 === s && (o += '.'), (o += Ve(n)))),
    o
  );
}
function Lr(e, t) {
  var r = e[0];
  for (t *= v; r >= 10; r /= 10) t++;
  return t;
}
function kr(e, t, r) {
  if (t > lc) throw ((M = !0), r && (e.precision = r), Error(ms));
  return T(new e($r), t, 1, !0);
}
function Te(e, t, r) {
  if (t > ui) throw Error(ms);
  return T(new e(Dr), t, r, !0);
}
function bs(e) {
  var t = e.length - 1,
    r = t * v + 1;
  if (((t = e[t]), t)) {
    for (; t % 10 == 0; t /= 10) r--;
    for (t = e[0]; t >= 10; t /= 10) r++;
  }
  return r;
}
function Ve(e) {
  for (var t = ''; e--; ) t += '0';
  return t;
}
function ws(e, t, r, n) {
  var i,
    o = new e(1),
    s = Math.ceil(n / v + 4);
  for (M = !1; ; ) {
    if (
      (r % 2 && ((o = o.times(t)), ps(o.d, s) && (i = !0)),
      (r = oe(r / 2)),
      r === 0)
    ) {
      (r = o.d.length - 1), i && o.d[r] === 0 && ++o.d[r];
      break;
    }
    (t = t.times(t)), ps(t.d, s);
  }
  return (M = !0), o;
}
function cs(e) {
  return e.d[e.d.length - 1] & 1;
}
function xs(e, t, r) {
  for (var n, i = new e(t[0]), o = 0; ++o < t.length; )
    if (((n = new e(t[o])), n.s)) i[r](n) && (i = n);
    else {
      i = n;
      break;
    }
  return i;
}
function ci(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    l,
    u = 0,
    c = 0,
    p = 0,
    f = e.constructor,
    d = f.rounding,
    m = f.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new f(
      e.d
        ? e.d[0]
          ? e.s < 0
            ? 0
            : 1 / 0
          : 1
        : e.s
        ? e.s < 0
          ? 0
          : e
        : 0 / 0
    );
  for (
    t == null ? ((M = !1), (l = m)) : (l = t), a = new f(0.03125);
    e.e > -2;

  )
    (e = e.times(a)), (p += 5);
  for (
    n = ((Math.log(H(2, p)) / Math.LN10) * 2 + 5) | 0,
      l += n,
      r = o = s = new f(1),
      f.precision = l;
    ;

  ) {
    if (
      ((o = T(o.times(e), l, 1)),
      (r = r.times(++c)),
      (a = s.plus(N(o, r, l, 1))),
      X(a.d).slice(0, l) === X(s.d).slice(0, l))
    ) {
      for (i = p; i--; ) s = T(s.times(s), l, 1);
      if (t == null)
        if (u < 3 && Qt(s.d, l - n, d, u))
          (f.precision = l += 10), (r = o = a = new f(1)), (c = 0), u++;
        else return T(s, (f.precision = m), d, (M = !0));
      else return (f.precision = m), s;
    }
    s = a;
  }
}
function Ue(e, t) {
  var r,
    n,
    i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    f,
    d = 1,
    m = 10,
    g = e,
    b = g.d,
    h = g.constructor,
    x = h.rounding,
    w = h.precision;
  if (g.s < 0 || !b || !b[0] || (!g.e && b[0] == 1 && b.length == 1))
    return new h(b && !b[0] ? -1 / 0 : g.s != 1 ? NaN : b ? 0 : g);
  if (
    (t == null ? ((M = !1), (c = w)) : (c = t),
    (h.precision = c += m),
    (r = X(b)),
    (n = r.charAt(0)),
    Math.abs((o = g.e)) < 15e14)
  ) {
    for (; (n < 7 && n != 1) || (n == 1 && r.charAt(1) > 3); )
      (g = g.times(e)), (r = X(g.d)), (n = r.charAt(0)), d++;
    (o = g.e),
      n > 1 ? ((g = new h('0.' + r)), o++) : (g = new h(n + '.' + r.slice(1)));
  } else
    return (
      (u = kr(h, c + 2, w).times(o + '')),
      (g = Ue(new h(n + '.' + r.slice(1)), c - m).plus(u)),
      (h.precision = w),
      t == null ? T(g, w, x, (M = !0)) : g
    );
  for (
    p = g,
      l = s = g = N(g.minus(1), g.plus(1), c, 1),
      f = T(g.times(g), c, 1),
      i = 3;
    ;

  ) {
    if (
      ((s = T(s.times(f), c, 1)),
      (u = l.plus(N(s, new h(i), c, 1))),
      X(u.d).slice(0, c) === X(l.d).slice(0, c))
    )
      if (
        ((l = l.times(2)),
        o !== 0 && (l = l.plus(kr(h, c + 2, w).times(o + ''))),
        (l = N(l, new h(d), c, 1)),
        t == null)
      )
        if (Qt(l.d, c - m, x, a))
          (h.precision = c += m),
            (u = s = g = N(p.minus(1), p.plus(1), c, 1)),
            (f = T(g.times(g), c, 1)),
            (i = a = 1);
        else return T(l, (h.precision = w), x, (M = !0));
      else return (h.precision = w), l;
    (l = u), (i += 2);
  }
}
function Es(e) {
  return String((e.s * e.s) / 0);
}
function pi(e, t) {
  var r, n, i;
  for (
    (r = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
      (n = t.search(/e/i)) > 0
        ? (r < 0 && (r = n), (r += +t.slice(n + 1)), (t = t.substring(0, n)))
        : r < 0 && (r = t.length),
      n = 0;
    t.charCodeAt(n) === 48;
    n++
  );
  for (i = t.length; t.charCodeAt(i - 1) === 48; --i);
  if (((t = t.slice(n, i)), t)) {
    if (
      ((i -= n),
      (e.e = r = r - n - 1),
      (e.d = []),
      (n = (r + 1) % v),
      r < 0 && (n += v),
      n < i)
    ) {
      for (n && e.d.push(+t.slice(0, n)), i -= v; n < i; )
        e.d.push(+t.slice(n, (n += v)));
      (t = t.slice(n)), (n = v - t.length);
    } else n -= i;
    for (; n--; ) t += '0';
    e.d.push(+t),
      M &&
        (e.e > e.constructor.maxE
          ? ((e.d = null), (e.e = NaN))
          : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
  } else (e.e = 0), (e.d = [0]);
  return e;
}
function cc(e, t) {
  var r, n, i, o, s, a, l, u, c;
  if (t.indexOf('_') > -1) {
    if (((t = t.replace(/(\d)_(?=\d)/g, '$1')), ys.test(t))) return pi(e, t);
  } else if (t === 'Infinity' || t === 'NaN')
    return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e;
  if (oc.test(t)) (r = 16), (t = t.toLowerCase());
  else if (ic.test(t)) r = 2;
  else if (sc.test(t)) r = 8;
  else throw Error(Qe + t);
  for (
    o = t.search(/p/i),
      o > 0
        ? ((l = +t.slice(o + 1)), (t = t.substring(2, o)))
        : (t = t.slice(2)),
      o = t.indexOf('.'),
      s = o >= 0,
      n = e.constructor,
      s &&
        ((t = t.replace('.', '')),
        (a = t.length),
        (o = a - o),
        (i = ws(n, new n(r), o, o * 2))),
      u = Rr(t, r, ve),
      c = u.length - 1,
      o = c;
    u[o] === 0;
    --o
  )
    u.pop();
  return o < 0
    ? new n(e.s * 0)
    : ((e.e = Lr(u, c)),
      (e.d = u),
      (M = !1),
      s && (e = N(e, i, a * 4)),
      l && (e = e.times(Math.abs(l) < 54 ? H(2, l) : rt.pow(2, l))),
      (M = !0),
      e);
}
function pc(e, t) {
  var r,
    n = t.d.length;
  if (n < 3) return t.isZero() ? t : yt(e, 2, t, t);
  (r = 1.4 * Math.sqrt(n)),
    (r = r > 16 ? 16 : r | 0),
    (t = t.times(1 / Nr(5, r))),
    (t = yt(e, 2, t, t));
  for (var i, o = new e(5), s = new e(16), a = new e(20); r--; )
    (i = t.times(t)), (t = t.times(o.plus(i.times(s.times(i).minus(a)))));
  return t;
}
function yt(e, t, r, n, i) {
  var o,
    s,
    a,
    l,
    u = 1,
    c = e.precision,
    p = Math.ceil(c / v);
  for (M = !1, l = r.times(r), a = new e(n); ; ) {
    if (
      ((s = N(a.times(l), new e(t++ * t++), c, 1)),
      (a = i ? n.plus(s) : n.minus(s)),
      (n = N(s.times(l), new e(t++ * t++), c, 1)),
      (s = a.plus(n)),
      s.d[p] !== void 0)
    ) {
      for (o = p; s.d[o] === a.d[o] && o--; );
      if (o == -1) break;
    }
    (o = a), (a = n), (n = s), (s = o), u++;
  }
  return (M = !0), (s.d.length = p + 1), s;
}
function Nr(e, t) {
  for (var r = e; --t; ) r *= e;
  return r;
}
function Ts(e, t) {
  var r,
    n = t.s < 0,
    i = Te(e, e.precision, 1),
    o = i.times(0.5);
  if (((t = t.abs()), t.lte(o))) return (Le = n ? 4 : 1), t;
  if (((r = t.divToInt(i)), r.isZero())) Le = n ? 3 : 2;
  else {
    if (((t = t.minus(r.times(i))), t.lte(o)))
      return (Le = cs(r) ? (n ? 2 : 3) : n ? 4 : 1), t;
    Le = cs(r) ? (n ? 1 : 4) : n ? 3 : 2;
  }
  return t.minus(i).abs();
}
function fi(e, t, r, n) {
  var i,
    o,
    s,
    a,
    l,
    u,
    c,
    p,
    f,
    d = e.constructor,
    m = r !== void 0;
  if (
    (m
      ? (pe(r, 1, Je), n === void 0 ? (n = d.rounding) : pe(n, 0, 8))
      : ((r = d.precision), (n = d.rounding)),
    !e.isFinite())
  )
    c = Es(e);
  else {
    for (
      c = Ae(e),
        s = c.indexOf('.'),
        m
          ? ((i = 2), t == 16 ? (r = r * 4 - 3) : t == 8 && (r = r * 3 - 2))
          : (i = t),
        s >= 0 &&
          ((c = c.replace('.', '')),
          (f = new d(1)),
          (f.e = c.length - s),
          (f.d = Rr(Ae(f), 10, i)),
          (f.e = f.d.length)),
        p = Rr(c, 10, i),
        o = l = p.length;
      p[--l] == 0;

    )
      p.pop();
    if (!p[0]) c = m ? '0p+0' : '0';
    else {
      if (
        (s < 0
          ? o--
          : ((e = new d(e)),
            (e.d = p),
            (e.e = o),
            (e = N(e, f, r, n, 0, i)),
            (p = e.d),
            (o = e.e),
            (u = ds)),
        (s = p[r]),
        (a = i / 2),
        (u = u || p[r + 1] !== void 0),
        (u =
          n < 4
            ? (s !== void 0 || u) && (n === 0 || n === (e.s < 0 ? 3 : 2))
            : s > a ||
              (s === a &&
                (n === 4 ||
                  u ||
                  (n === 6 && p[r - 1] & 1) ||
                  n === (e.s < 0 ? 8 : 7)))),
        (p.length = r),
        u)
      )
        for (; ++p[--r] > i - 1; ) (p[r] = 0), r || (++o, p.unshift(1));
      for (l = p.length; !p[l - 1]; --l);
      for (s = 0, c = ''; s < l; s++) c += ai.charAt(p[s]);
      if (m) {
        if (l > 1)
          if (t == 16 || t == 8) {
            for (s = t == 16 ? 4 : 3, --l; l % s; l++) c += '0';
            for (p = Rr(c, i, t), l = p.length; !p[l - 1]; --l);
            for (s = 1, c = '1.'; s < l; s++) c += ai.charAt(p[s]);
          } else c = c.charAt(0) + '.' + c.slice(1);
        c = c + (o < 0 ? 'p' : 'p+') + o;
      } else if (o < 0) {
        for (; ++o; ) c = '0' + c;
        c = '0.' + c;
      } else if (++o > l) for (o -= l; o--; ) c += '0';
      else o < l && (c = c.slice(0, o) + '.' + c.slice(o));
    }
    c = (t == 16 ? '0x' : t == 2 ? '0b' : t == 8 ? '0o' : '') + c;
  }
  return e.s < 0 ? '-' + c : c;
}
function ps(e, t) {
  if (e.length > t) return (e.length = t), !0;
}
function fc(e) {
  return new this(e).abs();
}
function dc(e) {
  return new this(e).acos();
}
function mc(e) {
  return new this(e).acosh();
}
function gc(e, t) {
  return new this(e).plus(t);
}
function hc(e) {
  return new this(e).asin();
}
function yc(e) {
  return new this(e).asinh();
}
function bc(e) {
  return new this(e).atan();
}
function wc(e) {
  return new this(e).atanh();
}
function xc(e, t) {
  (e = new this(e)), (t = new this(t));
  var r,
    n = this.precision,
    i = this.rounding,
    o = n + 4;
  return (
    !e.s || !t.s
      ? (r = new this(NaN))
      : !e.d && !t.d
      ? ((r = Te(this, o, 1).times(t.s > 0 ? 0.25 : 0.75)), (r.s = e.s))
      : !t.d || e.isZero()
      ? ((r = t.s < 0 ? Te(this, n, i) : new this(0)), (r.s = e.s))
      : !e.d || t.isZero()
      ? ((r = Te(this, o, 1).times(0.5)), (r.s = e.s))
      : t.s < 0
      ? ((this.precision = o),
        (this.rounding = 1),
        (r = this.atan(N(e, t, o, 1))),
        (t = Te(this, o, 1)),
        (this.precision = n),
        (this.rounding = i),
        (r = e.s < 0 ? r.minus(t) : r.plus(t)))
      : (r = this.atan(N(e, t, o, 1))),
    r
  );
}
function Ec(e) {
  return new this(e).cbrt();
}
function Tc(e) {
  return T((e = new this(e)), e.e + 1, 2);
}
function vc(e, t, r) {
  return new this(e).clamp(t, r);
}
function Pc(e) {
  if (!e || typeof e != 'object') throw Error(Ir + 'Object expected');
  var t,
    r,
    n,
    i = e.defaults === !0,
    o = [
      'precision',
      1,
      Je,
      'rounding',
      0,
      8,
      'toExpNeg',
      -ht,
      0,
      'toExpPos',
      0,
      ht,
      'maxE',
      0,
      ht,
      'minE',
      -ht,
      0,
      'modulo',
      0,
      9,
    ];
  for (t = 0; t < o.length; t += 3)
    if (((r = o[t]), i && (this[r] = li[r]), (n = e[r]) !== void 0))
      if (oe(n) === n && n >= o[t + 1] && n <= o[t + 2]) this[r] = n;
      else throw Error(Qe + r + ': ' + n);
  if (((r = 'crypto'), i && (this[r] = li[r]), (n = e[r]) !== void 0))
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (
          typeof crypto < 'u' &&
          crypto &&
          (crypto.getRandomValues || crypto.randomBytes)
        )
          this[r] = !0;
        else throw Error(gs);
      else this[r] = !1;
    else throw Error(Qe + r + ': ' + n);
  return this;
}
function Mc(e) {
  return new this(e).cos();
}
function Fc(e) {
  return new this(e).cosh();
}
function vs(e) {
  var t, r, n;
  function i(o) {
    var s,
      a,
      l,
      u = this;
    if (!(u instanceof i)) return new i(o);
    if (((u.constructor = i), fs(o))) {
      (u.s = o.s),
        M
          ? !o.d || o.e > i.maxE
            ? ((u.e = NaN), (u.d = null))
            : o.e < i.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = o.e), (u.d = o.d.slice()))
          : ((u.e = o.e), (u.d = o.d ? o.d.slice() : o.d));
      return;
    }
    if (((l = typeof o), l === 'number')) {
      if (o === 0) {
        (u.s = 1 / o < 0 ? -1 : 1), (u.e = 0), (u.d = [0]);
        return;
      }
      if ((o < 0 ? ((o = -o), (u.s = -1)) : (u.s = 1), o === ~~o && o < 1e7)) {
        for (s = 0, a = o; a >= 10; a /= 10) s++;
        M
          ? s > i.maxE
            ? ((u.e = NaN), (u.d = null))
            : s < i.minE
            ? ((u.e = 0), (u.d = [0]))
            : ((u.e = s), (u.d = [o]))
          : ((u.e = s), (u.d = [o]));
        return;
      } else if (o * 0 !== 0) {
        o || (u.s = NaN), (u.e = NaN), (u.d = null);
        return;
      }
      return pi(u, o.toString());
    } else if (l !== 'string') throw Error(Qe + o);
    return (
      (a = o.charCodeAt(0)) === 45
        ? ((o = o.slice(1)), (u.s = -1))
        : (a === 43 && (o = o.slice(1)), (u.s = 1)),
      ys.test(o) ? pi(u, o) : cc(u, o)
    );
  }
  if (
    ((i.prototype = y),
    (i.ROUND_UP = 0),
    (i.ROUND_DOWN = 1),
    (i.ROUND_CEIL = 2),
    (i.ROUND_FLOOR = 3),
    (i.ROUND_HALF_UP = 4),
    (i.ROUND_HALF_DOWN = 5),
    (i.ROUND_HALF_EVEN = 6),
    (i.ROUND_HALF_CEIL = 7),
    (i.ROUND_HALF_FLOOR = 8),
    (i.EUCLID = 9),
    (i.config = i.set = Pc),
    (i.clone = vs),
    (i.isDecimal = fs),
    (i.abs = fc),
    (i.acos = dc),
    (i.acosh = mc),
    (i.add = gc),
    (i.asin = hc),
    (i.asinh = yc),
    (i.atan = bc),
    (i.atanh = wc),
    (i.atan2 = xc),
    (i.cbrt = Ec),
    (i.ceil = Tc),
    (i.clamp = vc),
    (i.cos = Mc),
    (i.cosh = Fc),
    (i.div = Cc),
    (i.exp = Sc),
    (i.floor = Ac),
    (i.hypot = Oc),
    (i.ln = Rc),
    (i.log = $c),
    (i.log10 = kc),
    (i.log2 = Dc),
    (i.max = Ic),
    (i.min = Lc),
    (i.mod = Nc),
    (i.mul = _c),
    (i.pow = jc),
    (i.random = qc),
    (i.round = Bc),
    (i.sign = Vc),
    (i.sin = Uc),
    (i.sinh = Qc),
    (i.sqrt = Jc),
    (i.sub = Gc),
    (i.sum = Kc),
    (i.tan = Wc),
    (i.tanh = Hc),
    (i.trunc = zc),
    e === void 0 && (e = {}),
    e && e.defaults !== !0)
  )
    for (
      n = [
        'precision',
        'rounding',
        'toExpNeg',
        'toExpPos',
        'maxE',
        'minE',
        'modulo',
        'crypto',
      ],
        t = 0;
      t < n.length;

    )
      e.hasOwnProperty((r = n[t++])) || (e[r] = this[r]);
  return i.config(e), i;
}
function Cc(e, t) {
  return new this(e).div(t);
}
function Sc(e) {
  return new this(e).exp();
}
function Ac(e) {
  return T((e = new this(e)), e.e + 1, 3);
}
function Oc() {
  var e,
    t,
    r = new this(0);
  for (M = !1, e = 0; e < arguments.length; )
    if (((t = new this(arguments[e++])), t.d)) r.d && (r = r.plus(t.times(t)));
    else {
      if (t.s) return (M = !0), new this(1 / 0);
      r = t;
    }
  return (M = !0), r.sqrt();
}
function fs(e) {
  return e instanceof rt || (e && e.toStringTag === hs) || !1;
}
function Rc(e) {
  return new this(e).ln();
}
function $c(e, t) {
  return new this(e).log(t);
}
function Dc(e) {
  return new this(e).log(2);
}
function kc(e) {
  return new this(e).log(10);
}
function Ic() {
  return xs(this, arguments, 'lt');
}
function Lc() {
  return xs(this, arguments, 'gt');
}
function Nc(e, t) {
  return new this(e).mod(t);
}
function _c(e, t) {
  return new this(e).mul(t);
}
function jc(e, t) {
  return new this(e).pow(t);
}
function qc(e) {
  var t,
    r,
    n,
    i,
    o = 0,
    s = new this(1),
    a = [];
  if (
    (e === void 0 ? (e = this.precision) : pe(e, 1, Je),
    (n = Math.ceil(e / v)),
    this.crypto)
  )
    if (crypto.getRandomValues)
      for (t = crypto.getRandomValues(new Uint32Array(n)); o < n; )
        (i = t[o]),
          i >= 429e7
            ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (a[o++] = i % 1e7);
    else if (crypto.randomBytes) {
      for (t = crypto.randomBytes((n *= 4)); o < n; )
        (i =
          t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((t[o + 3] & 127) << 24)),
          i >= 214e7
            ? crypto.randomBytes(4).copy(t, o)
            : (a.push(i % 1e7), (o += 4));
      o = n / 4;
    } else throw Error(gs);
  else for (; o < n; ) a[o++] = (Math.random() * 1e7) | 0;
  for (
    n = a[--o],
      e %= v,
      n && e && ((i = H(10, v - e)), (a[o] = ((n / i) | 0) * i));
    a[o] === 0;
    o--
  )
    a.pop();
  if (o < 0) (r = 0), (a = [0]);
  else {
    for (r = -1; a[0] === 0; r -= v) a.shift();
    for (n = 1, i = a[0]; i >= 10; i /= 10) n++;
    n < v && (r -= v - n);
  }
  return (s.e = r), (s.d = a), s;
}
function Bc(e) {
  return T((e = new this(e)), e.e + 1, this.rounding);
}
function Vc(e) {
  return (e = new this(e)), e.d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN;
}
function Uc(e) {
  return new this(e).sin();
}
function Qc(e) {
  return new this(e).sinh();
}
function Jc(e) {
  return new this(e).sqrt();
}
function Gc(e, t) {
  return new this(e).sub(t);
}
function Kc() {
  var e = 0,
    t = arguments,
    r = new this(t[e]);
  for (M = !1; r.s && ++e < t.length; ) r = r.plus(t[e]);
  return (M = !0), T(r, this.precision, this.rounding);
}
function Wc(e) {
  return new this(e).tan();
}
function Hc(e) {
  return new this(e).tanh();
}
function zc(e) {
  return T((e = new this(e)), e.e + 1, 1);
}
y[Symbol.for('nodejs.util.inspect.custom')] = y.toString;
y[Symbol.toStringTag] = 'Decimal';
var rt = (y.constructor = vs(li));
$r = new rt($r);
Dr = new rt(Dr);
var ge = rt;
var gi = R(jt()),
  Fs = R(_r());
var we = class {
  constructor(t, r, n, i) {
    (this.modelName = t),
      (this.name = r),
      (this.typeName = n),
      (this.isList = i);
  }
  _toGraphQLInputType() {
    return `${
      this.isList ? `List${this.typeName}` : this.typeName
    }FieldRefInput<${this.modelName}>`;
  }
};
function jr(e) {
  return e instanceof we;
}
var Ms = [
    'JsonNullValueInput',
    'NullableJsonNullValueInput',
    'JsonNullValueFilter',
  ],
  qr = Symbol(),
  di = new WeakMap(),
  se = class {
    constructor(t) {
      t === qr
        ? di.set(this, `Prisma.${this._getName()}`)
        : di.set(
            this,
            `new Prisma.${this._getNamespace()}.${this._getName()}()`
          );
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return di.get(this);
    }
  },
  Jt = class extends se {
    _getNamespace() {
      return 'NullTypes';
    }
  },
  Gt = class extends Jt {};
mi(Gt, 'DbNull');
var Kt = class extends Jt {};
mi(Kt, 'JsonNull');
var Wt = class extends Jt {};
mi(Wt, 'AnyNull');
var bt = {
  classes: { DbNull: Gt, JsonNull: Kt, AnyNull: Wt },
  instances: { DbNull: new Gt(qr), JsonNull: new Kt(qr), AnyNull: new Wt(qr) },
};
function mi(e, t) {
  Object.defineProperty(e, 'name', { value: t, configurable: !0 });
}
function Ge(e) {
  return rt.isDecimal(e)
    ? !0
    : e !== null &&
        typeof e == 'object' &&
        typeof e.s == 'number' &&
        typeof e.e == 'number' &&
        typeof e.toFixed == 'function' &&
        Array.isArray(e.d);
}
var ae = (e, t) => {
    let r = {};
    for (let n of e) {
      let i = n[t];
      r[i] = n;
    }
    return r;
  },
  wt = {
    String: !0,
    Int: !0,
    Float: !0,
    Boolean: !0,
    Long: !0,
    DateTime: !0,
    ID: !0,
    UUID: !0,
    Json: !0,
    Bytes: !0,
    Decimal: !0,
    BigInt: !0,
  };
var Yc = {
  string: 'String',
  boolean: 'Boolean',
  object: 'Json',
  symbol: 'Symbol',
};
function xt(e) {
  return typeof e == 'string' ? e : e.name;
}
function zt(e, t) {
  return t ? `List<${e}>` : e;
}
var Zc =
    /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/,
  Xc =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function Et(e, t) {
  let r = t?.type;
  if (e === null) return 'null';
  if (Object.prototype.toString.call(e) === '[object BigInt]') return 'BigInt';
  if (ge.isDecimal(e) || (r === 'Decimal' && Ge(e))) return 'Decimal';
  if (Buffer.isBuffer(e)) return 'Bytes';
  if (ep(e, t)) return r.name;
  if (e instanceof se) return e._getName();
  if (e instanceof we) return e._toGraphQLInputType();
  if (Array.isArray(e)) {
    let i = e.reduce((o, s) => {
      let a = Et(s, t);
      return o.includes(a) || o.push(a), o;
    }, []);
    return (
      i.includes('Float') && i.includes('Int') && (i = ['Float']),
      `List<${i.join(' | ')}>`
    );
  }
  let n = typeof e;
  if (n === 'number') return Math.trunc(e) === e ? 'Int' : 'Float';
  if (Object.prototype.toString.call(e) === '[object Date]') return 'DateTime';
  if (n === 'string') {
    if (Xc.test(e)) return 'UUID';
    if (new Date(e).toString() === 'Invalid Date') return 'String';
    if (Zc.test(e)) return 'DateTime';
  }
  return Yc[n];
}
function ep(e, t) {
  let r = t?.type;
  if (!rp(r)) return !1;
  if (t?.namespace === 'prisma' && Ms.includes(r.name)) {
    let n = e?.constructor?.name;
    return (
      typeof n == 'string' && bt.instances[n] === e && r.values.includes(n)
    );
  }
  return typeof e == 'string' && r.values.includes(e);
}
function Br(e, t) {
  return t.reduce(
    (n, i) => {
      let o = (0, Fs.default)(e, i);
      return o < n.distance ? { distance: o, str: i } : n;
    },
    {
      distance: Math.min(
        Math.floor(e.length) * 1.1,
        ...t.map(n => n.length * 3)
      ),
      str: null,
    }
  ).str;
}
function Tt(e, t = !1) {
  if (typeof e == 'string') return e;
  if (e.values)
    return `enum ${e.name} {
${(0, gi.default)(e.values.join(', '), 2)}
}`;
  {
    let r = (0, gi.default)(
      e.fields.map(n => {
        let i = `${n.name}`,
          o = `${t ? S(i) : i}${n.isRequired ? '' : '?'}: ${Ot(
            n.inputTypes
              .map(s => zt(tp(s.type) ? s.type.name : xt(s.type), s.isList))
              .join(' | ')
          )}`;
        return n.isRequired ? o : D(o);
      }).join(`
`),
      2
    );
    return `${D('type')} ${P(D(e.name))} ${D('{')}
${r}
${D('}')}`;
  }
}
function tp(e) {
  return typeof e != 'string';
}
function Ht(e) {
  return typeof e == 'string' ? (e === 'Null' ? 'null' : e) : e.name;
}
function Yt(e) {
  return typeof e == 'string' ? e : e.name;
}
function hi(e, t, r = !1) {
  if (typeof e == 'string') return e === 'Null' ? 'null' : e;
  if (e.values) return e.values.join(' | ');
  let n = e,
    i =
      t &&
      n.fields.every(
        o =>
          o.inputTypes[0].location === 'inputObjectTypes' ||
          o.inputTypes[1]?.location === 'inputObjectTypes'
      );
  return r
    ? Ht(e)
    : n.fields.reduce((o, s) => {
        let a = '';
        return (
          !i && !s.isRequired
            ? (a = s.inputTypes.map(l => Ht(l.type)).join(' | '))
            : (a = s.inputTypes
                .map(l => hi(l.type, s.isRequired, !0))
                .join(' | ')),
          (o[s.name + (s.isRequired ? '' : '?')] = a),
          o
        );
      }, {});
}
function Cs(e, t, r) {
  let n = {};
  for (let i of e) n[r(i)] = i;
  for (let i of t) {
    let o = r(i);
    n[o] || (n[o] = i);
  }
  return Object.values(n);
}
function vt(e) {
  return e.substring(0, 1).toLowerCase() + e.substring(1);
}
function Ss(e) {
  return e.endsWith('GroupByOutputType');
}
function rp(e) {
  return (
    typeof e == 'object' &&
    e !== null &&
    typeof e.name == 'string' &&
    Array.isArray(e.values)
  );
}
var Vr = class {
    constructor({ datamodel: t }) {
      (this.datamodel = t),
        (this.datamodelEnumMap = this.getDatamodelEnumMap()),
        (this.modelMap = this.getModelMap()),
        (this.typeMap = this.getTypeMap()),
        (this.typeAndModelMap = this.getTypeModelMap());
    }
    getDatamodelEnumMap() {
      return ae(this.datamodel.enums, 'name');
    }
    getModelMap() {
      return { ...ae(this.datamodel.models, 'name') };
    }
    getTypeMap() {
      return { ...ae(this.datamodel.types, 'name') };
    }
    getTypeModelMap() {
      return { ...this.getTypeMap(), ...this.getModelMap() };
    }
  },
  Ur = class {
    constructor({ mappings: t }) {
      (this.mappings = t), (this.mappingsMap = this.getMappingsMap());
    }
    getMappingsMap() {
      return ae(this.mappings.modelOperations, 'model');
    }
    getOtherOperationNames() {
      return [
        Object.values(this.mappings.otherOperations.write),
        Object.values(this.mappings.otherOperations.read),
      ].flat();
    }
  },
  Qr = class {
    constructor({ schema: t }) {
      this.outputTypeToMergedOutputType = t => ({ ...t, fields: t.fields });
      (this.schema = t),
        (this.enumMap = this.getEnumMap()),
        (this.queryType = this.getQueryType()),
        (this.mutationType = this.getMutationType()),
        (this.outputTypes = this.getOutputTypes()),
        (this.outputTypeMap = this.getMergedOutputTypeMap()),
        this.resolveOutputTypes(),
        (this.inputObjectTypes = this.schema.inputObjectTypes),
        (this.inputTypeMap = this.getInputTypeMap()),
        this.resolveInputTypes(),
        this.resolveFieldArgumentTypes(),
        (this.queryType = this.outputTypeMap.Query),
        (this.mutationType = this.outputTypeMap.Mutation),
        (this.rootFieldMap = this.getRootFieldMap());
    }
    get [Symbol.toStringTag]() {
      return 'DMMFClass';
    }
    resolveOutputTypes() {
      for (let t of this.outputTypes.model) {
        for (let r of t.fields)
          typeof r.outputType.type == 'string' &&
            !wt[r.outputType.type] &&
            (r.outputType.type =
              this.outputTypeMap[r.outputType.type] ||
              this.outputTypeMap[r.outputType.type] ||
              this.enumMap[r.outputType.type] ||
              r.outputType.type);
        t.fieldMap = ae(t.fields, 'name');
      }
      for (let t of this.outputTypes.prisma) {
        for (let r of t.fields)
          typeof r.outputType.type == 'string' &&
            !wt[r.outputType.type] &&
            (r.outputType.type =
              this.outputTypeMap[r.outputType.type] ||
              this.outputTypeMap[r.outputType.type] ||
              this.enumMap[r.outputType.type] ||
              r.outputType.type);
        t.fieldMap = ae(t.fields, 'name');
      }
    }
    resolveInputTypes() {
      let t = this.inputObjectTypes.prisma;
      this.inputObjectTypes.model && t.push(...this.inputObjectTypes.model);
      for (let r of t) {
        for (let n of r.fields)
          for (let i of n.inputTypes) {
            let o = i.type;
            typeof o == 'string' &&
              !wt[o] &&
              (this.inputTypeMap[o] || this.enumMap[o]) &&
              (i.type = this.inputTypeMap[o] || this.enumMap[o] || o);
          }
        r.fieldMap = ae(r.fields, 'name');
      }
    }
    resolveFieldArgumentTypes() {
      for (let t of this.outputTypes.prisma)
        for (let r of t.fields)
          for (let n of r.args)
            for (let i of n.inputTypes) {
              let o = i.type;
              typeof o == 'string' &&
                !wt[o] &&
                (i.type = this.inputTypeMap[o] || this.enumMap[o] || o);
            }
      for (let t of this.outputTypes.model)
        for (let r of t.fields)
          for (let n of r.args)
            for (let i of n.inputTypes) {
              let o = i.type;
              typeof o == 'string' &&
                !wt[o] &&
                (i.type = this.inputTypeMap[o] || this.enumMap[o] || i.type);
            }
    }
    getQueryType() {
      return this.schema.outputObjectTypes.prisma.find(t => t.name === 'Query');
    }
    getMutationType() {
      return this.schema.outputObjectTypes.prisma.find(
        t => t.name === 'Mutation'
      );
    }
    getOutputTypes() {
      return {
        model: this.schema.outputObjectTypes.model.map(
          this.outputTypeToMergedOutputType
        ),
        prisma: this.schema.outputObjectTypes.prisma.map(
          this.outputTypeToMergedOutputType
        ),
      };
    }
    getEnumMap() {
      return {
        ...ae(this.schema.enumTypes.prisma, 'name'),
        ...(this.schema.enumTypes.model
          ? ae(this.schema.enumTypes.model, 'name')
          : void 0),
      };
    }
    hasEnumInNamespace(t, r) {
      return this.schema.enumTypes[r]?.find(n => n.name === t) !== void 0;
    }
    getMergedOutputTypeMap() {
      return {
        ...ae(this.outputTypes.model, 'name'),
        ...ae(this.outputTypes.prisma, 'name'),
      };
    }
    getInputTypeMap() {
      return {
        ...(this.schema.inputObjectTypes.model
          ? ae(this.schema.inputObjectTypes.model, 'name')
          : void 0),
        ...ae(this.schema.inputObjectTypes.prisma, 'name'),
      };
    }
    getRootFieldMap() {
      return {
        ...ae(this.queryType.fields, 'name'),
        ...ae(this.mutationType.fields, 'name'),
      };
    }
  },
  Ke = class {
    constructor(t) {
      return Object.assign(this, new Vr(t), new Ur(t), new Qr(t));
    }
  };
us(Ke, [Vr, Ur, Qr]);
var Al = require('async_hooks'),
  Ol = require('events'),
  Rl = R(require('fs')),
  lr = R(require('path'));
var Os = R(As());
function Rs(e) {
  return { ...e, mappings: np(e.mappings, e.datamodel) };
}
function np(e, t) {
  return {
    modelOperations: e.modelOperations
      .filter(n => {
        let i = t.models.find(o => o.name === n.model);
        if (!i) throw new Error(`Mapping without model ${n.model}`);
        return i.fields.some(o => o.kind !== 'object');
      })
      .map(n => ({
        model: n.model,
        plural: (0, Os.default)(vt(n.model)),
        findUnique: n.findUnique || n.findSingle,
        findUniqueOrThrow: n.findUniqueOrThrow,
        findFirst: n.findFirst,
        findFirstOrThrow: n.findFirstOrThrow,
        findMany: n.findMany,
        create: n.createOne || n.createSingle || n.create,
        createMany: n.createMany,
        delete: n.deleteOne || n.deleteSingle || n.delete,
        update: n.updateOne || n.updateSingle || n.update,
        deleteMany: n.deleteMany,
        updateMany: n.updateMany,
        upsert: n.upsertOne || n.upsertSingle || n.upsert,
        aggregate: n.aggregate,
        groupBy: n.groupBy,
        findRaw: n.findRaw,
        aggregateRaw: n.aggregateRaw,
      })),
    otherOperations: e.otherOperations,
  };
}
function $s(e) {
  return Rs(e);
}
function Ds({ error: e, user_facing_error: t }, r) {
  return t.error_code
    ? new ne(t.message, {
        code: t.error_code,
        clientVersion: r,
        meta: t.meta,
        batchRequestIdx: t.batch_request_idx,
      })
    : new ie(e, { clientVersion: r, batchRequestIdx: t.batch_request_idx });
}
var Jr = class {};
function ks(e, t) {
  return ip(e)
    ? !t || t.kind === 'itx'
      ? { batch: e, transaction: !1 }
      : { batch: e, transaction: !0, isolationLevel: t.options.isolationLevel }
    : {
        batch: e,
        transaction:
          t?.kind === 'batch'
            ? { isolationLevel: t.options.isolationLevel }
            : void 0,
      };
}
function ip(e) {
  return typeof e[0].query == 'string';
}
var wi = R(Vt());
function Is(e) {
  return e
    ? e
        .replace(/".*"/g, '"X"')
        .replace(/[\s:\[]([+-]?([0-9]*[.])?[0-9]+)/g, t => `${t[0]}5`)
    : '';
}
function Ls(e) {
  return e
    .split(
      `
`
    )
    .map(t =>
      t
        .replace(
          /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\s*/,
          ''
        )
        .replace(/\+\d+\s*ms$/, '')
    ).join(`
`);
}
var Ns = R(os());
function _s({
  title: e,
  user: t = 'prisma',
  repo: r = 'prisma',
  template: n = 'bug_report.md',
  body: i,
}) {
  return (0, Ns.default)({ user: t, repo: r, template: n, title: e, body: i });
}
function js({
  version: e,
  platform: t,
  title: r,
  description: n,
  engineVersion: i,
  database: o,
  query: s,
}) {
  let a = wo(6e3 - (s?.length ?? 0)),
    l = Ls((0, wi.default)(a)),
    u = n
      ? `# Description
\`\`\`
${n}
\`\`\``
      : '',
    c = (0,
    wi.default)(`Hi Prisma Team! My Prisma Client just crashed. This is the report:
## Versions

| Name            | Version            |
|-----------------|--------------------|
| Node            | ${process.version?.padEnd(19)}| 
| OS              | ${t?.padEnd(19)}|
| Prisma Client   | ${e?.padEnd(19)}|
| Query Engine    | ${i?.padEnd(19)}|
| Database        | ${o?.padEnd(19)}|

${u}

## Logs
\`\`\`
${l}
\`\`\`

## Client Snippet
\`\`\`ts
// PLEASE FILL YOUR CODE SNIPPET HERE
\`\`\`

## Schema
\`\`\`prisma
// PLEASE ADD YOUR SCHEMA HERE IF POSSIBLE
\`\`\`

## Prisma Engine Query
\`\`\`
${s ? Is(s) : ''}
\`\`\`
`),
    p = _s({ title: r, body: c });
  return `${r}

This is a non-recoverable error which probably happens when the Prisma Query Engine has a panic.

${K(p)}

If you want the Prisma team to look into it, please open the link above \u{1F64F}
To increase the chance of success, please post your schema and a snippet of
how you used Prisma Client in the issue. 
`;
}
var Qs = R(require('fs'));
function qs(e) {
  if (e?.kind === 'itx') return e.options.id;
}
var Pt = R(require('fs'));
var Ei = R(require('os')),
  We = R(require('path'));
var Bs = J('prisma:client:libraryEngine:loader'),
  xi = Symbol('PrismaLibraryEngineCache');
function op() {
  let e = globalThis;
  return e[xi] === void 0 && (e[xi] = {}), e[xi];
}
function sp(e) {
  let t = op();
  if (t[e] !== void 0) return t[e];
  let r = We.default.toNamespacedPath(e),
    n = { exports: {} },
    i = 0;
  return (
    process.platform !== 'win32' &&
      (i =
        Ei.default.constants.dlopen.RTLD_LAZY |
        Ei.default.constants.dlopen.RTLD_DEEPBIND),
    process.dlopen(n, r, i),
    (t[e] = n.exports),
    n.exports
  );
}
var Gr = class {
  constructor(e) {
    this.libQueryEnginePath = null;
    this.platform = null;
    this.config = e;
  }
  async loadLibrary() {
    let e = await Wn();
    (this.platform = e.binaryTarget),
      this.libQueryEnginePath ||
        (this.libQueryEnginePath = await this.getLibQueryEnginePath()),
      Bs(`loadEngine using ${this.libQueryEnginePath}`);
    try {
      let t = this.libQueryEnginePath;
      return this.config.tracingHelper.runInChildSpan(
        { name: 'loadLibrary', internal: !0 },
        () => sp(t)
      );
    } catch (t) {
      let r = Yn({ e: t, platformInfo: e, id: this.libQueryEnginePath });
      throw new G(r, this.config.clientVersion);
    }
  }
  async getLibQueryEnginePath() {
    let e = process.env.PRISMA_QUERY_ENGINE_LIBRARY ?? this.config.prismaPath;
    if (e && Pt.default.existsSync(e) && e.endsWith('.node')) return e;
    this.platform = this.platform ?? (await Be());
    let { enginePath: t, searchedLocations: r } =
      await this.resolveEnginePath();
    if (!Pt.default.existsSync(t)) {
      let n = this.platform
          ? `
You incorrectly pinned it to ${P(A(`${this.platform}`))}
`
          : '',
        i = `Query engine library for current platform "${P(
          this.platform
        )}" could not be found.${n}
This probably happens, because you built Prisma Client on a different platform.
(Prisma Client looked in "${K(t)}")

Searched Locations:

${r
  .map(o => {
    let s = `  ${o}`;
    if (
      process.env.DEBUG === 'node-engine-search-locations' &&
      Pt.default.existsSync(o)
    ) {
      let a = Pt.default.readdirSync(o);
      s += a.map(l => `    ${l}`).join(`
`);
    }
    return s;
  })
  .join(
    `
` +
      (process.env.DEBUG === 'node-engine-search-locations'
        ? `
`
        : '')
  )}
`;
      throw (
        (this.config.generator
          ? ((this.platform = this.platform ?? (await Be())),
            this.config.generator.binaryTargets.find(
              o => o.value === this.platform
            ) ||
            this.config.generator.binaryTargets.find(o => o.value === 'native')
              ? ((i += `
You already added the platform${
                  this.config.generator.binaryTargets.length > 1 ? 's' : ''
                } ${this.config.generator.binaryTargets
                  .map(o => `"${P(o.value)}"`)
                  .join(', ')} to the "${K('generator')}" block
in the "schema.prisma" file as described in https://pris.ly/d/client-generator,
but something went wrong. That's suboptimal.

Please create an issue at https://github.com/prisma/prisma/issues/new`),
                (i += ''))
              : (i += `

To solve this problem, add the platform "${this.platform}" to the "${K(
                  'binaryTargets'
                )}" attribute in the "${K(
                  'generator'
                )}" block in the "schema.prisma" file:
${S(this.getFixedGenerator())}

Then run "${S('prisma generate')}" for your changes to take effect.
Read more about deploying Prisma Client: https://pris.ly/d/client-generator`))
          : (i += `

Read more about deploying Prisma Client: https://pris.ly/d/client-generator
`),
        new G(i, this.config.clientVersion))
      );
    }
    return (this.platform = this.platform ?? (await Be())), t;
  }
  async resolveEnginePath() {
    let searchedLocations = [],
      enginePath;
    if (this.libQueryEnginePath)
      return { enginePath: this.libQueryEnginePath, searchedLocations };
    if (
      ((this.platform = this.platform ?? (await Be())),
      __filename.includes('DefaultLibraryLoader'))
    )
      return (
        (enginePath = We.default.join(Yo(), kt(this.platform, 'fs'))),
        { enginePath, searchedLocations }
      );
    let dirname = eval('__dirname'),
      searchLocations = [
        We.default.resolve(dirname, '../../../.prisma/client'),
        this.config.generator?.output?.value ?? dirname,
        We.default.resolve(dirname, '..'),
        We.default.dirname(this.config.datamodelPath),
        this.config.cwd,
        '/tmp/prisma-engines',
      ];
    this.config.dirname && searchLocations.push(this.config.dirname);
    for (let e of searchLocations)
      if (
        (searchedLocations.push(e),
        Bs(`Searching for Query Engine Library in ${e}`),
        (enginePath = We.default.join(e, kt(this.platform, 'fs'))),
        Pt.default.existsSync(enginePath))
      )
        return { enginePath, searchedLocations };
    return (
      (enginePath = We.default.join(__dirname, kt(this.platform, 'fs'))),
      { enginePath, searchedLocations }
    );
  }
  getFixedGenerator() {
    let e = {
      ...this.config.generator,
      binaryTargets: Zn(this.config.generator.binaryTargets, this.platform),
    };
    return ei(e);
  }
};
var ap = J('prisma:client:libraryEngine:exitHooks'),
  lp = { SIGINT: 2, SIGUSR2: 31, SIGTERM: 15 },
  Kr = class {
    constructor() {
      this.nextOwnerId = 1;
      this.ownerToIdMap = new WeakMap();
      this.idToListenerMap = new Map();
      this.areHooksInstalled = !1;
      this.exitLikeHook = async t => {
        ap(`exit event received: ${t}`);
        for (let r of this.idToListenerMap.values()) await r();
        this.idToListenerMap.clear();
      };
    }
    install() {
      this.areHooksInstalled ||
        (this.installExitEventHook('beforeExit'),
        this.installExitEventHook('exit'),
        this.installExitSignalHook('SIGINT'),
        this.installExitSignalHook('SIGUSR2'),
        this.installExitSignalHook('SIGTERM'),
        (this.areHooksInstalled = !0));
    }
    setListener(t, r) {
      if (r) {
        let n = this.ownerToIdMap.get(t);
        n || ((n = this.nextOwnerId++), this.ownerToIdMap.set(t, n)),
          this.idToListenerMap.set(n, r);
      } else {
        let n = this.ownerToIdMap.get(t);
        n !== void 0 &&
          (this.ownerToIdMap.delete(t), this.idToListenerMap.delete(n));
      }
    }
    getListener(t) {
      let r = this.ownerToIdMap.get(t);
      if (r !== void 0) return this.idToListenerMap.get(r);
    }
    installExitEventHook(t) {
      process.once(t, this.exitLikeHook);
    }
    installExitSignalHook(t) {
      process.once(t, async r => {
        if ((await this.exitLikeHook(r), process.listenerCount(r) > 0)) return;
        let i = lp[r] + 128;
        process.exit(i);
      });
    }
  };
var Ne = J('prisma:client:libraryEngine');
function up(e) {
  return e.item_type === 'query' && 'query' in e;
}
function cp(e) {
  return 'level' in e ? e.level === 'error' && e.message === 'PANIC' : !1;
}
var Vs = [...zn, 'native'],
  Us = 0,
  Ti = new Kr(),
  Zt = class extends Jr {
    constructor(r, n = new Gr(r)) {
      super();
      try {
        this.datamodel = Qs.default.readFileSync(r.datamodelPath, 'utf-8');
      } catch (i) {
        throw i.stack.match(/\/\.next|\/next@|\/next\//)
          ? new G(
              `Your schema.prisma could not be found, and we detected that you are using Next.js.
Find out why and learn how to fix this: https://pris.ly/d/schema-not-found-nextjs`,
              r.clientVersion
            )
          : r.isBundled === !0
          ? new G(
              'Prisma Client could not find its `schema.prisma`. This is likely caused by a bundling step, which leads to `schema.prisma` not being copied near the resulting bundle. We would appreciate if you could take the time to share some information with us.\nPlease help us by answering a few questions: https://pris.ly/bundler-investigation-error',
              r.clientVersion
            )
          : i;
      }
      (this.config = r),
        (this.libraryStarted = !1),
        (this.logQueries = r.logQueries ?? !1),
        (this.logLevel = r.logLevel ?? 'error'),
        (this.libraryLoader = n),
        (this.logEmitter = r.logEmitter),
        (this.engineProtocol = r.engineProtocol),
        (this.datasourceOverrides = r.datasources
          ? this.convertDatasources(r.datasources)
          : {}),
        r.enableDebugLogs && (this.logLevel = 'debug'),
        (this.libraryInstantiationPromise = this.instantiateLibrary()),
        Ti.install(),
        this.checkForTooManyEngines();
    }
    get beforeExitListener() {
      return Ti.getListener(this);
    }
    set beforeExitListener(r) {
      Ti.setListener(this, r);
    }
    checkForTooManyEngines() {
      Us === 10 &&
        console.warn(
          `${Se(
            'warn(prisma-client)'
          )} There are already 10 instances of Prisma Client actively running.`
        );
    }
    async transaction(r, n, i) {
      await this.start();
      let o = JSON.stringify(n),
        s;
      if (r === 'start') {
        let l = JSON.stringify({
          max_wait: i?.maxWait ?? 2e3,
          timeout: i?.timeout ?? 5e3,
          isolation_level: i?.isolationLevel,
        });
        s = await this.engine?.startTransaction(l, o);
      } else
        r === 'commit'
          ? (s = await this.engine?.commitTransaction(i.id, o))
          : r === 'rollback' &&
            (s = await this.engine?.rollbackTransaction(i.id, o));
      let a = this.parseEngineResponse(s);
      if (a.error_code)
        throw new ne(a.message, {
          code: a.error_code,
          clientVersion: this.config.clientVersion,
          meta: a.meta,
        });
      return a;
    }
    async instantiateLibrary() {
      if ((Ne('internalSetup'), this.libraryInstantiationPromise))
        return this.libraryInstantiationPromise;
      Hn(),
        (this.platform = await this.getPlatform()),
        await this.loadEngine(),
        this.version();
    }
    async getPlatform() {
      if (this.platform) return this.platform;
      let r = await Be();
      if (!Vs.includes(r))
        throw new G(
          `Unknown ${A('PRISMA_QUERY_ENGINE_LIBRARY')} ${A(
            P(r)
          )}. Possible binaryTargets: ${S(
            Vs.join(', ')
          )} or a path to the query engine library.
You may have to run ${S('prisma generate')} for your changes to take effect.`,
          this.config.clientVersion
        );
      return r;
    }
    parseEngineResponse(r) {
      if (!r)
        throw new ie('Response from the Engine was empty', {
          clientVersion: this.config.clientVersion,
        });
      try {
        return JSON.parse(r);
      } catch {
        throw new ie('Unable to JSON.parse response from engine', {
          clientVersion: this.config.clientVersion,
        });
      }
    }
    convertDatasources(r) {
      let n = Object.create(null);
      for (let { name: i, url: o } of r) n[i] = o;
      return n;
    }
    async loadEngine() {
      if (!this.engine) {
        this.QueryEngineConstructor ||
          ((this.library = await this.libraryLoader.loadLibrary()),
          (this.QueryEngineConstructor = this.library.QueryEngine));
        try {
          let r = new WeakRef(this);
          (this.engine = new this.QueryEngineConstructor(
            {
              datamodel: this.datamodel,
              env: process.env,
              logQueries: this.config.logQueries ?? !1,
              ignoreEnvVarErrors: !0,
              datasourceOverrides: this.datasourceOverrides,
              logLevel: this.logLevel,
              configDir: this.config.cwd,
              engineProtocol: this.engineProtocol,
            },
            n => {
              r.deref()?.logger(n);
            }
          )),
            Us++;
        } catch (r) {
          let n = r,
            i = this.parseInitError(n.message);
          throw typeof i == 'string'
            ? n
            : new G(i.message, this.config.clientVersion, i.error_code);
        }
      }
    }
    logger(r) {
      let n = this.parseEngineResponse(r);
      if (!!n) {
        if ('span' in n) {
          this.config.tracingHelper.createEngineSpan(n);
          return;
        }
        (n.level = n?.level.toLowerCase() ?? 'unknown'),
          up(n)
            ? this.logEmitter.emit('query', {
                timestamp: new Date(),
                query: n.query,
                params: n.params,
                duration: Number(n.duration_ms),
                target: n.module_path,
              })
            : cp(n)
            ? (this.loggerRustPanic = new me(
                this.getErrorMessageWithLink(
                  `${n.message}: ${n.reason} in ${n.file}:${n.line}:${n.column}`
                ),
                this.config.clientVersion
              ))
            : this.logEmitter.emit(n.level, {
                timestamp: new Date(),
                message: n.message,
                target: n.module_path,
              });
      }
    }
    getErrorMessageWithLink(r) {
      return js({
        platform: this.platform,
        title: r,
        version: this.config.clientVersion,
        engineVersion: this.versionInfo?.commit,
        database: this.config.activeProvider,
        query: this.lastQuery,
      });
    }
    parseInitError(r) {
      try {
        return JSON.parse(r);
      } catch {}
      return r;
    }
    parseRequestError(r) {
      try {
        return JSON.parse(r);
      } catch {}
      return r;
    }
    on(r, n) {
      r === 'beforeExit'
        ? (this.beforeExitListener = n)
        : this.logEmitter.on(r, n);
    }
    async start() {
      if (
        (await this.libraryInstantiationPromise,
        await this.libraryStoppingPromise,
        this.libraryStartingPromise)
      )
        return (
          Ne(
            `library already starting, this.libraryStarted: ${this.libraryStarted}`
          ),
          this.libraryStartingPromise
        );
      if (this.libraryStarted) return;
      let r = async () => {
        Ne('library starting');
        try {
          let n = { traceparent: this.config.tracingHelper.getTraceParent() };
          await this.engine?.connect(JSON.stringify(n)),
            (this.libraryStarted = !0),
            Ne('library started');
        } catch (n) {
          let i = this.parseInitError(n.message);
          throw typeof i == 'string'
            ? n
            : new G(i.message, this.config.clientVersion, i.error_code);
        } finally {
          this.libraryStartingPromise = void 0;
        }
      };
      return (
        (this.libraryStartingPromise = this.config.tracingHelper.runInChildSpan(
          'connect',
          r
        )),
        this.libraryStartingPromise
      );
    }
    async stop() {
      if (
        (await this.libraryStartingPromise,
        await this.executingQueryPromise,
        this.libraryStoppingPromise)
      )
        return Ne('library is already stopping'), this.libraryStoppingPromise;
      if (!this.libraryStarted) return;
      let r = async () => {
        await new Promise(i => setTimeout(i, 5)), Ne('library stopping');
        let n = { traceparent: this.config.tracingHelper.getTraceParent() };
        await this.engine?.disconnect(JSON.stringify(n)),
          (this.libraryStarted = !1),
          (this.libraryStoppingPromise = void 0),
          Ne('library stopped');
      };
      return (
        (this.libraryStoppingPromise = this.config.tracingHelper.runInChildSpan(
          'disconnect',
          r
        )),
        this.libraryStoppingPromise
      );
    }
    async getDmmf() {
      await this.start();
      let r = this.config.tracingHelper.getTraceParent(),
        n = await this.engine.dmmf(JSON.stringify({ traceparent: r }));
      return this.config.tracingHelper.runInChildSpan(
        { name: 'parseDmmf', internal: !0 },
        () => JSON.parse(n)
      );
    }
    version() {
      return (
        (this.versionInfo = this.library?.version()),
        this.versionInfo?.version ?? 'unknown'
      );
    }
    debugPanic(r) {
      return this.library?.debugPanic(r);
    }
    async request(r, { traceparent: n, interactiveTransaction: i }) {
      Ne(`sending request, this.libraryStarted: ${this.libraryStarted}`);
      let o = JSON.stringify({ traceparent: n }),
        s = JSON.stringify(r);
      try {
        await this.start(),
          (this.executingQueryPromise = this.engine?.query(s, o, i?.id)),
          (this.lastQuery = s);
        let a = this.parseEngineResponse(await this.executingQueryPromise);
        if (a.errors)
          throw a.errors.length === 1
            ? this.buildQueryError(a.errors[0])
            : new ie(JSON.stringify(a.errors), {
                clientVersion: this.config.clientVersion,
              });
        if (this.loggerRustPanic) throw this.loggerRustPanic;
        return { data: a, elapsed: 0 };
      } catch (a) {
        if (a instanceof G) throw a;
        if (a.code === 'GenericFailure' && a.message?.startsWith('PANIC:'))
          throw new me(
            this.getErrorMessageWithLink(a.message),
            this.config.clientVersion
          );
        let l = this.parseRequestError(a.message);
        throw typeof l == 'string'
          ? a
          : new ie(
              `${l.message}
${l.backtrace}`,
              { clientVersion: this.config.clientVersion }
            );
      }
    }
    async requestBatch(r, { transaction: n, traceparent: i }) {
      Ne('requestBatch');
      let o = ks(r, n);
      await this.start(),
        (this.lastQuery = JSON.stringify(o)),
        (this.executingQueryPromise = this.engine.query(
          this.lastQuery,
          JSON.stringify({ traceparent: i }),
          qs(n)
        ));
      let s = await this.executingQueryPromise,
        a = this.parseEngineResponse(s);
      if (a.errors)
        throw a.errors.length === 1
          ? this.buildQueryError(a.errors[0])
          : new ie(JSON.stringify(a.errors), {
              clientVersion: this.config.clientVersion,
            });
      let { batchResult: l, errors: u } = a;
      if (Array.isArray(l))
        return l.map(c =>
          c.errors && c.errors.length > 0
            ? this.loggerRustPanic ?? this.buildQueryError(c.errors[0])
            : { data: c, elapsed: 0 }
        );
      throw u && u.length === 1
        ? new Error(u[0].error)
        : new Error(JSON.stringify(a));
    }
    buildQueryError(r) {
      return r.user_facing_error.is_panic
        ? new me(
            this.getErrorMessageWithLink(r.user_facing_error.message),
            this.config.clientVersion
          )
        : Ds(r, this.config.clientVersion);
    }
    async metrics(r) {
      await this.start();
      let n = await this.engine.metrics(JSON.stringify(r));
      return r.format === 'prometheus' ? n : this.parseEngineResponse(n);
    }
  };
var nt = R(jt());
var Si = R(Vt());
var Oe = class {
  constructor() {
    this._map = new Map();
  }
  get(t) {
    return this._map.get(t)?.value;
  }
  set(t, r) {
    this._map.set(t, { value: r });
  }
  getOrCreate(t, r) {
    let n = this._map.get(t);
    if (n) return n.value;
    let i = r();
    return this.set(t, i), i;
  }
};
function xe(e) {
  return e.replace(/^./, t => t.toLowerCase());
}
function Gs(e, t, r) {
  let n = xe(r);
  return !t.result || !(t.result.$allModels || t.result[n])
    ? e
    : pp({
        ...e,
        ...Js(t.name, e, t.result.$allModels),
        ...Js(t.name, e, t.result[n]),
      });
}
function pp(e) {
  let t = new Oe(),
    r = (n, i) =>
      t.getOrCreate(n, () =>
        i.has(n)
          ? [n]
          : (i.add(n), e[n] ? e[n].needs.flatMap(o => r(o, i)) : [n])
      );
  return mt(e, n => ({ ...n, needs: r(n.name, new Set()) }));
}
function Js(e, t, r) {
  return r
    ? mt(r, ({ needs: n, compute: i }, o) => ({
        name: o,
        needs: n ? Object.keys(n).filter(s => n[s]) : [],
        compute: fp(t, o, i),
      }))
    : {};
}
function fp(e, t, r) {
  let n = e?.[t]?.compute;
  return n ? i => r({ ...i, [t]: n(i) }) : r;
}
function Wr(e, t) {
  if (!t) return e;
  let r = { ...e };
  for (let n of Object.values(t))
    if (!!e[n.name]) for (let i of n.needs) r[i] = !0;
  return r;
}
var Zs = R(jt());
var Ys = R(require('fs'));
var Ks = {
  keyword: je,
  entity: je,
  value: e => P(st(e)),
  punctuation: st,
  directive: je,
  function: je,
  variable: e => P(st(e)),
  string: e => P(S(e)),
  boolean: Se,
  number: je,
  comment: fr,
};
var dp = e => e,
  Hr = {},
  mp = 0,
  F = {
    manual: Hr.Prism && Hr.Prism.manual,
    disableWorkerMessageHandler:
      Hr.Prism && Hr.Prism.disableWorkerMessageHandler,
    util: {
      encode: function (e) {
        if (e instanceof Pe) {
          let t = e;
          return new Pe(t.type, F.util.encode(t.content), t.alias);
        } else
          return Array.isArray(e)
            ? e.map(F.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ');
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      objId: function (e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++mp }), e.__id
        );
      },
      clone: function e(t, r) {
        let n,
          i,
          o = F.util.type(t);
        switch (((r = r || {}), o)) {
          case 'Object':
            if (((i = F.util.objId(t)), r[i])) return r[i];
            (n = {}), (r[i] = n);
            for (let s in t) t.hasOwnProperty(s) && (n[s] = e(t[s], r));
            return n;
          case 'Array':
            return (
              (i = F.util.objId(t)),
              r[i]
                ? r[i]
                : ((n = []),
                  (r[i] = n),
                  t.forEach(function (s, a) {
                    n[a] = e(s, r);
                  }),
                  n)
            );
          default:
            return t;
        }
      },
    },
    languages: {
      extend: function (e, t) {
        let r = F.util.clone(F.languages[e]);
        for (let n in t) r[n] = t[n];
        return r;
      },
      insertBefore: function (e, t, r, n) {
        n = n || F.languages;
        let i = n[e],
          o = {};
        for (let a in i)
          if (i.hasOwnProperty(a)) {
            if (a == t) for (let l in r) r.hasOwnProperty(l) && (o[l] = r[l]);
            r.hasOwnProperty(a) || (o[a] = i[a]);
          }
        let s = n[e];
        return (
          (n[e] = o),
          F.languages.DFS(F.languages, function (a, l) {
            l === s && a != e && (this[a] = o);
          }),
          o
        );
      },
      DFS: function e(t, r, n, i) {
        i = i || {};
        let o = F.util.objId;
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            r.call(t, s, t[s], n || s);
            let a = t[s],
              l = F.util.type(a);
            l === 'Object' && !i[o(a)]
              ? ((i[o(a)] = !0), e(a, r, null, i))
              : l === 'Array' && !i[o(a)] && ((i[o(a)] = !0), e(a, r, s, i));
          }
      },
    },
    plugins: {},
    highlight: function (e, t, r) {
      let n = { code: e, grammar: t, language: r };
      return (
        F.hooks.run('before-tokenize', n),
        (n.tokens = F.tokenize(n.code, n.grammar)),
        F.hooks.run('after-tokenize', n),
        Pe.stringify(F.util.encode(n.tokens), n.language)
      );
    },
    matchGrammar: function (e, t, r, n, i, o, s) {
      for (let g in r) {
        if (!r.hasOwnProperty(g) || !r[g]) continue;
        if (g == s) return;
        let b = r[g];
        b = F.util.type(b) === 'Array' ? b : [b];
        for (let h = 0; h < b.length; ++h) {
          let x = b[h],
            w = x.inside,
            E = !!x.lookbehind,
            C = !!x.greedy,
            O = 0,
            q = x.alias;
          if (C && !x.pattern.global) {
            let k = x.pattern.toString().match(/[imuy]*$/)[0];
            x.pattern = RegExp(x.pattern.source, k + 'g');
          }
          x = x.pattern || x;
          for (let k = n, U = i; k < t.length; U += t[k].length, ++k) {
            let Q = t[k];
            if (t.length > e.length) return;
            if (Q instanceof Pe) continue;
            if (C && k != t.length - 1) {
              x.lastIndex = U;
              var p = x.exec(e);
              if (!p) break;
              var c = p.index + (E ? p[1].length : 0),
                f = p.index + p[0].length,
                a = k,
                l = U;
              for (
                let L = t.length;
                a < L && (l < f || (!t[a].type && !t[a - 1].greedy));
                ++a
              )
                (l += t[a].length), c >= l && (++k, (U = l));
              if (t[k] instanceof Pe) continue;
              (u = a - k), (Q = e.slice(U, l)), (p.index -= U);
            } else {
              x.lastIndex = 0;
              var p = x.exec(Q),
                u = 1;
            }
            if (!p) {
              if (o) break;
              continue;
            }
            E && (O = p[1] ? p[1].length : 0);
            var c = p.index + O,
              p = p[0].slice(O),
              f = c + p.length,
              d = Q.slice(0, c),
              m = Q.slice(f);
            let te = [k, u];
            d && (++k, (U += d.length), te.push(d));
            let ot = new Pe(g, w ? F.tokenize(p, w) : p, q, p, C);
            if (
              (te.push(ot),
              m && te.push(m),
              Array.prototype.splice.apply(t, te),
              u != 1 && F.matchGrammar(e, t, r, k, U, !0, g),
              o)
            )
              break;
          }
        }
      }
    },
    tokenize: function (e, t) {
      let r = [e],
        n = t.rest;
      if (n) {
        for (let i in n) t[i] = n[i];
        delete t.rest;
      }
      return F.matchGrammar(e, r, t, 0, 0, !1), r;
    },
    hooks: {
      all: {},
      add: function (e, t) {
        let r = F.hooks.all;
        (r[e] = r[e] || []), r[e].push(t);
      },
      run: function (e, t) {
        let r = F.hooks.all[e];
        if (!(!r || !r.length)) for (var n = 0, i; (i = r[n++]); ) i(t);
      },
    },
    Token: Pe,
  };
F.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  'class-name': {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
F.languages.javascript = F.languages.extend('clike', {
  'class-name': [
    F.languages.clike['class-name'],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function:
    /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
});
F.languages.javascript['class-name'][0].pattern =
  /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
F.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern:
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
    lookbehind: !0,
    greedy: !0,
  },
  'function-variable': {
    pattern:
      /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: 'function',
  },
  parameter: [
    {
      pattern:
        /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
      lookbehind: !0,
      inside: F.languages.javascript,
    },
    {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
      inside: F.languages.javascript,
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
      lookbehind: !0,
      inside: F.languages.javascript,
    },
    {
      pattern:
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
      lookbehind: !0,
      inside: F.languages.javascript,
    },
  ],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
});
F.languages.markup && F.languages.markup.tag.addInlined('script', 'javascript');
F.languages.js = F.languages.javascript;
F.languages.typescript = F.languages.extend('javascript', {
  keyword:
    /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
  builtin:
    /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
});
F.languages.ts = F.languages.typescript;
function Pe(e, t, r, n, i) {
  (this.type = e),
    (this.content = t),
    (this.alias = r),
    (this.length = (n || '').length | 0),
    (this.greedy = !!i);
}
Pe.stringify = function (e, t) {
  return typeof e == 'string'
    ? e
    : Array.isArray(e)
    ? e
        .map(function (r) {
          return Pe.stringify(r, t);
        })
        .join('')
    : gp(e.type)(e.content);
};
function gp(e) {
  return Ks[e] || dp;
}
function Ws(e) {
  return hp(e, F.languages.javascript);
}
function hp(e, t) {
  return F.tokenize(e, t)
    .map(n => Pe.stringify(n))
    .join('');
}
var Hs = R(qn());
function zs(e) {
  return (0, Hs.default)(e);
}
var Me = class {
  static read(t) {
    let r;
    try {
      r = Ys.default.readFileSync(t, 'utf-8');
    } catch {
      return null;
    }
    return Me.fromContent(r);
  }
  static fromContent(t) {
    let r = t.split(/\r?\n/);
    return new Me(1, r);
  }
  constructor(t, r) {
    (this.firstLineNumber = t), (this.lines = r);
  }
  get lastLineNumber() {
    return this.firstLineNumber + this.lines.length - 1;
  }
  mapLineAt(t, r) {
    if (
      t < this.firstLineNumber ||
      t > this.lines.length + this.firstLineNumber
    )
      return this;
    let n = t - this.firstLineNumber,
      i = [...this.lines];
    return (i[n] = r(i[n])), new Me(this.firstLineNumber, i);
  }
  mapLines(t) {
    return new Me(
      this.firstLineNumber,
      this.lines.map((r, n) => t(r, this.firstLineNumber + n))
    );
  }
  lineAt(t) {
    return this.lines[t - this.firstLineNumber];
  }
  prependSymbolAt(t, r) {
    return this.mapLines((n, i) => (i === t ? `${r} ${n}` : `  ${n}`));
  }
  slice(t, r) {
    let n = this.lines.slice(t - 1, r).join(`
`);
    return new Me(
      t,
      zs(n).split(`
`)
    );
  }
  highlight() {
    let t = Ws(this.toString());
    return new Me(
      this.firstLineNumber,
      t.split(`
`)
    );
  }
  toString() {
    return this.lines.join(`
`);
  }
};
var yp = {
    red: A,
    gray: fr,
    dim: D,
    bold: P,
    underline: K,
    highlightSource: e => e.highlight(),
  },
  bp = {
    red: e => e,
    gray: e => e,
    dim: e => e,
    bold: e => e,
    underline: e => e,
    highlightSource: e => e,
  };
function wp(
  { callsite: e, message: t, originalMethod: r, isPanic: n, callArguments: i },
  o
) {
  let s = {
    functionName: `prisma.${r}()`,
    message: t,
    isPanic: n ?? !1,
    callArguments: i,
  };
  if (!e || typeof window < 'u' || process.env.NODE_ENV === 'production')
    return s;
  let a = e.getLocation();
  if (!a || !a.lineNumber || !a.columnNumber) return s;
  let l = Math.max(1, a.lineNumber - 3),
    u = Me.read(a.fileName)?.slice(l, a.lineNumber),
    c = u?.lineAt(a.lineNumber);
  if (u && c) {
    let p = Ep(c),
      f = xp(c);
    if (!f) return s;
    (s.functionName = `${f.code})`),
      (s.location = a),
      n ||
        (u = u.mapLineAt(a.lineNumber, m => m.slice(0, f.openingBraceIndex))),
      (u = o.highlightSource(u));
    let d = String(u.lastLineNumber).length;
    if (
      ((s.contextLines = u
        .mapLines((m, g) => o.gray(String(g).padStart(d)) + ' ' + m)
        .mapLines(m => o.dim(m))
        .prependSymbolAt(a.lineNumber, o.bold(o.red('\u2192')))),
      i)
    ) {
      let m = p + d + 1;
      (m += 2), (s.callArguments = (0, Zs.default)(i, m).slice(m));
    }
  }
  return s;
}
function xp(e) {
  let t = Object.keys(be.ModelAction).join('|'),
    n = new RegExp(String.raw`\.(${t})\(`).exec(e);
  if (n) {
    let i = n.index + n[0].length,
      o = e.lastIndexOf(' ', n.index) + 1;
    return { code: e.slice(o, i), openingBraceIndex: i };
  }
  return null;
}
function Ep(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    if (e.charAt(r) !== ' ') return t;
    t++;
  }
  return t;
}
function Tp(
  {
    functionName: e,
    location: t,
    message: r,
    isPanic: n,
    contextLines: i,
    callArguments: o,
  },
  s
) {
  let a = [''],
    l = t ? ' in' : ':';
  if (
    (n
      ? (a.push(
          s.red(
            `Oops, an unknown error occurred! This is ${s.bold(
              'on us'
            )}, you did nothing wrong.`
          )
        ),
        a.push(
          s.red(`It occurred in the ${s.bold(`\`${e}\``)} invocation${l}`)
        ))
      : a.push(s.red(`Invalid ${s.bold(`\`${e}\``)} invocation${l}`)),
    t && a.push(s.underline(vp(t))),
    i)
  ) {
    a.push('');
    let u = [i.toString()];
    o && (u.push(o), u.push(s.dim(')'))), a.push(u.join('')), o && a.push('');
  } else a.push(''), o && a.push(o), a.push('');
  return (
    a.push(r),
    a.join(`
`)
  );
}
function vp(e) {
  let t = [e.fileName];
  return (
    e.lineNumber && t.push(String(e.lineNumber)),
    e.columnNumber && t.push(String(e.columnNumber)),
    t.join(':')
  );
}
function Re(e) {
  let t = e.showColors ? yp : bp,
    r = wp(e, t);
  return Tp(r, t);
}
function ea(e) {
  return e instanceof Buffer || e instanceof Date || e instanceof RegExp;
}
function ta(e) {
  if (e instanceof Buffer) {
    let t = Buffer.alloc ? Buffer.alloc(e.length) : new Buffer(e.length);
    return e.copy(t), t;
  } else {
    if (e instanceof Date) return new Date(e.getTime());
    if (e instanceof RegExp) return new RegExp(e);
    throw new Error('Unexpected situation');
  }
}
function ra(e) {
  let t = [];
  return (
    e.forEach(function (r, n) {
      typeof r == 'object' && r !== null
        ? Array.isArray(r)
          ? (t[n] = ra(r))
          : ea(r)
          ? (t[n] = ta(r))
          : (t[n] = Xt({}, r))
        : (t[n] = r);
    }),
    t
  );
}
function Xs(e, t) {
  return t === '__proto__' ? void 0 : e[t];
}
var Xt = function (e, ...t) {
  if (!e || typeof e != 'object') return !1;
  if (t.length === 0) return e;
  let r, n;
  for (let i of t)
    if (!(typeof i != 'object' || i === null || Array.isArray(i))) {
      for (let o of Object.keys(i))
        if (((n = Xs(e, o)), (r = Xs(i, o)), r !== e))
          if (typeof r != 'object' || r === null) {
            e[o] = r;
            continue;
          } else if (Array.isArray(r)) {
            e[o] = ra(r);
            continue;
          } else if (ea(r)) {
            e[o] = ta(r);
            continue;
          } else if (typeof n != 'object' || n === null || Array.isArray(n)) {
            e[o] = Xt({}, r);
            continue;
          } else {
            e[o] = Xt(n, r);
            continue;
          }
    }
  return e;
};
var na = e => (Array.isArray(e) ? e : e.split('.')),
  er = (e, t) => na(t).reduce((r, n) => r && r[n], e),
  zr = (e, t, r) =>
    na(t).reduceRight(
      (n, i, o, s) => Object.assign({}, er(e, s.slice(0, o)), { [i]: n }),
      r
    );
function ia(e, t) {
  if (!e || typeof e != 'object' || typeof e.hasOwnProperty != 'function')
    return e;
  let r = {};
  for (let n in e) {
    let i = e[n];
    Object.hasOwnProperty.call(e, n) && t(n, i) && (r[n] = i);
  }
  return r;
}
var Pp = {
  '[object Date]': !0,
  '[object Uint8Array]': !0,
  '[object Decimal]': !0,
};
function oa(e) {
  return e
    ? typeof e == 'object' && !Pp[Object.prototype.toString.call(e)]
    : !1;
}
function sa(e, t) {
  let r = {},
    n = Array.isArray(t) ? t : [t];
  for (let i in e)
    Object.hasOwnProperty.call(e, i) && !n.includes(i) && (r[i] = e[i]);
  return r;
}
var Mi = R(Vt());
var Mp = la(),
  Fp = ca(),
  Cp = pa().default,
  Sp = (e, t, r) => {
    let n = [];
    return (function i(o, s = {}, a = '', l = []) {
      s.indent = s.indent || '	';
      let u;
      s.inlineCharacterLimit === void 0
        ? (u = {
            newLine: `
`,
            newLineOrSpace: `
`,
            pad: a,
            indent: a + s.indent,
          })
        : (u = {
            newLine: '@@__STRINGIFY_OBJECT_NEW_LINE__@@',
            newLineOrSpace: '@@__STRINGIFY_OBJECT_NEW_LINE_OR_SPACE__@@',
            pad: '@@__STRINGIFY_OBJECT_PAD__@@',
            indent: '@@__STRINGIFY_OBJECT_INDENT__@@',
          });
      let c = p => {
        if (s.inlineCharacterLimit === void 0) return p;
        let f = p
          .replace(new RegExp(u.newLine, 'g'), '')
          .replace(new RegExp(u.newLineOrSpace, 'g'), ' ')
          .replace(new RegExp(u.pad + '|' + u.indent, 'g'), '');
        return f.length <= s.inlineCharacterLimit
          ? f
          : p
              .replace(
                new RegExp(u.newLine + '|' + u.newLineOrSpace, 'g'),
                `
`
              )
              .replace(new RegExp(u.pad, 'g'), a)
              .replace(new RegExp(u.indent, 'g'), a + s.indent);
      };
      if (n.indexOf(o) !== -1) return '"[Circular]"';
      if (Buffer.isBuffer(o)) return `Buffer(${Buffer.length})`;
      if (
        o == null ||
        typeof o == 'number' ||
        typeof o == 'boolean' ||
        typeof o == 'function' ||
        typeof o == 'symbol' ||
        o instanceof se ||
        Mp(o)
      )
        return String(o);
      if (o instanceof Date) return `new Date('${o.toISOString()}')`;
      if (o instanceof we) return `prisma.${vt(o.modelName)}.fields.${o.name}`;
      if (Array.isArray(o)) {
        if (o.length === 0) return '[]';
        n.push(o);
        let p =
          '[' +
          u.newLine +
          o
            .map((f, d) => {
              let m = o.length - 1 === d ? u.newLine : ',' + u.newLineOrSpace,
                g = i(f, s, a + s.indent, [...l, d]);
              return (
                s.transformValue && (g = s.transformValue(o, d, g)),
                u.indent + g + m
              );
            })
            .join('') +
          u.pad +
          ']';
        return n.pop(), c(p);
      }
      if (Fp(o)) {
        let p = Object.keys(o).concat(Cp(o));
        if ((s.filter && (p = p.filter(d => s.filter(o, d))), p.length === 0))
          return '{}';
        n.push(o);
        let f =
          '{' +
          u.newLine +
          p
            .map((d, m) => {
              let g = p.length - 1 === m ? u.newLine : ',' + u.newLineOrSpace,
                b = typeof d == 'symbol',
                h = !b && /^[a-z$_][a-z$_0-9]*$/i.test(d),
                x = b || h ? d : i(d, s, void 0, [...l, d]),
                w = i(o[d], s, a + s.indent, [...l, d]);
              s.transformValue && (w = s.transformValue(o, d, w));
              let E = u.indent + String(x) + ': ' + w + g;
              return (
                s.transformLine &&
                  (E = s.transformLine({
                    obj: o,
                    indent: u.indent,
                    key: x,
                    stringifiedValue: w,
                    value: o[d],
                    eol: g,
                    originalLine: E,
                    path: l.concat(x),
                  })),
                E
              );
            })
            .join('') +
          u.pad +
          '}';
        return n.pop(), c(f);
      }
      return (
        (o = String(o).replace(/[\r\n]/g, p =>
          p ===
          `
`
            ? '\\n'
            : '\\r'
        )),
        s.singleQuotes === !1
          ? ((o = o.replace(/"/g, '\\"')), `"${o}"`)
          : ((o = o.replace(/\\?'/g, "\\'")), `'${o}'`)
      );
    })(e, t, r);
  },
  tr = Sp;
var Pi = '@@__DIM_POINTER__@@';
function Yr({ ast: e, keyPaths: t, valuePaths: r, missingItems: n }) {
  let i = e;
  for (let { path: o, type: s } of n) i = zr(i, o, s);
  return tr(i, {
    indent: '  ',
    transformLine: ({
      indent: o,
      key: s,
      value: a,
      stringifiedValue: l,
      eol: u,
      path: c,
    }) => {
      let p = c.join('.'),
        f = t.includes(p),
        d = r.includes(p),
        m = n.find(b => b.path === p),
        g = l;
      if (m) {
        typeof a == 'string' && (g = g.slice(1, g.length - 1));
        let b = m.isRequired ? '' : '?',
          h = m.isRequired ? '+' : '?',
          w = (m.isRequired ? E => P(S(E)) : S)(Rp(s + b + ': ' + g + u, o, h));
        return m.isRequired || (w = D(w)), w;
      } else {
        let b = n.some(E => p.startsWith(E.path)),
          h = s[s.length - 2] === '?';
        h && (s = s.slice(1, s.length - 1)),
          h &&
            typeof a == 'object' &&
            a !== null &&
            (g = g
              .split(
                `
`
              )
              .map((E, C, O) => (C === O.length - 1 ? E + Pi : E)).join(`
`)),
          b &&
            typeof a == 'string' &&
            ((g = g.slice(1, g.length - 1)), h || (g = P(g))),
          (typeof a != 'object' || a === null) && !d && !b && (g = D(g));
        let x = f ? A(s) : s;
        g = d ? A(g) : g;
        let w = o + x + ': ' + g + (b ? u : D(u));
        if (f || d) {
          let E = w.split(`
`),
            C = String(s).length,
            O = f ? A('~'.repeat(C)) : ' '.repeat(C),
            q = d ? Ap(o, s, a, l) : 0,
            k = d && fa(a),
            U = d ? '  ' + A('~'.repeat(q)) : '';
          O && O.length > 0 && !k && E.splice(1, 0, o + O + U),
            O &&
              O.length > 0 &&
              k &&
              E.splice(E.length - 1, 0, o.slice(0, o.length - 2) + U),
            (w = E.join(`
`));
        }
        return w;
      }
    },
  });
}
function Ap(e, t, r, n) {
  return r === null
    ? 4
    : typeof r == 'string'
    ? r.length + 2
    : fa(r)
    ? Math.abs(Op(`${t}: ${(0, Mi.default)(n)}`) - e.length)
    : String(r).length;
}
function fa(e) {
  return typeof e == 'object' && e !== null && !(e instanceof se);
}
function Op(e) {
  return e
    .split(
      `
`
    )
    .reduce((t, r) => (r.length > t ? r.length : t), 0);
}
function Rp(e, t, r) {
  return e
    .split(
      `
`
    )
    .map((n, i, o) =>
      i === 0 ? r + t.slice(1) + n : i < o.length - 1 ? r + n.slice(1) : n
    )
    .map(n =>
      (0, Mi.default)(n).includes(Pi)
        ? D(n.replace(Pi, ''))
        : n.includes('?')
        ? D(n)
        : n
    ).join(`
`);
}
var rr = 2,
  Ai = class {
    constructor(t, r) {
      this.type = t;
      this.children = r;
      this.printFieldError = ({ error: t }, r, n) => {
        if (t.type === 'emptySelect') {
          let i = n ? '' : ` Available options are listed in ${D(S('green'))}.`;
          return `The ${A('`select`')} statement for type ${P(
            Yt(t.field.outputType.type)
          )} must not be empty.${i}`;
        }
        if (t.type === 'emptyInclude') {
          if (r.length === 0)
            return `${P(
              Yt(t.field.outputType.type)
            )} does not have any relation and therefore can't have an ${A(
              '`include`'
            )} statement.`;
          let i = n ? '' : ` Available options are listed in ${D(S('green'))}.`;
          return `The ${A('`include`')} statement for type ${A(
            Yt(t.field.outputType.type)
          )} must not be empty.${i}`;
        }
        if (t.type === 'noTrueSelect')
          return `The ${A('`select`')} statement for type ${A(
            Yt(t.field.outputType.type)
          )} needs ${A('at least one truthy value')}.`;
        if (t.type === 'includeAndSelect')
          return `Please ${P('either')} use ${S('`include`')} or ${S(
            '`select`'
          )}, but ${A('not both')} at the same time.`;
        if (t.type === 'invalidFieldName') {
          let i = t.isInclude ? 'include' : 'select',
            o = t.isIncludeScalar ? 'Invalid scalar' : 'Unknown',
            s = n
              ? ''
              : t.isInclude && r.length === 0
              ? `
This model has no relations, so you can't use ${A('include')} with it.`
              : ` Available options are listed in ${D(S('green'))}.`,
            a = `${o} field ${A(`\`${t.providedName}\``)} for ${A(
              i
            )} statement on model ${P(Ot(t.modelName))}.${s}`;
          return (
            t.didYouMean && (a += ` Did you mean ${S(`\`${t.didYouMean}\``)}?`),
            t.isIncludeScalar &&
              (a += `
Note, that ${P('include')} statements only accept relation fields.`),
            a
          );
        }
        if (t.type === 'invalidFieldType')
          return `Invalid value ${A(`${tr(t.providedValue)}`)} of type ${A(
            Et(t.providedValue, void 0)
          )} for field ${P(`${t.fieldName}`)} on model ${P(
            Ot(t.modelName)
          )}. Expected either ${S('true')} or ${S('false')}.`;
      };
      this.printArgError = ({ error: t, path: r }, n, i) => {
        if (t.type === 'invalidName') {
          let o = `Unknown arg ${A(`\`${t.providedName}\``)} in ${P(
            r.join('.')
          )} for type ${P(
            t.outputType ? t.outputType.name : Ht(t.originalType)
          )}.`;
          return (
            t.didYouMeanField
              ? (o += `
\u2192 Did you forget to wrap it with \`${S('select')}\`? ${D(
                  'e.g. ' +
                    S(`{ select: { ${t.providedName}: ${t.providedValue} } }`)
                )}`)
              : t.didYouMeanArg
              ? ((o += ` Did you mean \`${S(t.didYouMeanArg)}\`?`),
                !n &&
                  !i &&
                  (o +=
                    ` ${D('Available args:')}
` + Tt(t.originalType, !0)))
              : t.originalType.fields.length === 0
              ? (o += ` The field ${P(t.originalType.name)} has no arguments.`)
              : !n &&
                !i &&
                (o +=
                  ` Available args:

` + Tt(t.originalType, !0)),
            o
          );
        }
        if (t.type === 'invalidType') {
          let o = tr(t.providedValue, { indent: '  ' }),
            s =
              o.split(`
`).length > 1;
          if (
            (s &&
              (o = `
${o}
`),
            t.requiredType.bestFittingType.location === 'enumTypes')
          )
            return `Argument ${P(t.argName)}: Provided value ${A(o)}${
              s ? '' : ' '
            }of type ${A(Et(t.providedValue))} on ${P(
              `prisma.${this.children[0].name}`
            )} is not a ${S(
              zt(
                xt(t.requiredType.bestFittingType.type),
                t.requiredType.bestFittingType.isList
              )
            )}.
\u2192 Possible values: ${t.requiredType.bestFittingType.type.values
              .map(c => S(`${xt(t.requiredType.bestFittingType.type)}.${c}`))
              .join(', ')}`;
          let a = '.';
          Mt(t.requiredType.bestFittingType.type) &&
            (a =
              `:
` + Tt(t.requiredType.bestFittingType.type));
          let l = `${t.requiredType.inputType
              .map(c =>
                S(zt(xt(c.type), t.requiredType.bestFittingType.isList))
              )
              .join(' or ')}${a}`,
            u =
              (t.requiredType.inputType.length === 2 &&
                t.requiredType.inputType.find(c => Mt(c.type))) ||
              null;
          return (
            u &&
              (l +=
                `
` + Tt(u.type, !0)),
            `Argument ${P(t.argName)}: Got invalid value ${A(o)}${
              s ? '' : ' '
            }on ${P(`prisma.${this.children[0].name}`)}. Provided ${A(
              Et(t.providedValue)
            )}, expected ${l}`
          );
        }
        if (t.type === 'invalidNullArg') {
          let o =
              r.length === 1 && r[0] === t.name
                ? ''
                : ` for ${P(`${r.join('.')}`)}`,
            s = ` Please use ${P(S('undefined'))} instead.`;
          return `Argument ${S(t.name)}${o} must not be ${P('null')}.${s}`;
        }
        if (t.type === 'missingArg') {
          let o =
            r.length === 1 && r[0] === t.missingName
              ? ''
              : ` for ${P(`${r.join('.')}`)}`;
          return `Argument ${S(t.missingName)}${o} is missing.`;
        }
        if (t.type === 'atLeastOne') {
          let o = i ? '' : ` Available args are listed in ${D(S('green'))}.`,
            s = t.atLeastFields
              ? ` and at least one argument for ${t.atLeastFields
                  .map(a => P(a))
                  .join(', or ')}`
              : '';
          return `Argument ${P(r.join('.'))} of type ${P(
            t.inputType.name
          )} needs ${S('at least one')} argument${P(s)}.${o}`;
        }
        if (t.type === 'atMostOne') {
          let o = i
            ? ''
            : ` Please choose one. ${D('Available args:')} 
${Tt(t.inputType, !0)}`;
          return `Argument ${P(r.join('.'))} of type ${P(
            t.inputType.name
          )} needs ${S(
            'exactly one'
          )} argument, but you provided ${t.providedKeys
            .map(s => A(s))
            .join(' and ')}.${o}`;
        }
      };
      (this.type = t), (this.children = r);
    }
    get [Symbol.toStringTag]() {
      return 'Document';
    }
    toString() {
      return `${this.type} {
${(0, nt.default)(
  this.children.map(String).join(`
`),
  rr
)}
}`;
    }
    validate(t, r = !1, n, i, o) {
      t || (t = {});
      let s = this.children.filter(h => h.hasInvalidChild || h.hasInvalidArg);
      if (s.length === 0) return;
      let a = [],
        l = [],
        u = t && t.select ? 'select' : t.include ? 'include' : void 0;
      for (let h of s) {
        let x = h.collectErrors(u);
        a.push(
          ...x.fieldErrors.map(w => ({
            ...w,
            path: r ? w.path : w.path.slice(1),
          }))
        ),
          l.push(
            ...x.argErrors.map(w => ({
              ...w,
              path: r ? w.path : w.path.slice(1),
            }))
          );
      }
      let c = this.children[0].name,
        p = r ? this.type : c,
        f = [],
        d = [],
        m = [];
      for (let h of a) {
        let x = this.normalizePath(h.path, t).join('.');
        if (h.error.type === 'invalidFieldName') {
          f.push(x);
          let w = h.error.outputType,
            { isInclude: E } = h.error;
          w.fields
            .filter(C =>
              E ? C.outputType.location === 'outputObjectTypes' : !0
            )
            .forEach(C => {
              let O = x.split('.');
              m.push({
                path: `${O.slice(0, O.length - 1).join('.')}.${C.name}`,
                type: 'true',
                isRequired: !1,
              });
            });
        } else
          h.error.type === 'includeAndSelect'
            ? (f.push('select'), f.push('include'))
            : d.push(x);
        if (
          h.error.type === 'emptySelect' ||
          h.error.type === 'noTrueSelect' ||
          h.error.type === 'emptyInclude'
        ) {
          let w = this.normalizePath(h.path, t),
            E = w.slice(0, w.length - 1).join('.');
          h.error.field.outputType.type.fields
            ?.filter(O =>
              h.error.type === 'emptyInclude'
                ? O.outputType.location === 'outputObjectTypes'
                : !0
            )
            .forEach(O => {
              m.push({ path: `${E}.${O.name}`, type: 'true', isRequired: !1 });
            });
        }
      }
      for (let h of l) {
        let x = this.normalizePath(h.path, t).join('.');
        if (h.error.type === 'invalidName') f.push(x);
        else if (h.error.type !== 'missingArg' && h.error.type !== 'atLeastOne')
          d.push(x);
        else if (h.error.type === 'missingArg') {
          let w =
            h.error.missingArg.inputTypes.length === 1
              ? h.error.missingArg.inputTypes[0].type
              : h.error.missingArg.inputTypes
                  .map(E => {
                    let C = Ht(E.type);
                    return C === 'Null' ? 'null' : E.isList ? C + '[]' : C;
                  })
                  .join(' | ');
          m.push({
            path: x,
            type: hi(w, !0, x.split('where.').length === 2),
            isRequired: h.error.missingArg.isRequired,
          });
        }
      }
      let g = h => {
          let x = l.some(
              Q =>
                Q.error.type === 'missingArg' && Q.error.missingArg.isRequired
            ),
            w = Boolean(
              l.find(
                Q =>
                  Q.error.type === 'missingArg' &&
                  !Q.error.missingArg.isRequired
              )
            ),
            E = w || x,
            C = '';
          x &&
            (C += `
${D('Note: Lines with ')}${S('+')} ${D('are required')}`),
            w &&
              (C.length === 0 &&
                (C = `
`),
              x
                ? (C += D(`, lines with ${S('?')} are optional`))
                : (C += D(`Note: Lines with ${S('?')} are optional`)),
              (C += D('.')));
          let q = l
            .filter(
              Q =>
                Q.error.type !== 'missingArg' || Q.error.missingArg.isRequired
            )
            .map(Q => this.printArgError(Q, E, i === 'minimal')).join(`
`);
          if (
            ((q += `
${a.map(Q => this.printFieldError(Q, m, i === 'minimal')).join(`
`)}`),
            i === 'minimal')
          )
            return (0, Si.default)(q);
          let k = {
            ast: r ? { [c]: t } : t,
            keyPaths: f,
            valuePaths: d,
            missingItems: m,
          };
          n?.endsWith('aggregate') && (k = qp(k));
          let U = Re({
            callsite: h,
            originalMethod: n || p,
            showColors: i && i === 'pretty',
            callArguments: Yr(k),
            message: `${q}${C}
`,
          });
          return process.env.NO_COLOR || i === 'colorless'
            ? (0, Si.default)(U)
            : U;
        },
        b = new W(g(o));
      throw (
        (process.env.NODE_ENV !== 'production' &&
          Object.defineProperty(b, 'render', { get: () => g, enumerable: !1 }),
        b)
      );
    }
    normalizePath(t, r) {
      let n = t.slice(),
        i = [],
        o,
        s = r;
      for (; (o = n.shift()) !== void 0; )
        (!Array.isArray(s) && o === 0) ||
          (o === 'select'
            ? s[o]
              ? (s = s[o])
              : (s = s.include)
            : s && s[o] && (s = s[o]),
          i.push(o));
      return i;
    }
  },
  W = class extends Error {
    get [Symbol.toStringTag]() {
      return 'PrismaClientValidationError';
    }
  };
ce(W, 'PrismaClientValidationError');
var z = class extends Error {
  constructor(t) {
    super(
      t +
        `
Read more at https://pris.ly/d/client-constructor`
    ),
      (this.name = 'PrismaClientConstructorValidationError');
  }
  get [Symbol.toStringTag]() {
    return 'PrismaClientConstructorValidationError';
  }
};
ce(z, 'PrismaClientConstructorValidationError');
var le = class {
    constructor({ name: t, args: r, children: n, error: i, schemaField: o }) {
      (this.name = t),
        (this.args = r),
        (this.children = n),
        (this.error = i),
        (this.schemaField = o),
        (this.hasInvalidChild = n
          ? n.some(s =>
              Boolean(s.error || s.hasInvalidArg || s.hasInvalidChild)
            )
          : !1),
        (this.hasInvalidArg = r ? r.hasInvalidArg : !1);
    }
    get [Symbol.toStringTag]() {
      return 'Field';
    }
    toString() {
      let t = this.name;
      return this.error
        ? t + ' # INVALID_FIELD'
        : (this.args &&
            this.args.args &&
            this.args.args.length > 0 &&
            (this.args.args.length === 1
              ? (t += `(${this.args.toString()})`)
              : (t += `(
${(0, nt.default)(this.args.toString(), rr)}
)`)),
          this.children &&
            (t += ` {
${(0, nt.default)(
  this.children.map(String).join(`
`),
  rr
)}
}`),
          t);
    }
    collectErrors(t = 'select') {
      let r = [],
        n = [];
      if (
        (this.error && r.push({ path: [this.name], error: this.error }),
        this.children)
      )
        for (let i of this.children) {
          let o = i.collectErrors(t);
          r.push(
            ...o.fieldErrors.map(s => ({
              ...s,
              path: [this.name, t, ...s.path],
            }))
          ),
            n.push(
              ...o.argErrors.map(s => ({
                ...s,
                path: [this.name, t, ...s.path],
              }))
            );
        }
      return (
        this.args &&
          n.push(
            ...this.args
              .collectErrors()
              .map(i => ({ ...i, path: [this.name, ...i.path] }))
          ),
        { fieldErrors: r, argErrors: n }
      );
    }
  },
  ue = class {
    constructor(t = []) {
      (this.args = t),
        (this.hasInvalidArg = t ? t.some(r => Boolean(r.hasError)) : !1);
    }
    get [Symbol.toStringTag]() {
      return 'Args';
    }
    toString() {
      return this.args.length === 0
        ? ''
        : `${this.args.map(t => t.toString()).filter(t => t).join(`
`)}`;
    }
    collectErrors() {
      return this.hasInvalidArg
        ? this.args.flatMap(t => t.collectErrors())
        : [];
    }
  };
function Fi(e, t) {
  return Buffer.isBuffer(e)
    ? JSON.stringify(e.toString('base64'))
    : e instanceof we
    ? `{ _ref: ${JSON.stringify(e.name)}}`
    : Object.prototype.toString.call(e) === '[object BigInt]'
    ? e.toString()
    : typeof t?.type == 'string' && t.type === 'Json'
    ? e === null
      ? 'null'
      : e && e.values && e.__prismaRawParameters__
      ? JSON.stringify(e.values)
      : t?.isList && Array.isArray(e)
      ? JSON.stringify(e.map(r => JSON.stringify(r)))
      : JSON.stringify(JSON.stringify(e))
    : e === void 0
    ? null
    : e === null
    ? 'null'
    : ge.isDecimal(e) || (t?.type === 'Decimal' && Ge(e))
    ? JSON.stringify(e.toFixed())
    : t?.location === 'enumTypes' && typeof e == 'string'
    ? Array.isArray(e)
      ? `[${e.join(', ')}]`
      : e
    : typeof e == 'number' && t?.type === 'Float'
    ? e.toExponential()
    : JSON.stringify(e, null, 2);
}
var Fe = class {
  constructor({
    key: t,
    value: r,
    isEnum: n = !1,
    error: i,
    schemaArg: o,
    inputType: s,
  }) {
    (this.inputType = s),
      (this.key = t),
      (this.value = r instanceof se ? r._getName() : r),
      (this.isEnum = n),
      (this.error = i),
      (this.schemaArg = o),
      (this.isNullable =
        o?.inputTypes.reduce(a => a && o.isNullable, !0) || !1),
      (this.hasError =
        Boolean(i) ||
        (r instanceof ue ? r.hasInvalidArg : !1) ||
        (Array.isArray(r) &&
          r.some(a => (a instanceof ue ? a.hasInvalidArg : !1))));
  }
  get [Symbol.toStringTag]() {
    return 'Arg';
  }
  _toString(t, r) {
    if (!(typeof t > 'u')) {
      if (t instanceof ue)
        return `${r}: {
${(0, nt.default)(t.toString(), 2)}
}`;
      if (Array.isArray(t)) {
        if (this.inputType?.type === 'Json')
          return `${r}: ${Fi(t, this.inputType)}`;
        let n = !t.some(i => typeof i == 'object');
        return `${r}: [${
          n
            ? ''
            : `
`
        }${(0, nt.default)(
          t
            .map(i =>
              i instanceof ue
                ? `{
${(0, nt.default)(i.toString(), rr)}
}`
                : Fi(i, this.inputType)
            )
            .join(
              `,${
                n
                  ? ' '
                  : `
`
              }`
            ),
          n ? 0 : rr
        )}${
          n
            ? ''
            : `
`
        }]`;
      }
      return `${r}: ${Fi(t, this.inputType)}`;
    }
  }
  toString() {
    return this._toString(this.value, this.key);
  }
  collectErrors() {
    if (!this.hasError) return [];
    let t = [];
    if (this.error) {
      let r =
        typeof this.inputType?.type == 'object'
          ? `${this.inputType.type.name}${this.inputType.isList ? '[]' : ''}`
          : void 0;
      t.push({ error: this.error, path: [this.key], id: r });
    }
    return Array.isArray(this.value)
      ? t.concat(
          this.value.flatMap((r, n) =>
            r?.collectErrors
              ? r
                  .collectErrors()
                  .map(i => ({ ...i, path: [this.key, n, ...i.path] }))
              : []
          )
        )
      : this.value instanceof ue
      ? t.concat(
          this.value
            .collectErrors()
            .map(r => ({ ...r, path: [this.key, ...r.path] }))
        )
      : t;
  }
};
function en({
  dmmf: e,
  rootTypeName: t,
  rootField: r,
  select: n,
  modelName: i,
  extensions: o,
}) {
  n || (n = {});
  let s = t === 'query' ? e.queryType : e.mutationType,
    a = {
      args: [],
      outputType: { isList: !1, type: s, location: 'outputObjectTypes' },
      name: t,
    },
    l = { modelName: i },
    u = ga({
      dmmf: e,
      selection: { [r]: n },
      schemaField: a,
      path: [t],
      context: l,
      extensions: o,
    });
  return new Ai(t, u);
}
function ma(e) {
  return e;
}
function ga({
  dmmf: e,
  selection: t,
  schemaField: r,
  path: n,
  context: i,
  extensions: o,
}) {
  let s = r.outputType.type,
    a = i.modelName ? o.getAllComputedFields(i.modelName) : {};
  return (
    (t = Wr(t, a)),
    Object.entries(t).reduce((l, [u, c]) => {
      let p = s.fieldMap ? s.fieldMap[u] : s.fields.find(w => w.name === u);
      if (!p)
        return (
          a?.[u] ||
            l.push(
              new le({
                name: u,
                children: [],
                error: {
                  type: 'invalidFieldName',
                  modelName: s.name,
                  providedName: u,
                  didYouMean: Br(
                    u,
                    s.fields.map(w => w.name).concat(Object.keys(a ?? {}))
                  ),
                  outputType: s,
                },
              })
            ),
          l
        );
      if (
        p.outputType.location === 'scalar' &&
        p.args.length === 0 &&
        typeof c != 'boolean'
      )
        return (
          l.push(
            new le({
              name: u,
              children: [],
              error: {
                type: 'invalidFieldType',
                modelName: s.name,
                fieldName: u,
                providedValue: c,
              },
            })
          ),
          l
        );
      if (c === !1) return l;
      let f = {
          name: p.name,
          fields: p.args,
          constraints: { minNumFields: null, maxNumFields: null },
        },
        d = typeof c == 'object' ? sa(c, ['include', 'select']) : void 0,
        m = d
          ? Xr(d, f, i, [], typeof p == 'string' ? void 0 : p.outputType.type)
          : void 0,
        g = p.outputType.location === 'outputObjectTypes';
      if (c) {
        if (c.select && c.include)
          l.push(
            new le({
              name: u,
              children: [
                new le({
                  name: 'include',
                  args: new ue(),
                  error: { type: 'includeAndSelect', field: p },
                }),
              ],
            })
          );
        else if (c.include) {
          let w = Object.keys(c.include);
          if (w.length === 0)
            return (
              l.push(
                new le({
                  name: u,
                  children: [
                    new le({
                      name: 'include',
                      args: new ue(),
                      error: { type: 'emptyInclude', field: p },
                    }),
                  ],
                })
              ),
              l
            );
          if (p.outputType.location === 'outputObjectTypes') {
            let E = p.outputType.type,
              C = E.fields
                .filter(q => q.outputType.location === 'outputObjectTypes')
                .map(q => q.name),
              O = w.filter(q => !C.includes(q));
            if (O.length > 0)
              return (
                l.push(
                  ...O.map(
                    q =>
                      new le({
                        name: q,
                        children: [
                          new le({
                            name: q,
                            args: new ue(),
                            error: {
                              type: 'invalidFieldName',
                              modelName: E.name,
                              outputType: E,
                              providedName: q,
                              didYouMean: Br(q, C) || void 0,
                              isInclude: !0,
                              isIncludeScalar: E.fields.some(k => k.name === q),
                            },
                          }),
                        ],
                      })
                  )
                ),
                l
              );
          }
        } else if (c.select) {
          let w = Object.values(c.select);
          if (w.length === 0)
            return (
              l.push(
                new le({
                  name: u,
                  children: [
                    new le({
                      name: 'select',
                      args: new ue(),
                      error: { type: 'emptySelect', field: p },
                    }),
                  ],
                })
              ),
              l
            );
          if (w.filter(C => C).length === 0)
            return (
              l.push(
                new le({
                  name: u,
                  children: [
                    new le({
                      name: 'select',
                      args: new ue(),
                      error: { type: 'noTrueSelect', field: p },
                    }),
                  ],
                })
              ),
              l
            );
        }
      }
      let b = g ? Dp(e, p.outputType.type) : null,
        h = b;
      c &&
        (c.select
          ? (h = c.select)
          : c.include
          ? (h = Xt(b, c.include))
          : c.by &&
            Array.isArray(c.by) &&
            p.outputType.namespace === 'prisma' &&
            p.outputType.location === 'outputObjectTypes' &&
            Ss(p.outputType.type.name) &&
            (h = $p(c.by)));
      let x;
      if (h !== !1 && g) {
        let w = i.modelName;
        typeof p.outputType.type == 'object' &&
          p.outputType.namespace === 'model' &&
          p.outputType.location === 'outputObjectTypes' &&
          (w = p.outputType.type.name),
          (x = ga({
            dmmf: e,
            selection: h,
            schemaField: p,
            path: [...n, u],
            context: { modelName: w },
            extensions: o,
          }));
      }
      return (
        l.push(new le({ name: u, args: m, children: x, schemaField: p })), l
      );
    }, [])
  );
}
function $p(e) {
  let t = Object.create(null);
  for (let r of e) t[r] = !0;
  return t;
}
function Dp(e, t) {
  let r = Object.create(null);
  for (let n of t.fields)
    e.typeMap[n.outputType.type.name] !== void 0 && (r[n.name] = !0),
      (n.outputType.location === 'scalar' ||
        n.outputType.location === 'enumTypes') &&
        (r[n.name] = !0);
  return r;
}
function Oi(e, t, r, n) {
  return new Fe({
    key: e,
    value: t,
    isEnum: n.location === 'enumTypes',
    inputType: n,
    error: {
      type: 'invalidType',
      providedValue: t,
      argName: e,
      requiredType: { inputType: r.inputTypes, bestFittingType: n },
    },
  });
}
function ha(e, t, r) {
  let { isList: n } = t,
    i = kp(t, r),
    o = Et(e, t);
  return o === i ||
    (n && o === 'List<>') ||
    (i === 'Json' &&
      o !== 'Symbol' &&
      !(e instanceof se) &&
      !(e instanceof we)) ||
    (o === 'Int' && i === 'BigInt') ||
    ((o === 'Int' || o === 'Float') && i === 'Decimal') ||
    (o === 'DateTime' && i === 'String') ||
    (o === 'UUID' && i === 'String') ||
    (o === 'String' && i === 'ID') ||
    (o === 'Int' && i === 'Float') ||
    (o === 'Int' && i === 'Long') ||
    (o === 'String' && i === 'Decimal' && Ip(e)) ||
    e === null
    ? !0
    : t.isList && Array.isArray(e)
    ? e.every(s => ha(s, { ...t, isList: !1 }, r))
    : !1;
}
function kp(e, t, r = e.isList) {
  let n = xt(e.type);
  return (
    e.location === 'fieldRefTypes' && t.modelName && (n += `<${t.modelName}>`),
    zt(n, r)
  );
}
var Zr = e => ia(e, (t, r) => r !== void 0);
function Ip(e) {
  return /^\-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(e);
}
function Lp(e, t, r, n) {
  let i = null,
    o = [];
  for (let s of r.inputTypes) {
    if (((i = _p(e, t, r, s, n)), i?.collectErrors().length === 0)) return i;
    if (i && i?.collectErrors()) {
      let a = i?.collectErrors();
      a && a.length > 0 && o.push({ arg: i, errors: a });
    }
  }
  if (i?.hasError && o.length > 0) {
    let s = o.map(({ arg: a, errors: l }) => {
      let u = l.map(c => {
        let p = 1;
        return (
          c.error.type === 'invalidType' &&
            (p = 2 * Math.exp(ya(c.error.providedValue)) + 1),
          (p += Math.log(c.path.length)),
          c.error.type === 'missingArg' &&
            a.inputType &&
            Mt(a.inputType.type) &&
            a.inputType.type.name.includes('Unchecked') &&
            (p *= 2),
          c.error.type === 'invalidName' &&
            Mt(c.error.originalType) &&
            c.error.originalType.name.includes('Unchecked') &&
            (p *= 2),
          p
        );
      });
      return { score: l.length + Np(u), arg: a, errors: l };
    });
    return s.sort((a, l) => (a.score < l.score ? -1 : 1)), s[0].arg;
  }
  return i;
}
function ya(e) {
  let t = 1;
  if (!e || typeof e != 'object') return t;
  for (let r in e)
    if (
      !!Object.prototype.hasOwnProperty.call(e, r) &&
      typeof e[r] == 'object'
    ) {
      let n = ya(e[r]) + 1;
      t = Math.max(n, t);
    }
  return t;
}
function Np(e) {
  return e.reduce((t, r) => t + r, 0);
}
function _p(e, t, r, n, i) {
  if (typeof t > 'u')
    return r.isRequired
      ? new Fe({
          key: e,
          value: t,
          isEnum: n.location === 'enumTypes',
          inputType: n,
          error: {
            type: 'missingArg',
            missingName: e,
            missingArg: r,
            atLeastOne: !1,
            atMostOne: !1,
          },
        })
      : null;
  let { isNullable: o, isRequired: s } = r;
  if (
    t === null &&
    !o &&
    !s &&
    !(Mt(n.type)
      ? n.type.constraints.minNumFields !== null &&
        n.type.constraints.minNumFields > 0
      : !1)
  )
    return new Fe({
      key: e,
      value: t,
      isEnum: n.location === 'enumTypes',
      inputType: n,
      error: {
        type: 'invalidNullArg',
        name: e,
        invalidType: r.inputTypes,
        atLeastOne: !1,
        atMostOne: !1,
      },
    });
  if (!n.isList)
    if (Mt(n.type)) {
      if (
        typeof t != 'object' ||
        Array.isArray(t) ||
        (n.location === 'inputObjectTypes' && !oa(t))
      )
        return Oi(e, t, r, n);
      {
        let c = Zr(t),
          p,
          f = Object.keys(c || {}),
          d = f.length;
        return (
          (d === 0 &&
            typeof n.type.constraints.minNumFields == 'number' &&
            n.type.constraints.minNumFields > 0) ||
          n.type.constraints.fields?.some(m => f.includes(m)) === !1
            ? (p = {
                type: 'atLeastOne',
                key: e,
                inputType: n.type,
                atLeastFields: n.type.constraints.fields,
              })
            : d > 1 &&
              typeof n.type.constraints.maxNumFields == 'number' &&
              n.type.constraints.maxNumFields < 2 &&
              (p = {
                type: 'atMostOne',
                key: e,
                inputType: n.type,
                providedKeys: f,
              }),
          new Fe({
            key: e,
            value: c === null ? null : Xr(c, n.type, i, r.inputTypes),
            isEnum: n.location === 'enumTypes',
            error: p,
            inputType: n,
            schemaArg: r,
          })
        );
      }
    } else return da(e, t, r, n, i);
  if (
    (!Array.isArray(t) && n.isList && e !== 'updateMany' && (t = [t]),
    n.location === 'enumTypes' || n.location === 'scalar')
  )
    return da(e, t, r, n, i);
  let a = n.type,
    u = (
      typeof a.constraints?.minNumFields == 'number' &&
      a.constraints?.minNumFields > 0
        ? Array.isArray(t) && t.some(c => !c || Object.keys(Zr(c)).length === 0)
        : !1
    )
      ? { inputType: a, key: e, type: 'atLeastOne' }
      : void 0;
  if (!u) {
    let c =
      typeof a.constraints?.maxNumFields == 'number' &&
      a.constraints?.maxNumFields < 2
        ? Array.isArray(t) && t.find(p => !p || Object.keys(Zr(p)).length !== 1)
        : !1;
    c &&
      (u = {
        inputType: a,
        key: e,
        type: 'atMostOne',
        providedKeys: Object.keys(c),
      });
  }
  if (!Array.isArray(t))
    for (let c of r.inputTypes) {
      let p = Xr(t, c.type, i);
      if (p.collectErrors().length === 0)
        return new Fe({
          key: e,
          value: p,
          isEnum: !1,
          schemaArg: r,
          inputType: c,
        });
    }
  return new Fe({
    key: e,
    value: t.map(c =>
      n.isList && typeof c != 'object'
        ? c
        : typeof c != 'object' || !t
        ? Oi(e, c, r, n)
        : Xr(c, a, i)
    ),
    isEnum: !1,
    inputType: n,
    schemaArg: r,
    error: u,
  });
}
function Mt(e) {
  return !(typeof e == 'string' || Object.hasOwnProperty.call(e, 'values'));
}
function da(e, t, r, n, i) {
  return ha(t, n, i)
    ? new Fe({
        key: e,
        value: t,
        isEnum: n.location === 'enumTypes',
        schemaArg: r,
        inputType: n,
      })
    : Oi(e, t, r, n);
}
function Xr(e, t, r, n, i) {
  t.meta?.source && (r = { modelName: t.meta.source });
  let o = Zr(e),
    { fields: s, fieldMap: a } = t,
    l = s.map(f => [f.name, void 0]),
    u = Object.entries(o || {}),
    p = Cs(u, l, f => f[0]).reduce((f, [d, m]) => {
      let g = a ? a[d] : s.find(h => h.name === d);
      if (!g) {
        let h =
          typeof m == 'boolean' && i && i.fields.some(x => x.name === d)
            ? d
            : null;
        return (
          f.push(
            new Fe({
              key: d,
              value: m,
              error: {
                type: 'invalidName',
                providedName: d,
                providedValue: m,
                didYouMeanField: h,
                didYouMeanArg:
                  (!h && Br(d, [...s.map(x => x.name), 'select'])) || void 0,
                originalType: t,
                possibilities: n,
                outputType: i,
              },
            })
          ),
          f
        );
      }
      let b = Lp(d, m, g, r);
      return b && f.push(b), f;
    }, []);
  if (
    (typeof t.constraints.minNumFields == 'number' &&
      u.length < t.constraints.minNumFields) ||
    p.find(
      f => f.error?.type === 'missingArg' || f.error?.type === 'atLeastOne'
    )
  ) {
    let f = t.fields.filter(
      d => !d.isRequired && o && (typeof o[d.name] > 'u' || o[d.name] === null)
    );
    p.push(
      ...f.map(d => {
        let m = d.inputTypes[0];
        return new Fe({
          key: d.name,
          value: void 0,
          isEnum: m.location === 'enumTypes',
          error: {
            type: 'missingArg',
            missingName: d.name,
            missingArg: d,
            atLeastOne: Boolean(t.constraints.minNumFields) || !1,
            atMostOne: t.constraints.maxNumFields === 1 || !1,
          },
          inputType: m,
        });
      })
    );
  }
  return new ue(p);
}
function tn({ document: e, path: t, data: r }) {
  let n = er(r, t);
  if (n === 'undefined') return null;
  if (typeof n != 'object') return n;
  let i = jp(e, t);
  return Ri({ field: i, data: n });
}
function Ri({ field: e, data: t }) {
  if (!t || typeof t != 'object' || !e.children || !e.schemaField) return t;
  let r = {
    DateTime: n => new Date(n),
    Json: n => JSON.parse(n),
    Bytes: n => Buffer.from(n, 'base64'),
    Decimal: n => new ge(n),
    BigInt: n => BigInt(n),
  };
  for (let n of e.children) {
    let i = n.schemaField?.outputType.type;
    if (i && typeof i == 'string') {
      let o = r[i];
      if (o)
        if (Array.isArray(t))
          for (let s of t)
            typeof s[n.name] < 'u' &&
              s[n.name] !== null &&
              (Array.isArray(s[n.name])
                ? (s[n.name] = s[n.name].map(o))
                : (s[n.name] = o(s[n.name])));
        else
          typeof t[n.name] < 'u' &&
            t[n.name] !== null &&
            (Array.isArray(t[n.name])
              ? (t[n.name] = t[n.name].map(o))
              : (t[n.name] = o(t[n.name])));
    }
    if (
      n.schemaField &&
      n.schemaField.outputType.location === 'outputObjectTypes'
    )
      if (Array.isArray(t)) for (let o of t) Ri({ field: n, data: o[n.name] });
      else Ri({ field: n, data: t[n.name] });
  }
  return t;
}
function jp(e, t) {
  let r = t.slice(),
    n = r.shift(),
    i = e.children.find(o => o.name === n);
  if (!i) throw new Error(`Could not find field ${n} in document ${e}`);
  for (; r.length > 0; ) {
    let o = r.shift();
    if (!i.children)
      throw new Error(`Can't get children for field ${i} with child ${o}`);
    let s = i.children.find(a => a.name === o);
    if (!s) throw new Error(`Can't find child ${o} of field ${i}`);
    i = s;
  }
  return i;
}
function Ci(e) {
  return e
    .split('.')
    .filter(t => t !== 'select')
    .join('.');
}
function $i(e) {
  if (Object.prototype.toString.call(e) === '[object Object]') {
    let r = {};
    for (let n in e)
      if (n === 'select') for (let i in e.select) r[i] = $i(e.select[i]);
      else r[n] = $i(e[n]);
    return r;
  }
  return e;
}
function qp({ ast: e, keyPaths: t, missingItems: r, valuePaths: n }) {
  let i = t.map(Ci),
    o = n.map(Ci),
    s = r.map(l => ({
      path: Ci(l.path),
      isRequired: l.isRequired,
      type: l.type,
    }));
  return { ast: $i(e), keyPaths: i, missingItems: s, valuePaths: o };
}
function nr(e) {
  return {
    getKeys() {
      return Object.keys(e);
    },
    getPropertyValue(t) {
      return e[t];
    },
  };
}
function He(e, t) {
  return {
    getKeys() {
      return [e];
    },
    getPropertyValue() {
      return t();
    },
  };
}
function it(e) {
  let t = new Oe();
  return {
    getKeys() {
      return e.getKeys();
    },
    getPropertyValue(r) {
      return t.getOrCreate(r, () => e.getPropertyValue(r));
    },
    getPropertyDescriptor(r) {
      return e.getPropertyDescriptor?.(r);
    },
  };
}
var xa = require('util');
var rn = { enumerable: !0, configurable: !0, writable: !0 };
function nn(e) {
  let t = new Set(e);
  return {
    getOwnPropertyDescriptor: () => rn,
    has: (r, n) => t.has(n),
    set: (r, n, i) => t.add(n) && Reflect.set(r, n, i),
    ownKeys: () => [...t],
  };
}
var ba = Symbol.for('nodejs.util.inspect.custom');
function ze(e, t) {
  let r = Bp(t),
    n = new Set(),
    i = new Proxy(e, {
      get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      },
      has(o, s) {
        if (n.has(s)) return !0;
        let a = r.get(s);
        return a ? a.has?.(s) ?? !0 : Reflect.has(o, s);
      },
      ownKeys(o) {
        let s = wa(Reflect.ownKeys(o), r),
          a = wa(Array.from(r.keys()), r);
        return [...new Set([...s, ...a, ...n])];
      },
      set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === !1
          ? !1
          : (n.add(s), Reflect.set(o, s, a));
      },
      getOwnPropertyDescriptor(o, s) {
        let a = r.get(s);
        return a
          ? a.getPropertyDescriptor
            ? { ...rn, ...a?.getPropertyDescriptor(s) }
            : rn
          : Reflect.getOwnPropertyDescriptor(o, s);
      },
      defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      },
    });
  return (
    (i[ba] = function (o, s, a = xa.inspect) {
      let l = { ...this };
      return delete l[ba], a(l, s);
    }),
    i
  );
}
function Bp(e) {
  let t = new Map();
  for (let r of e) {
    let n = r.getKeys();
    for (let i of n) t.set(i, r);
  }
  return t;
}
function wa(e, t) {
  return e.filter(r => t.get(r)?.has?.(r) ?? !0);
}
function Di(e) {
  return {
    getKeys() {
      return e;
    },
    has() {
      return !1;
    },
    getPropertyValue() {},
  };
}
var Ta = R(require('path'));
var ir = '<unknown>';
function Ea(e) {
  var t = e.split(`
`);
  return t.reduce(function (r, n) {
    var i = Qp(n) || Gp(n) || Hp(n) || Xp(n) || Yp(n);
    return i && r.push(i), r;
  }, []);
}
var Vp =
    /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  Up = /\((\S*)(?::(\d+))(?::(\d+))\)/;
function Qp(e) {
  var t = Vp.exec(e);
  if (!t) return null;
  var r = t[2] && t[2].indexOf('native') === 0,
    n = t[2] && t[2].indexOf('eval') === 0,
    i = Up.exec(t[2]);
  return (
    n && i != null && ((t[2] = i[1]), (t[3] = i[2]), (t[4] = i[3])),
    {
      file: r ? null : t[2],
      methodName: t[1] || ir,
      arguments: r ? [t[2]] : [],
      lineNumber: t[3] ? +t[3] : null,
      column: t[4] ? +t[4] : null,
    }
  );
}
var Jp =
  /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function Gp(e) {
  var t = Jp.exec(e);
  return t
    ? {
        file: t[2],
        methodName: t[1] || ir,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null;
}
var Kp =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
  Wp = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function Hp(e) {
  var t = Kp.exec(e);
  if (!t) return null;
  var r = t[3] && t[3].indexOf(' > eval') > -1,
    n = Wp.exec(t[3]);
  return (
    r && n != null && ((t[3] = n[1]), (t[4] = n[2]), (t[5] = null)),
    {
      file: t[3],
      methodName: t[1] || ir,
      arguments: t[2] ? t[2].split(',') : [],
      lineNumber: t[4] ? +t[4] : null,
      column: t[5] ? +t[5] : null,
    }
  );
}
var zp = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
function Yp(e) {
  var t = zp.exec(e);
  return t
    ? {
        file: t[3],
        methodName: t[1] || ir,
        arguments: [],
        lineNumber: +t[4],
        column: t[5] ? +t[5] : null,
      }
    : null;
}
var Zp =
  /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function Xp(e) {
  var t = Zp.exec(e);
  return t
    ? {
        file: t[2],
        methodName: t[1] || ir,
        arguments: [],
        lineNumber: +t[3],
        column: t[4] ? +t[4] : null,
      }
    : null;
}
var ki = class {
    getLocation() {
      return null;
    }
  },
  Ii = class {
    constructor() {
      this._error = new Error();
    }
    getLocation() {
      let t = this._error.stack;
      if (!t) return null;
      let n = Ea(t).find(i => {
        if (!i.file) return !1;
        let o = i.file.split(Ta.default.sep).join('/');
        return (
          o !== '<anonymous>' &&
          !o.includes('@prisma') &&
          !o.includes('/packages/client/src/runtime/') &&
          !o.endsWith('/runtime/binary.js') &&
          !o.endsWith('/runtime/library.js') &&
          !o.endsWith('/runtime/data-proxy.js') &&
          !o.endsWith('/runtime/edge.js') &&
          !o.endsWith('/runtime/edge-esm.js') &&
          !o.startsWith('internal/') &&
          !i.methodName.includes('new ') &&
          !i.methodName.includes('getCallSite') &&
          !i.methodName.includes('Proxy.') &&
          i.methodName.split('.').length < 4
        );
      });
      return !n || !n.file
        ? null
        : {
            fileName: n.file,
            lineNumber: n.lineNumber,
            columnNumber: n.column,
          };
    }
  };
function Ye(e) {
  return e === 'minimal' ? new ki() : new Ii();
}
function $e(e) {
  let t,
    r = n => {
      try {
        return n === void 0 || n?.kind === 'itx'
          ? t ?? (t = va(e(n)))
          : va(e(n));
      } catch (i) {
        return Promise.reject(i);
      }
    };
  return {
    then(n, i, o) {
      return r(o).then(n, i, o);
    },
    catch(n, i) {
      return r(i).catch(n, i);
    },
    finally(n, i) {
      return r(i).finally(n, i);
    },
    requestTransaction(n) {
      let i = r(n);
      return i.requestTransaction ? i.requestTransaction(n) : i;
    },
    [Symbol.toStringTag]: 'PrismaPromise',
  };
}
function va(e) {
  return typeof e.then == 'function' ? e : Promise.resolve(e);
}
var Pa = { _avg: !0, _count: !0, _sum: !0, _min: !0, _max: !0 };
function Ft(e = {}) {
  let t = tf(e);
  return Object.entries(t).reduce(
    (n, [i, o]) => (
      Pa[i] !== void 0 ? (n.select[i] = { select: o }) : (n[i] = o), n
    ),
    { select: {} }
  );
}
function tf(e = {}) {
  return typeof e._count == 'boolean'
    ? { ...e, _count: { _all: e._count } }
    : e;
}
function on(e = {}) {
  return t => (typeof e._count == 'boolean' && (t._count = t._count._all), t);
}
function Ma(e, t) {
  let r = on(e);
  return t({ action: 'aggregate', unpacker: r, argsMapper: Ft })(e);
}
function rf(e = {}) {
  let { select: t, ...r } = e;
  return typeof t == 'object'
    ? Ft({ ...r, _count: t })
    : Ft({ ...r, _count: { _all: !0 } });
}
function nf(e = {}) {
  return typeof e.select == 'object'
    ? t => on(e)(t)._count
    : t => on(e)(t)._count._all;
}
function Fa(e, t) {
  return t({ action: 'count', unpacker: nf(e), argsMapper: rf })(e);
}
function of(e = {}) {
  let t = Ft(e);
  if (Array.isArray(t.by))
    for (let r of t.by) typeof r == 'string' && (t.select[r] = !0);
  return t;
}
function sf(e = {}) {
  return t => (
    typeof e?._count == 'boolean' &&
      t.forEach(r => {
        r._count = r._count._all;
      }),
    t
  );
}
function Ca(e, t) {
  return t({ action: 'groupBy', unpacker: sf(e), argsMapper: of })(e);
}
function Sa(e, t, r) {
  if (t === 'aggregate') return n => Ma(n, r);
  if (t === 'count') return n => Fa(n, r);
  if (t === 'groupBy') return n => Ca(n, r);
}
function Aa(e, t) {
  let r = t.fields.filter(i => !i.relationName),
    n = ni(r, i => i.name);
  return new Proxy(
    {},
    {
      get(i, o) {
        if (o in i || typeof o == 'symbol') return i[o];
        let s = n[o];
        if (s) return new we(e, o, s.type, s.isList);
      },
      ...nn(Object.keys(n)),
    }
  );
}
function af(e, t) {
  return e === void 0 || t === void 0 ? [] : [...t, 'select', e];
}
function lf(e, t, r) {
  return t === void 0 ? e ?? {} : zr(t, r, e || !0);
}
function Li(e, t, r, n, i, o) {
  let a = e._runtimeDataModel.models[t].fields.reduce(
    (l, u) => ({ ...l, [u.name]: u }),
    {}
  );
  return l => {
    let u = Ye(e._errorFormat),
      c = af(n, i),
      p = lf(l, o, c),
      f = r({ dataPath: c, callsite: u })(p),
      d = uf(e, t);
    return new Proxy(f, {
      get(m, g) {
        if (!d.includes(g)) return m[g];
        let h = [a[g].type, r, g],
          x = [c, p];
        return Li(e, ...h, ...x);
      },
      ...nn([...d, ...Object.getOwnPropertyNames(f)]),
    });
  };
}
function uf(e, t) {
  return e._runtimeDataModel.models[t].fields
    .filter(r => r.kind === 'object')
    .map(r => r.name);
}
var sn = Oa().version;
var Ee = class extends ne {
  constructor(t) {
    super(t, { code: 'P2025', clientVersion: sn }),
      (this.name = 'NotFoundError');
  }
};
ce(Ee, 'NotFoundError');
function Ni(e, t, r, n) {
  let i;
  if (
    r &&
    typeof r == 'object' &&
    'rejectOnNotFound' in r &&
    r.rejectOnNotFound !== void 0
  )
    (i = r.rejectOnNotFound), delete r.rejectOnNotFound;
  else if (typeof n == 'boolean') i = n;
  else if (n && typeof n == 'object' && e in n) {
    let o = n[e];
    if (o && typeof o == 'object') return t in o ? o[t] : void 0;
    i = Ni(e, t, r, o);
  } else typeof n == 'function' ? (i = n) : (i = !1);
  return i;
}
var pf = /(findUnique|findFirst)/;
function Ra(e, t, r, n) {
  if ((r ?? (r = 'record'), n && !e && pf.exec(t)))
    throw typeof n == 'boolean' && n
      ? new Ee(`No ${r} found`)
      : typeof n == 'function'
      ? n(new Ee(`No ${r} found`))
      : Dt(n)
      ? n
      : new Ee(`No ${r} found`);
}
function $a(e, t, r) {
  return e === be.ModelAction.findFirstOrThrow ||
    e === be.ModelAction.findUniqueOrThrow
    ? ff(t, r)
    : r;
}
function ff(e, t) {
  return async r => {
    if ('rejectOnNotFound' in r.args) {
      let i = Re({
        originalMethod: r.clientMethod,
        callsite: r.callsite,
        message: "'rejectOnNotFound' option is not supported",
      });
      throw new W(i);
    }
    return await t(r).catch(i => {
      throw i instanceof ne && i.code === 'P2025' ? new Ee(`No ${e} found`) : i;
    });
  };
}
var df = [
    'findUnique',
    'findUniqueOrThrow',
    'findFirst',
    'findFirstOrThrow',
    'create',
    'update',
    'upsert',
    'delete',
  ],
  mf = ['aggregate', 'count', 'groupBy'];
function _i(e, t) {
  let r = [hf(e, t), gf(t)];
  e._engineConfig.previewFeatures?.includes('fieldReference') &&
    r.push(bf(e, t));
  let n = e._extensions.getAllModelExtensions(t);
  return n && r.push(nr(n)), ze({}, r);
}
function gf(e) {
  return He('name', () => e);
}
function hf(e, t) {
  let r = xe(t),
    n = Object.keys(be.ModelAction).concat('count');
  return {
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = i,
        s = l => e._request(l);
      s = $a(o, t, s);
      let a = l => u => {
        let c = Ye(e._errorFormat);
        return $e(p => {
          let f = {
            args: u,
            dataPath: [],
            action: o,
            model: t,
            clientMethod: `${r}.${i}`,
            jsModelName: r,
            transaction: p,
            callsite: c,
          };
          return s({ ...f, ...l });
        });
      };
      return df.includes(o) ? Li(e, t, a) : yf(i) ? Sa(e, i, a) : a({});
    },
  };
}
function yf(e) {
  return mf.includes(e);
}
function bf(e, t) {
  return it(
    He('fields', () => {
      let r = e._runtimeDataModel.models[t];
      return Aa(t, r);
    })
  );
}
function Da(e) {
  return e.replace(/^./, t => t.toUpperCase());
}
var ji = Symbol();
function an(e) {
  let t = [wf(e), He(ji, () => e)],
    r = e._extensions.getAllClientExtensions();
  return r && t.push(nr(r)), ze(e, t);
}
function wf(e) {
  let t = Object.keys(e._runtimeDataModel.models),
    r = t.map(xe),
    n = [...new Set(t.concat(r))];
  return it({
    getKeys() {
      return n;
    },
    getPropertyValue(i) {
      let o = Da(i);
      if (e._runtimeDataModel.models[o] !== void 0) return _i(e, o);
      if (e._runtimeDataModel.models[i] !== void 0) return _i(e, i);
    },
    getPropertyDescriptor(i) {
      if (!r.includes(i)) return { enumerable: !1 };
    },
  });
}
function ka(e) {
  return e[ji] ? e[ji] : e;
}
function Ia(e) {
  if (!this._hasPreviewFlag('clientExtensions'))
    throw new W(
      'Extensions are not yet generally available, please add `clientExtensions` to the `previewFeatures` field in the `generator` block in the `schema.prisma` file.'
    );
  if (typeof e == 'function') return e(this);
  let t = ka(this),
    r = Object.create(t, {
      _extensions: { value: this._extensions.append(e) },
    });
  return an(r);
}
function De(e) {
  if (typeof e != 'object') return e;
  var t,
    r,
    n = Object.prototype.toString.call(e);
  if (n === '[object Object]') {
    if (e.constructor !== Object && typeof e.constructor == 'function') {
      r = new e.constructor();
      for (t in e) e.hasOwnProperty(t) && r[t] !== e[t] && (r[t] = De(e[t]));
    } else {
      r = {};
      for (t in e)
        t === '__proto__'
          ? Object.defineProperty(r, t, {
              value: De(e[t]),
              configurable: !0,
              enumerable: !0,
              writable: !0,
            })
          : (r[t] = De(e[t]));
    }
    return r;
  }
  if (n === '[object Array]') {
    for (t = e.length, r = Array(t); t--; ) r[t] = De(e[t]);
    return r;
  }
  return n === '[object Set]'
    ? ((r = new Set()),
      e.forEach(function (i) {
        r.add(De(i));
      }),
      r)
    : n === '[object Map]'
    ? ((r = new Map()),
      e.forEach(function (i, o) {
        r.set(De(o), De(i));
      }),
      r)
    : n === '[object Date]'
    ? new Date(+e)
    : n === '[object RegExp]'
    ? ((r = new RegExp(e.source, e.flags)), (r.lastIndex = e.lastIndex), r)
    : n === '[object DataView]'
    ? new e.constructor(De(e.buffer))
    : n === '[object ArrayBuffer]'
    ? e.slice(0)
    : n.slice(-6) === 'Array]'
    ? new e.constructor(e)
    : e;
}
function La(e, t, r, n = 0) {
  return $e(i => {
    let o = t.customDataProxyFetch ?? (s => s);
    return (
      i !== void 0 &&
        (t.transaction?.kind === 'batch' && t.transaction.lock.then(),
        (t.transaction = i)),
      n === r.length
        ? e._executeRequest(t)
        : r[n]({
            model: t.model,
            operation: t.model ? t.action : t.clientMethod,
            args: De(t.args ?? {}),
            __internalParams: t,
            query: (s, a = t) => {
              let l = a.customDataProxyFetch ?? (u => u);
              return (
                (a.customDataProxyFetch = u => o(l(u))),
                (a.args = s),
                La(e, a, r, n + 1)
              );
            },
          })
    );
  });
}
function Na(e, t) {
  let { jsModelName: r, action: n, clientMethod: i } = t,
    o = r ? n : i;
  if (e._extensions.isEmpty()) return e._executeRequest(t);
  let s = e._extensions.getAllQueryCallbacks(r ?? '*', o);
  return La(e, t, s);
}
var ln = class {
    constructor(t, r) {
      this.extension = t;
      this.previous = r;
      this.computedFieldsCache = new Oe();
      this.modelExtensionsCache = new Oe();
      this.queryCallbacksCache = new Oe();
      this.clientExtensions = Or(() =>
        this.extension.client
          ? {
              ...this.previous?.getAllClientExtensions(),
              ...this.extension.client,
            }
          : this.previous?.getAllClientExtensions()
      );
    }
    getAllComputedFields(t) {
      return this.computedFieldsCache.getOrCreate(t, () =>
        Gs(this.previous?.getAllComputedFields(t), this.extension, t)
      );
    }
    getAllClientExtensions() {
      return this.clientExtensions.get();
    }
    getAllModelExtensions(t) {
      return this.modelExtensionsCache.getOrCreate(t, () => {
        let r = xe(t);
        return !this.extension.model ||
          !(this.extension.model[r] || this.extension.model.$allModels)
          ? this.previous?.getAllModelExtensions(t)
          : {
              ...this.previous?.getAllModelExtensions(t),
              ...this.extension.model.$allModels,
              ...this.extension.model[r],
            };
      });
    }
    getAllQueryCallbacks(t, r) {
      return this.queryCallbacksCache.getOrCreate(`${t}:${r}`, () => {
        let n = this.previous?.getAllQueryCallbacks(t, r) ?? [],
          i = [],
          o = this.extension.query;
        return !o || !(o[t] || o.$allModels || o[r])
          ? n
          : (o[t] !== void 0 &&
              (o[t][r] !== void 0 && i.push(o[t][r]),
              o[t].$allOperations !== void 0 && i.push(o[t].$allOperations)),
            o.$allModels !== void 0 &&
              (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]),
              o.$allModels.$allOperations !== void 0 &&
                i.push(o.$allModels.$allOperations)),
            o[r] !== void 0 && i.push(o[r]),
            n.concat(i));
      });
    }
  },
  Ze = class {
    constructor(t) {
      this.head = t;
    }
    static empty() {
      return new Ze();
    }
    static single(t) {
      return new Ze(new ln(t));
    }
    isEmpty() {
      return this.head === void 0;
    }
    append(t) {
      return new Ze(new ln(t, this.head));
    }
    getAllComputedFields(t) {
      return this.head?.getAllComputedFields(t);
    }
    getAllClientExtensions() {
      return this.head?.getAllClientExtensions();
    }
    getAllModelExtensions(t) {
      return this.head?.getAllModelExtensions(t);
    }
    getAllQueryCallbacks(t, r) {
      return this.head?.getAllQueryCallbacks(t, r) ?? [];
    }
  };
var _a = J('prisma:client'),
  ja = { Vercel: 'vercel', 'Netlify CI': 'netlify' };
function qa({ postinstall: e, ciName: t, clientVersion: r }) {
  if (
    (_a('checkPlatformCaching:postinstall', e),
    _a('checkPlatformCaching:ciName', t),
    e === !0 && t && t in ja)
  ) {
    let n = `Prisma has detected that this project was built on ${t}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${ja[t]}-build`;
    throw (console.error(n), new G(n, r));
  }
}
var xf = {
    findUnique: 'query',
    findUniqueOrThrow: 'query',
    findFirst: 'query',
    findFirstOrThrow: 'query',
    findMany: 'query',
    count: 'query',
    create: 'mutation',
    createMany: 'mutation',
    update: 'mutation',
    updateMany: 'mutation',
    upsert: 'mutation',
    delete: 'mutation',
    deleteMany: 'mutation',
    executeRaw: 'mutation',
    queryRaw: 'mutation',
    aggregate: 'query',
    groupBy: 'query',
    runCommandRaw: 'mutation',
    findRaw: 'query',
    aggregateRaw: 'query',
  },
  un = class {
    constructor(t, r) {
      this.dmmf = t;
      this.errorFormat = r;
    }
    createMessage({
      action: t,
      modelName: r,
      args: n,
      extensions: i,
      clientMethod: o,
      callsite: s,
    }) {
      let a,
        l = xf[t];
      (t === 'executeRaw' || t === 'queryRaw' || t === 'runCommandRaw') &&
        (a = t);
      let u;
      if (r !== void 0) {
        if (((u = this.dmmf?.mappingsMap[r]), u === void 0))
          throw new Error(`Could not find mapping for model ${r}`);
        if (((a = u[t === 'count' ? 'aggregate' : t]), !a)) {
          let f = Re({
            message: `Model \`${r}\` does not support \`${t}\` action.`,
            originalMethod: o,
            callsite: s,
          });
          throw new W(f);
        }
      }
      if (l !== 'query' && l !== 'mutation')
        throw new Error(`Invalid operation ${l} for action ${t}`);
      if (this.dmmf?.rootFieldMap[a] === void 0)
        throw new Error(
          `Could not find rootField ${a} for action ${t} for model ${r} on rootType ${l}`
        );
      let p = en({
        dmmf: this.dmmf,
        rootField: a,
        rootTypeName: l,
        select: n,
        modelName: r,
        extensions: i,
      });
      return p.validate(n, !1, o, this.errorFormat, s), new qi(p);
    }
    createBatch(t) {
      return t.map(r => r.toEngineQuery());
    }
  },
  qi = class {
    constructor(t) {
      this.document = t;
    }
    isWrite() {
      return this.document.type === 'mutation';
    }
    getBatchId() {
      if (!this.getRootField().startsWith('findUnique')) return;
      let t = this.document.children[0].args?.args
          .map(n =>
            n.value instanceof ue
              ? `${n.key}-${n.value.args.map(i => i.key).join(',')}`
              : n.key
          )
          .join(','),
        r = this.document.children[0].children.join(',');
      return `${this.document.children[0].name}|${t}|${r}`;
    }
    toDebugString() {
      return String(this.document);
    }
    toEngineQuery() {
      return { query: String(this.document), variables: {} };
    }
    deserializeResponse(t, r) {
      let n = this.getRootField(),
        i = [];
      return (
        n && i.push(n),
        i.push(...r.filter(o => o !== 'select' && o !== 'include')),
        tn({ document: this.document, path: i, data: t })
      );
    }
    getRootField() {
      return this.document.children[0].name;
    }
  };
function cn(e) {
  return e === null
    ? e
    : Array.isArray(e)
    ? e.map(cn)
    : typeof e == 'object'
    ? Ef(e)
      ? Tf(e)
      : mt(e, cn)
    : e;
}
function Ef(e) {
  return e !== null && typeof e == 'object' && typeof e.$type == 'string';
}
function Tf({ $type: e, value: t }) {
  switch (e) {
    case 'BigInt':
      return BigInt(t);
    case 'Bytes':
      return Buffer.from(t, 'base64');
    case 'DateTime':
      return new Date(t);
    case 'Decimal':
      return new ge(t);
    case 'Json':
      return JSON.parse(t);
    default:
      Ie(t, 'Unknown tagged value');
  }
}
var pn = class {
  constructor(t = 0, r) {
    this.context = r;
    this.lines = [];
    this.currentLine = '';
    this.currentIndent = 0;
    this.currentIndent = t;
  }
  write(t) {
    return typeof t == 'string' ? (this.currentLine += t) : t.write(this), this;
  }
  writeJoined(t, r) {
    let n = r.length - 1;
    for (let i = 0; i < r.length; i++)
      this.write(r[i]), i !== n && this.write(t);
    return this;
  }
  writeLine(t) {
    return this.write(t).newLine();
  }
  newLine() {
    this.lines.push(this.indentedCurrentLine()),
      (this.currentLine = ''),
      (this.marginSymbol = void 0);
    let t = this.afterNextNewLineCallback;
    return (this.afterNextNewLineCallback = void 0), t?.(), this;
  }
  withIndent(t) {
    return this.indent(), t(this), this.unindent(), this;
  }
  afterNextNewline(t) {
    return (this.afterNextNewLineCallback = t), this;
  }
  indent() {
    return this.currentIndent++, this;
  }
  unindent() {
    return this.currentIndent > 0 && this.currentIndent--, this;
  }
  addMarginSymbol(t) {
    return (this.marginSymbol = t), this;
  }
  toString() {
    return this.lines.concat(this.indentedCurrentLine()).join(`
`);
  }
  getCurrentLineLength() {
    return this.currentLine.length;
  }
  indentedCurrentLine() {
    let t = this.currentLine.padStart(
      this.currentLine.length + 2 * this.currentIndent
    );
    return this.marginSymbol ? this.marginSymbol + t.slice(1) : t;
  }
};
var Qa = R(_r());
var _e = class {
  constructor(t, r) {
    this.name = t;
    this.value = r;
    this.isRequired = !1;
  }
  makeRequired() {
    return (this.isRequired = !0), this;
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context;
    t.addMarginSymbol(r(this.isRequired ? '+' : '?')),
      t.write(r(this.name)),
      this.isRequired || t.write(r('?')),
      t.write(r(': ')),
      typeof this.value == 'string'
        ? t.write(r(this.value))
        : t.write(this.value);
  }
};
var fn = e => e,
  Ba = { bold: fn, red: fn, green: fn, dim: fn },
  Va = { bold: P, red: A, green: S, dim: D },
  Ct = {
    write(e) {
      e.writeLine(',');
    },
  };
var ke = class {
  constructor(t) {
    this.contents = t;
    this.isUnderlined = !1;
    this.color = t => t;
  }
  underline() {
    return (this.isUnderlined = !0), this;
  }
  setColor(t) {
    return (this.color = t), this;
  }
  write(t) {
    let r = t.getCurrentLineLength();
    t.write(this.color(this.contents)),
      this.isUnderlined &&
        t.afterNextNewline(() => {
          t.write(' '.repeat(r)).writeLine(
            this.color('~'.repeat(this.contents.length))
          );
        });
  }
};
var Xe = class {
  constructor() {
    this.hasError = !1;
  }
  markAsError() {
    return (this.hasError = !0), this;
  }
};
var V = class extends Xe {
  constructor() {
    super(...arguments);
    this.fields = {};
    this.suggestions = [];
  }
  addField(r) {
    this.fields[r.name] = r;
  }
  addSuggestion(r) {
    this.suggestions.push(r);
  }
  getField(r) {
    return this.fields[r];
  }
  getDeepField(r) {
    let [n, ...i] = r,
      o = this.getField(n);
    if (!o) return;
    let s = o;
    for (let a of i) {
      if (!(s.value instanceof V)) return;
      let l = s.value.getField(a);
      if (!l) return;
      s = l;
    }
    return s;
  }
  getDeepFieldValue(r) {
    return r.length === 0 ? this : this.getDeepField(r)?.value;
  }
  hasField(r) {
    return Boolean(this.getField(r));
  }
  removeAllFields() {
    this.fields = {};
  }
  removeField(r) {
    delete this.fields[r];
  }
  getFields() {
    return this.fields;
  }
  isEmpty() {
    return Object.keys(this.fields).length === 0;
  }
  getFieldValue(r) {
    return this.getField(r)?.value;
  }
  getDeepSubSelectionValue(r) {
    let n = this;
    for (let i of r) {
      if (!(n instanceof V)) return;
      let o = n.getSubSelectionValue(i);
      if (!o) return;
      n = o;
    }
    return n;
  }
  getDeepSelectionParent(r) {
    let n = this.getSelectionParent();
    if (!n) return;
    let i = n;
    for (let o of r) {
      let s = i.value.getFieldValue(o);
      if (!s || !(s instanceof V)) return;
      let a = s.getSelectionParent();
      if (!a) return;
      i = a;
    }
    return i;
  }
  getSelectionParent() {
    let r = this.getField('select');
    if (r?.value instanceof V) return { kind: 'select', value: r.value };
    let n = this.getField('include');
    if (n?.value instanceof V) return { kind: 'include', value: n.value };
  }
  getSubSelectionValue(r) {
    return this.getSelectionParent()?.value.fields[r].value;
  }
  getPrintWidth() {
    let r = Object.values(this.fields);
    return r.length == 0 ? 2 : Math.max(...r.map(i => i.getPrintWidth())) + 2;
  }
  write(r) {
    let n = Object.values(this.fields);
    if (n.length === 0 && this.suggestions.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithContents(r, n);
  }
  writeEmpty(r) {
    let n = new ke('{}');
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithContents(r, n) {
    r.writeLine('{').withIndent(() => {
      r.writeJoined(Ct, [...n, ...this.suggestions]).newLine();
    }),
      r.write('}'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(r.context.colors.red('~'.repeat(this.getPrintWidth())));
        });
  }
};
var ee = class extends Xe {
  constructor(r) {
    super();
    this.text = r;
  }
  getPrintWidth() {
    return this.text.length;
  }
  write(r) {
    let n = new ke(this.text);
    this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
  }
};
var dn = class {
  constructor() {
    this.fields = [];
  }
  addField(t, r) {
    return (
      this.fields.push({
        write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${t}: ${r}`))).addMarginSymbol(i(o('+')));
        },
      }),
      this
    );
  }
  write(t) {
    let {
      colors: { green: r },
    } = t.context;
    t.writeLine(r('{'))
      .withIndent(() => {
        t.writeJoined(Ct, this.fields).newLine();
      })
      .write(r('}'))
      .addMarginSymbol(r('+'));
  }
};
function Bi(e, t) {
  switch (e.kind) {
    case 'IncludeAndSelect':
      Pf(e, t);
      break;
    case 'IncludeOnScalar':
      Mf(e, t);
      break;
    case 'EmptySelection':
      Ff(e, t);
      break;
    case 'UnknownSelectionField':
      Cf(e, t);
      break;
    case 'UnknownArgument':
      Sf(e, t);
      break;
    case 'UnknownInputField':
      Af(e, t);
      break;
    case 'RequiredArgumentMissing':
      Of(e, t);
      break;
    case 'InvalidArgumentType':
      Rf(e, t);
      break;
    case 'InvalidArgumentValue':
      $f(e, t);
      break;
    case 'ValueTooLarge':
      Df(e, t);
      break;
    case 'SomeFieldsMissing':
      kf(e, t);
      break;
    case 'TooManyFieldsGiven':
      If(e, t);
      break;
    case 'Union':
      Lf(e, t);
      break;
    default:
      throw new Error('not implemented: ' + e.kind);
  }
}
function Pf(e, t) {
  let r = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  r &&
    r instanceof V &&
    (r.getField('include')?.markAsError(), r.getField('select')?.markAsError()),
    t.addErrorMessage(
      n =>
        `Please ${n.bold('either')} use ${n.green('`include`')} or ${n.green(
          '`select`'
        )}, but ${n.red('not both')} at the same time.`
    );
}
function Mf(e, t) {
  let [r, n] = mn(e.selectionPath),
    i = e.outputType,
    o = t.arguments.getDeepSelectionParent(r)?.value;
  if (o && (o.getField(n)?.markAsError(), i))
    for (let s of i.fields)
      s.isRelation && o.addSuggestion(new _e(s.name, 'true'));
  t.addErrorMessage(s => {
    let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold(
      'include'
    )} statement`;
    return (
      i ? (a += ` on model ${s.bold(i.name)}. ${or(s)}`) : (a += '.'),
      (a += `
Note that ${s.bold('include')} statements only accept relation fields.`),
      a
    );
  });
}
function Ff(e, t) {
  let r = e.outputType,
    n = t.arguments.getDeepSelectionParent(e.selectionPath)?.value,
    i = n?.isEmpty() ?? !1;
  n && (n.removeAllFields(), Wa(n, r)),
    t.addErrorMessage(o =>
      i
        ? `The ${o.red('`select`')} statement for type ${o.bold(
            r.name
          )} must not be empty. ${or(o)}`
        : `The ${o.red('`select`')} statement for type ${o.bold(
            r.name
          )} needs ${o.bold('at least one truthy value')}.`
    );
}
function Cf(e, t) {
  let [r, n] = mn(e.selectionPath),
    i = t.arguments.getDeepSelectionParent(r);
  i && (i.value.getField(n)?.markAsError(), Wa(i.value, e.outputType)),
    t.addErrorMessage(o => {
      let s = [`Unknown field ${o.red(`\`${n}\``)}`];
      return (
        i && s.push(`for ${o.bold(i.kind)} statement`),
        s.push(`on model ${o.bold(`\`${e.outputType.name}\``)}.`),
        s.push(or(o)),
        s.join(' ')
      );
    });
}
function Sf(e, t) {
  let r = e.argumentPath[0],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  n instanceof V && (n.getField(r)?.markAsError(), jf(n, e.arguments)),
    t.addErrorMessage(i =>
      Ja(
        i,
        r,
        e.arguments.map(o => o.name)
      )
    );
}
function Af(e, t) {
  let [r, n] = mn(e.argumentPath),
    i = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  if (i instanceof V) {
    i.getDeepField(e.argumentPath)?.markAsError();
    let o = i.getDeepFieldValue(r);
    o instanceof V && Ha(o, e.inputType);
  }
  t.addErrorMessage(o =>
    Ja(
      o,
      n,
      e.inputType.fields.map(s => s.name)
    )
  );
}
function Ja(e, t, r) {
  let n = [`Unknown argument \`${e.red(t)}\`.`],
    i = Bf(t, r);
  return (
    i && n.push(`Did you mean \`${e.green(i)}\`?`),
    r.length > 0 && n.push(or(e)),
    n.join(' ')
  );
}
function Of(e, t) {
  let r;
  t.addErrorMessage(l =>
    r?.value instanceof ee && r.value.text === 'null'
      ? `Argument \`${l.green(o)}\` must not be ${l.red('null')}.`
      : `Argument \`${l.green(o)}\` is missing.`
  );
  let n = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  if (!(n instanceof V)) return;
  let [i, o] = mn(e.argumentPath),
    s = new dn(),
    a = n.getDeepFieldValue(i);
  if (a instanceof V)
    if (
      ((r = a.getField(o)),
      r && a.removeField(o),
      e.inputTypes.length === 1 && e.inputTypes[0].kind === 'object')
    ) {
      for (let l of e.inputTypes[0].fields)
        s.addField(l.name, l.typeNames.join(' | '));
      a.addSuggestion(new _e(o, s).makeRequired());
    } else {
      let l = e.inputTypes.map(Ga).join(' | ');
      a.addSuggestion(new _e(o, l).makeRequired());
    }
}
function Ga(e) {
  return e.kind === 'list' ? `${Ga(e.elementType)}[]` : e.name;
}
function Rf(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  n instanceof V && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage(i => {
      let o = gn(
        'or',
        e.argument.typeNames.map(s => i.green(s))
      );
      return `Argument \`${i.bold(
        r
      )}\`: Invalid value provided. Expected ${o}, provided ${i.red(
        e.inferredType
      )}.`;
    });
}
function $f(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  n instanceof V && n.getDeepFieldValue(e.argumentPath)?.markAsError(),
    t.addErrorMessage(i => {
      let o = gn(
          'or',
          e.argument.typeNames.map(a => i.green(a))
        ),
        s = [`Invalid value for argument \`${i.bold(r)}\``];
      return (
        e.underlyingError && s.push(`: ${e.underlyingError}`),
        s.push(`. Expected ${o}.`),
        s.join('')
      );
    });
}
function Df(e, t) {
  let r = e.argument.name,
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
    i;
  if (n instanceof V) {
    let s = n.getDeepField(e.argumentPath)?.value;
    s?.markAsError(), s instanceof ee && (i = s.text);
  }
  t.addErrorMessage(o => {
    let s = ['Unable to fit value'];
    return (
      i && s.push(o.red(i)),
      s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``),
      s.join(' ')
    );
  });
}
function kf(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath);
  if (n instanceof V) {
    let i = n.getDeepFieldValue(e.argumentPath);
    i instanceof V && Ha(i, e.inputType);
  }
  t.addErrorMessage(i => {
    let o = [
      `Argument \`${i.bold(r)}\` of type ${i.bold(e.inputType.name)} needs`,
    ];
    return (
      e.constraints.minFieldCount === 1
        ? e.constraints.requiredFields
          ? o.push(
              `${i.green('at least one of')} ${gn(
                'or',
                e.constraints.requiredFields.map(s => `\`${i.bold(s)}\``)
              )} arguments.`
            )
          : o.push(`${i.green('at least one')} argument.`)
        : o.push(
            `${i.green(`at least ${e.constraints.minFieldCount}`)} arguments.`
          ),
      o.push(or(i)),
      o.join(' ')
    );
  });
}
function If(e, t) {
  let r = e.argumentPath[e.argumentPath.length - 1],
    n = t.arguments.getDeepSubSelectionValue(e.selectionPath),
    i = [];
  if (n instanceof V) {
    let o = n.getDeepFieldValue(e.argumentPath);
    o instanceof V && (o.markAsError(), (i = Object.keys(o.getFields())));
  }
  t.addErrorMessage(o => {
    let s = [
      `Argument \`${o.bold(r)}\` of type ${o.bold(e.inputType.name)} needs`,
    ];
    return (
      e.constraints.minFieldCount === 1 && e.constraints.maxFieldCount == 1
        ? s.push(`${o.green('exactly one')} argument,`)
        : e.constraints.maxFieldCount == 1
        ? s.push(`${o.green('at most one')} argument,`)
        : s.push(
            `${o.green(`at most ${e.constraints.maxFieldCount}`)} arguments,`
          ),
      s.push(
        `but you provided ${gn(
          'and',
          i.map(a => o.red(a))
        )}. Please choose`
      ),
      e.constraints.maxFieldCount === 1
        ? s.push('one.')
        : s.push(`${e.constraints.maxFieldCount}.`),
      s.join(' ')
    );
  });
}
function Lf(e, t) {
  let r = Ka(e);
  r ? Bi(r, t) : t.addErrorMessage(() => 'Unknown error');
}
function Ka(e) {
  return Nf(e) ?? _f(e);
}
function Nf({ errors: e }) {
  if (e.length === 0 || e[0].kind !== 'InvalidArgumentType') return;
  let t = { ...e[0], argument: { ...e[0].argument } };
  for (let r = 1; r < e.length; r++) {
    let n = e[r];
    if (
      n.kind !== 'InvalidArgumentType' ||
      !Ua(n.selectionPath, t.selectionPath) ||
      !Ua(n.argumentPath, t.argumentPath)
    )
      return;
    t.argument.typeNames = t.argument.typeNames.concat(n.argument.typeNames);
  }
  return t;
}
function Ua(e, t) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
  return !0;
}
function _f(e) {
  return ii(e.errors, t => {
    t.kind === 'Union' && (t = Ka(t) ?? t);
    let r = 0;
    return (
      Array.isArray(t.selectionPath) && (r += t.selectionPath.length),
      Array.isArray(t.argumentPath) && (r += t.argumentPath.length),
      r
    );
  });
}
function Wa(e, t) {
  for (let r of t.fields)
    e.hasField(r.name) || e.addSuggestion(new _e(r.name, 'true'));
}
function jf(e, t) {
  for (let r of t)
    e.hasField(r.name) ||
      e.addSuggestion(new _e(r.name, r.typeNames.join(' | ')));
}
function Ha(e, t) {
  if (t.kind === 'object')
    for (let r of t.fields)
      e.hasField(r.name) ||
        e.addSuggestion(new _e(r.name, r.typeNames.join(' | ')));
}
function mn(e) {
  let t = [...e],
    r = t.pop();
  if (!r) throw new Error('unexpected empty path');
  return [t, r];
}
function or({ green: e }) {
  return `Available options are listed in ${e('green')}.`;
}
function gn(e, t) {
  if (t.length === 1) return t[0];
  let r = [...t],
    n = r.pop();
  return `${r.join(', ')} ${e} ${n}`;
}
var qf = 3;
function Bf(e, t) {
  let r = 1 / 0,
    n;
  for (let i of t) {
    let o = (0, Qa.default)(e, i);
    o > qf || (o < r && ((r = o), (n = i)));
  }
  return n;
}
var hn = class extends Xe {
  constructor() {
    super(...arguments);
    this.items = [];
  }
  addItem(r) {
    return this.items.push(r), this;
  }
  getPrintWidth() {
    return Math.max(...this.items.map(n => n.getPrintWidth())) + 2;
  }
  write(r) {
    if (this.items.length === 0) {
      this.writeEmpty(r);
      return;
    }
    this.writeWithItems(r);
  }
  writeEmpty(r) {
    let n = new ke('[]');
    this.hasError && n.setColor(r.context.colors.red).underline(), r.write(n);
  }
  writeWithItems(r) {
    let { colors: n } = r.context;
    r
      .writeLine('[')
      .withIndent(() => r.writeJoined(Ct, this.items).newLine())
      .write(']'),
      this.hasError &&
        r.afterNextNewline(() => {
          r.writeLine(n.red('~'.repeat(this.getPrintWidth())));
        });
  }
};
var za = ': ',
  yn = class {
    constructor(t, r) {
      this.name = t;
      this.value = r;
      this.hasError = !1;
    }
    markAsError() {
      this.hasError = !0;
    }
    getPrintWidth() {
      return this.name.length + this.value.getPrintWidth() + za.length;
    }
    write(t) {
      let r = new ke(this.name);
      this.hasError && r.underline().setColor(t.context.colors.red),
        t.write(r).write(za).write(this.value);
    }
  };
var Vi = class {
  constructor(t) {
    this.errorMessages = [];
    this.arguments = t;
  }
  write(t) {
    t.write(this.arguments);
  }
  addErrorMessage(t) {
    this.errorMessages.push(t);
  }
  renderAllMessages(t) {
    return this.errorMessages.map(r => r(t)).join(`
`);
  }
};
function Ya(e) {
  return new Vi(Za(e));
}
function Za(e) {
  let t = new V();
  for (let [r, n] of Object.entries(e)) {
    let i = new yn(r, Xa(n));
    t.addField(i);
  }
  return t;
}
function Xa(e) {
  if (typeof e == 'string') return new ee(JSON.stringify(e));
  if (typeof e == 'number' || typeof e == 'boolean') return new ee(String(e));
  if (typeof e == 'bigint') return new ee(`${e}n`);
  if (e === null) return new ee('null');
  if (e === void 0) return new ee('undefined');
  if (Ge(e)) return new ee(`new Prisma.Decimal("${e.toFixed()}")`);
  if (e instanceof Uint8Array)
    return Buffer.isBuffer(e)
      ? new ee(`Buffer.alloc(${e.byteLength})`)
      : new ee(`new Uint8Array(${e.byteLength})`);
  if (e instanceof Date) return new ee(`new Date("${e.toISOString()}")`);
  if (e instanceof se) return new ee(`Prisma.${e._getName()}`);
  if (jr(e)) return new ee(`prisma.${vt(e.modelName)}.$fields.${e.name}`);
  if (Array.isArray(e)) return Vf(e);
  if (typeof e == 'object') return Za(e);
  Ie(e, 'Unknown value type');
}
function Vf(e) {
  let t = new hn();
  for (let r of e) t.addItem(Xa(r));
  return t;
}
function bn({
  args: e,
  errors: t,
  errorFormat: r,
  callsite: n,
  originalMethod: i,
}) {
  let o = Ya(e);
  for (let c of t) Bi(c, o);
  let s = r === 'pretty' ? Va : Ba,
    a = o.renderAllMessages(s),
    l = new pn(0, { colors: s }).write(o).toString(),
    u = Re({
      message: a,
      callsite: n,
      originalMethod: i,
      showColors: r === 'pretty',
      callArguments: l,
    });
  throw new W(u);
}
var Uf = {
  findUnique: 'findUnique',
  findUniqueOrThrow: 'findUniqueOrThrow',
  findFirst: 'findFirst',
  findFirstOrThrow: 'findFirstOrThrow',
  findMany: 'findMany',
  count: 'aggregate',
  create: 'createOne',
  createMany: 'createMany',
  update: 'updateOne',
  updateMany: 'updateMany',
  upsert: 'upsertOne',
  delete: 'deleteOne',
  deleteMany: 'deleteMany',
  executeRaw: 'executeRaw',
  queryRaw: 'queryRaw',
  aggregate: 'aggregate',
  groupBy: 'groupBy',
  runCommandRaw: 'runCommandRaw',
  findRaw: 'findRaw',
  aggregateRaw: 'aggregateRaw',
};
function el({
  modelName: e,
  action: t,
  args: r,
  runtimeDataModel: n,
  extensions: i,
  callsite: o,
  clientMethod: s,
  errorFormat: a,
}) {
  let l = new sr({
    runtimeDataModel: n,
    modelName: e,
    action: t,
    rootArgs: r,
    callsite: o,
    extensions: i,
    path: [],
    originalMethod: s,
    errorFormat: a,
  });
  return { modelName: e, action: Uf[t], query: Ui(r, l) };
}
function Ui({ select: e, include: t, ...r } = {}, n) {
  return { arguments: rl(r), selection: Qf(e, t, n) };
}
function Qf(e, t, r) {
  return (
    e &&
      t &&
      r.throwValidationError({
        kind: 'IncludeAndSelect',
        selectionPath: r.getSelectionPath(),
      }),
    e ? Kf(e, r) : Jf(r, t)
  );
}
function Jf(e, t) {
  let r = {};
  return (
    e.model && !e.isRawAction() && ((r.$composites = !0), (r.$scalars = !0)),
    t && Gf(r, t, e),
    r
  );
}
function Gf(e, t, r) {
  for (let [n, i] of Object.entries(t)) {
    let o = r.findField(n);
    o &&
      o?.kind !== 'object' &&
      r.throwValidationError({
        kind: 'IncludeOnScalar',
        selectionPath: r.getSelectionPath().concat(n),
        outputType: r.getOutputTypeDescription(),
      }),
      i === !0
        ? (e[n] = !0)
        : typeof i == 'object' && (e[n] = Ui(i, r.atField(n)));
  }
}
function Kf(e, t) {
  let r = {},
    n = t.getComputedFields(),
    i = Wr(e, n);
  for (let [o, s] of Object.entries(i)) {
    let a = t.findField(o);
    (n?.[o] && !a) ||
      (s === !0
        ? (r[o] = !0)
        : typeof s == 'object' && (r[o] = Ui(s, t.atField(o))));
  }
  return r;
}
function tl(e) {
  if (e === null) return null;
  if (typeof e == 'string' || typeof e == 'number' || typeof e == 'boolean')
    return e;
  if (typeof e == 'bigint') return { $type: 'BigInt', value: String(e) };
  if (Hf(e)) return { $type: 'DateTime', value: e.toISOString() };
  if (jr(e)) return { $type: 'FieldRef', value: { _ref: e.name } };
  if (Array.isArray(e)) return Wf(e);
  if (ArrayBuffer.isView(e))
    return { $type: 'Bytes', value: Buffer.from(e).toString('base64') };
  if (zf(e)) return e.values;
  if (Ge(e)) return { $type: 'Decimal', value: e.toFixed() };
  if (e instanceof se) {
    if (e !== bt.instances[e._getName()])
      throw new Error('Invalid ObjectEnumValue');
    return { $type: 'Enum', value: e._getName() };
  }
  if (typeof e == 'object') return rl(e);
  Ie(e, 'Unknown value type');
}
function rl(e) {
  if (e.$type) return { $type: 'Json', value: JSON.stringify(e) };
  let t = {};
  for (let r in e) {
    let n = e[r];
    n !== void 0 && (t[r] = tl(n));
  }
  return t;
}
function Wf(e) {
  let t = [];
  for (let r of e) r !== void 0 && t.push(tl(r));
  return t;
}
function Hf(e) {
  return Object.prototype.toString.call(e) === '[object Date]';
}
function zf(e) {
  return typeof e == 'object' && e !== null && e.__prismaRawParameters__ === !0;
}
var sr = class {
  constructor(t) {
    this.params = t;
    this.params.modelName &&
      (this.model = this.params.runtimeDataModel.models[this.params.modelName]);
  }
  throwValidationError(t) {
    bn({
      errors: [t],
      originalMethod: this.params.originalMethod,
      args: this.params.rootArgs ?? {},
      callsite: this.params.callsite,
      errorFormat: this.params.errorFormat,
    });
  }
  getSelectionPath() {
    return this.params.path;
  }
  getOutputTypeDescription() {
    if (!(!this.params.modelName || !this.model))
      return {
        name: this.params.modelName,
        fields: this.model.fields.map(t => ({
          name: t.name,
          typeName: 'boolean',
          isRelation: t.kind === 'object',
        })),
      };
  }
  isRawAction() {
    return [
      'executeRaw',
      'queryRaw',
      'runCommandRaw',
      'findRaw',
      'aggregateRaw',
    ].includes(this.params.action);
  }
  getComputedFields() {
    if (!!this.params.modelName)
      return this.params.extensions.getAllComputedFields(this.params.modelName);
  }
  findField(t) {
    return this.model?.fields.find(r => r.name === t);
  }
  atField(t) {
    let r = this.findField(t),
      n = r?.kind === 'object' ? r.type : void 0;
    return new sr({
      ...this.params,
      modelName: n,
      path: this.params.path.concat(t),
    });
  }
};
var ar = class {
    constructor(t, r) {
      this.runtimeDataModel = t;
      this.errorFormat = r;
    }
    createMessage(t) {
      let r = el({
        ...t,
        runtimeDataModel: this.runtimeDataModel,
        errorFormat: this.errorFormat,
      });
      return new wn(r);
    }
    createBatch(t) {
      return t.map(r => r.toEngineQuery());
    }
  },
  Yf = {
    aggregate: !1,
    aggregateRaw: !1,
    createMany: !0,
    createOne: !0,
    deleteMany: !0,
    deleteOne: !0,
    executeRaw: !0,
    findFirst: !1,
    findFirstOrThrow: !1,
    findMany: !1,
    findRaw: !1,
    findUnique: !1,
    findUniqueOrThrow: !1,
    groupBy: !1,
    queryRaw: !1,
    runCommandRaw: !0,
    updateMany: !0,
    updateOne: !0,
    upsertOne: !0,
  },
  wn = class {
    constructor(t) {
      this.query = t;
    }
    isWrite() {
      return Yf[this.query.action];
    }
    getBatchId() {
      if (this.query.action !== 'findUnique') return;
      let t = [];
      return (
        this.query.modelName && t.push(this.query.modelName),
        this.query.query.arguments && t.push(Qi(this.query.query.arguments)),
        t.push(Qi(this.query.query.selection)),
        t.join('')
      );
    }
    toDebugString() {
      return JSON.stringify(this.query, null, 2);
    }
    toEngineQuery() {
      return this.query;
    }
    deserializeResponse(t, r) {
      if (!t) return t;
      let n = Object.values(t)[0],
        i = r.filter(o => o !== 'select' && o !== 'include');
      return cn(er(n, i));
    }
  };
function Qi(e) {
  return `(${Object.keys(e)
    .sort()
    .map(r => {
      let n = e[r];
      return typeof n == 'object' && n !== null ? `(${r} ${Qi(n)})` : r;
    })
    .join(' ')})`;
}
var he = class {
  constructor(t, r) {
    if (t.length - 1 !== r.length)
      throw t.length === 0
        ? new TypeError('Expected at least 1 string')
        : new TypeError(
            `Expected ${t.length} strings to have ${t.length - 1} values`
          );
    let n = r.reduce((s, a) => s + (a instanceof he ? a.values.length : 1), 0);
    (this.values = new Array(n)),
      (this.strings = new Array(n + 1)),
      (this.strings[0] = t[0]);
    let i = 0,
      o = 0;
    for (; i < r.length; ) {
      let s = r[i++],
        a = t[i];
      if (s instanceof he) {
        this.strings[o] += s.strings[0];
        let l = 0;
        for (; l < s.values.length; )
          (this.values[o++] = s.values[l++]), (this.strings[o] = s.strings[l]);
        this.strings[o] += a;
      } else (this.values[o++] = s), (this.strings[o] = a);
    }
  }
  get text() {
    let t = 1,
      r = this.strings[0];
    for (; t < this.strings.length; ) r += `$${t}${this.strings[t++]}`;
    return r;
  }
  get sql() {
    let t = 1,
      r = this.strings[0];
    for (; t < this.strings.length; ) r += `?${this.strings[t++]}`;
    return r;
  }
  inspect() {
    return { text: this.text, sql: this.sql, values: this.values };
  }
};
function nl(e, t = ',', r = '', n = '') {
  if (e.length === 0)
    throw new TypeError(
      'Expected `join([])` to be called with an array of multiple elements, but got an empty array'
    );
  return new he([r, ...Array(e.length - 1).fill(t), n], e);
}
function Ji(e) {
  return new he([e], []);
}
var il = Ji('');
function Gi(e, ...t) {
  return new he(e, t);
}
var Ki = e => e.reduce((t, r, n) => `${t}@P${n}${r}`);
function St(e) {
  try {
    return ol(e, 'fast');
  } catch {
    return ol(e, 'slow');
  }
}
function ol(e, t) {
  return JSON.stringify(e.map(r => Zf(r, t)));
}
function Zf(e, t) {
  return typeof e == 'bigint'
    ? { prisma__type: 'bigint', prisma__value: e.toString() }
    : Xf(e)
    ? { prisma__type: 'date', prisma__value: e.toJSON() }
    : ge.isDecimal(e)
    ? { prisma__type: 'decimal', prisma__value: e.toJSON() }
    : Buffer.isBuffer(e)
    ? { prisma__type: 'bytes', prisma__value: e.toString('base64') }
    : ed(e) || ArrayBuffer.isView(e)
    ? {
        prisma__type: 'bytes',
        prisma__value: Buffer.from(e).toString('base64'),
      }
    : typeof e == 'object' && t === 'slow'
    ? al(e)
    : e;
}
function Xf(e) {
  return e instanceof Date
    ? !0
    : Object.prototype.toString.call(e) === '[object Date]' &&
        typeof e.toJSON == 'function';
}
function ed(e) {
  return e instanceof ArrayBuffer || e instanceof SharedArrayBuffer
    ? !0
    : typeof e == 'object' && e !== null
    ? e[Symbol.toStringTag] === 'ArrayBuffer' ||
      e[Symbol.toStringTag] === 'SharedArrayBuffer'
    : !1;
}
function al(e) {
  if (typeof e != 'object' || e === null) return e;
  if (typeof e.toJSON == 'function') return e.toJSON();
  if (Array.isArray(e)) return e.map(sl);
  let t = {};
  for (let r of Object.keys(e)) t[r] = sl(e[r]);
  return t;
}
function sl(e) {
  return typeof e == 'bigint' ? e.toString() : al(e);
}
var td = /^(\s*alter\s)/i,
  ll = J('prisma:client');
function Wi(e, t, r) {
  if (t.length > 0 && td.exec(e))
    throw new Error(`Running ALTER using ${r} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
}
function rd(e) {
  return Array.isArray(e);
}
var Hi =
  (e, t) =>
  ([r, ...n]) => {
    let i = '',
      o;
    if (typeof r == 'string')
      (i = r),
        (o = { values: St(n || []), __prismaRawParameters__: !0 }),
        t.includes('executeRaw') &&
          Wi(i, n, 'prisma.$executeRawUnsafe(<SQL>, [...values])');
    else if (rd(r))
      switch (e._activeProvider) {
        case 'sqlite':
        case 'mysql': {
          let s = new he(r, n);
          (i = s.sql),
            (o = { values: St(s.values), __prismaRawParameters__: !0 });
          break;
        }
        case 'cockroachdb':
        case 'postgresql': {
          let s = new he(r, n);
          (i = s.text),
            t.includes('executeRaw') &&
              Wi(i, s.values, 'prisma.$executeRaw`<SQL>`'),
            (o = { values: St(s.values), __prismaRawParameters__: !0 });
          break;
        }
        case 'sqlserver': {
          (i = Ki(r)), (o = { values: St(n), __prismaRawParameters__: !0 });
          break;
        }
        default:
          throw new Error(
            `The ${e._activeProvider} provider does not support ${t}`
          );
      }
    else {
      switch (e._activeProvider) {
        case 'sqlite':
        case 'mysql':
          i = r.sql;
          break;
        case 'cockroachdb':
        case 'postgresql':
          (i = r.text),
            t.includes('executeRaw') &&
              Wi(i, r.values, 'prisma.$executeRaw(sql`<SQL>`)');
          break;
        case 'sqlserver':
          i = Ki(r.strings);
          break;
        default:
          throw new Error(
            `The ${e._activeProvider} provider does not support ${t}`
          );
      }
      o = { values: St(r.values), __prismaRawParameters__: !0 };
    }
    return (
      o?.values
        ? ll(`prisma.${t}(${i}, ${o.values})`)
        : ll(`prisma.${t}(${i})`),
      { query: i, parameters: o }
    );
  };
var ul = {
    isEnabled() {
      return !1;
    },
    getTraceParent() {
      return '00-10-10-00';
    },
    async createEngineSpan() {},
    getActiveContext() {},
    runInChildSpan(e, t) {
      return t();
    },
  },
  zi = class {
    isEnabled() {
      return this.getGlobalTracingHelper().isEnabled();
    }
    getTraceParent(t) {
      return this.getGlobalTracingHelper().getTraceParent(t);
    }
    createEngineSpan(t) {
      return this.getGlobalTracingHelper().createEngineSpan(t);
    }
    getActiveContext() {
      return this.getGlobalTracingHelper().getActiveContext();
    }
    runInChildSpan(t, r) {
      return this.getGlobalTracingHelper().runInChildSpan(t, r);
    }
    getGlobalTracingHelper() {
      return globalThis.PRISMA_INSTRUMENTATION?.helper ?? ul;
    }
  };
function cl(e) {
  return e.includes('tracing') ? new zi() : ul;
}
function pl(e, t = () => {}) {
  let r,
    n = new Promise(i => (r = i));
  return {
    then(i) {
      return --e === 0 && r(t()), i?.(n);
    },
  };
}
function fl(e) {
  return typeof e == 'string'
    ? e
    : e.reduce((t, r) => {
        let n = typeof r == 'string' ? r : r.level;
        return n === 'query'
          ? t
          : t && (r === 'info' || t === 'info')
          ? 'info'
          : n;
      }, void 0);
}
function ml(e, t, r) {
  let n = dl(e, r),
    i = dl(t, r),
    o = Object.values(i).map(a => a[a.length - 1]),
    s = Object.keys(i);
  return (
    Object.entries(n).forEach(([a, l]) => {
      s.includes(a) || o.push(l[l.length - 1]);
    }),
    o
  );
}
var dl = (e, t) =>
  e.reduce((r, n) => {
    let i = t(n);
    return r[i] || (r[i] = []), r[i].push(n), r;
  }, {});
var xn = class {
  constructor() {
    this._middlewares = [];
  }
  use(t) {
    this._middlewares.push(t);
  }
  get(t) {
    return this._middlewares[t];
  }
  has(t) {
    return !!this._middlewares[t];
  }
  length() {
    return this._middlewares.length;
  }
};
var yl = R(Vt());
function En(e) {
  return typeof e.batchRequestIdx == 'number';
}
function gl({ result: e, modelName: t, select: r, extensions: n }) {
  let i = n.getAllComputedFields(t);
  if (!i) return e;
  let o = [],
    s = [];
  for (let a of Object.values(i)) {
    if (r) {
      if (!r[a.name]) continue;
      let l = a.needs.filter(u => !r[u]);
      l.length > 0 && s.push(Di(l));
    }
    nd(e, a.needs) && o.push(id(a, ze(e, o)));
  }
  return o.length > 0 || s.length > 0 ? ze(e, [...o, ...s]) : e;
}
function nd(e, t) {
  return t.every(r => ri(e, r));
}
function id(e, t) {
  return it(He(e.name, () => e.compute(t)));
}
function Tn({
  visitor: e,
  result: t,
  args: r,
  runtimeDataModel: n,
  modelName: i,
}) {
  if (Array.isArray(t)) {
    for (let s = 0; s < t.length; s++)
      t[s] = Tn({
        result: t[s],
        args: r,
        modelName: i,
        runtimeDataModel: n,
        visitor: e,
      });
    return t;
  }
  let o = e(t, i, r) ?? t;
  return (
    r.include &&
      hl({
        includeOrSelect: r.include,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    r.select &&
      hl({
        includeOrSelect: r.select,
        result: o,
        parentModelName: i,
        runtimeDataModel: n,
        visitor: e,
      }),
    o
  );
}
function hl({
  includeOrSelect: e,
  result: t,
  parentModelName: r,
  runtimeDataModel: n,
  visitor: i,
}) {
  for (let [o, s] of Object.entries(e)) {
    if (!s || t[o] == null) continue;
    let l = n.models[r].fields.find(c => c.name === o);
    if (!l || l.kind !== 'object' || !l.relationName) continue;
    let u = typeof s == 'object' ? s : {};
    t[o] = Tn({
      visitor: i,
      result: t[o],
      args: u,
      modelName: l.type,
      runtimeDataModel: n,
    });
  }
}
var vn = class {
  constructor(t) {
    this.options = t;
    this.tickActive = !1;
    this.batches = {};
  }
  request(t) {
    let r = this.options.batchBy(t);
    return r
      ? (this.batches[r] ||
          ((this.batches[r] = []),
          this.tickActive ||
            ((this.tickActive = !0),
            process.nextTick(() => {
              this.dispatchBatches(), (this.tickActive = !1);
            }))),
        new Promise((n, i) => {
          this.batches[r].push({ request: t, resolve: n, reject: i });
        }))
      : this.options.singleLoader(t);
  }
  dispatchBatches() {
    for (let t in this.batches) {
      let r = this.batches[t];
      delete this.batches[t],
        r.length === 1
          ? this.options
              .singleLoader(r[0].request)
              .then(n => {
                n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
              })
              .catch(n => {
                r[0].reject(n);
              })
          : this.options
              .batchLoader(r.map(n => n.request))
              .then(n => {
                if (n instanceof Error)
                  for (let i = 0; i < r.length; i++) r[i].reject(n);
                else
                  for (let i = 0; i < r.length; i++) {
                    let o = n[i];
                    o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
                  }
              })
              .catch(n => {
                for (let i = 0; i < r.length; i++) r[i].reject(n);
              });
    }
  }
  get [Symbol.toStringTag]() {
    return 'DataLoader';
  }
};
var od = J('prisma:client:request_handler'),
  Pn = class {
    constructor(t, r) {
      (this.logEmitter = r),
        (this.client = t),
        (this.dataloader = new vn({
          batchLoader: n => {
            let { transaction: i, protocolEncoder: o, otelParentCtx: s } = n[0],
              a = o.createBatch(n.map(c => c.protocolMessage)),
              l = this.client._tracingHelper.getTraceParent(s),
              u = n.some(c => c.protocolMessage.isWrite());
            return this.client._engine.requestBatch(a, {
              traceparent: l,
              transaction: sd(i),
              containsWrite: u,
              customDataProxyFetch: n[0].customDataProxyFetch,
            });
          },
          singleLoader: n => {
            let i = n.transaction?.kind === 'itx' ? bl(n.transaction) : void 0;
            return this.client._engine.request(
              n.protocolMessage.toEngineQuery(),
              {
                traceparent: this.client._tracingHelper.getTraceParent(),
                interactiveTransaction: i,
                isWrite: n.protocolMessage.isWrite(),
                customDataProxyFetch: n.customDataProxyFetch,
              }
            );
          },
          batchBy: n =>
            n.transaction?.id
              ? `transaction-${n.transaction.id}`
              : n.protocolMessage.getBatchId(),
        }));
    }
    async request({
      protocolMessage: t,
      protocolEncoder: r,
      dataPath: n = [],
      callsite: i,
      modelName: o,
      rejectOnNotFound: s,
      clientMethod: a,
      args: l,
      transaction: u,
      unpacker: c,
      extensions: p,
      otelParentCtx: f,
      otelChildCtx: d,
      customDataProxyFetch: m,
    }) {
      try {
        let g = await this.dataloader.request({
            protocolMessage: t,
            protocolEncoder: r,
            transaction: u,
            otelParentCtx: f,
            otelChildCtx: d,
            customDataProxyFetch: m,
          }),
          b = g?.data,
          h = g?.elapsed,
          x = this.unpack(t, b, n, c);
        return (
          Ra(x, a, o, s),
          o &&
            (x = this.applyResultExtensions({
              result: x,
              modelName: o,
              args: l,
              extensions: p,
            })),
          process.env.PRISMA_CLIENT_GET_TIME ? { data: x, elapsed: h } : x
        );
      } catch (g) {
        this.handleAndLogRequestError({
          error: g,
          clientMethod: a,
          callsite: i,
          transaction: u,
          args: l,
        });
      }
    }
    handleAndLogRequestError(t) {
      try {
        this.handleRequestError(t);
      } catch (r) {
        throw (
          (this.logEmitter &&
            this.logEmitter.emit('error', {
              message: r.message,
              target: t.clientMethod,
              timestamp: new Date(),
            }),
          r)
        );
      }
    }
    handleRequestError({
      error: t,
      clientMethod: r,
      callsite: n,
      transaction: i,
      args: o,
    }) {
      if ((od(t), ad(t, i) || t instanceof Ee)) throw t;
      if (t instanceof ne && ld(t)) {
        let a = wl(t.meta);
        bn({
          args: o,
          errors: [a],
          callsite: n,
          errorFormat: this.client._errorFormat,
          originalMethod: r,
        });
      }
      let s = t.message;
      throw (
        (n &&
          (s = Re({
            callsite: n,
            originalMethod: r,
            isPanic: t.isPanic,
            showColors: this.client._errorFormat === 'pretty',
            message: s,
          })),
        (s = this.sanitizeMessage(s)),
        t.code
          ? new ne(s, {
              code: t.code,
              clientVersion: this.client._clientVersion,
              meta: t.meta,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t.isPanic
          ? new me(s, this.client._clientVersion)
          : t instanceof ie
          ? new ie(s, {
              clientVersion: this.client._clientVersion,
              batchRequestIdx: t.batchRequestIdx,
            })
          : t instanceof G
          ? new G(s, this.client._clientVersion)
          : t instanceof me
          ? new me(s, this.client._clientVersion)
          : ((t.clientVersion = this.client._clientVersion), t))
      );
    }
    sanitizeMessage(t) {
      return this.client._errorFormat && this.client._errorFormat !== 'pretty'
        ? (0, yl.default)(t)
        : t;
    }
    unpack(t, r, n, i) {
      if (!r) return r;
      r.data && (r = r.data);
      let o = t.deserializeResponse(r, n);
      return i ? i(o) : o;
    }
    applyResultExtensions({ result: t, modelName: r, args: n, extensions: i }) {
      return i.isEmpty() ||
        t == null ||
        !this.client._runtimeDataModel.models[r]
        ? t
        : Tn({
            result: t,
            args: n ?? {},
            modelName: r,
            runtimeDataModel: this.client._runtimeDataModel,
            visitor(s, a, l) {
              let u = xe(a);
              return gl({
                result: s,
                modelName: u,
                select: l.select,
                extensions: i,
              });
            },
          });
    }
    get [Symbol.toStringTag]() {
      return 'RequestHandler';
    }
  };
function sd(e) {
  if (!!e) {
    if (e.kind === 'batch')
      return { kind: 'batch', options: { isolationLevel: e.isolationLevel } };
    if (e.kind === 'itx') return { kind: 'itx', options: bl(e) };
    Ie(e, 'Unknown transaction kind');
  }
}
function bl(e) {
  return { id: e.id, payload: e.payload };
}
function ad(e, t) {
  return En(e) && t?.kind === 'batch' && e.batchRequestIdx !== t.index;
}
function ld(e) {
  return e.code === 'P2009' || e.code === 'P2012';
}
function wl(e) {
  if (e.kind === 'Union') return { kind: 'Union', errors: e.errors.map(wl) };
  if (Array.isArray(e.selectionPath)) {
    let [, ...t] = e.selectionPath;
    return { ...e, selectionPath: t };
  }
  return e;
}
function xl(e) {
  return e.map(t => {
    let r = {};
    for (let n of Object.keys(t)) r[n] = El(t[n]);
    return r;
  });
}
function El({ prisma__type: e, prisma__value: t }) {
  switch (e) {
    case 'bigint':
      return BigInt(t);
    case 'bytes':
      return Buffer.from(t, 'base64');
    case 'decimal':
      return new ge(t);
    case 'datetime':
    case 'date':
      return new Date(t);
    case 'time':
      return new Date(`1970-01-01T${t}Z`);
    case 'array':
      return t.map(El);
    default:
      return t;
  }
}
var Ml = R(_r());
var Tl = [
    'datasources',
    'errorFormat',
    'log',
    '__internal',
    'rejectOnNotFound',
  ],
  vl = ['pretty', 'colorless', 'minimal'],
  Pl = ['info', 'query', 'warn', 'error'],
  ud = {
    datasources: (e, t) => {
      if (!!e) {
        if (typeof e != 'object' || Array.isArray(e))
          throw new z(
            `Invalid value ${JSON.stringify(
              e
            )} for "datasources" provided to PrismaClient constructor`
          );
        for (let [r, n] of Object.entries(e)) {
          if (!t.includes(r)) {
            let i = At(r, t) || `Available datasources: ${t.join(', ')}`;
            throw new z(
              `Unknown datasource ${r} provided to PrismaClient constructor.${i}`
            );
          }
          if (typeof n != 'object' || Array.isArray(n))
            throw new z(`Invalid value ${JSON.stringify(
              e
            )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == 'object')
            for (let [i, o] of Object.entries(n)) {
              if (i !== 'url')
                throw new z(`Invalid value ${JSON.stringify(
                  e
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if (typeof o != 'string')
                throw new z(`Invalid value ${JSON.stringify(
                  o
                )} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
        }
      }
    },
    errorFormat: e => {
      if (!!e) {
        if (typeof e != 'string')
          throw new z(
            `Invalid value ${JSON.stringify(
              e
            )} for "errorFormat" provided to PrismaClient constructor.`
          );
        if (!vl.includes(e)) {
          let t = At(e, vl);
          throw new z(
            `Invalid errorFormat ${e} provided to PrismaClient constructor.${t}`
          );
        }
      }
    },
    log: e => {
      if (!e) return;
      if (!Array.isArray(e))
        throw new z(
          `Invalid value ${JSON.stringify(
            e
          )} for "log" provided to PrismaClient constructor.`
        );
      function t(r) {
        if (typeof r == 'string' && !Pl.includes(r)) {
          let n = At(r, Pl);
          throw new z(
            `Invalid log level "${r}" provided to PrismaClient constructor.${n}`
          );
        }
      }
      for (let r of e) {
        t(r);
        let n = {
          level: t,
          emit: i => {
            let o = ['stdout', 'event'];
            if (!o.includes(i)) {
              let s = At(i, o);
              throw new z(
                `Invalid value ${JSON.stringify(
                  i
                )} for "emit" in logLevel provided to PrismaClient constructor.${s}`
              );
            }
          },
        };
        if (r && typeof r == 'object')
          for (let [i, o] of Object.entries(r))
            if (n[i]) n[i](o);
            else
              throw new z(
                `Invalid property ${i} for "log" provided to PrismaClient constructor`
              );
      }
    },
    __internal: e => {
      if (!e) return;
      let t = ['debug', 'hooks', 'engine', 'measurePerformance'];
      if (typeof e != 'object')
        throw new z(
          `Invalid value ${JSON.stringify(
            e
          )} for "__internal" to PrismaClient constructor`
        );
      for (let [r] of Object.entries(e))
        if (!t.includes(r)) {
          let n = At(r, t);
          throw new z(
            `Invalid property ${JSON.stringify(
              r
            )} for "__internal" provided to PrismaClient constructor.${n}`
          );
        }
    },
    rejectOnNotFound: e => {
      if (!!e) {
        if (
          Dt(e) ||
          typeof e == 'boolean' ||
          typeof e == 'object' ||
          typeof e == 'function'
        )
          return e;
        throw new z(
          `Invalid rejectOnNotFound expected a boolean/Error/{[modelName: Error | boolean]} but received ${JSON.stringify(
            e
          )}`
        );
      }
    },
  };
function Fl(e, t) {
  for (let [r, n] of Object.entries(e)) {
    if (!Tl.includes(r)) {
      let i = At(r, Tl);
      throw new z(
        `Unknown property ${r} provided to PrismaClient constructor.${i}`
      );
    }
    ud[r](n, t);
  }
}
function At(e, t) {
  if (t.length === 0 || typeof e != 'string') return '';
  let r = cd(e, t);
  return r ? ` Did you mean "${r}"?` : '';
}
function cd(e, t) {
  if (t.length === 0) return null;
  let r = t.map(i => ({ value: i, distance: (0, Ml.default)(e, i) }));
  r.sort((i, o) => (i.distance < o.distance ? -1 : 1));
  let n = r[0];
  return n.distance < 3 ? n.value : null;
}
function Cl(e) {
  return e.length === 0
    ? Promise.resolve([])
    : new Promise((t, r) => {
        let n = new Array(e.length),
          i = null,
          o = !1,
          s = 0,
          a = () => {
            o || (s++, s === e.length && ((o = !0), i ? r(i) : t(n)));
          },
          l = u => {
            o || ((o = !0), r(u));
          };
        for (let u = 0; u < e.length; u++)
          e[u].then(
            c => {
              (n[u] = c), a();
            },
            c => {
              if (!En(c)) {
                l(c);
                return;
              }
              c.batchRequestIdx === u ? l(c) : (i || (i = c), a());
            }
          );
      });
}
var Ce = J('prisma:client');
typeof globalThis == 'object' && (globalThis.NODE_CLIENT = !0);
var pd = Symbol.for('prisma.client.transaction.id'),
  fd = {
    id: 0,
    nextId() {
      return ++this.id;
    },
  };
function $l(e) {
  class t {
    constructor(n) {
      this._middlewares = new xn();
      this._getDmmf = Sr(async n => {
        try {
          let i = await this._tracingHelper.runInChildSpan(
            { name: 'getDmmf', internal: !0 },
            () => this._engine.getDmmf()
          );
          return this._tracingHelper.runInChildSpan(
            { name: 'processDmmf', internal: !0 },
            () => new Ke($s(i))
          );
        } catch (i) {
          this._fetcher.handleAndLogRequestError({ ...n, args: {}, error: i });
        }
      });
      this._getProtocolEncoder = Sr(async n =>
        this._engineConfig.engineProtocol === 'json'
          ? new ar(this._runtimeDataModel, this._errorFormat)
          : (this._dmmf === void 0 && (this._dmmf = await this._getDmmf(n)),
            new un(this._dmmf, this._errorFormat))
      );
      this.$extends = Ia;
      qa(e), n && Fl(n, e.datasourceNames);
      let i = new Ol.EventEmitter().on('error', () => {});
      (this._extensions = Ze.empty()),
        (this._previewFeatures = e.generator?.previewFeatures ?? []),
        (this._rejectOnNotFound = n?.rejectOnNotFound),
        (this._clientVersion = e.clientVersion ?? sn),
        (this._activeProvider = e.activeProvider),
        (this._dataProxy = e.dataProxy),
        (this._tracingHelper = cl(this._previewFeatures)),
        (this._clientEngineType = jn(e.generator));
      let o = {
          rootEnvPath:
            e.relativeEnvPaths.rootEnvPath &&
            lr.default.resolve(e.dirname, e.relativeEnvPaths.rootEnvPath),
          schemaEnvPath:
            e.relativeEnvPaths.schemaEnvPath &&
            lr.default.resolve(e.dirname, e.relativeEnvPaths.schemaEnvPath),
        },
        s = $t(o, { conflictCheck: 'none' });
      try {
        let a = n ?? {},
          l = a.__internal ?? {},
          u = l.debug === !0;
        u && J.enable('prisma:client');
        let c = lr.default.resolve(e.dirname, e.relativePath);
        Rl.default.existsSync(c) || (c = e.dirname),
          Ce('dirname', e.dirname),
          Ce('relativePath', e.relativePath),
          Ce('cwd', c);
        let p = a.datasources || {},
          f = Object.entries(p)
            .filter(([b, h]) => h && h.url)
            .map(([b, { url: h }]) => ({ name: b, url: h })),
          d = ml([], f, b => b.name),
          m = l.engine || {};
        a.errorFormat
          ? (this._errorFormat = a.errorFormat)
          : process.env.NODE_ENV === 'production'
          ? (this._errorFormat = 'minimal')
          : process.env.NO_COLOR
          ? (this._errorFormat = 'colorless')
          : (this._errorFormat = 'colorless'),
          e.runtimeDataModel
            ? (this._runtimeDataModel = e.runtimeDataModel)
            : (this._runtimeDataModel = as(e.document.datamodel));
        let g = Bn(e.generator);
        if (
          (Ce('protocol', g),
          e.document && (this._dmmf = new Ke(e.document)),
          (this._engineConfig = {
            cwd: c,
            dirname: e.dirname,
            enableDebugLogs: u,
            allowTriggerPanic: m.allowTriggerPanic,
            datamodelPath: lr.default.join(
              e.dirname,
              e.filename ?? 'schema.prisma'
            ),
            prismaPath: m.binaryPath ?? void 0,
            engineEndpoint: m.endpoint,
            datasources: d,
            generator: e.generator,
            showColors: this._errorFormat === 'pretty',
            logLevel: a.log && fl(a.log),
            logQueries:
              a.log &&
              Boolean(
                typeof a.log == 'string'
                  ? a.log === 'query'
                  : a.log.find(b =>
                      typeof b == 'string' ? b === 'query' : b.level === 'query'
                    )
              ),
            env: s?.parsed ?? e.injectableEdgeEnv?.parsed ?? {},
            flags: [],
            clientVersion: e.clientVersion,
            previewFeatures: this._previewFeatures,
            activeProvider: e.activeProvider,
            inlineSchema: e.inlineSchema,
            inlineDatasources: e.inlineDatasources,
            inlineSchemaHash: e.inlineSchemaHash,
            tracingHelper: this._tracingHelper,
            logEmitter: i,
            engineProtocol: g,
            isBundled: e.isBundled,
          }),
          Ce('clientVersion', e.clientVersion),
          Ce(
            'clientEngineType',
            this._dataProxy ? 'dataproxy' : this._clientEngineType
          ),
          this._dataProxy && Ce('using Data Proxy with Node.js runtime'),
          (this._engine = this.getEngine()),
          (this._fetcher = new Pn(this, i)),
          a.log)
        )
          for (let b of a.log) {
            let h =
              typeof b == 'string' ? b : b.emit === 'stdout' ? b.level : null;
            h &&
              this.$on(h, x => {
                Bt.log(`${Bt.tags[h] ?? ''}`, x.message || x.query);
              });
          }
        this._metrics = new gt(this._engine);
      } catch (a) {
        throw ((a.clientVersion = this._clientVersion), a);
      }
      return an(this);
    }
    get [Symbol.toStringTag]() {
      return 'PrismaClient';
    }
    getEngine() {
      if ((this._dataProxy, this._clientEngineType === 'library'))
        return new Zt(this._engineConfig);
      throw (
        (this._clientEngineType,
        'binary',
        new W('Invalid client engine type, please use `library` or `binary`'))
      );
    }
    $use(n) {
      this._middlewares.use(n);
    }
    $on(n, i) {
      n === 'beforeExit'
        ? this._engine.on('beforeExit', i)
        : this._engine.on(n, o => {
            let s = o.fields;
            return i(
              n === 'query'
                ? {
                    timestamp: o.timestamp,
                    query: s?.query ?? o.query,
                    params: s?.params ?? o.params,
                    duration: s?.duration_ms ?? o.duration,
                    target: o.target,
                  }
                : {
                    timestamp: o.timestamp,
                    message: s?.message ?? o.message,
                    target: o.target,
                  }
            );
          });
    }
    $connect() {
      try {
        return this._engine.start();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      }
    }
    async _runDisconnect() {
      await this._engine.stop(),
        delete this._connectionPromise,
        (this._engine = this.getEngine()),
        delete this._disconnectionPromise;
    }
    async $disconnect() {
      try {
        await this._engine.stop();
      } catch (n) {
        throw ((n.clientVersion = this._clientVersion), n);
      } finally {
        xo(), this._dataProxy || (this._dmmf = void 0);
      }
    }
    $executeRawInternal(n, i, o) {
      return this._request({
        action: 'executeRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Hi(this, i),
        callsite: Ye(this._errorFormat),
        dataPath: [],
      });
    }
    $executeRaw(n, ...i) {
      return $e(o => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$executeRawInternal(o, '$executeRaw', [n, ...i]);
        throw new W(
          "`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n"
        );
      });
    }
    $executeRawUnsafe(n, ...i) {
      return $e(o =>
        this.$executeRawInternal(o, '$executeRawUnsafe', [n, ...i])
      );
    }
    $runCommandRaw(n) {
      if (e.activeProvider !== 'mongodb')
        throw new W(
          `The ${e.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`
        );
      return $e(i =>
        this._request({
          args: { command: n },
          clientMethod: '$runCommandRaw',
          dataPath: [],
          action: 'runCommandRaw',
          callsite: Ye(this._errorFormat),
          transaction: i,
        })
      );
    }
    async $queryRawInternal(n, i, o) {
      return this._request({
        action: 'queryRaw',
        args: o,
        transaction: n,
        clientMethod: i,
        argsMapper: Hi(this, i),
        callsite: Ye(this._errorFormat),
        dataPath: [],
      }).then(xl);
    }
    $queryRaw(n, ...i) {
      return $e(o => {
        if (n.raw !== void 0 || n.sql !== void 0)
          return this.$queryRawInternal(o, '$queryRaw', [n, ...i]);
        throw new W(
          "`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n"
        );
      });
    }
    $queryRawUnsafe(n, ...i) {
      return $e(o => this.$queryRawInternal(o, '$queryRawUnsafe', [n, ...i]));
    }
    _transactionWithArray({ promises: n, options: i }) {
      let o = fd.nextId(),
        s = pl(n.length),
        a = n.map((l, u) => {
          if (l?.[Symbol.toStringTag] !== 'PrismaPromise')
            throw new Error(
              'All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.'
            );
          let c = i?.isolationLevel,
            p = { kind: 'batch', id: o, index: u, isolationLevel: c, lock: s };
          return l.requestTransaction?.(p) ?? l;
        });
      return Cl(a);
    }
    async _transactionWithCallback({ callback: n, options: i }) {
      let o = { traceparent: this._tracingHelper.getTraceParent() },
        s = await this._engine.transaction('start', o, i),
        a;
      try {
        let l = { kind: 'itx', ...s };
        (a = await n(Yi(this, l))),
          await this._engine.transaction('commit', o, s);
      } catch (l) {
        throw (
          (await this._engine.transaction('rollback', o, s).catch(() => {}), l)
        );
      }
      return a;
    }
    $transaction(n, i) {
      let o;
      typeof n == 'function'
        ? (o = () => this._transactionWithCallback({ callback: n, options: i }))
        : (o = () => this._transactionWithArray({ promises: n, options: i }));
      let s = { name: 'transaction', attributes: { method: '$transaction' } };
      return this._tracingHelper.runInChildSpan(s, o);
    }
    _request(n) {
      n.otelParentCtx = this._tracingHelper.getActiveContext();
      let i = {
          args: n.args,
          dataPath: n.dataPath,
          runInTransaction: Boolean(n.transaction),
          action: n.action,
          model: n.model,
        },
        o = {
          middleware: {
            name: 'middleware',
            middleware: !0,
            attributes: { method: '$use' },
            active: !1,
          },
          operation: {
            name: 'operation',
            attributes: {
              method: i.action,
              model: i.model,
              name: `${i.model}.${i.action}`,
            },
          },
        },
        s = -1,
        a = l => {
          let u = this._middlewares.get(++s);
          if (u)
            return this._tracingHelper.runInChildSpan(o.middleware, d =>
              u(l, m => (d?.end(), a(m)))
            );
          let { runInTransaction: c, ...p } = l,
            f = { ...n, ...p };
          return c || (f.transaction = void 0), Na(this, f);
        };
      return this._tracingHelper.runInChildSpan(o.operation, () =>
        new Al.AsyncResource('prisma-client-request').runInAsyncScope(() =>
          a(i)
        )
      );
    }
    async _executeRequest({
      args: n,
      clientMethod: i,
      dataPath: o,
      callsite: s,
      action: a,
      model: l,
      argsMapper: u,
      transaction: c,
      unpacker: p,
      otelParentCtx: f,
      customDataProxyFetch: d,
    }) {
      try {
        let m = await this._getProtocolEncoder({
          clientMethod: i,
          callsite: s,
        });
        n = u ? u(n) : n;
        let g = { name: 'serialize' },
          b;
        l && ((b = Ni(a, l, n, this._rejectOnNotFound)), md(b, l, a));
        let h = this._tracingHelper.runInChildSpan(g, () =>
          m.createMessage({
            modelName: l,
            action: a,
            args: n,
            clientMethod: i,
            callsite: s,
            extensions: this._extensions,
          })
        );
        return (
          J.enabled('prisma:client') &&
            (Ce('Prisma Client call:'),
            Ce(
              `prisma.${i}(${Yr({
                ast: n,
                keyPaths: [],
                valuePaths: [],
                missingItems: [],
              })})`
            ),
            Ce('Generated request:'),
            Ce(
              h.toDebugString() +
                `
`
            )),
          c?.kind === 'batch' && (await c.lock),
          this._fetcher.request({
            protocolMessage: h,
            protocolEncoder: m,
            modelName: l,
            clientMethod: i,
            dataPath: o,
            rejectOnNotFound: b,
            callsite: s,
            args: n,
            extensions: this._extensions,
            transaction: c,
            unpacker: p,
            otelParentCtx: f,
            otelChildCtx: this._tracingHelper.getActiveContext(),
            customDataProxyFetch: d,
          })
        );
      } catch (m) {
        throw ((m.clientVersion = this._clientVersion), m);
      }
    }
    get $metrics() {
      if (!this._hasPreviewFlag('metrics'))
        throw new W(
          '`metrics` preview feature must be enabled in order to access metrics API'
        );
      return this._metrics;
    }
    _hasPreviewFlag(n) {
      return !!this._engineConfig.previewFeatures?.includes(n);
    }
  }
  return t;
}
var Sl = ['$connect', '$disconnect', '$on', '$transaction', '$use', '$extends'];
function Yi(e, t) {
  return typeof e != 'object'
    ? e
    : new Proxy(e, {
        get: (r, n) => {
          if (!Sl.includes(n))
            return n === pd
              ? t?.id
              : typeof r[n] == 'function'
              ? (...i) =>
                  n === 'then'
                    ? r[n](i[0], i[1], t)
                    : n === 'catch' || n === 'finally'
                    ? r[n](i[0], t)
                    : Yi(r[n](...i), t)
              : Yi(r[n], t);
        },
        has(r, n) {
          return Sl.includes(n) ? !1 : Reflect.has(r, n);
        },
      });
}
var dd = { findUnique: 'findUniqueOrThrow', findFirst: 'findFirstOrThrow' };
function md(e, t, r) {
  if (e) {
    let n = dd[r],
      i = t ? `prisma.${xe(t)}.${n}` : `prisma.${n}`,
      o = `rejectOnNotFound.${t ?? ''}.${r}`;
    Ut(
      o,
      `\`rejectOnNotFound\` option is deprecated and will be removed in Prisma 5. Please use \`${i}\` method instead`
    );
  }
}
var gd = new Set([
  'toJSON',
  'asymmetricMatch',
  Symbol.iterator,
  Symbol.toStringTag,
  Symbol.isConcatSpreadable,
  Symbol.toPrimitive,
]);
function Dl(e) {
  return new Proxy(e, {
    get(t, r) {
      if (r in t) return t[r];
      if (!gd.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
    },
  });
}
var kl = e => e;
function Il(e) {
  $t(e, { conflictCheck: 'warn' });
}
0 &&
  (module.exports = {
    DMMF,
    DMMFClass,
    Debug,
    Decimal,
    Extensions,
    MetricsClient,
    NotFoundError,
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
    Sql,
    Types,
    decompressFromBase64,
    defineDmmfProperty,
    empty,
    getPrismaClient,
    join,
    makeDocument,
    makeStrictEnum,
    objectEnumValues,
    raw,
    sqltag,
    transformDocument,
    unpack,
    warnEnvConflicts,
    warnOnce,
  });
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2018 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
//# sourceMappingURL=library.js.map
