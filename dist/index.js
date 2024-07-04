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