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