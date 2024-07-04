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