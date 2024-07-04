# edge-scrambler

## dist/index.js
```js
function createScrambler(b, a, c, w, t) {
  const f = (e, u) => new Array(e).fill(0).map((n, r) => u(r)), A = (e, u, n) => {
    let r = n;
    return f(u, () => f(e, () => (r ^= r << 13, r ^= r >> 17, r ^= r << 5)).map((m, o) => [m, o]).sort((m, o) => m[0] - o[0]).map((m) => m[1]));
  }, s = (e, u) => {
    const n = e.toString().split("").map(Number);
    while (n.length < u)
      n.unshift(0);
    return n;
  }, h = (e) => Number(e.join("")), S = (e, u) => {
    const n = Array(e.length);
    for (let r = 0;r < e.length; r++)
      n[u[r]] = e[r];
    return n;
  }, p = (e, u, n) => {
    const r = Array(e.length);
    for (let m = 0;m < e.length; m++)
      r[m] = (e[m] + u[m] % 10 * n + 10) % 10;
    return r;
  }, T = (e, u) => {
    const n = Array(e.length);
    for (let r = 0;r < e.length; r++)
      n[u.indexOf(r)] = e[r];
    return n;
  }, l = 10 ** b, y = A(b, t, w);
  if (a * c % l !== 1)
    throw new Error("invalid number pair");
  const i = new Array(b);
  return {
    scramble(e) {
      let u = e;
      for (let n = 0;n < t; n++) {
        const r = y[n];
        u = h(p(S(s(u * a % l, b), r), r, 1));
      }
      return u;
    },
    restore(e) {
      let u = e;
      for (let n = t - 1;n >= 0; n--) {
        const r = y[n];
        u = h(T(p(s(u, b), r, -1), r)) * c % l;
      }
      return u;
    }
  };
}
```

## dist/scramble.js
```js
function createScramble(b, a, c, s, l) {
  const o = (n, m) => new Array(n).fill(0).map((r, e) => m(e)), f = (n, m, r) => {
    let e = r;
    return o(m, () => o(n, () => (e ^= e << 13, e ^= e >> 17, e ^= e << 5)).map((u, t) => [u, t]).sort((u, t) => u[0] - t[0]).map((u) => u[1]));
  }, w = (n, m) => {
    const r = n.toString().split("").map(Number);
    while (r.length < m)
      r.unshift(0);
    return r;
  }, h = (n) => Number(n.join("")), y = (n, m) => n.map((r, e) => [m[e], r]).sort((r, e) => r[0] - e[0]).map((r) => r[1]), S = (n, m, r) => n.map((e, u) => (e + m[u] % 10 * r + 10) % 10), p = 10 ** b, i = f(b, l, s);
  if (a * c % p !== 1)
    throw new Error("invalid number pair");
  return (n) => {
    let m = n;
    for (let r = 0;r < l; r++)
      m = h(S(y(w(m * a % p, b), i[r]), i[r], 1));
    return m;
  };
}
```

## dist/restore.js
```js
function createRestore(b, s, o, f, p) {
  const a = (m, e) => new Array(m).fill(0).map((r, n) => e(n)), c = (m, e, r) => {
    let n = r;
    return a(e, () => a(m, () => (n ^= n << 13, n ^= n >> 17, n ^= n << 5)).map((u, t) => [u, t]).sort((u, t) => u[0] - t[0]).map((u) => u[1]));
  }, h = (m, e) => {
    const r = m.toString().split("").map(Number);
    while (r.length < e)
      r.unshift(0);
    return r;
  }, w = (m) => Number(m.join("")), d = (m, e, r) => m.map((n, u) => (n + e[u] % 10 * r + 10) % 10), x = (m, e) => m.map((r, n) => [n, r]).sort((r, n) => e.indexOf(r[0]) - e.indexOf(n[0])).map((r) => r[1]), i = 10 ** b, l = c(b, p, f);
  if (s * o % i !== 1)
    throw new Error("invalid number pair");
  return (m) => {
    let e = m;
    for (let r = p - 1;r >= 0; r--)
      e = w(x(d(h(e, b), l[r], -1), l[r])) * o % i;
    return e;
  };
}
```