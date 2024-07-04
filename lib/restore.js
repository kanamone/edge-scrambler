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