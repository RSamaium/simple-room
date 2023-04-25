var _r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mr = {}, It = {}, Pt = {}, kt = {}, st = {}, Ct = {}, ji = Rt(typeof Buffer < "u" && Buffer) || Rt(_r.Buffer) || Rt(typeof window < "u" && window.Buffer) || _r.Buffer;
function Rt(r) {
  return r && r.isBuffer && r;
}
var Di = {}.toString, Gt = Array.isArray || function(r) {
  return Di.call(r) == "[object Array]";
}, et = {}, Mi = {
  get exports() {
    return et;
  },
  set exports(r) {
    et = r;
  }
}, Ee;
function $i() {
  if (Ee)
    return et;
  Ee = 1;
  var r = rr(), e = Mi.exports = t(0);
  e.alloc = t, e.concat = r.concat, e.from = n;
  function t(a) {
    return new Array(a);
  }
  function n(a) {
    if (!r.isBuffer(a) && r.isView(a))
      a = r.Uint8Array.from(a);
    else if (r.isArrayBuffer(a))
      a = new Uint8Array(a);
    else {
      if (typeof a == "string")
        return r.from.call(e, a);
      if (typeof a == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return Array.prototype.slice.call(a);
  }
  return et;
}
var nt = {}, Ni = {
  get exports() {
    return nt;
  },
  set exports(r) {
    nt = r;
  }
}, we;
function qi() {
  if (we)
    return nt;
  we = 1;
  var r = rr(), e = r.global, t = Ni.exports = r.hasBuffer ? n(0) : [];
  t.alloc = r.hasBuffer && e.alloc || n, t.concat = r.concat, t.from = a;
  function n(o) {
    return new e(o);
  }
  function a(o) {
    if (!r.isBuffer(o) && r.isView(o))
      o = r.Uint8Array.from(o);
    else if (r.isArrayBuffer(o))
      o = new Uint8Array(o);
    else {
      if (typeof o == "string")
        return r.from.call(t, o);
      if (typeof o == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return e.from && e.from.length !== 1 ? e.from(o) : new e(o);
  }
  return nt;
}
var it = {}, zi = {
  get exports() {
    return it;
  },
  set exports(r) {
    it = r;
  }
}, _e;
function Li() {
  if (_e)
    return it;
  _e = 1;
  var r = rr(), e = zi.exports = r.hasArrayBuffer ? t(0) : [];
  e.alloc = t, e.concat = r.concat, e.from = n;
  function t(a) {
    return new Uint8Array(a);
  }
  function n(a) {
    if (r.isView(a)) {
      var o = a.byteOffset, u = a.byteLength;
      a = a.buffer, a.byteLength !== u && (a.slice ? a = a.slice(o, o + u) : (a = new Uint8Array(a), a.byteLength !== u && (a = Array.prototype.slice.call(a, o, o + u))));
    } else {
      if (typeof a == "string")
        return r.from.call(e, a);
      if (typeof a == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return new Uint8Array(a);
  }
  return it;
}
var Fr = {}, ct = {};
ct.copy = Vi;
ct.toString = Hi;
ct.write = Yi;
function Yi(r, e) {
  for (var t = this, n = e || (e |= 0), a = r.length, o = 0, u = 0; u < a; )
    o = r.charCodeAt(u++), o < 128 ? t[n++] = o : o < 2048 ? (t[n++] = 192 | o >>> 6, t[n++] = 128 | o & 63) : o < 55296 || o > 57343 ? (t[n++] = 224 | o >>> 12, t[n++] = 128 | o >>> 6 & 63, t[n++] = 128 | o & 63) : (o = (o - 55296 << 10 | r.charCodeAt(u++) - 56320) + 65536, t[n++] = 240 | o >>> 18, t[n++] = 128 | o >>> 12 & 63, t[n++] = 128 | o >>> 6 & 63, t[n++] = 128 | o & 63);
  return n - e;
}
function Hi(r, e, t) {
  var n = this, a = e | 0;
  t || (t = n.length);
  for (var o = "", u = 0; a < t; ) {
    if (u = n[a++], u < 128) {
      o += String.fromCharCode(u);
      continue;
    }
    (u & 224) === 192 ? u = (u & 31) << 6 | n[a++] & 63 : (u & 240) === 224 ? u = (u & 15) << 12 | (n[a++] & 63) << 6 | n[a++] & 63 : (u & 248) === 240 && (u = (u & 7) << 18 | (n[a++] & 63) << 12 | (n[a++] & 63) << 6 | n[a++] & 63), u >= 65536 ? (u -= 65536, o += String.fromCharCode((u >>> 10) + 55296, (u & 1023) + 56320)) : o += String.fromCharCode(u);
  }
  return o;
}
function Vi(r, e, t, n) {
  var a;
  t || (t = 0), !n && n !== 0 && (n = this.length), e || (e = 0);
  var o = n - t;
  if (r === this && t < e && e < n)
    for (a = o - 1; a >= 0; a--)
      r[a + e] = this[a + t];
  else
    for (a = 0; a < o; a++)
      r[a + e] = this[a + t];
  return o;
}
var Be;
function Kt() {
  if (Be)
    return Fr;
  Be = 1;
  var r = ct;
  Fr.copy = o, Fr.slice = u, Fr.toString = l, Fr.write = v("write");
  var e = rr(), t = e.global, n = e.hasBuffer && "TYPED_ARRAY_SUPPORT" in t, a = n && !t.TYPED_ARRAY_SUPPORT;
  function o(d, c, p, y) {
    var g = e.isBuffer(this), _ = e.isBuffer(d);
    if (g && _)
      return this.copy(d, c, p, y);
    if (!a && !g && !_ && e.isView(this) && e.isView(d)) {
      var U = p || y != null ? u.call(this, p, y) : this;
      return d.set(U, c), U.length;
    } else
      return r.copy.call(this, d, c, p, y);
  }
  function u(d, c) {
    var p = this.slice || !a && this.subarray;
    if (p)
      return p.call(this, d, c);
    var y = e.alloc.call(this, c - d);
    return o.call(this, y, 0, d, c), y;
  }
  function l(d, c, p) {
    var y = !n && e.isBuffer(this) ? this.toString : r.toString;
    return y.apply(this, arguments);
  }
  function v(d) {
    return c;
    function c() {
      var p = this[d] || r[d];
      return p.apply(this, arguments);
    }
  }
  return Fr;
}
var me;
function rr() {
  return me || (me = 1, function(r) {
    var e = r.global = ji, t = r.hasBuffer = e && !!e.isBuffer, n = r.hasArrayBuffer = typeof ArrayBuffer < "u", a = r.isArray = Gt;
    r.isArrayBuffer = n ? U : V;
    var o = r.isBuffer = t ? e.isBuffer : V, u = r.isView = n ? ArrayBuffer.isView || ir("ArrayBuffer", "buffer") : V;
    r.alloc = y, r.concat = g, r.from = p;
    var l = r.Array = $i(), v = r.Buffer = qi(), d = r.Uint8Array = Li(), c = r.prototype = Kt();
    function p(S) {
      return typeof S == "string" ? z.call(this, S) : tr(this).from(S);
    }
    function y(S) {
      return tr(this).alloc(S);
    }
    function g(S, L) {
      L || (L = 0, Array.prototype.forEach.call(S, F));
      var Y = this !== r && this || S[0], A = y.call(Y, L), w = 0;
      return Array.prototype.forEach.call(S, h), A;
      function F(x) {
        L += x.length;
      }
      function h(x) {
        w += c.copy.call(x, A, w);
      }
    }
    var _ = ir("ArrayBuffer");
    function U(S) {
      return S instanceof ArrayBuffer || _(S);
    }
    function z(S) {
      var L = S.length * 3, Y = y.call(this, L), A = c.write.call(Y, S);
      return L !== A && (Y = c.slice.call(Y, 0, A)), Y;
    }
    function tr(S) {
      return o(S) ? v : u(S) ? d : a(S) ? l : t ? v : n ? d : l;
    }
    function V() {
      return !1;
    }
    function ir(S, L) {
      return S = "[object " + S + "]", function(Y) {
        return Y != null && {}.toString.call(L ? Y[L] : Y) === S;
      };
    }
  }(Ct)), Ct;
}
st.ExtBuffer = zt;
var Wi = rr();
function zt(r, e) {
  if (!(this instanceof zt))
    return new zt(r, e);
  this.buffer = Wi.from(r), this.type = e;
}
var Ot = {}, Ae;
function Gi() {
  if (Ae)
    return Ot;
  Ae = 1, Ot.setExtPackers = o;
  var r = rr(), e = r.global, t = r.Uint8Array.from, n, a = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
  function o(c) {
    c.addExtPacker(14, Error, [d, u]), c.addExtPacker(1, EvalError, [d, u]), c.addExtPacker(2, RangeError, [d, u]), c.addExtPacker(3, ReferenceError, [d, u]), c.addExtPacker(4, SyntaxError, [d, u]), c.addExtPacker(5, TypeError, [d, u]), c.addExtPacker(6, URIError, [d, u]), c.addExtPacker(10, RegExp, [v, u]), c.addExtPacker(11, Boolean, [l, u]), c.addExtPacker(12, String, [l, u]), c.addExtPacker(13, Date, [Number, u]), c.addExtPacker(15, Number, [l, u]), typeof Uint8Array < "u" && (c.addExtPacker(17, Int8Array, t), c.addExtPacker(18, Uint8Array, t), c.addExtPacker(19, Int16Array, t), c.addExtPacker(20, Uint16Array, t), c.addExtPacker(21, Int32Array, t), c.addExtPacker(22, Uint32Array, t), c.addExtPacker(23, Float32Array, t), typeof Float64Array < "u" && c.addExtPacker(24, Float64Array, t), typeof Uint8ClampedArray < "u" && c.addExtPacker(25, Uint8ClampedArray, t), c.addExtPacker(26, ArrayBuffer, t), c.addExtPacker(29, DataView, t)), r.hasBuffer && c.addExtPacker(27, e, r.from);
  }
  function u(c) {
    return n || (n = on().encode), n(c);
  }
  function l(c) {
    return c.valueOf();
  }
  function v(c) {
    c = RegExp.prototype.toString.call(c).split("/"), c.shift();
    var p = [c.pop()];
    return p.unshift(c.join("/")), p;
  }
  function d(c) {
    var p = {};
    for (var y in a)
      p[y] = c[y];
    return p;
  }
  return Ot;
}
var Le = {}, lt = {};
(function(r) {
  (function(e) {
    var t = "undefined", n = t !== typeof Buffer && Buffer, a = t !== typeof Uint8Array && Uint8Array, o = t !== typeof ArrayBuffer && ArrayBuffer, u = [0, 0, 0, 0, 0, 0, 0, 0], l = Array.isArray || Y, v = 4294967296, d = 16777216, c;
    p("Uint64BE", !0, !0), p("Int64BE", !0, !1), p("Uint64LE", !1, !0), p("Int64LE", !1, !1);
    function p(A, w, F) {
      var h = w ? 0 : 4, x = w ? 4 : 0, E = w ? 0 : 3, C = w ? 1 : 2, N = w ? 2 : 1, W = w ? 3 : 0, Q = w ? V : S, hr = w ? ir : L, H = or.prototype, ar = "is" + A, Ar = "_" + ar;
      return H.buffer = void 0, H.offset = 0, H[Ar] = !0, H.toNumber = zr, H.toString = vr, H.toJSON = zr, H.toArray = y, n && (H.toBuffer = g), a && (H.toArrayBuffer = _), or[ar] = Cr, e[A] = or, or;
      function or(T, B, m, I) {
        return this instanceof or ? O(this, T, B, m, I) : new or(T, B, m, I);
      }
      function Cr(T) {
        return !!(T && T[Ar]);
      }
      function O(T, B, m, I, q) {
        if (a && o && (B instanceof o && (B = new a(B)), I instanceof o && (I = new a(I))), !B && !m && !I && !c) {
          T.buffer = tr(u, 0);
          return;
        }
        if (!U(B, m)) {
          var er = c || Array;
          q = m, I = B, m = 0, B = new er(8);
        }
        T.buffer = B, T.offset = m |= 0, t !== typeof I && (typeof I == "string" ? qr(B, m, I, q || 10) : U(I, q) ? z(B, m, I, q) : typeof q == "number" ? (xr(B, m + h, I), xr(B, m + x, q)) : I > 0 ? Q(B, m, I) : I < 0 ? hr(B, m, I) : z(B, m, u, 0));
      }
      function qr(T, B, m, I) {
        var q = 0, er = m.length, nr = 0, K = 0;
        m[0] === "-" && q++;
        for (var bt = q; q < er; ) {
          var Lr = parseInt(m[q++], I);
          if (!(Lr >= 0))
            break;
          K = K * I + Lr, nr = nr * I + Math.floor(K / v), K %= v;
        }
        bt && (nr = ~nr, K ? K = v - K : nr++), xr(T, B + h, nr), xr(T, B + x, K);
      }
      function zr() {
        var T = this.buffer, B = this.offset, m = fr(T, B + h), I = fr(T, B + x);
        return F || (m |= 0), m ? m * v + I : I;
      }
      function vr(T) {
        var B = this.buffer, m = this.offset, I = fr(B, m + h), q = fr(B, m + x), er = "", nr = !F && I & 2147483648;
        for (nr && (I = ~I, q = v - q), T = T || 10; ; ) {
          var K = I % T * v + q;
          if (I = Math.floor(I / T), q = Math.floor(K / T), er = (K % T).toString(T) + er, !I && !q)
            break;
        }
        return nr && (er = "-" + er), er;
      }
      function xr(T, B, m) {
        T[B + W] = m & 255, m = m >> 8, T[B + N] = m & 255, m = m >> 8, T[B + C] = m & 255, m = m >> 8, T[B + E] = m & 255;
      }
      function fr(T, B) {
        return T[B + E] * d + (T[B + C] << 16) + (T[B + N] << 8) + T[B + W];
      }
    }
    function y(A) {
      var w = this.buffer, F = this.offset;
      return c = null, A !== !1 && F === 0 && w.length === 8 && l(w) ? w : tr(w, F);
    }
    function g(A) {
      var w = this.buffer, F = this.offset;
      if (c = n, A !== !1 && F === 0 && w.length === 8 && Buffer.isBuffer(w))
        return w;
      var h = new n(8);
      return z(h, 0, w, F), h;
    }
    function _(A) {
      var w = this.buffer, F = this.offset, h = w.buffer;
      if (c = a, A !== !1 && F === 0 && h instanceof o && h.byteLength === 8)
        return h;
      var x = new a(8);
      return z(x, 0, w, F), x.buffer;
    }
    function U(A, w) {
      var F = A && A.length;
      return w |= 0, F && w + 8 <= F && typeof A[w] != "string";
    }
    function z(A, w, F, h) {
      w |= 0, h |= 0;
      for (var x = 0; x < 8; x++)
        A[w++] = F[h++] & 255;
    }
    function tr(A, w) {
      return Array.prototype.slice.call(A, w, w + 8);
    }
    function V(A, w, F) {
      for (var h = w + 8; h > w; )
        A[--h] = F & 255, F /= 256;
    }
    function ir(A, w, F) {
      var h = w + 8;
      for (F++; h > w; )
        A[--h] = -F & 255 ^ 255, F /= 256;
    }
    function S(A, w, F) {
      for (var h = w + 8; w < h; )
        A[w++] = F & 255, F /= 256;
    }
    function L(A, w, F) {
      var h = w + 8;
      for (F++; w < h; )
        A[w++] = -F & 255 ^ 255, F /= 256;
    }
    function Y(A) {
      return !!A && Object.prototype.toString.call(A) == "[object Array]";
    }
  })(typeof r.nodeName != "string" ? r : _r || {});
})(lt);
var Ye = {}, ht = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ht.read = function(r, e, t, n, a) {
  var o, u, l = a * 8 - n - 1, v = (1 << l) - 1, d = v >> 1, c = -7, p = t ? a - 1 : 0, y = t ? -1 : 1, g = r[e + p];
  for (p += y, o = g & (1 << -c) - 1, g >>= -c, c += l; c > 0; o = o * 256 + r[e + p], p += y, c -= 8)
    ;
  for (u = o & (1 << -c) - 1, o >>= -c, c += n; c > 0; u = u * 256 + r[e + p], p += y, c -= 8)
    ;
  if (o === 0)
    o = 1 - d;
  else {
    if (o === v)
      return u ? NaN : (g ? -1 : 1) * (1 / 0);
    u = u + Math.pow(2, n), o = o - d;
  }
  return (g ? -1 : 1) * u * Math.pow(2, o - n);
};
ht.write = function(r, e, t, n, a, o) {
  var u, l, v, d = o * 8 - a - 1, c = (1 << d) - 1, p = c >> 1, y = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = n ? 0 : o - 1, _ = n ? 1 : -1, U = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (l = isNaN(e) ? 1 : 0, u = c) : (u = Math.floor(Math.log(e) / Math.LN2), e * (v = Math.pow(2, -u)) < 1 && (u--, v *= 2), u + p >= 1 ? e += y / v : e += y * Math.pow(2, 1 - p), e * v >= 2 && (u++, v /= 2), u + p >= c ? (l = 0, u = c) : u + p >= 1 ? (l = (e * v - 1) * Math.pow(2, a), u = u + p) : (l = e * Math.pow(2, p - 1) * Math.pow(2, a), u = 0)); a >= 8; r[t + g] = l & 255, g += _, l /= 256, a -= 8)
    ;
  for (u = u << a | l, d += a; d > 0; r[t + g] = u & 255, g += _, u /= 256, d -= 8)
    ;
  r[t + g - _] |= U * 128;
};
var Zt = {}, Ki = Zt.uint8 = new Array(256);
for (var Qr = 0; Qr <= 255; Qr++)
  Ki[Qr] = Zi(Qr);
function Zi(r) {
  return function(e) {
    var t = e.reserve(1);
    e.buffer[t] = r;
  };
}
var He = ht, Ve = lt, Ji = Ve.Uint64BE, Qi = Ve.Int64BE, We = Zt.uint8, pt = rr(), $ = pt.global, Xi = pt.hasBuffer && "TYPED_ARRAY_SUPPORT" in $, ra = Xi && !$.TYPED_ARRAY_SUPPORT, Ue = pt.hasBuffer && $.prototype || {};
Ye.getWriteToken = ta;
function ta(r) {
  return r && r.uint8array ? ea() : ra || pt.hasBuffer && r && r.safe ? na() : Ge();
}
function ea() {
  var r = Ge();
  return r[202] = R(202, 4, Je), r[203] = R(203, 8, Qe), r;
}
function Ge() {
  var r = We.slice();
  return r[196] = Dr(196), r[197] = Er(197), r[198] = wr(198), r[199] = Dr(199), r[200] = Er(200), r[201] = wr(201), r[202] = R(202, 4, Ue.writeFloatBE || Je, !0), r[203] = R(203, 8, Ue.writeDoubleBE || Qe, !0), r[204] = Dr(204), r[205] = Er(205), r[206] = wr(206), r[207] = R(207, 8, Ke), r[208] = Dr(208), r[209] = Er(209), r[210] = wr(210), r[211] = R(211, 8, Ze), r[217] = Dr(217), r[218] = Er(218), r[219] = wr(219), r[220] = Er(220), r[221] = wr(221), r[222] = Er(222), r[223] = wr(223), r;
}
function na() {
  var r = We.slice();
  return r[196] = R(196, 1, $.prototype.writeUInt8), r[197] = R(197, 2, $.prototype.writeUInt16BE), r[198] = R(198, 4, $.prototype.writeUInt32BE), r[199] = R(199, 1, $.prototype.writeUInt8), r[200] = R(200, 2, $.prototype.writeUInt16BE), r[201] = R(201, 4, $.prototype.writeUInt32BE), r[202] = R(202, 4, $.prototype.writeFloatBE), r[203] = R(203, 8, $.prototype.writeDoubleBE), r[204] = R(204, 1, $.prototype.writeUInt8), r[205] = R(205, 2, $.prototype.writeUInt16BE), r[206] = R(206, 4, $.prototype.writeUInt32BE), r[207] = R(207, 8, Ke), r[208] = R(208, 1, $.prototype.writeInt8), r[209] = R(209, 2, $.prototype.writeInt16BE), r[210] = R(210, 4, $.prototype.writeInt32BE), r[211] = R(211, 8, Ze), r[217] = R(217, 1, $.prototype.writeUInt8), r[218] = R(218, 2, $.prototype.writeUInt16BE), r[219] = R(219, 4, $.prototype.writeUInt32BE), r[220] = R(220, 2, $.prototype.writeUInt16BE), r[221] = R(221, 4, $.prototype.writeUInt32BE), r[222] = R(222, 2, $.prototype.writeUInt16BE), r[223] = R(223, 4, $.prototype.writeUInt32BE), r;
}
function Dr(r) {
  return function(e, t) {
    var n = e.reserve(2), a = e.buffer;
    a[n++] = r, a[n] = t;
  };
}
function Er(r) {
  return function(e, t) {
    var n = e.reserve(3), a = e.buffer;
    a[n++] = r, a[n++] = t >>> 8, a[n] = t;
  };
}
function wr(r) {
  return function(e, t) {
    var n = e.reserve(5), a = e.buffer;
    a[n++] = r, a[n++] = t >>> 24, a[n++] = t >>> 16, a[n++] = t >>> 8, a[n] = t;
  };
}
function R(r, e, t, n) {
  return function(a, o) {
    var u = a.reserve(e + 1);
    a.buffer[u++] = r, t.call(a.buffer, o, u, n);
  };
}
function Ke(r, e) {
  new Ji(this, e, r);
}
function Ze(r, e) {
  new Qi(this, e, r);
}
function Je(r, e) {
  He.write(this, r, e, !1, 23, 4);
}
function Qe(r, e) {
  He.write(this, r, e, !1, 52, 8);
}
var ia = Gt, Xe = lt, aa = Xe.Uint64BE, oa = Xe.Int64BE, Se = rr(), Fe = Kt(), fa = Ye, ua = Zt.uint8, sa = st.ExtBuffer, ca = typeof Uint8Array < "u", la = typeof Map < "u", kr = [];
kr[1] = 212;
kr[2] = 213;
kr[4] = 214;
kr[8] = 215;
kr[16] = 216;
Le.getWriteType = ha;
function ha(r) {
  var e = fa.getWriteToken(r), t = r && r.useraw, n = ca && r && r.binarraybuffer, a = n ? Se.isArrayBuffer : Se.isBuffer, o = n ? L : S, u = la && r && r.usemap, l = u ? w : A, v = {
    boolean: d,
    function: V,
    number: c,
    object: t ? tr : z,
    string: U(t ? _ : g),
    symbol: V,
    undefined: V
  };
  return v;
  function d(h, x) {
    var E = x ? 195 : 194;
    e[E](h, x);
  }
  function c(h, x) {
    var E = x | 0, C;
    if (x !== E) {
      C = 203, e[C](h, x);
      return;
    } else
      -32 <= E && E <= 127 ? C = E & 255 : 0 <= E ? C = E <= 255 ? 204 : E <= 65535 ? 205 : 206 : C = -128 <= E ? 208 : -32768 <= E ? 209 : 210;
    e[C](h, E);
  }
  function p(h, x) {
    var E = 207;
    e[E](h, x.toArray());
  }
  function y(h, x) {
    var E = 211;
    e[E](h, x.toArray());
  }
  function g(h) {
    return h < 32 ? 1 : h <= 255 ? 2 : h <= 65535 ? 3 : 5;
  }
  function _(h) {
    return h < 32 ? 1 : h <= 65535 ? 3 : 5;
  }
  function U(h) {
    return x;
    function x(E, C) {
      var N = C.length, W = 5 + N * 3;
      E.offset = E.reserve(W);
      var Q = E.buffer, hr = h(N), H = E.offset + hr;
      N = Fe.write.call(Q, C, H);
      var ar = h(N);
      if (hr !== ar) {
        var Ar = H + ar - hr, or = H + N;
        Fe.copy.call(Q, Q, Ar, H, or);
      }
      var Cr = ar === 1 ? 160 + N : ar <= 3 ? 215 + ar : 219;
      e[Cr](E, N), E.offset += N;
    }
  }
  function z(h, x) {
    if (x === null)
      return V(h, x);
    if (a(x))
      return o(h, x);
    if (ia(x))
      return ir(h, x);
    if (aa.isUint64BE(x))
      return p(h, x);
    if (oa.isInt64BE(x))
      return y(h, x);
    var E = h.codec.getExtPacker(x);
    if (E && (x = E(x)), x instanceof sa)
      return Y(h, x);
    l(h, x);
  }
  function tr(h, x) {
    if (a(x))
      return F(h, x);
    z(h, x);
  }
  function V(h, x) {
    var E = 192;
    e[E](h, x);
  }
  function ir(h, x) {
    var E = x.length, C = E < 16 ? 144 + E : E <= 65535 ? 220 : 221;
    e[C](h, E);
    for (var N = h.codec.encode, W = 0; W < E; W++)
      N(h, x[W]);
  }
  function S(h, x) {
    var E = x.length, C = E < 255 ? 196 : E <= 65535 ? 197 : 198;
    e[C](h, E), h.send(x);
  }
  function L(h, x) {
    S(h, new Uint8Array(x));
  }
  function Y(h, x) {
    var E = x.buffer, C = E.length, N = kr[C] || (C < 255 ? 199 : C <= 65535 ? 200 : 201);
    e[N](h, C), ua[x.type](h), h.send(E);
  }
  function A(h, x) {
    var E = Object.keys(x), C = E.length, N = C < 16 ? 128 + C : C <= 65535 ? 222 : 223;
    e[N](h, C);
    var W = h.codec.encode;
    E.forEach(function(Q) {
      W(h, Q), W(h, x[Q]);
    });
  }
  function w(h, x) {
    if (!(x instanceof Map))
      return A(h, x);
    var E = x.size, C = E < 16 ? 128 + E : E <= 65535 ? 222 : 223;
    e[C](h, E);
    var N = h.codec.encode;
    x.forEach(function(W, Q, hr) {
      N(h, Q), N(h, W);
    });
  }
  function F(h, x) {
    var E = x.length, C = E < 32 ? 160 + E : E <= 65535 ? 218 : 219;
    e[C](h, E), h.send(x);
  }
}
var dr = {}, pa = Gt;
dr.createCodec = rn;
dr.install = va;
dr.filter = ba;
var da = rr();
function Tr(r) {
  if (!(this instanceof Tr))
    return new Tr(r);
  this.options = r, this.init();
}
Tr.prototype.init = function() {
  var r = this.options;
  return r && r.uint8array && (this.bufferish = da.Uint8Array), this;
};
function va(r) {
  for (var e in r)
    Tr.prototype[e] = xa(Tr.prototype[e], r[e]);
}
function xa(r, e) {
  return r && e ? t : r || e;
  function t() {
    return r.apply(this, arguments), e.apply(this, arguments);
  }
}
function ya(r) {
  return r = r.slice(), function(t) {
    return r.reduce(e, t);
  };
  function e(t, n) {
    return n(t);
  }
}
function ba(r) {
  return pa(r) ? ya(r) : r;
}
function rn(r) {
  return new Tr(r);
}
dr.preset = rn({ preset: !0 });
var Te;
function Jt() {
  if (Te)
    return kt;
  Te = 1;
  var r = st.ExtBuffer, e = Gi(), t = Le, n = dr;
  n.install({
    addExtPacker: u,
    getExtPacker: l,
    init: o
  }), kt.preset = o.call(n.preset);
  function a(v) {
    var d = t.getWriteType(v);
    return c;
    function c(p, y) {
      var g = d[typeof y];
      if (!g)
        throw new Error('Unsupported type "' + typeof y + '": ' + y);
      g(p, y);
    }
  }
  function o() {
    var v = this.options;
    return this.encode = a(v), v && v.preset && e.setExtPackers(this), this;
  }
  function u(v, d, c) {
    c = n.filter(c);
    var p = d.name;
    if (p && p !== "Object") {
      var y = this.extPackers || (this.extPackers = {});
      y[p] = _;
    } else {
      var g = this.extEncoderList || (this.extEncoderList = []);
      g.unshift([d, _]);
    }
    function _(U) {
      return c && (U = c(U)), new r(U, v);
    }
  }
  function l(v) {
    var d = this.extPackers || (this.extPackers = {}), c = v.constructor, p = c && c.name && d[c.name];
    if (p)
      return p;
    for (var y = this.extEncoderList || (this.extEncoderList = []), g = y.length, _ = 0; _ < g; _++) {
      var U = y[_];
      if (c === U[0])
        return U[1];
    }
  }
  return kt;
}
var dt = {};
dt.FlexDecoder = Ir;
dt.FlexEncoder = Pr;
var $r = rr(), ga = 2048, Ea = 65536, Ie = "BUFFER_SHORTAGE";
function Ir() {
  if (!(this instanceof Ir))
    return new Ir();
}
function Pr() {
  if (!(this instanceof Pr))
    return new Pr();
}
Ir.mixin = nn(wa());
Ir.mixin(Ir.prototype);
Pr.mixin = nn(_a());
Pr.mixin(Pr.prototype);
function wa() {
  return {
    bufferish: $r,
    write: r,
    fetch: ma,
    flush: e,
    push: en,
    pull: Aa,
    read: tn,
    reserve: t,
    offset: 0
  };
  function r(n) {
    var a = this.offset ? $r.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = a ? n ? this.bufferish.concat([a, n]) : a : n, this.offset = 0;
  }
  function e() {
    for (; this.offset < this.buffer.length; ) {
      var n = this.offset, a;
      try {
        a = this.fetch();
      } catch (o) {
        if (o && o.message != Ie)
          throw o;
        this.offset = n;
        break;
      }
      this.push(a);
    }
  }
  function t(n) {
    var a = this.offset, o = a + n;
    if (o > this.buffer.length)
      throw new Error(Ie);
    return this.offset = o, a;
  }
}
function _a() {
  return {
    bufferish: $r,
    write: Ba,
    fetch: r,
    flush: e,
    push: en,
    pull: t,
    read: tn,
    reserve: n,
    send: a,
    maxBufferSize: Ea,
    minBufferSize: ga,
    offset: 0,
    start: 0
  };
  function r() {
    var o = this.start;
    if (o < this.offset) {
      var u = this.start = this.offset;
      return $r.prototype.slice.call(this.buffer, o, u);
    }
  }
  function e() {
    for (; this.start < this.offset; ) {
      var o = this.fetch();
      o && this.push(o);
    }
  }
  function t() {
    var o = this.buffers || (this.buffers = []), u = o.length > 1 ? this.bufferish.concat(o) : o[0];
    return o.length = 0, u;
  }
  function n(o) {
    var u = o | 0;
    if (this.buffer) {
      var l = this.buffer.length, v = this.offset | 0, d = v + u;
      if (d < l)
        return this.offset = d, v;
      this.flush(), o = Math.max(o, Math.min(l * 2, this.maxBufferSize));
    }
    return o = Math.max(o, this.minBufferSize), this.buffer = this.bufferish.alloc(o), this.start = 0, this.offset = u, 0;
  }
  function a(o) {
    var u = o.length;
    if (u > this.minBufferSize)
      this.flush(), this.push(o);
    else {
      var l = this.reserve(u);
      $r.prototype.copy.call(o, this.buffer, l);
    }
  }
}
function Ba() {
  throw new Error("method not implemented: write()");
}
function ma() {
  throw new Error("method not implemented: fetch()");
}
function tn() {
  var r = this.buffers && this.buffers.length;
  return r ? (this.flush(), this.pull()) : this.fetch();
}
function en(r) {
  var e = this.buffers || (this.buffers = []);
  e.push(r);
}
function Aa() {
  var r = this.buffers || (this.buffers = []);
  return r.shift();
}
function nn(r) {
  return e;
  function e(t) {
    for (var n in r)
      t[n] = r[n];
    return t;
  }
}
var Pe;
function an() {
  if (Pe)
    return Pt;
  Pe = 1, Pt.EncodeBuffer = t;
  var r = Jt().preset, e = dt.FlexEncoder;
  e.mixin(t.prototype);
  function t(n) {
    if (!(this instanceof t))
      return new t(n);
    if (n && (this.options = n, n.codec)) {
      var a = this.codec = n.codec;
      a.bufferish && (this.bufferish = a.bufferish);
    }
  }
  return t.prototype.codec = r, t.prototype.write = function(n) {
    this.codec.encode(this, n);
  }, Pt;
}
var ke;
function on() {
  if (ke)
    return It;
  ke = 1, It.encode = e;
  var r = an().EncodeBuffer;
  function e(t, n) {
    var a = new r(n);
    return a.write(t), a.read();
  }
  return It;
}
var jt = {}, Dt = {}, Mt = {}, $t = {}, Ce;
function Ua() {
  if (Ce)
    return $t;
  Ce = 1, $t.setExtUnpackers = a;
  var r = rr(), e = r.global, t, n = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
  function a(c) {
    c.addExtUnpacker(14, [o, l(Error)]), c.addExtUnpacker(1, [o, l(EvalError)]), c.addExtUnpacker(2, [o, l(RangeError)]), c.addExtUnpacker(3, [o, l(ReferenceError)]), c.addExtUnpacker(4, [o, l(SyntaxError)]), c.addExtUnpacker(5, [o, l(TypeError)]), c.addExtUnpacker(6, [o, l(URIError)]), c.addExtUnpacker(10, [o, u]), c.addExtUnpacker(11, [o, v(Boolean)]), c.addExtUnpacker(12, [o, v(String)]), c.addExtUnpacker(13, [o, v(Date)]), c.addExtUnpacker(15, [o, v(Number)]), typeof Uint8Array < "u" && (c.addExtUnpacker(17, v(Int8Array)), c.addExtUnpacker(18, v(Uint8Array)), c.addExtUnpacker(19, [d, v(Int16Array)]), c.addExtUnpacker(20, [d, v(Uint16Array)]), c.addExtUnpacker(21, [d, v(Int32Array)]), c.addExtUnpacker(22, [d, v(Uint32Array)]), c.addExtUnpacker(23, [d, v(Float32Array)]), typeof Float64Array < "u" && c.addExtUnpacker(24, [d, v(Float64Array)]), typeof Uint8ClampedArray < "u" && c.addExtUnpacker(25, v(Uint8ClampedArray)), c.addExtUnpacker(26, d), c.addExtUnpacker(29, [d, v(DataView)])), r.hasBuffer && c.addExtUnpacker(27, v(e));
  }
  function o(c) {
    return t || (t = vn().decode), t(c);
  }
  function u(c) {
    return RegExp.apply(null, c);
  }
  function l(c) {
    return function(p) {
      var y = new c();
      for (var g in n)
        y[g] = p[g];
      return y;
    };
  }
  function v(c) {
    return function(p) {
      return new c(p);
    };
  }
  function d(c) {
    return new Uint8Array(c).buffer;
  }
  return $t;
}
var vt = {}, fn = ht, un = lt, sn = un.Uint64BE, cn = un.Int64BE;
vt.getReadFormat = Ta;
vt.readUint8 = ln;
var Qt = rr(), xt = Kt(), Sa = typeof Map < "u", Fa = !0;
function Ta(r) {
  var e = Qt.hasArrayBuffer && r && r.binarraybuffer, t = r && r.int64, n = Sa && r && r.usemap, a = {
    map: n ? Pa : Ia,
    array: ka,
    str: Ca,
    bin: e ? Oa : Ra,
    ext: ja,
    uint8: ln,
    uint16: Ma,
    uint32: Na,
    uint64: Xr(8, t ? Ya : za),
    int8: Da,
    int16: $a,
    int32: qa,
    int64: Xr(8, t ? Ha : La),
    float32: Xr(4, Va),
    float64: Xr(8, Wa)
  };
  return a;
}
function Ia(r, e) {
  var t = {}, n, a = new Array(e), o = new Array(e), u = r.codec.decode;
  for (n = 0; n < e; n++)
    a[n] = u(r), o[n] = u(r);
  for (n = 0; n < e; n++)
    t[a[n]] = o[n];
  return t;
}
function Pa(r, e) {
  var t = /* @__PURE__ */ new Map(), n, a = new Array(e), o = new Array(e), u = r.codec.decode;
  for (n = 0; n < e; n++)
    a[n] = u(r), o[n] = u(r);
  for (n = 0; n < e; n++)
    t.set(a[n], o[n]);
  return t;
}
function ka(r, e) {
  for (var t = new Array(e), n = r.codec.decode, a = 0; a < e; a++)
    t[a] = n(r);
  return t;
}
function Ca(r, e) {
  var t = r.reserve(e), n = t + e;
  return xt.toString.call(r.buffer, "utf-8", t, n);
}
function Ra(r, e) {
  var t = r.reserve(e), n = t + e, a = xt.slice.call(r.buffer, t, n);
  return Qt.from(a);
}
function Oa(r, e) {
  var t = r.reserve(e), n = t + e, a = xt.slice.call(r.buffer, t, n);
  return Qt.Uint8Array.from(a).buffer;
}
function ja(r, e) {
  var t = r.reserve(e + 1), n = r.buffer[t++], a = t + e, o = r.codec.getExtUnpacker(n);
  if (!o)
    throw new Error("Invalid ext type: " + (n && "0x" + n.toString(16)));
  var u = xt.slice.call(r.buffer, t, a);
  return o(u);
}
function ln(r) {
  var e = r.reserve(1);
  return r.buffer[e];
}
function Da(r) {
  var e = r.reserve(1), t = r.buffer[e];
  return t & 128 ? t - 256 : t;
}
function Ma(r) {
  var e = r.reserve(2), t = r.buffer;
  return t[e++] << 8 | t[e];
}
function $a(r) {
  var e = r.reserve(2), t = r.buffer, n = t[e++] << 8 | t[e];
  return n & 32768 ? n - 65536 : n;
}
function Na(r) {
  var e = r.reserve(4), t = r.buffer;
  return t[e++] * 16777216 + (t[e++] << 16) + (t[e++] << 8) + t[e];
}
function qa(r) {
  var e = r.reserve(4), t = r.buffer;
  return t[e++] << 24 | t[e++] << 16 | t[e++] << 8 | t[e];
}
function Xr(r, e) {
  return function(t) {
    var n = t.reserve(r);
    return e.call(t.buffer, n, Fa);
  };
}
function za(r) {
  return new sn(this, r).toNumber();
}
function La(r) {
  return new cn(this, r).toNumber();
}
function Ya(r) {
  return new sn(this, r);
}
function Ha(r) {
  return new cn(this, r);
}
function Va(r) {
  return fn.read(this, r, !1, 23, 4);
}
function Wa(r) {
  return fn.read(this, r, !1, 52, 8);
}
var hn = {}, Ga = vt;
hn.getReadToken = Ka;
function Ka(r) {
  var e = Ga.getReadFormat(r);
  return r && r.useraw ? Za(e) : pn(e);
}
function pn(r) {
  var e, t = new Array(256);
  for (e = 0; e <= 127; e++)
    t[e] = Mr(e);
  for (e = 128; e <= 143; e++)
    t[e] = cr(e - 128, r.map);
  for (e = 144; e <= 159; e++)
    t[e] = cr(e - 144, r.array);
  for (e = 160; e <= 191; e++)
    t[e] = cr(e - 160, r.str);
  for (t[192] = Mr(null), t[193] = null, t[194] = Mr(!1), t[195] = Mr(!0), t[196] = J(r.uint8, r.bin), t[197] = J(r.uint16, r.bin), t[198] = J(r.uint32, r.bin), t[199] = J(r.uint8, r.ext), t[200] = J(r.uint16, r.ext), t[201] = J(r.uint32, r.ext), t[202] = r.float32, t[203] = r.float64, t[204] = r.uint8, t[205] = r.uint16, t[206] = r.uint32, t[207] = r.uint64, t[208] = r.int8, t[209] = r.int16, t[210] = r.int32, t[211] = r.int64, t[212] = cr(1, r.ext), t[213] = cr(2, r.ext), t[214] = cr(4, r.ext), t[215] = cr(8, r.ext), t[216] = cr(16, r.ext), t[217] = J(r.uint8, r.str), t[218] = J(r.uint16, r.str), t[219] = J(r.uint32, r.str), t[220] = J(r.uint16, r.array), t[221] = J(r.uint32, r.array), t[222] = J(r.uint16, r.map), t[223] = J(r.uint32, r.map), e = 224; e <= 255; e++)
    t[e] = Mr(e - 256);
  return t;
}
function Za(r) {
  var e, t = pn(r).slice();
  for (t[217] = t[196], t[218] = t[197], t[219] = t[198], e = 160; e <= 191; e++)
    t[e] = cr(e - 160, r.bin);
  return t;
}
function Mr(r) {
  return function() {
    return r;
  };
}
function J(r, e) {
  return function(t) {
    var n = r(t);
    return e(t, n);
  };
}
function cr(r, e) {
  return function(t) {
    return e(t, r);
  };
}
var Re;
function Xt() {
  if (Re)
    return Mt;
  Re = 1;
  var r = st.ExtBuffer, e = Ua(), t = vt.readUint8, n = hn, a = dr;
  a.install({
    addExtUnpacker: l,
    getExtUnpacker: v,
    init: u
  }), Mt.preset = u.call(a.preset);
  function o(d) {
    var c = n.getReadToken(d);
    return p;
    function p(y) {
      var g = t(y), _ = c[g];
      if (!_)
        throw new Error("Invalid type: " + (g && "0x" + g.toString(16)));
      return _(y);
    }
  }
  function u() {
    var d = this.options;
    return this.decode = o(d), d && d.preset && e.setExtUnpackers(this), this;
  }
  function l(d, c) {
    var p = this.extUnpackers || (this.extUnpackers = []);
    p[d] = a.filter(c);
  }
  function v(d) {
    var c = this.extUnpackers || (this.extUnpackers = []);
    return c[d] || p;
    function p(y) {
      return new r(y, d);
    }
  }
  return Mt;
}
var Oe;
function dn() {
  if (Oe)
    return Dt;
  Oe = 1, Dt.DecodeBuffer = t;
  var r = Xt().preset, e = dt.FlexDecoder;
  e.mixin(t.prototype);
  function t(n) {
    if (!(this instanceof t))
      return new t(n);
    if (n && (this.options = n, n.codec)) {
      var a = this.codec = n.codec;
      a.bufferish && (this.bufferish = a.bufferish);
    }
  }
  return t.prototype.codec = r, t.prototype.fetch = function() {
    return this.codec.decode(this);
  }, Dt;
}
var je;
function vn() {
  if (je)
    return jt;
  je = 1, jt.decode = e;
  var r = dn().DecodeBuffer;
  function e(t, n) {
    var a = new r(n);
    return a.write(t), a.read();
  }
  return jt;
}
var xn = {}, at = {}, Ja = {
  get exports() {
    return at;
  },
  set exports(r) {
    at = r;
  }
};
/**
 * event-lite.js - Light-weight EventEmitter (less than 1KB when gzipped)
 *
 * @copyright Yusuke Kawasaki
 * @license MIT
 * @constructor
 * @see https://github.com/kawanet/event-lite
 * @see http://kawanet.github.io/event-lite/EventLite.html
 * @example
 * var EventLite = require("event-lite");
 *
 * function MyClass() {...}             // your class
 *
 * EventLite.mixin(MyClass.prototype);  // import event methods
 *
 * var obj = new MyClass();
 * obj.on("foo", function() {...});     // add event listener
 * obj.once("bar", function() {...});   // add one-time event listener
 * obj.emit("foo");                     // dispatch event
 * obj.emit("bar");                     // dispatch another event
 * obj.off("foo");                      // remove event listener
 */
(function(r) {
  function e() {
    if (!(this instanceof e))
      return new e();
  }
  (function(t) {
    r.exports = t;
    var n = "listeners", a = {
      on: u,
      once: l,
      off: v,
      emit: d
    };
    o(t.prototype), t.mixin = o;
    function o(p) {
      for (var y in a)
        p[y] = a[y];
      return p;
    }
    function u(p, y) {
      return c(this, p).push(y), this;
    }
    function l(p, y) {
      var g = this;
      return _.originalListener = y, c(g, p).push(_), g;
      function _() {
        v.call(g, p, _), y.apply(this, arguments);
      }
    }
    function v(p, y) {
      var g = this, _;
      if (!arguments.length)
        delete g[n];
      else if (y) {
        if (_ = c(g, p, !0), _) {
          if (_ = _.filter(U), !_.length)
            return v.call(g, p);
          g[n][p] = _;
        }
      } else if (_ = g[n], _ && (delete _[p], !Object.keys(_).length))
        return v.call(g);
      return g;
      function U(z) {
        return z !== y && z.originalListener !== y;
      }
    }
    function d(p, y) {
      var g = this, _ = c(g, p, !0);
      if (!_)
        return !1;
      var U = arguments.length;
      if (U === 1)
        _.forEach(tr);
      else if (U === 2)
        _.forEach(V);
      else {
        var z = Array.prototype.slice.call(arguments, 1);
        _.forEach(ir);
      }
      return !!_.length;
      function tr(S) {
        S.call(g);
      }
      function V(S) {
        S.call(g, y);
      }
      function ir(S) {
        S.apply(g, z);
      }
    }
    function c(p, y, g) {
      if (!(g && !p[n])) {
        var _ = p[n] || (p[n] = {});
        return _[y] || (_[y] = []);
      }
    }
  })(e);
})(Ja);
xn.Encoder = Br;
var Qa = at, yn = an().EncodeBuffer;
function Br(r) {
  if (!(this instanceof Br))
    return new Br(r);
  yn.call(this, r);
}
Br.prototype = new yn();
Qa.mixin(Br.prototype);
Br.prototype.encode = function(r) {
  this.write(r), this.emit("data", this.read());
};
Br.prototype.end = function(r) {
  arguments.length && this.encode(r), this.flush(), this.emit("end");
};
var bn = {};
bn.Decoder = pr;
var Xa = at, gn = dn().DecodeBuffer;
function pr(r) {
  if (!(this instanceof pr))
    return new pr(r);
  gn.call(this, r);
}
pr.prototype = new gn();
Xa.mixin(pr.prototype);
pr.prototype.decode = function(r) {
  arguments.length && this.write(r), this.flush();
};
pr.prototype.push = function(r) {
  this.emit("data", r);
};
pr.prototype.end = function(r) {
  this.decode(r), this.emit("end");
};
var En = {};
Xt();
Jt();
En.createCodec = dr.createCodec;
var wn = {};
Xt();
Jt();
wn.codec = {
  preset: dr.preset
};
mr.encode = on().encode;
mr.decode = vn().decode;
mr.Encoder = xn.Encoder;
mr.Decoder = bn.Decoder;
mr.createCodec = En.createCodec;
mr.codec = wn.codec;
var ot = {}, ro = {
  get exports() {
    return ot;
  },
  set exports(r) {
    ot = r;
  }
};
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", a = 800, o = 16, u = 9007199254740991, l = "[object Arguments]", v = "[object Array]", d = "[object AsyncFunction]", c = "[object Boolean]", p = "[object Date]", y = "[object Error]", g = "[object Function]", _ = "[object GeneratorFunction]", U = "[object Map]", z = "[object Number]", tr = "[object Null]", V = "[object Object]", ir = "[object Proxy]", S = "[object RegExp]", L = "[object Set]", Y = "[object String]", A = "[object Undefined]", w = "[object WeakMap]", F = "[object ArrayBuffer]", h = "[object DataView]", x = "[object Float32Array]", E = "[object Float64Array]", C = "[object Int8Array]", N = "[object Int16Array]", W = "[object Int32Array]", Q = "[object Uint8Array]", hr = "[object Uint8ClampedArray]", H = "[object Uint16Array]", ar = "[object Uint32Array]", Ar = /[\\^$.*+?()[\]{}|]/g, or = /^\[object .+?Constructor\]$/, Cr = /^(?:0|[1-9]\d*)$/, O = {};
  O[x] = O[E] = O[C] = O[N] = O[W] = O[Q] = O[hr] = O[H] = O[ar] = !0, O[l] = O[v] = O[F] = O[c] = O[h] = O[p] = O[y] = O[g] = O[U] = O[z] = O[V] = O[S] = O[L] = O[Y] = O[w] = !1;
  var qr = typeof _r == "object" && _r && _r.Object === Object && _r, zr = typeof self == "object" && self && self.Object === Object && self, vr = qr || zr || Function("return this")(), xr = e && !e.nodeType && e, fr = xr && !0 && r && !r.nodeType && r, T = fr && fr.exports === xr, B = T && qr.process, m = function() {
    try {
      var i = fr && fr.require && fr.require("util").types;
      return i || B && B.binding && B.binding("util");
    } catch {
    }
  }(), I = m && m.isTypedArray;
  function q(i, f, s) {
    switch (s.length) {
      case 0:
        return i.call(f);
      case 1:
        return i.call(f, s[0]);
      case 2:
        return i.call(f, s[0], s[1]);
      case 3:
        return i.call(f, s[0], s[1], s[2]);
    }
    return i.apply(f, s);
  }
  function er(i, f) {
    for (var s = -1, b = Array(i); ++s < i; )
      b[s] = f(s);
    return b;
  }
  function nr(i) {
    return function(f) {
      return i(f);
    };
  }
  function K(i, f) {
    return i == null ? void 0 : i[f];
  }
  function bt(i, f) {
    return function(s) {
      return i(f(s));
    };
  }
  var Lr = Array.prototype, Tn = Function.prototype, Yr = Object.prototype, gt = vr["__core-js_shared__"], Hr = Tn.toString, ur = Yr.hasOwnProperty, te = function() {
    var i = /[^.]+$/.exec(gt && gt.keys && gt.keys.IE_PROTO || "");
    return i ? "Symbol(src)_1." + i : "";
  }(), ee = Yr.toString, In = Hr.call(Object), Pn = RegExp(
    "^" + Hr.call(ur).replace(Ar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Vr = T ? vr.Buffer : void 0, ne = vr.Symbol, ie = vr.Uint8Array, ae = Vr ? Vr.allocUnsafe : void 0, oe = bt(Object.getPrototypeOf, Object), fe = Object.create, kn = Yr.propertyIsEnumerable, Cn = Lr.splice, yr = ne ? ne.toStringTag : void 0, Wr = function() {
    try {
      var i = _t(Object, "defineProperty");
      return i({}, "", {}), i;
    } catch {
    }
  }(), Rn = Vr ? Vr.isBuffer : void 0, ue = Math.max, On = Date.now, se = _t(vr, "Map"), Rr = _t(Object, "create"), jn = function() {
    function i() {
    }
    return function(f) {
      if (!gr(f))
        return {};
      if (fe)
        return fe(f);
      i.prototype = f;
      var s = new i();
      return i.prototype = void 0, s;
    };
  }();
  function br(i) {
    var f = -1, s = i == null ? 0 : i.length;
    for (this.clear(); ++f < s; ) {
      var b = i[f];
      this.set(b[0], b[1]);
    }
  }
  function Dn() {
    this.__data__ = Rr ? Rr(null) : {}, this.size = 0;
  }
  function Mn(i) {
    var f = this.has(i) && delete this.__data__[i];
    return this.size -= f ? 1 : 0, f;
  }
  function $n(i) {
    var f = this.__data__;
    if (Rr) {
      var s = f[i];
      return s === n ? void 0 : s;
    }
    return ur.call(f, i) ? f[i] : void 0;
  }
  function Nn(i) {
    var f = this.__data__;
    return Rr ? f[i] !== void 0 : ur.call(f, i);
  }
  function qn(i, f) {
    var s = this.__data__;
    return this.size += this.has(i) ? 0 : 1, s[i] = Rr && f === void 0 ? n : f, this;
  }
  br.prototype.clear = Dn, br.prototype.delete = Mn, br.prototype.get = $n, br.prototype.has = Nn, br.prototype.set = qn;
  function sr(i) {
    var f = -1, s = i == null ? 0 : i.length;
    for (this.clear(); ++f < s; ) {
      var b = i[f];
      this.set(b[0], b[1]);
    }
  }
  function zn() {
    this.__data__ = [], this.size = 0;
  }
  function Ln(i) {
    var f = this.__data__, s = Gr(f, i);
    if (s < 0)
      return !1;
    var b = f.length - 1;
    return s == b ? f.pop() : Cn.call(f, s, 1), --this.size, !0;
  }
  function Yn(i) {
    var f = this.__data__, s = Gr(f, i);
    return s < 0 ? void 0 : f[s][1];
  }
  function Hn(i) {
    return Gr(this.__data__, i) > -1;
  }
  function Vn(i, f) {
    var s = this.__data__, b = Gr(s, i);
    return b < 0 ? (++this.size, s.push([i, f])) : s[b][1] = f, this;
  }
  sr.prototype.clear = zn, sr.prototype.delete = Ln, sr.prototype.get = Yn, sr.prototype.has = Hn, sr.prototype.set = Vn;
  function Ur(i) {
    var f = -1, s = i == null ? 0 : i.length;
    for (this.clear(); ++f < s; ) {
      var b = i[f];
      this.set(b[0], b[1]);
    }
  }
  function Wn() {
    this.size = 0, this.__data__ = {
      hash: new br(),
      map: new (se || sr)(),
      string: new br()
    };
  }
  function Gn(i) {
    var f = Zr(this, i).delete(i);
    return this.size -= f ? 1 : 0, f;
  }
  function Kn(i) {
    return Zr(this, i).get(i);
  }
  function Zn(i) {
    return Zr(this, i).has(i);
  }
  function Jn(i, f) {
    var s = Zr(this, i), b = s.size;
    return s.set(i, f), this.size += s.size == b ? 0 : 1, this;
  }
  Ur.prototype.clear = Wn, Ur.prototype.delete = Gn, Ur.prototype.get = Kn, Ur.prototype.has = Zn, Ur.prototype.set = Jn;
  function Sr(i) {
    var f = this.__data__ = new sr(i);
    this.size = f.size;
  }
  function Qn() {
    this.__data__ = new sr(), this.size = 0;
  }
  function Xn(i) {
    var f = this.__data__, s = f.delete(i);
    return this.size = f.size, s;
  }
  function ri(i) {
    return this.__data__.get(i);
  }
  function ti(i) {
    return this.__data__.has(i);
  }
  function ei(i, f) {
    var s = this.__data__;
    if (s instanceof sr) {
      var b = s.__data__;
      if (!se || b.length < t - 1)
        return b.push([i, f]), this.size = ++s.size, this;
      s = this.__data__ = new Ur(b);
    }
    return s.set(i, f), this.size = s.size, this;
  }
  Sr.prototype.clear = Qn, Sr.prototype.delete = Xn, Sr.prototype.get = ri, Sr.prototype.has = ti, Sr.prototype.set = ei;
  function ni(i, f) {
    var s = At(i), b = !s && mt(i), k = !s && !b && de(i), j = !s && !b && !k && xe(i), D = s || b || k || j, P = D ? er(i.length, String) : [], M = P.length;
    for (var X in i)
      (f || ur.call(i, X)) && !(D && // Safari 9 has enumerable `arguments.length` in strict mode.
      (X == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      k && (X == "offset" || X == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      j && (X == "buffer" || X == "byteLength" || X == "byteOffset") || // Skip index properties.
      he(X, M))) && P.push(X);
    return P;
  }
  function Et(i, f, s) {
    (s !== void 0 && !Jr(i[f], s) || s === void 0 && !(f in i)) && wt(i, f, s);
  }
  function ii(i, f, s) {
    var b = i[f];
    (!(ur.call(i, f) && Jr(b, s)) || s === void 0 && !(f in i)) && wt(i, f, s);
  }
  function Gr(i, f) {
    for (var s = i.length; s--; )
      if (Jr(i[s][0], f))
        return s;
    return -1;
  }
  function wt(i, f, s) {
    f == "__proto__" && Wr ? Wr(i, f, {
      configurable: !0,
      enumerable: !0,
      value: s,
      writable: !0
    }) : i[f] = s;
  }
  var ai = bi();
  function Kr(i) {
    return i == null ? i === void 0 ? A : tr : yr && yr in Object(i) ? gi(i) : Ai(i);
  }
  function ce(i) {
    return Or(i) && Kr(i) == l;
  }
  function oi(i) {
    if (!gr(i) || Bi(i))
      return !1;
    var f = St(i) ? Pn : or;
    return f.test(Ti(i));
  }
  function fi(i) {
    return Or(i) && ve(i.length) && !!O[Kr(i)];
  }
  function ui(i) {
    if (!gr(i))
      return mi(i);
    var f = pe(i), s = [];
    for (var b in i)
      b == "constructor" && (f || !ur.call(i, b)) || s.push(b);
    return s;
  }
  function le(i, f, s, b, k) {
    i !== f && ai(f, function(j, D) {
      if (k || (k = new Sr()), gr(j))
        si(i, f, D, s, le, b, k);
      else {
        var P = b ? b(Bt(i, D), j, D + "", i, f, k) : void 0;
        P === void 0 && (P = j), Et(i, D, P);
      }
    }, ye);
  }
  function si(i, f, s, b, k, j, D) {
    var P = Bt(i, s), M = Bt(f, s), X = D.get(M);
    if (X) {
      Et(i, s, X);
      return;
    }
    var Z = j ? j(P, M, s + "", i, f, D) : void 0, jr = Z === void 0;
    if (jr) {
      var Ft = At(M), Tt = !Ft && de(M), ge = !Ft && !Tt && xe(M);
      Z = M, Ft || Tt || ge ? At(P) ? Z = P : Ii(P) ? Z = vi(P) : Tt ? (jr = !1, Z = hi(M, !0)) : ge ? (jr = !1, Z = di(M, !0)) : Z = [] : Pi(M) || mt(M) ? (Z = P, mt(P) ? Z = ki(P) : (!gr(P) || St(P)) && (Z = Ei(M))) : jr = !1;
    }
    jr && (D.set(M, Z), k(Z, M, b, j, D), D.delete(M)), Et(i, s, Z);
  }
  function ci(i, f) {
    return Si(Ui(i, f, be), i + "");
  }
  var li = Wr ? function(i, f) {
    return Wr(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Ri(f),
      writable: !0
    });
  } : be;
  function hi(i, f) {
    if (f)
      return i.slice();
    var s = i.length, b = ae ? ae(s) : new i.constructor(s);
    return i.copy(b), b;
  }
  function pi(i) {
    var f = new i.constructor(i.byteLength);
    return new ie(f).set(new ie(i)), f;
  }
  function di(i, f) {
    var s = f ? pi(i.buffer) : i.buffer;
    return new i.constructor(s, i.byteOffset, i.length);
  }
  function vi(i, f) {
    var s = -1, b = i.length;
    for (f || (f = Array(b)); ++s < b; )
      f[s] = i[s];
    return f;
  }
  function xi(i, f, s, b) {
    var k = !s;
    s || (s = {});
    for (var j = -1, D = f.length; ++j < D; ) {
      var P = f[j], M = b ? b(s[P], i[P], P, s, i) : void 0;
      M === void 0 && (M = i[P]), k ? wt(s, P, M) : ii(s, P, M);
    }
    return s;
  }
  function yi(i) {
    return ci(function(f, s) {
      var b = -1, k = s.length, j = k > 1 ? s[k - 1] : void 0, D = k > 2 ? s[2] : void 0;
      for (j = i.length > 3 && typeof j == "function" ? (k--, j) : void 0, D && wi(s[0], s[1], D) && (j = k < 3 ? void 0 : j, k = 1), f = Object(f); ++b < k; ) {
        var P = s[b];
        P && i(f, P, b, j);
      }
      return f;
    });
  }
  function bi(i) {
    return function(f, s, b) {
      for (var k = -1, j = Object(f), D = b(f), P = D.length; P--; ) {
        var M = D[i ? P : ++k];
        if (s(j[M], M, j) === !1)
          break;
      }
      return f;
    };
  }
  function Zr(i, f) {
    var s = i.__data__;
    return _i(f) ? s[typeof f == "string" ? "string" : "hash"] : s.map;
  }
  function _t(i, f) {
    var s = K(i, f);
    return oi(s) ? s : void 0;
  }
  function gi(i) {
    var f = ur.call(i, yr), s = i[yr];
    try {
      i[yr] = void 0;
      var b = !0;
    } catch {
    }
    var k = ee.call(i);
    return b && (f ? i[yr] = s : delete i[yr]), k;
  }
  function Ei(i) {
    return typeof i.constructor == "function" && !pe(i) ? jn(oe(i)) : {};
  }
  function he(i, f) {
    var s = typeof i;
    return f = f ?? u, !!f && (s == "number" || s != "symbol" && Cr.test(i)) && i > -1 && i % 1 == 0 && i < f;
  }
  function wi(i, f, s) {
    if (!gr(s))
      return !1;
    var b = typeof f;
    return (b == "number" ? Ut(s) && he(f, s.length) : b == "string" && f in s) ? Jr(s[f], i) : !1;
  }
  function _i(i) {
    var f = typeof i;
    return f == "string" || f == "number" || f == "symbol" || f == "boolean" ? i !== "__proto__" : i === null;
  }
  function Bi(i) {
    return !!te && te in i;
  }
  function pe(i) {
    var f = i && i.constructor, s = typeof f == "function" && f.prototype || Yr;
    return i === s;
  }
  function mi(i) {
    var f = [];
    if (i != null)
      for (var s in Object(i))
        f.push(s);
    return f;
  }
  function Ai(i) {
    return ee.call(i);
  }
  function Ui(i, f, s) {
    return f = ue(f === void 0 ? i.length - 1 : f, 0), function() {
      for (var b = arguments, k = -1, j = ue(b.length - f, 0), D = Array(j); ++k < j; )
        D[k] = b[f + k];
      k = -1;
      for (var P = Array(f + 1); ++k < f; )
        P[k] = b[k];
      return P[f] = s(D), q(i, this, P);
    };
  }
  function Bt(i, f) {
    if (!(f === "constructor" && typeof i[f] == "function") && f != "__proto__")
      return i[f];
  }
  var Si = Fi(li);
  function Fi(i) {
    var f = 0, s = 0;
    return function() {
      var b = On(), k = o - (b - s);
      if (s = b, k > 0) {
        if (++f >= a)
          return arguments[0];
      } else
        f = 0;
      return i.apply(void 0, arguments);
    };
  }
  function Ti(i) {
    if (i != null) {
      try {
        return Hr.call(i);
      } catch {
      }
      try {
        return i + "";
      } catch {
      }
    }
    return "";
  }
  function Jr(i, f) {
    return i === f || i !== i && f !== f;
  }
  var mt = ce(function() {
    return arguments;
  }()) ? ce : function(i) {
    return Or(i) && ur.call(i, "callee") && !kn.call(i, "callee");
  }, At = Array.isArray;
  function Ut(i) {
    return i != null && ve(i.length) && !St(i);
  }
  function Ii(i) {
    return Or(i) && Ut(i);
  }
  var de = Rn || Oi;
  function St(i) {
    if (!gr(i))
      return !1;
    var f = Kr(i);
    return f == g || f == _ || f == d || f == ir;
  }
  function ve(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= u;
  }
  function gr(i) {
    var f = typeof i;
    return i != null && (f == "object" || f == "function");
  }
  function Or(i) {
    return i != null && typeof i == "object";
  }
  function Pi(i) {
    if (!Or(i) || Kr(i) != V)
      return !1;
    var f = oe(i);
    if (f === null)
      return !0;
    var s = ur.call(f, "constructor") && f.constructor;
    return typeof s == "function" && s instanceof s && Hr.call(s) == In;
  }
  var xe = I ? nr(I) : fi;
  function ki(i) {
    return xi(i, ye(i));
  }
  function ye(i) {
    return Ut(i) ? ni(i, !0) : ui(i);
  }
  var Ci = yi(function(i, f, s, b) {
    le(i, f, s, b);
  });
  function Ri(i) {
    return function() {
      return i;
    };
  }
  function be(i) {
    return i;
  }
  function Oi() {
    return !1;
  }
  r.exports = Ci;
})(ro, ot);
var Lt = function(r, e) {
  return Lt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var a in n)
      Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
  }, Lt(r, e);
};
function Nr(r, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Lt(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function Yt(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], n = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && n >= r.length && (r = void 0), { value: r && r[n++], done: !r };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ft(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var n = t.call(r), a, o = [], u;
  try {
    for (; (e === void 0 || e-- > 0) && !(a = n.next()).done; )
      o.push(a.value);
  } catch (l) {
    u = { error: l };
  } finally {
    try {
      a && !a.done && (t = n.return) && t.call(n);
    } finally {
      if (u)
        throw u.error;
    }
  }
  return o;
}
function ut(r, e, t) {
  if (t || arguments.length === 2)
    for (var n = 0, a = e.length, o; n < a; n++)
      (o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]);
  return r.concat(o || Array.prototype.slice.call(e));
}
function lr(r) {
  return typeof r == "function";
}
function _n(r) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, t = r(e);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var Nt = _n(function(r) {
  return function(t) {
    r(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(n, a) {
      return a + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function Ht(r, e) {
  if (r) {
    var t = r.indexOf(e);
    0 <= t && r.splice(t, 1);
  }
}
var yt = function() {
  function r(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var e, t, n, a, o;
    if (!this.closed) {
      this.closed = !0;
      var u = this._parentage;
      if (u)
        if (this._parentage = null, Array.isArray(u))
          try {
            for (var l = Yt(u), v = l.next(); !v.done; v = l.next()) {
              var d = v.value;
              d.remove(this);
            }
          } catch (U) {
            e = { error: U };
          } finally {
            try {
              v && !v.done && (t = l.return) && t.call(l);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          u.remove(this);
      var c = this.initialTeardown;
      if (lr(c))
        try {
          c();
        } catch (U) {
          o = U instanceof Nt ? U.errors : [U];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var y = Yt(p), g = y.next(); !g.done; g = y.next()) {
            var _ = g.value;
            try {
              De(_);
            } catch (U) {
              o = o ?? [], U instanceof Nt ? o = ut(ut([], ft(o)), ft(U.errors)) : o.push(U);
            }
          }
        } catch (U) {
          n = { error: U };
        } finally {
          try {
            g && !g.done && (a = y.return) && a.call(y);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (o)
        throw new Nt(o);
    }
  }, r.prototype.add = function(e) {
    var t;
    if (e && e !== this)
      if (this.closed)
        De(e);
      else {
        if (e instanceof r) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(e);
      }
  }, r.prototype._hasParent = function(e) {
    var t = this._parentage;
    return t === e || Array.isArray(t) && t.includes(e);
  }, r.prototype._addParent = function(e) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
  }, r.prototype._removeParent = function(e) {
    var t = this._parentage;
    t === e ? this._parentage = null : Array.isArray(t) && Ht(t, e);
  }, r.prototype.remove = function(e) {
    var t = this._finalizers;
    t && Ht(t, e), e instanceof r && e._removeParent(this);
  }, r.EMPTY = function() {
    var e = new r();
    return e.closed = !0, e;
  }(), r;
}(), Bn = yt.EMPTY;
function mn(r) {
  return r instanceof yt || r && "closed" in r && lr(r.remove) && lr(r.add) && lr(r.unsubscribe);
}
function De(r) {
  lr(r) ? r() : r.unsubscribe();
}
var An = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Vt = {
  setTimeout: function(r, e) {
    for (var t = [], n = 2; n < arguments.length; n++)
      t[n - 2] = arguments[n];
    var a = Vt.delegate;
    return a != null && a.setTimeout ? a.setTimeout.apply(a, ut([r, e], ft(t))) : setTimeout.apply(void 0, ut([r, e], ft(t)));
  },
  clearTimeout: function(r) {
    var e = Vt.delegate;
    return ((e == null ? void 0 : e.clearTimeout) || clearTimeout)(r);
  },
  delegate: void 0
};
function to(r) {
  Vt.setTimeout(function() {
    throw r;
  });
}
function Me() {
}
function tt(r) {
  r();
}
var Un = function(r) {
  Nr(e, r);
  function e(t) {
    var n = r.call(this) || this;
    return n.isStopped = !1, t ? (n.destination = t, mn(t) && t.add(n)) : n.destination = ao, n;
  }
  return e.create = function(t, n, a) {
    return new Wt(t, n, a);
  }, e.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, e.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(t) {
    this.destination.next(t);
  }, e.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(yt), eo = Function.prototype.bind;
function qt(r, e) {
  return eo.call(r, e);
}
var no = function() {
  function r(e) {
    this.partialObserver = e;
  }
  return r.prototype.next = function(e) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(e);
      } catch (n) {
        rt(n);
      }
  }, r.prototype.error = function(e) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(e);
      } catch (n) {
        rt(n);
      }
    else
      rt(e);
  }, r.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (t) {
        rt(t);
      }
  }, r;
}(), Wt = function(r) {
  Nr(e, r);
  function e(t, n, a) {
    var o = r.call(this) || this, u;
    if (lr(t) || !t)
      u = {
        next: t ?? void 0,
        error: n ?? void 0,
        complete: a ?? void 0
      };
    else {
      var l;
      o && An.useDeprecatedNextContext ? (l = Object.create(t), l.unsubscribe = function() {
        return o.unsubscribe();
      }, u = {
        next: t.next && qt(t.next, l),
        error: t.error && qt(t.error, l),
        complete: t.complete && qt(t.complete, l)
      }) : u = t;
    }
    return o.destination = new no(u), o;
  }
  return e;
}(Un);
function rt(r) {
  to(r);
}
function io(r) {
  throw r;
}
var ao = {
  closed: !0,
  next: Me,
  error: io,
  complete: Me
}, oo = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function fo(r) {
  return r;
}
function uo(r) {
  return r.length === 0 ? fo : r.length === 1 ? r[0] : function(t) {
    return r.reduce(function(n, a) {
      return a(n);
    }, t);
  };
}
var $e = function() {
  function r(e) {
    e && (this._subscribe = e);
  }
  return r.prototype.lift = function(e) {
    var t = new r();
    return t.source = this, t.operator = e, t;
  }, r.prototype.subscribe = function(e, t, n) {
    var a = this, o = co(e) ? e : new Wt(e, t, n);
    return tt(function() {
      var u = a, l = u.operator, v = u.source;
      o.add(l ? l.call(o, v) : v ? a._subscribe(o) : a._trySubscribe(o));
    }), o;
  }, r.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (t) {
      e.error(t);
    }
  }, r.prototype.forEach = function(e, t) {
    var n = this;
    return t = Ne(t), new t(function(a, o) {
      var u = new Wt({
        next: function(l) {
          try {
            e(l);
          } catch (v) {
            o(v), u.unsubscribe();
          }
        },
        error: o,
        complete: a
      });
      n.subscribe(u);
    });
  }, r.prototype._subscribe = function(e) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e);
  }, r.prototype[oo] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return uo(e)(this);
  }, r.prototype.toPromise = function(e) {
    var t = this;
    return e = Ne(e), new e(function(n, a) {
      var o;
      t.subscribe(function(u) {
        return o = u;
      }, function(u) {
        return a(u);
      }, function() {
        return n(o);
      });
    });
  }, r.create = function(e) {
    return new r(e);
  }, r;
}();
function Ne(r) {
  var e;
  return (e = r ?? An.Promise) !== null && e !== void 0 ? e : Promise;
}
function so(r) {
  return r && lr(r.next) && lr(r.error) && lr(r.complete);
}
function co(r) {
  return r && r instanceof Un || so(r) && mn(r);
}
var lo = _n(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Sn = function(r) {
  Nr(e, r);
  function e() {
    var t = r.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return e.prototype.lift = function(t) {
    var n = new qe(this, this);
    return n.operator = t, n;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new lo();
  }, e.prototype.next = function(t) {
    var n = this;
    tt(function() {
      var a, o;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var u = Yt(n.currentObservers), l = u.next(); !l.done; l = u.next()) {
            var v = l.value;
            v.next(t);
          }
        } catch (d) {
          a = { error: d };
        } finally {
          try {
            l && !l.done && (o = u.return) && o.call(u);
          } finally {
            if (a)
              throw a.error;
          }
        }
      }
    });
  }, e.prototype.error = function(t) {
    var n = this;
    tt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = t;
        for (var a = n.observers; a.length; )
          a.shift().error(t);
      }
    });
  }, e.prototype.complete = function() {
    var t = this;
    tt(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var n = t.observers; n.length; )
          n.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, t);
  }, e.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, e.prototype._innerSubscribe = function(t) {
    var n = this, a = this, o = a.hasError, u = a.isStopped, l = a.observers;
    return o || u ? Bn : (this.currentObservers = null, l.push(t), new yt(function() {
      n.currentObservers = null, Ht(l, t);
    }));
  }, e.prototype._checkFinalizedStatuses = function(t) {
    var n = this, a = n.hasError, o = n.thrownError, u = n.isStopped;
    a ? t.error(o) : u && t.complete();
  }, e.prototype.asObservable = function() {
    var t = new $e();
    return t.source = this, t;
  }, e.create = function(t, n) {
    return new qe(t, n);
  }, e;
}($e), qe = function(r) {
  Nr(e, r);
  function e(t, n) {
    var a = r.call(this) || this;
    return a.destination = t, a.source = n, a;
  }
  return e.prototype.next = function(t) {
    var n, a;
    (a = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || a === void 0 || a.call(n, t);
  }, e.prototype.error = function(t) {
    var n, a;
    (a = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || a === void 0 || a.call(n, t);
  }, e.prototype.complete = function() {
    var t, n;
    (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t);
  }, e.prototype._subscribe = function(t) {
    var n, a;
    return (a = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && a !== void 0 ? a : Bn;
  }, e;
}(Sn), ze = function(r) {
  Nr(e, r);
  function e(t) {
    var n = r.call(this) || this;
    return n._value = t, n;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._subscribe = function(t) {
    var n = r.prototype._subscribe.call(this, t);
    return !n.closed && t.next(this._value), n;
  }, e.prototype.getValue = function() {
    var t = this, n = t.hasError, a = t.thrownError, o = t._value;
    if (n)
      throw a;
    return this._throwIfClosed(), o;
  }, e.prototype.next = function(t) {
    r.prototype.next.call(this, this._value = t);
  }, e;
}(Sn);
let ho = Symbol("clean"), G = [], po = (r, e) => {
  let t, n = [], a = {
    lc: 0,
    l: e || 0,
    value: r,
    set(o) {
      a.value = o, a.notify();
    },
    get() {
      return a.lc || a.listen(() => {
      })(), a.value;
    },
    notify(o) {
      t = n;
      let u = !G.length;
      for (let l = 0; l < t.length; l += 2)
        G.push(
          t[l],
          a.value,
          o,
          t[l + 1]
        );
      if (u) {
        for (let l = 0; l < G.length; l += 4) {
          let v = !1;
          for (let d = l + 7; d < G.length; d += 4)
            if (G[d] < G[l + 3]) {
              v = !0;
              break;
            }
          v ? G.push(
            G[l],
            G[l + 1],
            G[l + 2],
            G[l + 3]
          ) : G[l](G[l + 1], G[l + 2]);
        }
        G.length = 0;
      }
    },
    listen(o, u) {
      return n === t && (n = n.slice()), a.lc = n.push(o, u || a.l) / 2, () => {
        n === t && (n = n.slice());
        let l = n.indexOf(o);
        ~l && (n.splice(l, 2), a.lc--, a.lc || a.off());
      };
    },
    subscribe(o, u) {
      let l = a.listen(o, u);
      return o(a.value), l;
    },
    off() {
    }
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
  };
  return {}.NODE_ENV !== "production" && (a[ho] = () => {
    n = [], a.lc = 0, a.off();
  }), a;
};
const vo = po({});
class xo {
  constructor(e) {
    this.collectionClass = e, this.collection = /* @__PURE__ */ new Map(), this.removeCb = (t) => {
    }, this.addCb = (t, n) => {
    };
  }
  registerRemoveCallback(e) {
    this.removeCb = e;
  }
  registerAddCallback(e) {
    this.addCb = e;
  }
  detectChanges(e) {
    let t = {};
    for (let n in e) {
      const a = e[n];
      if (a == null) {
        this.collection.delete(n), this.removeCb(n);
        continue;
      }
      const o = this.collectionClass ? new this.collectionClass(a, n) : a;
      this.collection.has(n) || this.addCb(n, o), this.collection.set(n, o), t[n] = o;
    }
    return t;
  }
}
class yo {
  constructor(e, t) {
    this.id = t, Object.assign(this, e);
  }
  isMe() {
    return re.userId == this.id;
  }
}
const Fn = class {
  constructor() {
    this.obs$ = new ze({}), this.users = new xo(yo);
  }
  get value() {
    return this.obs$.asObservable();
  }
  /**
   * Join an existing room
   * 
   * @param {string} roomId 
   */
  join(r) {
    this.socket.emit(":join", r);
  }
  /**
   * Change the value of a property
   * 
   * @param {string} prop 
   * @param {any} value
   */
  input(r, e) {
    return this.socket.emit(":input", { prop: r, value: e }), {
      catchError: (t) => this.socket.once(":error", t)
    };
  }
  /**
  * Do an action
  * 
  * @param {string} name 
  * @param {any} value
  */
  action(r, e) {
    return this.socket.emit(":action", { name: r, value: e }), {
      catchError: (t) => this.socket.once(":error", t)
    };
  }
  /**
   * Listen to the changes on a socket
   * 
   * @param {string} socket 
   * @return {World}
   */
  listen(r, e) {
    return this.socket = r, this.socket.on("uid", (t) => {
      Fn.userId = t;
    }), this.socket.on("w", (t) => {
      const n = new Uint8Array(t), a = mr.decode(n), [o, u, l] = a, v = this.obs$.value.roomId;
      let d = {};
      v == o ? (l.join = !1, d = ot({ ...this.obs$.value.data || {} }, l, (c, p) => {
        if (typeof p == "object" && p != null && Object.values(p).length == 0)
          return {};
      })) : d = l, l.users && (d.users = this.users.detectChanges(d.users)), this.obs$.next({
        roomId: o,
        data: d,
        partial: l,
        time: u
      }), vo.set({ ...d });
    }), this;
  }
  reset() {
    this.obs$ = new ze({});
  }
};
let re = Fn;
re.userId = null;
const bo = new re();
export {
  bo as World,
  vo as room
};
