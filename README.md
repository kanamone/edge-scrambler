# edge-scrambler

## dist/index.js
```js
function createScrambler(b, p, i, h, a) {
  const s = (m, e) => new Array(m).fill(0).map((r, n) => e(n)), x = (m, e, r) => {
    let n = r;
    return s(e, () => s(m, () => (n ^= n << 13, n ^= n >> 17, n ^= n << 5)).map((u, o) => [u, o]).sort((u, o) => u[0] - o[0]).map((u) => u[1]));
  }, c = (m, e) => {
    const r = m.toString().split("").map(Number);
    while (r.length < e)
      r.unshift(0);
    return r;
  }, f = (m) => Number(m.join("")), y = (m, e) => m.map((r, n) => [e[n], r]).sort((r, n) => r[0] - n[0]).map((r) => r[1]), w = (m, e, r) => m.map((n, u) => (n + e[u] % 10 * r + 10) % 10), S = (m, e) => m.map((r, n) => [n, r]).sort((r, n) => e.indexOf(r[0]) - e.indexOf(n[0])).map((r) => r[1]), l = 10 ** b, t = x(b, a, h);
  if (p * i % l !== 1)
    throw new Error("invalid number pair");
  return {
    scramble(m) {
      let e = m;
      for (let r = 0;r < a; r++)
        e = f(w(y(c(e * p % l, b), t[r]), t[r], 1));
      return e;
    },
    restore(m) {
      let e = m;
      for (let r = a - 1;r >= 0; r--)
        e = f(S(w(c(e, b), t[r], -1), t[r])) * i % l;
      return e;
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