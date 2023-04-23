var _r = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mr = {}, St = {}, Ft = {}, Tt = {}, st = {}, Pt = {}, Ti = It(typeof Buffer < "u" && Buffer) || It(_r.Buffer) || It(typeof window < "u" && window.Buffer) || _r.Buffer;
function It(r) {
  return r && r.isBuffer && r;
}
var Pi = {}.toString, Lt = Array.isArray || function(r) {
  return Pi.call(r) == "[object Array]";
}, kt = { exports: {} }, be;
function Ii() {
  if (be)
    return kt.exports;
  be = 1;
  var r = X(), e = kt.exports = t(0);
  e.alloc = t, e.concat = r.concat, e.from = n;
  function t(o) {
    return new Array(o);
  }
  function n(o) {
    if (!r.isBuffer(o) && r.isView(o))
      o = r.Uint8Array.from(o);
    else if (r.isArrayBuffer(o))
      o = new Uint8Array(o);
    else {
      if (typeof o == "string")
        return r.from.call(e, o);
      if (typeof o == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return Array.prototype.slice.call(o);
  }
  return kt.exports;
}
var Rt = { exports: {} }, ye;
function ki() {
  if (ye)
    return Rt.exports;
  ye = 1;
  var r = X(), e = r.global, t = Rt.exports = r.hasBuffer ? n(0) : [];
  t.alloc = r.hasBuffer && e.alloc || n, t.concat = r.concat, t.from = o;
  function n(a) {
    return new e(a);
  }
  function o(a) {
    if (!r.isBuffer(a) && r.isView(a))
      a = r.Uint8Array.from(a);
    else if (r.isArrayBuffer(a))
      a = new Uint8Array(a);
    else {
      if (typeof a == "string")
        return r.from.call(t, a);
      if (typeof a == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return e.from && e.from.length !== 1 ? e.from(a) : new e(a);
  }
  return Rt.exports;
}
var jt = { exports: {} }, Ee;
function Ri() {
  if (Ee)
    return jt.exports;
  Ee = 1;
  var r = X(), e = jt.exports = r.hasArrayBuffer ? t(0) : [];
  e.alloc = t, e.concat = r.concat, e.from = n;
  function t(o) {
    return new Uint8Array(o);
  }
  function n(o) {
    if (r.isView(o)) {
      var a = o.byteOffset, f = o.byteLength;
      o = o.buffer, o.byteLength !== f && (o.slice ? o = o.slice(a, a + f) : (o = new Uint8Array(o), o.byteLength !== f && (o = Array.prototype.slice.call(o, a, a + f))));
    } else {
      if (typeof o == "string")
        return r.from.call(e, o);
      if (typeof o == "number")
        throw new TypeError('"value" argument must not be a number');
    }
    return new Uint8Array(o);
  }
  return jt.exports;
}
var Tr = {}, ft = {};
ft.copy = Oi;
ft.toString = Ci;
ft.write = ji;
function ji(r, e) {
  for (var t = this, n = e || (e |= 0), o = r.length, a = 0, f = 0; f < o; )
    a = r.charCodeAt(f++), a < 128 ? t[n++] = a : a < 2048 ? (t[n++] = 192 | a >>> 6, t[n++] = 128 | a & 63) : a < 55296 || a > 57343 ? (t[n++] = 224 | a >>> 12, t[n++] = 128 | a >>> 6 & 63, t[n++] = 128 | a & 63) : (a = (a - 55296 << 10 | r.charCodeAt(f++) - 56320) + 65536, t[n++] = 240 | a >>> 18, t[n++] = 128 | a >>> 12 & 63, t[n++] = 128 | a >>> 6 & 63, t[n++] = 128 | a & 63);
  return n - e;
}
function Ci(r, e, t) {
  var n = this, o = e | 0;
  t || (t = n.length);
  for (var a = "", f = 0; o < t; ) {
    if (f = n[o++], f < 128) {
      a += String.fromCharCode(f);
      continue;
    }
    (f & 224) === 192 ? f = (f & 31) << 6 | n[o++] & 63 : (f & 240) === 224 ? f = (f & 15) << 12 | (n[o++] & 63) << 6 | n[o++] & 63 : (f & 248) === 240 && (f = (f & 7) << 18 | (n[o++] & 63) << 12 | (n[o++] & 63) << 6 | n[o++] & 63), f >= 65536 ? (f -= 65536, a += String.fromCharCode((f >>> 10) + 55296, (f & 1023) + 56320)) : a += String.fromCharCode(f);
  }
  return a;
}
function Oi(r, e, t, n) {
  var o;
  t || (t = 0), !n && n !== 0 && (n = this.length), e || (e = 0);
  var a = n - t;
  if (r === this && t < e && e < n)
    for (o = a - 1; o >= 0; o--)
      r[o + e] = this[o + t];
  else
    for (o = 0; o < a; o++)
      r[o + e] = this[o + t];
  return a;
}
var ge;
function Vt() {
  if (ge)
    return Tr;
  ge = 1;
  var r = ft;
  Tr.copy = a, Tr.slice = f, Tr.toString = y, Tr.write = d("write");
  var e = X(), t = e.global, n = e.hasBuffer && "TYPED_ARRAY_SUPPORT" in t, o = n && !t.TYPED_ARRAY_SUPPORT;
  function a(p, c, l, x) {
    var g = e.isBuffer(this), _ = e.isBuffer(p);
    if (g && _)
      return this.copy(p, c, l, x);
    if (!o && !g && !_ && e.isView(this) && e.isView(p)) {
      var O = l || x != null ? f.call(this, l, x) : this;
      return p.set(O, c), O.length;
    } else
      return r.copy.call(this, p, c, l, x);
  }
  function f(p, c) {
    var l = this.slice || !o && this.subarray;
    if (l)
      return l.call(this, p, c);
    var x = e.alloc.call(this, c - p);
    return a.call(this, x, 0, p, c), x;
  }
  function y(p, c, l) {
    var x = !n && e.isBuffer(this) ? this.toString : r.toString;
    return x.apply(this, arguments);
  }
  function d(p) {
    return c;
    function c() {
      var l = this[p] || r[p];
      return l.apply(this, arguments);
    }
  }
  return Tr;
}
var we;
function X() {
  return we || (we = 1, function(r) {
    var e = r.global = Ti, t = r.hasBuffer = e && !!e.isBuffer, n = r.hasArrayBuffer = typeof ArrayBuffer < "u", o = r.isArray = Lt;
    r.isArrayBuffer = n ? O : Y;
    var a = r.isBuffer = t ? e.isBuffer : Y, f = r.isView = n ? ArrayBuffer.isView || ir("ArrayBuffer", "buffer") : Y;
    r.alloc = x, r.concat = g, r.from = l;
    var y = r.Array = Ii(), d = r.Buffer = ki(), p = r.Uint8Array = Ri(), c = r.prototype = Vt();
    function l(U) {
      return typeof U == "string" ? H.call(this, U) : rr(this).from(U);
    }
    function x(U) {
      return rr(this).alloc(U);
    }
    function g(U, z) {
      z || (z = 0, Array.prototype.forEach.call(U, S));
      var L = this !== r && this || U[0], A = x.call(L, z), w = 0;
      return Array.prototype.forEach.call(U, h), A;
      function S(v) {
        z += v.length;
      }
      function h(v) {
        w += c.copy.call(v, A, w);
      }
    }
    var _ = ir("ArrayBuffer");
    function O(U) {
      return U instanceof ArrayBuffer || _(U);
    }
    function H(U) {
      var z = U.length * 3, L = x.call(this, z), A = c.write.call(L, U);
      return z !== A && (L = c.slice.call(L, 0, A)), L;
    }
    function rr(U) {
      return a(U) ? d : f(U) ? p : o(U) ? y : t ? d : n ? p : y;
    }
    function Y() {
      return !1;
    }
    function ir(U, z) {
      return U = "[object " + U + "]", function(L) {
        return L != null && {}.toString.call(z ? L[z] : L) === U;
      };
    }
  }(Pt)), Pt;
}
st.ExtBuffer = Nt;
var Di = X();
function Nt(r, e) {
  if (!(this instanceof Nt))
    return new Nt(r, e);
  this.buffer = Di.from(r), this.type = e;
}
var Ct = {}, _e;
function Mi() {
  if (_e)
    return Ct;
  _e = 1, Ct.setExtPackers = a;
  var r = X(), e = r.global, t = r.Uint8Array.from, n, o = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
  function a(c) {
    c.addExtPacker(14, Error, [p, f]), c.addExtPacker(1, EvalError, [p, f]), c.addExtPacker(2, RangeError, [p, f]), c.addExtPacker(3, ReferenceError, [p, f]), c.addExtPacker(4, SyntaxError, [p, f]), c.addExtPacker(5, TypeError, [p, f]), c.addExtPacker(6, URIError, [p, f]), c.addExtPacker(10, RegExp, [d, f]), c.addExtPacker(11, Boolean, [y, f]), c.addExtPacker(12, String, [y, f]), c.addExtPacker(13, Date, [Number, f]), c.addExtPacker(15, Number, [y, f]), typeof Uint8Array < "u" && (c.addExtPacker(17, Int8Array, t), c.addExtPacker(18, Uint8Array, t), c.addExtPacker(19, Int16Array, t), c.addExtPacker(20, Uint16Array, t), c.addExtPacker(21, Int32Array, t), c.addExtPacker(22, Uint32Array, t), c.addExtPacker(23, Float32Array, t), typeof Float64Array < "u" && c.addExtPacker(24, Float64Array, t), typeof Uint8ClampedArray < "u" && c.addExtPacker(25, Uint8ClampedArray, t), c.addExtPacker(26, ArrayBuffer, t), c.addExtPacker(29, DataView, t)), r.hasBuffer && c.addExtPacker(27, e, r.from);
  }
  function f(c) {
    return n || (n = nn().encode), n(c);
  }
  function y(c) {
    return c.valueOf();
  }
  function d(c) {
    c = RegExp.prototype.toString.call(c).split("/"), c.shift();
    var l = [c.pop()];
    return l.unshift(c.join("/")), l;
  }
  function p(c) {
    var l = {};
    for (var x in o)
      l[x] = c[x];
    return l;
  }
  return Ct;
}
var qe = {}, ut = {};
(function(r) {
  (function(e) {
    var t = "undefined", n = t !== typeof Buffer && Buffer, o = t !== typeof Uint8Array && Uint8Array, a = t !== typeof ArrayBuffer && ArrayBuffer, f = [0, 0, 0, 0, 0, 0, 0, 0], y = Array.isArray || L, d = 4294967296, p = 16777216, c;
    l("Uint64BE", !0, !0), l("Int64BE", !0, !1), l("Uint64LE", !1, !0), l("Int64LE", !1, !1);
    function l(A, w, S) {
      var h = w ? 0 : 4, v = w ? 4 : 0, E = w ? 0 : 3, k = w ? 1 : 2, N = w ? 2 : 1, W = w ? 3 : 0, J = w ? Y : U, hr = w ? ir : z, V = ar.prototype, or = "is" + A, Ur = "_" + or;
      return V.buffer = void 0, V.offset = 0, V[Ur] = !0, V.toNumber = Yr, V.toString = dr, V.toJSON = Yr, V.toArray = x, n && (V.toBuffer = g), o && (V.toArrayBuffer = _), ar[or] = Or, e[A] = ar, ar;
      function ar(F, B, m, T) {
        return this instanceof ar ? j(this, F, B, m, T) : new ar(F, B, m, T);
      }
      function Or(F) {
        return !!(F && F[Ur]);
      }
      function j(F, B, m, T, q) {
        if (o && a && (B instanceof a && (B = new o(B)), T instanceof a && (T = new o(T))), !B && !m && !T && !c) {
          F.buffer = rr(f, 0);
          return;
        }
        if (!O(B, m)) {
          var tr = c || Array;
          q = m, T = B, m = 0, B = new tr(8);
        }
        F.buffer = B, F.offset = m |= 0, t !== typeof T && (typeof T == "string" ? Vr(B, m, T, q || 10) : O(T, q) ? H(B, m, T, q) : typeof q == "number" ? (vr(B, m + h, T), vr(B, m + v, q)) : T > 0 ? J(B, m, T) : T < 0 ? hr(B, m, T) : H(B, m, f, 0));
      }
      function Vr(F, B, m, T) {
        var q = 0, tr = m.length, er = 0, G = 0;
        m[0] === "-" && q++;
        for (var vt = q; q < tr; ) {
          var Wr = parseInt(m[q++], T);
          if (!(Wr >= 0))
            break;
          G = G * T + Wr, er = er * T + Math.floor(G / d), G %= d;
        }
        vt && (er = ~er, G ? G = d - G : er++), vr(F, B + h, er), vr(F, B + v, G);
      }
      function Yr() {
        var F = this.buffer, B = this.offset, m = sr(F, B + h), T = sr(F, B + v);
        return S || (m |= 0), m ? m * d + T : T;
      }
      function dr(F) {
        var B = this.buffer, m = this.offset, T = sr(B, m + h), q = sr(B, m + v), tr = "", er = !S && T & 2147483648;
        for (er && (T = ~T, q = d - q), F = F || 10; ; ) {
          var G = T % F * d + q;
          if (T = Math.floor(T / F), q = Math.floor(G / F), tr = (G % F).toString(F) + tr, !T && !q)
            break;
        }
        return er && (tr = "-" + tr), tr;
      }
      function vr(F, B, m) {
        F[B + W] = m & 255, m = m >> 8, F[B + N] = m & 255, m = m >> 8, F[B + k] = m & 255, m = m >> 8, F[B + E] = m & 255;
      }
      function sr(F, B) {
        return F[B + E] * p + (F[B + k] << 16) + (F[B + N] << 8) + F[B + W];
      }
    }
    function x(A) {
      var w = this.buffer, S = this.offset;
      return c = null, A !== !1 && S === 0 && w.length === 8 && y(w) ? w : rr(w, S);
    }
    function g(A) {
      var w = this.buffer, S = this.offset;
      if (c = n, A !== !1 && S === 0 && w.length === 8 && Buffer.isBuffer(w))
        return w;
      var h = new n(8);
      return H(h, 0, w, S), h;
    }
    function _(A) {
      var w = this.buffer, S = this.offset, h = w.buffer;
      if (c = o, A !== !1 && S === 0 && h instanceof a && h.byteLength === 8)
        return h;
      var v = new o(8);
      return H(v, 0, w, S), v.buffer;
    }
    function O(A, w) {
      var S = A && A.length;
      return w |= 0, S && w + 8 <= S && typeof A[w] != "string";
    }
    function H(A, w, S, h) {
      w |= 0, h |= 0;
      for (var v = 0; v < 8; v++)
        A[w++] = S[h++] & 255;
    }
    function rr(A, w) {
      return Array.prototype.slice.call(A, w, w + 8);
    }
    function Y(A, w, S) {
      for (var h = w + 8; h > w; )
        A[--h] = S & 255, S /= 256;
    }
    function ir(A, w, S) {
      var h = w + 8;
      for (S++; h > w; )
        A[--h] = -S & 255 ^ 255, S /= 256;
    }
    function U(A, w, S) {
      for (var h = w + 8; w < h; )
        A[w++] = S & 255, S /= 256;
    }
    function z(A, w, S) {
      var h = w + 8;
      for (S++; w < h; )
        A[w++] = -S & 255 ^ 255, S /= 256;
    }
    function L(A) {
      return !!A && Object.prototype.toString.call(A) == "[object Array]";
    }
  })(typeof r.nodeName != "string" ? r : _r || {});
})(ut);
var He = {}, ct = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ct.read = function(r, e, t, n, o) {
  var a, f, y = o * 8 - n - 1, d = (1 << y) - 1, p = d >> 1, c = -7, l = t ? o - 1 : 0, x = t ? -1 : 1, g = r[e + l];
  for (l += x, a = g & (1 << -c) - 1, g >>= -c, c += y; c > 0; a = a * 256 + r[e + l], l += x, c -= 8)
    ;
  for (f = a & (1 << -c) - 1, a >>= -c, c += n; c > 0; f = f * 256 + r[e + l], l += x, c -= 8)
    ;
  if (a === 0)
    a = 1 - p;
  else {
    if (a === d)
      return f ? NaN : (g ? -1 : 1) * (1 / 0);
    f = f + Math.pow(2, n), a = a - p;
  }
  return (g ? -1 : 1) * f * Math.pow(2, a - n);
};
ct.write = function(r, e, t, n, o, a) {
  var f, y, d, p = a * 8 - o - 1, c = (1 << p) - 1, l = c >> 1, x = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = n ? 0 : a - 1, _ = n ? 1 : -1, O = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (y = isNaN(e) ? 1 : 0, f = c) : (f = Math.floor(Math.log(e) / Math.LN2), e * (d = Math.pow(2, -f)) < 1 && (f--, d *= 2), f + l >= 1 ? e += x / d : e += x * Math.pow(2, 1 - l), e * d >= 2 && (f++, d /= 2), f + l >= c ? (y = 0, f = c) : f + l >= 1 ? (y = (e * d - 1) * Math.pow(2, o), f = f + l) : (y = e * Math.pow(2, l - 1) * Math.pow(2, o), f = 0)); o >= 8; r[t + g] = y & 255, g += _, y /= 256, o -= 8)
    ;
  for (f = f << o | y, p += o; p > 0; r[t + g] = f & 255, g += _, f /= 256, p -= 8)
    ;
  r[t + g - _] |= O * 128;
};
var Yt = {}, $i = Yt.uint8 = new Array(256);
for (var et = 0; et <= 255; et++)
  $i[et] = Ni(et);
function Ni(r) {
  return function(e) {
    var t = e.reserve(1);
    e.buffer[t] = r;
  };
}
var ze = ct, Le = ut, qi = Le.Uint64BE, Hi = Le.Int64BE, Ve = Yt.uint8, ht = X(), $ = ht.global, zi = ht.hasBuffer && "TYPED_ARRAY_SUPPORT" in $, Li = zi && !$.TYPED_ARRAY_SUPPORT, Be = ht.hasBuffer && $.prototype || {};
He.getWriteToken = Vi;
function Vi(r) {
  return r && r.uint8array ? Yi() : Li || ht.hasBuffer && r && r.safe ? Wi() : Ye();
}
function Yi() {
  var r = Ye();
  return r[202] = R(202, 4, Ke), r[203] = R(203, 8, Ze), r;
}
function Ye() {
  var r = Ve.slice();
  return r[196] = Nr(196), r[197] = Er(197), r[198] = gr(198), r[199] = Nr(199), r[200] = Er(200), r[201] = gr(201), r[202] = R(202, 4, Be.writeFloatBE || Ke, !0), r[203] = R(203, 8, Be.writeDoubleBE || Ze, !0), r[204] = Nr(204), r[205] = Er(205), r[206] = gr(206), r[207] = R(207, 8, We), r[208] = Nr(208), r[209] = Er(209), r[210] = gr(210), r[211] = R(211, 8, Ge), r[217] = Nr(217), r[218] = Er(218), r[219] = gr(219), r[220] = Er(220), r[221] = gr(221), r[222] = Er(222), r[223] = gr(223), r;
}
function Wi() {
  var r = Ve.slice();
  return r[196] = R(196, 1, $.prototype.writeUInt8), r[197] = R(197, 2, $.prototype.writeUInt16BE), r[198] = R(198, 4, $.prototype.writeUInt32BE), r[199] = R(199, 1, $.prototype.writeUInt8), r[200] = R(200, 2, $.prototype.writeUInt16BE), r[201] = R(201, 4, $.prototype.writeUInt32BE), r[202] = R(202, 4, $.prototype.writeFloatBE), r[203] = R(203, 8, $.prototype.writeDoubleBE), r[204] = R(204, 1, $.prototype.writeUInt8), r[205] = R(205, 2, $.prototype.writeUInt16BE), r[206] = R(206, 4, $.prototype.writeUInt32BE), r[207] = R(207, 8, We), r[208] = R(208, 1, $.prototype.writeInt8), r[209] = R(209, 2, $.prototype.writeInt16BE), r[210] = R(210, 4, $.prototype.writeInt32BE), r[211] = R(211, 8, Ge), r[217] = R(217, 1, $.prototype.writeUInt8), r[218] = R(218, 2, $.prototype.writeUInt16BE), r[219] = R(219, 4, $.prototype.writeUInt32BE), r[220] = R(220, 2, $.prototype.writeUInt16BE), r[221] = R(221, 4, $.prototype.writeUInt32BE), r[222] = R(222, 2, $.prototype.writeUInt16BE), r[223] = R(223, 4, $.prototype.writeUInt32BE), r;
}
function Nr(r) {
  return function(e, t) {
    var n = e.reserve(2), o = e.buffer;
    o[n++] = r, o[n] = t;
  };
}
function Er(r) {
  return function(e, t) {
    var n = e.reserve(3), o = e.buffer;
    o[n++] = r, o[n++] = t >>> 8, o[n] = t;
  };
}
function gr(r) {
  return function(e, t) {
    var n = e.reserve(5), o = e.buffer;
    o[n++] = r, o[n++] = t >>> 24, o[n++] = t >>> 16, o[n++] = t >>> 8, o[n] = t;
  };
}
function R(r, e, t, n) {
  return function(o, a) {
    var f = o.reserve(e + 1);
    o.buffer[f++] = r, t.call(o.buffer, a, f, n);
  };
}
function We(r, e) {
  new qi(this, e, r);
}
function Ge(r, e) {
  new Hi(this, e, r);
}
function Ke(r, e) {
  ze.write(this, r, e, !1, 23, 4);
}
function Ze(r, e) {
  ze.write(this, r, e, !1, 52, 8);
}
var Gi = Lt, Je = ut, Ki = Je.Uint64BE, Zi = Je.Int64BE, me = X(), Ae = Vt(), Ji = He, Qi = Yt.uint8, Xi = st.ExtBuffer, ro = typeof Uint8Array < "u", to = typeof Map < "u", Cr = [];
Cr[1] = 212;
Cr[2] = 213;
Cr[4] = 214;
Cr[8] = 215;
Cr[16] = 216;
qe.getWriteType = eo;
function eo(r) {
  var e = Ji.getWriteToken(r), t = r && r.useraw, n = ro && r && r.binarraybuffer, o = n ? me.isArrayBuffer : me.isBuffer, a = n ? z : U, f = to && r && r.usemap, y = f ? w : A, d = {
    boolean: p,
    function: Y,
    number: c,
    object: t ? rr : H,
    string: O(t ? _ : g),
    symbol: Y,
    undefined: Y
  };
  return d;
  function p(h, v) {
    var E = v ? 195 : 194;
    e[E](h, v);
  }
  function c(h, v) {
    var E = v | 0, k;
    if (v !== E) {
      k = 203, e[k](h, v);
      return;
    } else
      -32 <= E && E <= 127 ? k = E & 255 : 0 <= E ? k = E <= 255 ? 204 : E <= 65535 ? 205 : 206 : k = -128 <= E ? 208 : -32768 <= E ? 209 : 210;
    e[k](h, E);
  }
  function l(h, v) {
    var E = 207;
    e[E](h, v.toArray());
  }
  function x(h, v) {
    var E = 211;
    e[E](h, v.toArray());
  }
  function g(h) {
    return h < 32 ? 1 : h <= 255 ? 2 : h <= 65535 ? 3 : 5;
  }
  function _(h) {
    return h < 32 ? 1 : h <= 65535 ? 3 : 5;
  }
  function O(h) {
    return v;
    function v(E, k) {
      var N = k.length, W = 5 + N * 3;
      E.offset = E.reserve(W);
      var J = E.buffer, hr = h(N), V = E.offset + hr;
      N = Ae.write.call(J, k, V);
      var or = h(N);
      if (hr !== or) {
        var Ur = V + or - hr, ar = V + N;
        Ae.copy.call(J, J, Ur, V, ar);
      }
      var Or = or === 1 ? 160 + N : or <= 3 ? 215 + or : 219;
      e[Or](E, N), E.offset += N;
    }
  }
  function H(h, v) {
    if (v === null)
      return Y(h, v);
    if (o(v))
      return a(h, v);
    if (Gi(v))
      return ir(h, v);
    if (Ki.isUint64BE(v))
      return l(h, v);
    if (Zi.isInt64BE(v))
      return x(h, v);
    var E = h.codec.getExtPacker(v);
    if (E && (v = E(v)), v instanceof Xi)
      return L(h, v);
    y(h, v);
  }
  function rr(h, v) {
    if (o(v))
      return S(h, v);
    H(h, v);
  }
  function Y(h, v) {
    var E = 192;
    e[E](h, v);
  }
  function ir(h, v) {
    var E = v.length, k = E < 16 ? 144 + E : E <= 65535 ? 220 : 221;
    e[k](h, E);
    for (var N = h.codec.encode, W = 0; W < E; W++)
      N(h, v[W]);
  }
  function U(h, v) {
    var E = v.length, k = E < 255 ? 196 : E <= 65535 ? 197 : 198;
    e[k](h, E), h.send(v);
  }
  function z(h, v) {
    U(h, new Uint8Array(v));
  }
  function L(h, v) {
    var E = v.buffer, k = E.length, N = Cr[k] || (k < 255 ? 199 : k <= 65535 ? 200 : 201);
    e[N](h, k), Qi[v.type](h), h.send(E);
  }
  function A(h, v) {
    var E = Object.keys(v), k = E.length, N = k < 16 ? 128 + k : k <= 65535 ? 222 : 223;
    e[N](h, k);
    var W = h.codec.encode;
    E.forEach(function(J) {
      W(h, J), W(h, v[J]);
    });
  }
  function w(h, v) {
    if (!(v instanceof Map))
      return A(h, v);
    var E = v.size, k = E < 16 ? 128 + E : E <= 65535 ? 222 : 223;
    e[k](h, E);
    var N = h.codec.encode;
    v.forEach(function(W, J, hr) {
      N(h, J), N(h, W);
    });
  }
  function S(h, v) {
    var E = v.length, k = E < 32 ? 160 + E : E <= 65535 ? 218 : 219;
    e[k](h, E), h.send(v);
  }
}
var pr = {}, no = Lt;
pr.createCodec = Qe;
pr.install = oo;
pr.filter = fo;
var io = X();
function kr(r) {
  if (!(this instanceof kr))
    return new kr(r);
  this.options = r, this.init();
}
kr.prototype.init = function() {
  var r = this.options;
  return r && r.uint8array && (this.bufferish = io.Uint8Array), this;
};
function oo(r) {
  for (var e in r)
    kr.prototype[e] = ao(kr.prototype[e], r[e]);
}
function ao(r, e) {
  return r && e ? t : r || e;
  function t() {
    return r.apply(this, arguments), e.apply(this, arguments);
  }
}
function so(r) {
  return r = r.slice(), function(t) {
    return r.reduce(e, t);
  };
  function e(t, n) {
    return n(t);
  }
}
function fo(r) {
  return no(r) ? so(r) : r;
}
function Qe(r) {
  return new kr(r);
}
pr.preset = Qe({ preset: !0 });
var Ue;
function Wt() {
  if (Ue)
    return Tt;
  Ue = 1;
  var r = st.ExtBuffer, e = Mi(), t = qe, n = pr;
  n.install({
    addExtPacker: f,
    getExtPacker: y,
    init: a
  }), Tt.preset = a.call(n.preset);
  function o(d) {
    var p = t.getWriteType(d);
    return c;
    function c(l, x) {
      var g = p[typeof x];
      if (!g)
        throw new Error('Unsupported type "' + typeof x + '": ' + x);
      g(l, x);
    }
  }
  function a() {
    var d = this.options;
    return this.encode = o(d), d && d.preset && e.setExtPackers(this), this;
  }
  function f(d, p, c) {
    c = n.filter(c);
    var l = p.name;
    if (l && l !== "Object") {
      var x = this.extPackers || (this.extPackers = {});
      x[l] = _;
    } else {
      var g = this.extEncoderList || (this.extEncoderList = []);
      g.unshift([p, _]);
    }
    function _(O) {
      return c && (O = c(O)), new r(O, d);
    }
  }
  function y(d) {
    var p = this.extPackers || (this.extPackers = {}), c = d.constructor, l = c && c.name && p[c.name];
    if (l)
      return l;
    for (var x = this.extEncoderList || (this.extEncoderList = []), g = x.length, _ = 0; _ < g; _++) {
      var O = x[_];
      if (c === O[0])
        return O[1];
    }
  }
  return Tt;
}
var lt = {};
lt.FlexDecoder = Rr;
lt.FlexEncoder = jr;
var zr = X(), uo = 2048, co = 65536, Se = "BUFFER_SHORTAGE";
function Rr() {
  if (!(this instanceof Rr))
    return new Rr();
}
function jr() {
  if (!(this instanceof jr))
    return new jr();
}
Rr.mixin = tn(ho());
Rr.mixin(Rr.prototype);
jr.mixin = tn(lo());
jr.mixin(jr.prototype);
function ho() {
  return {
    bufferish: zr,
    write: r,
    fetch: vo,
    flush: e,
    push: rn,
    pull: xo,
    read: Xe,
    reserve: t,
    offset: 0
  };
  function r(n) {
    var o = this.offset ? zr.prototype.slice.call(this.buffer, this.offset) : this.buffer;
    this.buffer = o ? n ? this.bufferish.concat([o, n]) : o : n, this.offset = 0;
  }
  function e() {
    for (; this.offset < this.buffer.length; ) {
      var n = this.offset, o;
      try {
        o = this.fetch();
      } catch (a) {
        if (a && a.message != Se)
          throw a;
        this.offset = n;
        break;
      }
      this.push(o);
    }
  }
  function t(n) {
    var o = this.offset, a = o + n;
    if (a > this.buffer.length)
      throw new Error(Se);
    return this.offset = a, o;
  }
}
function lo() {
  return {
    bufferish: zr,
    write: po,
    fetch: r,
    flush: e,
    push: rn,
    pull: t,
    read: Xe,
    reserve: n,
    send: o,
    maxBufferSize: co,
    minBufferSize: uo,
    offset: 0,
    start: 0
  };
  function r() {
    var a = this.start;
    if (a < this.offset) {
      var f = this.start = this.offset;
      return zr.prototype.slice.call(this.buffer, a, f);
    }
  }
  function e() {
    for (; this.start < this.offset; ) {
      var a = this.fetch();
      a && this.push(a);
    }
  }
  function t() {
    var a = this.buffers || (this.buffers = []), f = a.length > 1 ? this.bufferish.concat(a) : a[0];
    return a.length = 0, f;
  }
  function n(a) {
    var f = a | 0;
    if (this.buffer) {
      var y = this.buffer.length, d = this.offset | 0, p = d + f;
      if (p < y)
        return this.offset = p, d;
      this.flush(), a = Math.max(a, Math.min(y * 2, this.maxBufferSize));
    }
    return a = Math.max(a, this.minBufferSize), this.buffer = this.bufferish.alloc(a), this.start = 0, this.offset = f, 0;
  }
  function o(a) {
    var f = a.length;
    if (f > this.minBufferSize)
      this.flush(), this.push(a);
    else {
      var y = this.reserve(f);
      zr.prototype.copy.call(a, this.buffer, y);
    }
  }
}
function po() {
  throw new Error("method not implemented: write()");
}
function vo() {
  throw new Error("method not implemented: fetch()");
}
function Xe() {
  var r = this.buffers && this.buffers.length;
  return r ? (this.flush(), this.pull()) : this.fetch();
}
function rn(r) {
  var e = this.buffers || (this.buffers = []);
  e.push(r);
}
function xo() {
  var r = this.buffers || (this.buffers = []);
  return r.shift();
}
function tn(r) {
  return e;
  function e(t) {
    for (var n in r)
      t[n] = r[n];
    return t;
  }
}
var Fe;
function en() {
  if (Fe)
    return Ft;
  Fe = 1, Ft.EncodeBuffer = t;
  var r = Wt().preset, e = lt.FlexEncoder;
  e.mixin(t.prototype);
  function t(n) {
    if (!(this instanceof t))
      return new t(n);
    if (n && (this.options = n, n.codec)) {
      var o = this.codec = n.codec;
      o.bufferish && (this.bufferish = o.bufferish);
    }
  }
  return t.prototype.codec = r, t.prototype.write = function(n) {
    this.codec.encode(this, n);
  }, Ft;
}
var Te;
function nn() {
  if (Te)
    return St;
  Te = 1, St.encode = e;
  var r = en().EncodeBuffer;
  function e(t, n) {
    var o = new r(n);
    return o.write(t), o.read();
  }
  return St;
}
var Ot = {}, Dt = {}, Mt = {}, $t = {}, Pe;
function bo() {
  if (Pe)
    return $t;
  Pe = 1, $t.setExtUnpackers = o;
  var r = X(), e = r.global, t, n = { name: 1, message: 1, stack: 1, columnNumber: 1, fileName: 1, lineNumber: 1 };
  function o(c) {
    c.addExtUnpacker(14, [a, y(Error)]), c.addExtUnpacker(1, [a, y(EvalError)]), c.addExtUnpacker(2, [a, y(RangeError)]), c.addExtUnpacker(3, [a, y(ReferenceError)]), c.addExtUnpacker(4, [a, y(SyntaxError)]), c.addExtUnpacker(5, [a, y(TypeError)]), c.addExtUnpacker(6, [a, y(URIError)]), c.addExtUnpacker(10, [a, f]), c.addExtUnpacker(11, [a, d(Boolean)]), c.addExtUnpacker(12, [a, d(String)]), c.addExtUnpacker(13, [a, d(Date)]), c.addExtUnpacker(15, [a, d(Number)]), typeof Uint8Array < "u" && (c.addExtUnpacker(17, d(Int8Array)), c.addExtUnpacker(18, d(Uint8Array)), c.addExtUnpacker(19, [p, d(Int16Array)]), c.addExtUnpacker(20, [p, d(Uint16Array)]), c.addExtUnpacker(21, [p, d(Int32Array)]), c.addExtUnpacker(22, [p, d(Uint32Array)]), c.addExtUnpacker(23, [p, d(Float32Array)]), typeof Float64Array < "u" && c.addExtUnpacker(24, [p, d(Float64Array)]), typeof Uint8ClampedArray < "u" && c.addExtUnpacker(25, d(Uint8ClampedArray)), c.addExtUnpacker(26, p), c.addExtUnpacker(29, [p, d(DataView)])), r.hasBuffer && c.addExtUnpacker(27, d(e));
  }
  function a(c) {
    return t || (t = pn().decode), t(c);
  }
  function f(c) {
    return RegExp.apply(null, c);
  }
  function y(c) {
    return function(l) {
      var x = new c();
      for (var g in n)
        x[g] = l[g];
      return x;
    };
  }
  function d(c) {
    return function(l) {
      return new c(l);
    };
  }
  function p(c) {
    return new Uint8Array(c).buffer;
  }
  return $t;
}
var pt = {}, on = ct, an = ut, sn = an.Uint64BE, fn = an.Int64BE;
pt.getReadFormat = go;
pt.readUint8 = un;
var Gt = X(), dt = Vt(), yo = typeof Map < "u", Eo = !0;
function go(r) {
  var e = Gt.hasArrayBuffer && r && r.binarraybuffer, t = r && r.int64, n = yo && r && r.usemap, o = {
    map: n ? _o : wo,
    array: Bo,
    str: mo,
    bin: e ? Uo : Ao,
    ext: So,
    uint8: un,
    uint16: To,
    uint32: Io,
    uint64: nt(8, t ? Co : Ro),
    int8: Fo,
    int16: Po,
    int32: ko,
    int64: nt(8, t ? Oo : jo),
    float32: nt(4, Do),
    float64: nt(8, Mo)
  };
  return o;
}
function wo(r, e) {
  var t = {}, n, o = new Array(e), a = new Array(e), f = r.codec.decode;
  for (n = 0; n < e; n++)
    o[n] = f(r), a[n] = f(r);
  for (n = 0; n < e; n++)
    t[o[n]] = a[n];
  return t;
}
function _o(r, e) {
  var t = /* @__PURE__ */ new Map(), n, o = new Array(e), a = new Array(e), f = r.codec.decode;
  for (n = 0; n < e; n++)
    o[n] = f(r), a[n] = f(r);
  for (n = 0; n < e; n++)
    t.set(o[n], a[n]);
  return t;
}
function Bo(r, e) {
  for (var t = new Array(e), n = r.codec.decode, o = 0; o < e; o++)
    t[o] = n(r);
  return t;
}
function mo(r, e) {
  var t = r.reserve(e), n = t + e;
  return dt.toString.call(r.buffer, "utf-8", t, n);
}
function Ao(r, e) {
  var t = r.reserve(e), n = t + e, o = dt.slice.call(r.buffer, t, n);
  return Gt.from(o);
}
function Uo(r, e) {
  var t = r.reserve(e), n = t + e, o = dt.slice.call(r.buffer, t, n);
  return Gt.Uint8Array.from(o).buffer;
}
function So(r, e) {
  var t = r.reserve(e + 1), n = r.buffer[t++], o = t + e, a = r.codec.getExtUnpacker(n);
  if (!a)
    throw new Error("Invalid ext type: " + (n && "0x" + n.toString(16)));
  var f = dt.slice.call(r.buffer, t, o);
  return a(f);
}
function un(r) {
  var e = r.reserve(1);
  return r.buffer[e];
}
function Fo(r) {
  var e = r.reserve(1), t = r.buffer[e];
  return t & 128 ? t - 256 : t;
}
function To(r) {
  var e = r.reserve(2), t = r.buffer;
  return t[e++] << 8 | t[e];
}
function Po(r) {
  var e = r.reserve(2), t = r.buffer, n = t[e++] << 8 | t[e];
  return n & 32768 ? n - 65536 : n;
}
function Io(r) {
  var e = r.reserve(4), t = r.buffer;
  return t[e++] * 16777216 + (t[e++] << 16) + (t[e++] << 8) + t[e];
}
function ko(r) {
  var e = r.reserve(4), t = r.buffer;
  return t[e++] << 24 | t[e++] << 16 | t[e++] << 8 | t[e];
}
function nt(r, e) {
  return function(t) {
    var n = t.reserve(r);
    return e.call(t.buffer, n, Eo);
  };
}
function Ro(r) {
  return new sn(this, r).toNumber();
}
function jo(r) {
  return new fn(this, r).toNumber();
}
function Co(r) {
  return new sn(this, r);
}
function Oo(r) {
  return new fn(this, r);
}
function Do(r) {
  return on.read(this, r, !1, 23, 4);
}
function Mo(r) {
  return on.read(this, r, !1, 52, 8);
}
var cn = {}, $o = pt;
cn.getReadToken = No;
function No(r) {
  var e = $o.getReadFormat(r);
  return r && r.useraw ? qo(e) : hn(e);
}
function hn(r) {
  var e, t = new Array(256);
  for (e = 0; e <= 127; e++)
    t[e] = qr(e);
  for (e = 128; e <= 143; e++)
    t[e] = cr(e - 128, r.map);
  for (e = 144; e <= 159; e++)
    t[e] = cr(e - 144, r.array);
  for (e = 160; e <= 191; e++)
    t[e] = cr(e - 160, r.str);
  for (t[192] = qr(null), t[193] = null, t[194] = qr(!1), t[195] = qr(!0), t[196] = Z(r.uint8, r.bin), t[197] = Z(r.uint16, r.bin), t[198] = Z(r.uint32, r.bin), t[199] = Z(r.uint8, r.ext), t[200] = Z(r.uint16, r.ext), t[201] = Z(r.uint32, r.ext), t[202] = r.float32, t[203] = r.float64, t[204] = r.uint8, t[205] = r.uint16, t[206] = r.uint32, t[207] = r.uint64, t[208] = r.int8, t[209] = r.int16, t[210] = r.int32, t[211] = r.int64, t[212] = cr(1, r.ext), t[213] = cr(2, r.ext), t[214] = cr(4, r.ext), t[215] = cr(8, r.ext), t[216] = cr(16, r.ext), t[217] = Z(r.uint8, r.str), t[218] = Z(r.uint16, r.str), t[219] = Z(r.uint32, r.str), t[220] = Z(r.uint16, r.array), t[221] = Z(r.uint32, r.array), t[222] = Z(r.uint16, r.map), t[223] = Z(r.uint32, r.map), e = 224; e <= 255; e++)
    t[e] = qr(e - 256);
  return t;
}
function qo(r) {
  var e, t = hn(r).slice();
  for (t[217] = t[196], t[218] = t[197], t[219] = t[198], e = 160; e <= 191; e++)
    t[e] = cr(e - 160, r.bin);
  return t;
}
function qr(r) {
  return function() {
    return r;
  };
}
function Z(r, e) {
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
var Ie;
function Kt() {
  if (Ie)
    return Mt;
  Ie = 1;
  var r = st.ExtBuffer, e = bo(), t = pt.readUint8, n = cn, o = pr;
  o.install({
    addExtUnpacker: y,
    getExtUnpacker: d,
    init: f
  }), Mt.preset = f.call(o.preset);
  function a(p) {
    var c = n.getReadToken(p);
    return l;
    function l(x) {
      var g = t(x), _ = c[g];
      if (!_)
        throw new Error("Invalid type: " + (g && "0x" + g.toString(16)));
      return _(x);
    }
  }
  function f() {
    var p = this.options;
    return this.decode = a(p), p && p.preset && e.setExtUnpackers(this), this;
  }
  function y(p, c) {
    var l = this.extUnpackers || (this.extUnpackers = []);
    l[p] = o.filter(c);
  }
  function d(p) {
    var c = this.extUnpackers || (this.extUnpackers = []);
    return c[p] || l;
    function l(x) {
      return new r(x, p);
    }
  }
  return Mt;
}
var ke;
function ln() {
  if (ke)
    return Dt;
  ke = 1, Dt.DecodeBuffer = t;
  var r = Kt().preset, e = lt.FlexDecoder;
  e.mixin(t.prototype);
  function t(n) {
    if (!(this instanceof t))
      return new t(n);
    if (n && (this.options = n, n.codec)) {
      var o = this.codec = n.codec;
      o.bufferish && (this.bufferish = o.bufferish);
    }
  }
  return t.prototype.codec = r, t.prototype.fetch = function() {
    return this.codec.decode(this);
  }, Dt;
}
var Re;
function pn() {
  if (Re)
    return Ot;
  Re = 1, Ot.decode = e;
  var r = ln().DecodeBuffer;
  function e(t, n) {
    var o = new r(n);
    return o.write(t), o.read();
  }
  return Ot;
}
var dn = {}, Zt = { exports: {} };
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
    var n = "listeners", o = {
      on: f,
      once: y,
      off: d,
      emit: p
    };
    a(t.prototype), t.mixin = a;
    function a(l) {
      for (var x in o)
        l[x] = o[x];
      return l;
    }
    function f(l, x) {
      return c(this, l).push(x), this;
    }
    function y(l, x) {
      var g = this;
      return _.originalListener = x, c(g, l).push(_), g;
      function _() {
        d.call(g, l, _), x.apply(this, arguments);
      }
    }
    function d(l, x) {
      var g = this, _;
      if (!arguments.length)
        delete g[n];
      else if (x) {
        if (_ = c(g, l, !0), _) {
          if (_ = _.filter(O), !_.length)
            return d.call(g, l);
          g[n][l] = _;
        }
      } else if (_ = g[n], _ && (delete _[l], !Object.keys(_).length))
        return d.call(g);
      return g;
      function O(H) {
        return H !== x && H.originalListener !== x;
      }
    }
    function p(l, x) {
      var g = this, _ = c(g, l, !0);
      if (!_)
        return !1;
      var O = arguments.length;
      if (O === 1)
        _.forEach(rr);
      else if (O === 2)
        _.forEach(Y);
      else {
        var H = Array.prototype.slice.call(arguments, 1);
        _.forEach(ir);
      }
      return !!_.length;
      function rr(U) {
        U.call(g);
      }
      function Y(U) {
        U.call(g, x);
      }
      function ir(U) {
        U.apply(g, H);
      }
    }
    function c(l, x, g) {
      if (!(g && !l[n])) {
        var _ = l[n] || (l[n] = {});
        return _[x] || (_[x] = []);
      }
    }
  })(e);
})(Zt);
dn.Encoder = Br;
var Ho = Zt.exports, vn = en().EncodeBuffer;
function Br(r) {
  if (!(this instanceof Br))
    return new Br(r);
  vn.call(this, r);
}
Br.prototype = new vn();
Ho.mixin(Br.prototype);
Br.prototype.encode = function(r) {
  this.write(r), this.emit("data", this.read());
};
Br.prototype.end = function(r) {
  arguments.length && this.encode(r), this.flush(), this.emit("end");
};
var xn = {};
xn.Decoder = lr;
var zo = Zt.exports, bn = ln().DecodeBuffer;
function lr(r) {
  if (!(this instanceof lr))
    return new lr(r);
  bn.call(this, r);
}
lr.prototype = new bn();
zo.mixin(lr.prototype);
lr.prototype.decode = function(r) {
  arguments.length && this.write(r), this.flush();
};
lr.prototype.push = function(r) {
  this.emit("data", r);
};
lr.prototype.end = function(r) {
  this.decode(r), this.emit("end");
};
var yn = {};
Kt();
Wt();
yn.createCodec = pr.createCodec;
var En = {};
Kt();
Wt();
En.codec = {
  preset: pr.preset
};
mr.encode = nn().encode;
mr.decode = pn().decode;
mr.Encoder = dn.Encoder;
mr.Decoder = xn.Decoder;
mr.createCodec = yn.createCodec;
mr.codec = En.codec;
var qt = { exports: {} };
(function(r, e) {
  var t = 200, n = "__lodash_hash_undefined__", o = 800, a = 16, f = 9007199254740991, y = "[object Arguments]", d = "[object Array]", p = "[object AsyncFunction]", c = "[object Boolean]", l = "[object Date]", x = "[object Error]", g = "[object Function]", _ = "[object GeneratorFunction]", O = "[object Map]", H = "[object Number]", rr = "[object Null]", Y = "[object Object]", ir = "[object Proxy]", U = "[object RegExp]", z = "[object Set]", L = "[object String]", A = "[object Undefined]", w = "[object WeakMap]", S = "[object ArrayBuffer]", h = "[object DataView]", v = "[object Float32Array]", E = "[object Float64Array]", k = "[object Int8Array]", N = "[object Int16Array]", W = "[object Int32Array]", J = "[object Uint8Array]", hr = "[object Uint8ClampedArray]", V = "[object Uint16Array]", or = "[object Uint32Array]", Ur = /[\\^$.*+?()[\]{}|]/g, ar = /^\[object .+?Constructor\]$/, Or = /^(?:0|[1-9]\d*)$/, j = {};
  j[v] = j[E] = j[k] = j[N] = j[W] = j[J] = j[hr] = j[V] = j[or] = !0, j[y] = j[d] = j[S] = j[c] = j[h] = j[l] = j[x] = j[g] = j[O] = j[H] = j[Y] = j[U] = j[z] = j[L] = j[w] = !1;
  var Vr = typeof _r == "object" && _r && _r.Object === Object && _r, Yr = typeof self == "object" && self && self.Object === Object && self, dr = Vr || Yr || Function("return this")(), vr = e && !e.nodeType && e, sr = vr && !0 && r && !r.nodeType && r, F = sr && sr.exports === vr, B = F && Vr.process, m = function() {
    try {
      var i = sr && sr.require && sr.require("util").types;
      return i || B && B.binding && B.binding("util");
    } catch {
    }
  }(), T = m && m.isTypedArray;
  function q(i, s, u) {
    switch (u.length) {
      case 0:
        return i.call(s);
      case 1:
        return i.call(s, u[0]);
      case 2:
        return i.call(s, u[0], u[1]);
      case 3:
        return i.call(s, u[0], u[1], u[2]);
    }
    return i.apply(s, u);
  }
  function tr(i, s) {
    for (var u = -1, b = Array(i); ++u < i; )
      b[u] = s(u);
    return b;
  }
  function er(i) {
    return function(s) {
      return i(s);
    };
  }
  function G(i, s) {
    return i == null ? void 0 : i[s];
  }
  function vt(i, s) {
    return function(u) {
      return i(s(u));
    };
  }
  var Wr = Array.prototype, _n = Function.prototype, Gr = Object.prototype, xt = dr["__core-js_shared__"], Kr = _n.toString, fr = Gr.hasOwnProperty, Qt = function() {
    var i = /[^.]+$/.exec(xt && xt.keys && xt.keys.IE_PROTO || "");
    return i ? "Symbol(src)_1." + i : "";
  }(), Xt = Gr.toString, Bn = Kr.call(Object), mn = RegExp(
    "^" + Kr.call(fr).replace(Ur, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Zr = F ? dr.Buffer : void 0, re = dr.Symbol, te = dr.Uint8Array, ee = Zr ? Zr.allocUnsafe : void 0, ne = vt(Object.getPrototypeOf, Object), ie = Object.create, An = Gr.propertyIsEnumerable, Un = Wr.splice, xr = re ? re.toStringTag : void 0, Jr = function() {
    try {
      var i = Et(Object, "defineProperty");
      return i({}, "", {}), i;
    } catch {
    }
  }(), Sn = Zr ? Zr.isBuffer : void 0, oe = Math.max, Fn = Date.now, ae = Et(dr, "Map"), Dr = Et(Object, "create"), Tn = function() {
    function i() {
    }
    return function(s) {
      if (!yr(s))
        return {};
      if (ie)
        return ie(s);
      i.prototype = s;
      var u = new i();
      return i.prototype = void 0, u;
    };
  }();
  function br(i) {
    var s = -1, u = i == null ? 0 : i.length;
    for (this.clear(); ++s < u; ) {
      var b = i[s];
      this.set(b[0], b[1]);
    }
  }
  function Pn() {
    this.__data__ = Dr ? Dr(null) : {}, this.size = 0;
  }
  function In(i) {
    var s = this.has(i) && delete this.__data__[i];
    return this.size -= s ? 1 : 0, s;
  }
  function kn(i) {
    var s = this.__data__;
    if (Dr) {
      var u = s[i];
      return u === n ? void 0 : u;
    }
    return fr.call(s, i) ? s[i] : void 0;
  }
  function Rn(i) {
    var s = this.__data__;
    return Dr ? s[i] !== void 0 : fr.call(s, i);
  }
  function jn(i, s) {
    var u = this.__data__;
    return this.size += this.has(i) ? 0 : 1, u[i] = Dr && s === void 0 ? n : s, this;
  }
  br.prototype.clear = Pn, br.prototype.delete = In, br.prototype.get = kn, br.prototype.has = Rn, br.prototype.set = jn;
  function ur(i) {
    var s = -1, u = i == null ? 0 : i.length;
    for (this.clear(); ++s < u; ) {
      var b = i[s];
      this.set(b[0], b[1]);
    }
  }
  function Cn() {
    this.__data__ = [], this.size = 0;
  }
  function On(i) {
    var s = this.__data__, u = Qr(s, i);
    if (u < 0)
      return !1;
    var b = s.length - 1;
    return u == b ? s.pop() : Un.call(s, u, 1), --this.size, !0;
  }
  function Dn(i) {
    var s = this.__data__, u = Qr(s, i);
    return u < 0 ? void 0 : s[u][1];
  }
  function Mn(i) {
    return Qr(this.__data__, i) > -1;
  }
  function $n(i, s) {
    var u = this.__data__, b = Qr(u, i);
    return b < 0 ? (++this.size, u.push([i, s])) : u[b][1] = s, this;
  }
  ur.prototype.clear = Cn, ur.prototype.delete = On, ur.prototype.get = Dn, ur.prototype.has = Mn, ur.prototype.set = $n;
  function Sr(i) {
    var s = -1, u = i == null ? 0 : i.length;
    for (this.clear(); ++s < u; ) {
      var b = i[s];
      this.set(b[0], b[1]);
    }
  }
  function Nn() {
    this.size = 0, this.__data__ = {
      hash: new br(),
      map: new (ae || ur)(),
      string: new br()
    };
  }
  function qn(i) {
    var s = rt(this, i).delete(i);
    return this.size -= s ? 1 : 0, s;
  }
  function Hn(i) {
    return rt(this, i).get(i);
  }
  function zn(i) {
    return rt(this, i).has(i);
  }
  function Ln(i, s) {
    var u = rt(this, i), b = u.size;
    return u.set(i, s), this.size += u.size == b ? 0 : 1, this;
  }
  Sr.prototype.clear = Nn, Sr.prototype.delete = qn, Sr.prototype.get = Hn, Sr.prototype.has = zn, Sr.prototype.set = Ln;
  function Fr(i) {
    var s = this.__data__ = new ur(i);
    this.size = s.size;
  }
  function Vn() {
    this.__data__ = new ur(), this.size = 0;
  }
  function Yn(i) {
    var s = this.__data__, u = s.delete(i);
    return this.size = s.size, u;
  }
  function Wn(i) {
    return this.__data__.get(i);
  }
  function Gn(i) {
    return this.__data__.has(i);
  }
  function Kn(i, s) {
    var u = this.__data__;
    if (u instanceof ur) {
      var b = u.__data__;
      if (!ae || b.length < t - 1)
        return b.push([i, s]), this.size = ++u.size, this;
      u = this.__data__ = new Sr(b);
    }
    return u.set(i, s), this.size = u.size, this;
  }
  Fr.prototype.clear = Vn, Fr.prototype.delete = Yn, Fr.prototype.get = Wn, Fr.prototype.has = Gn, Fr.prototype.set = Kn;
  function Zn(i, s) {
    var u = _t(i), b = !u && wt(i), I = !u && !b && he(i), C = !u && !b && !I && pe(i), D = u || b || I || C, P = D ? tr(i.length, String) : [], M = P.length;
    for (var Q in i)
      (s || fr.call(i, Q)) && !(D && (Q == "length" || I && (Q == "offset" || Q == "parent") || C && (Q == "buffer" || Q == "byteLength" || Q == "byteOffset") || ue(Q, M))) && P.push(Q);
    return P;
  }
  function bt(i, s, u) {
    (u !== void 0 && !tt(i[s], u) || u === void 0 && !(s in i)) && yt(i, s, u);
  }
  function Jn(i, s, u) {
    var b = i[s];
    (!(fr.call(i, s) && tt(b, u)) || u === void 0 && !(s in i)) && yt(i, s, u);
  }
  function Qr(i, s) {
    for (var u = i.length; u--; )
      if (tt(i[u][0], s))
        return u;
    return -1;
  }
  function yt(i, s, u) {
    s == "__proto__" && Jr ? Jr(i, s, {
      configurable: !0,
      enumerable: !0,
      value: u,
      writable: !0
    }) : i[s] = u;
  }
  var Qn = hi();
  function Xr(i) {
    return i == null ? i === void 0 ? A : rr : xr && xr in Object(i) ? li(i) : yi(i);
  }
  function se(i) {
    return Mr(i) && Xr(i) == y;
  }
  function Xn(i) {
    if (!yr(i) || xi(i))
      return !1;
    var s = mt(i) ? mn : ar;
    return s.test(_i(i));
  }
  function ri(i) {
    return Mr(i) && le(i.length) && !!j[Xr(i)];
  }
  function ti(i) {
    if (!yr(i))
      return bi(i);
    var s = ce(i), u = [];
    for (var b in i)
      b == "constructor" && (s || !fr.call(i, b)) || u.push(b);
    return u;
  }
  function fe(i, s, u, b, I) {
    i !== s && Qn(s, function(C, D) {
      if (I || (I = new Fr()), yr(C))
        ei(i, s, D, u, fe, b, I);
      else {
        var P = b ? b(gt(i, D), C, D + "", i, s, I) : void 0;
        P === void 0 && (P = C), bt(i, D, P);
      }
    }, de);
  }
  function ei(i, s, u, b, I, C, D) {
    var P = gt(i, u), M = gt(s, u), Q = D.get(M);
    if (Q) {
      bt(i, u, Q);
      return;
    }
    var K = C ? C(P, M, u + "", i, s, D) : void 0, $r = K === void 0;
    if ($r) {
      var At = _t(M), Ut = !At && he(M), xe = !At && !Ut && pe(M);
      K = M, At || Ut || xe ? _t(P) ? K = P : Bi(P) ? K = fi(P) : Ut ? ($r = !1, K = oi(M, !0)) : xe ? ($r = !1, K = si(M, !0)) : K = [] : mi(M) || wt(M) ? (K = P, wt(P) ? K = Ai(P) : (!yr(P) || mt(P)) && (K = pi(M))) : $r = !1;
    }
    $r && (D.set(M, K), I(K, M, b, C, D), D.delete(M)), bt(i, u, K);
  }
  function ni(i, s) {
    return gi(Ei(i, s, ve), i + "");
  }
  var ii = Jr ? function(i, s) {
    return Jr(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Si(s),
      writable: !0
    });
  } : ve;
  function oi(i, s) {
    if (s)
      return i.slice();
    var u = i.length, b = ee ? ee(u) : new i.constructor(u);
    return i.copy(b), b;
  }
  function ai(i) {
    var s = new i.constructor(i.byteLength);
    return new te(s).set(new te(i)), s;
  }
  function si(i, s) {
    var u = s ? ai(i.buffer) : i.buffer;
    return new i.constructor(u, i.byteOffset, i.length);
  }
  function fi(i, s) {
    var u = -1, b = i.length;
    for (s || (s = Array(b)); ++u < b; )
      s[u] = i[u];
    return s;
  }
  function ui(i, s, u, b) {
    var I = !u;
    u || (u = {});
    for (var C = -1, D = s.length; ++C < D; ) {
      var P = s[C], M = b ? b(u[P], i[P], P, u, i) : void 0;
      M === void 0 && (M = i[P]), I ? yt(u, P, M) : Jn(u, P, M);
    }
    return u;
  }
  function ci(i) {
    return ni(function(s, u) {
      var b = -1, I = u.length, C = I > 1 ? u[I - 1] : void 0, D = I > 2 ? u[2] : void 0;
      for (C = i.length > 3 && typeof C == "function" ? (I--, C) : void 0, D && di(u[0], u[1], D) && (C = I < 3 ? void 0 : C, I = 1), s = Object(s); ++b < I; ) {
        var P = u[b];
        P && i(s, P, b, C);
      }
      return s;
    });
  }
  function hi(i) {
    return function(s, u, b) {
      for (var I = -1, C = Object(s), D = b(s), P = D.length; P--; ) {
        var M = D[i ? P : ++I];
        if (u(C[M], M, C) === !1)
          break;
      }
      return s;
    };
  }
  function rt(i, s) {
    var u = i.__data__;
    return vi(s) ? u[typeof s == "string" ? "string" : "hash"] : u.map;
  }
  function Et(i, s) {
    var u = G(i, s);
    return Xn(u) ? u : void 0;
  }
  function li(i) {
    var s = fr.call(i, xr), u = i[xr];
    try {
      i[xr] = void 0;
      var b = !0;
    } catch {
    }
    var I = Xt.call(i);
    return b && (s ? i[xr] = u : delete i[xr]), I;
  }
  function pi(i) {
    return typeof i.constructor == "function" && !ce(i) ? Tn(ne(i)) : {};
  }
  function ue(i, s) {
    var u = typeof i;
    return s = s == null ? f : s, !!s && (u == "number" || u != "symbol" && Or.test(i)) && i > -1 && i % 1 == 0 && i < s;
  }
  function di(i, s, u) {
    if (!yr(u))
      return !1;
    var b = typeof s;
    return (b == "number" ? Bt(u) && ue(s, u.length) : b == "string" && s in u) ? tt(u[s], i) : !1;
  }
  function vi(i) {
    var s = typeof i;
    return s == "string" || s == "number" || s == "symbol" || s == "boolean" ? i !== "__proto__" : i === null;
  }
  function xi(i) {
    return !!Qt && Qt in i;
  }
  function ce(i) {
    var s = i && i.constructor, u = typeof s == "function" && s.prototype || Gr;
    return i === u;
  }
  function bi(i) {
    var s = [];
    if (i != null)
      for (var u in Object(i))
        s.push(u);
    return s;
  }
  function yi(i) {
    return Xt.call(i);
  }
  function Ei(i, s, u) {
    return s = oe(s === void 0 ? i.length - 1 : s, 0), function() {
      for (var b = arguments, I = -1, C = oe(b.length - s, 0), D = Array(C); ++I < C; )
        D[I] = b[s + I];
      I = -1;
      for (var P = Array(s + 1); ++I < s; )
        P[I] = b[I];
      return P[s] = u(D), q(i, this, P);
    };
  }
  function gt(i, s) {
    if (!(s === "constructor" && typeof i[s] == "function") && s != "__proto__")
      return i[s];
  }
  var gi = wi(ii);
  function wi(i) {
    var s = 0, u = 0;
    return function() {
      var b = Fn(), I = a - (b - u);
      if (u = b, I > 0) {
        if (++s >= o)
          return arguments[0];
      } else
        s = 0;
      return i.apply(void 0, arguments);
    };
  }
  function _i(i) {
    if (i != null) {
      try {
        return Kr.call(i);
      } catch {
      }
      try {
        return i + "";
      } catch {
      }
    }
    return "";
  }
  function tt(i, s) {
    return i === s || i !== i && s !== s;
  }
  var wt = se(function() {
    return arguments;
  }()) ? se : function(i) {
    return Mr(i) && fr.call(i, "callee") && !An.call(i, "callee");
  }, _t = Array.isArray;
  function Bt(i) {
    return i != null && le(i.length) && !mt(i);
  }
  function Bi(i) {
    return Mr(i) && Bt(i);
  }
  var he = Sn || Fi;
  function mt(i) {
    if (!yr(i))
      return !1;
    var s = Xr(i);
    return s == g || s == _ || s == p || s == ir;
  }
  function le(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= f;
  }
  function yr(i) {
    var s = typeof i;
    return i != null && (s == "object" || s == "function");
  }
  function Mr(i) {
    return i != null && typeof i == "object";
  }
  function mi(i) {
    if (!Mr(i) || Xr(i) != Y)
      return !1;
    var s = ne(i);
    if (s === null)
      return !0;
    var u = fr.call(s, "constructor") && s.constructor;
    return typeof u == "function" && u instanceof u && Kr.call(u) == Bn;
  }
  var pe = T ? er(T) : ri;
  function Ai(i) {
    return ui(i, de(i));
  }
  function de(i) {
    return Bt(i) ? Zn(i, !0) : ti(i);
  }
  var Ui = ci(function(i, s, u, b) {
    fe(i, s, u, b);
  });
  function Si(i) {
    return function() {
      return i;
    };
  }
  function ve(i) {
    return i;
  }
  function Fi() {
    return !1;
  }
  r.exports = Ui;
})(qt, qt.exports);
const Lo = qt.exports;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ht = function(r, e) {
  return Ht = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, n) {
    t.__proto__ = n;
  } || function(t, n) {
    for (var o in n)
      n.hasOwnProperty(o) && (t[o] = n[o]);
  }, Ht(r, e);
};
function Ar(r, e) {
  Ht(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function zt(r) {
  return typeof r == "function";
}
var je = !1, nr = {
  Promise: void 0,
  set useDeprecatedSynchronousErrorHandling(r) {
    if (r) {
      var e = /* @__PURE__ */ new Error();
      "" + e.stack;
    }
    je = r;
  },
  get useDeprecatedSynchronousErrorHandling() {
    return je;
  }
};
function Hr(r) {
  setTimeout(function() {
    throw r;
  }, 0);
}
var ot = {
  closed: !0,
  next: function(r) {
  },
  error: function(r) {
    if (nr.useDeprecatedSynchronousErrorHandling)
      throw r;
    Hr(r);
  },
  complete: function() {
  }
}, Vo = /* @__PURE__ */ function() {
  return Array.isArray || function(r) {
    return r && typeof r.length == "number";
  };
}();
function Yo(r) {
  return r !== null && typeof r == "object";
}
var Wo = /* @__PURE__ */ function() {
  function r(e) {
    return Error.call(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(t, n) {
      return n + 1 + ") " + t.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e, this;
  }
  return r.prototype = /* @__PURE__ */ Object.create(Error.prototype), r;
}(), it = Wo, Lr = /* @__PURE__ */ function() {
  function r(e) {
    this.closed = !1, this._parentOrParents = null, this._subscriptions = null, e && (this._ctorUnsubscribe = !0, this._unsubscribe = e);
  }
  return r.prototype.unsubscribe = function() {
    var e;
    if (!this.closed) {
      var t = this, n = t._parentOrParents, o = t._ctorUnsubscribe, a = t._unsubscribe, f = t._subscriptions;
      if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, n instanceof r)
        n.remove(this);
      else if (n !== null)
        for (var y = 0; y < n.length; ++y) {
          var d = n[y];
          d.remove(this);
        }
      if (zt(a)) {
        o && (this._unsubscribe = void 0);
        try {
          a.call(this);
        } catch (l) {
          e = l instanceof it ? Ce(l.errors) : [l];
        }
      }
      if (Vo(f))
        for (var y = -1, p = f.length; ++y < p; ) {
          var c = f[y];
          if (Yo(c))
            try {
              c.unsubscribe();
            } catch (x) {
              e = e || [], x instanceof it ? e = e.concat(Ce(x.errors)) : e.push(x);
            }
        }
      if (e)
        throw new it(e);
    }
  }, r.prototype.add = function(e) {
    var t = e;
    if (!e)
      return r.EMPTY;
    switch (typeof e) {
      case "function":
        t = new r(e);
      case "object":
        if (t === this || t.closed || typeof t.unsubscribe != "function")
          return t;
        if (this.closed)
          return t.unsubscribe(), t;
        if (!(t instanceof r)) {
          var n = t;
          t = new r(), t._subscriptions = [n];
        }
        break;
      default:
        throw new Error("unrecognized teardown " + e + " added to Subscription.");
    }
    var o = t._parentOrParents;
    if (o === null)
      t._parentOrParents = this;
    else if (o instanceof r) {
      if (o === this)
        return t;
      t._parentOrParents = [o, this];
    } else if (o.indexOf(this) === -1)
      o.push(this);
    else
      return t;
    var a = this._subscriptions;
    return a === null ? this._subscriptions = [t] : a.push(t), t;
  }, r.prototype.remove = function(e) {
    var t = this._subscriptions;
    if (t) {
      var n = t.indexOf(e);
      n !== -1 && t.splice(n, 1);
    }
  }, r.EMPTY = function(e) {
    return e.closed = !0, e;
  }(new r()), r;
}();
function Ce(r) {
  return r.reduce(function(e, t) {
    return e.concat(t instanceof it ? t.errors : t);
  }, []);
}
var at = /* @__PURE__ */ function() {
  return typeof Symbol == "function" ? /* @__PURE__ */ Symbol("rxSubscriber") : "@@rxSubscriber_" + /* @__PURE__ */ Math.random();
}(), Ir = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t, n, o) {
    var a = r.call(this) || this;
    switch (a.syncErrorValue = null, a.syncErrorThrown = !1, a.syncErrorThrowable = !1, a.isStopped = !1, arguments.length) {
      case 0:
        a.destination = ot;
        break;
      case 1:
        if (!t) {
          a.destination = ot;
          break;
        }
        if (typeof t == "object") {
          t instanceof e ? (a.syncErrorThrowable = t.syncErrorThrowable, a.destination = t, t.add(a)) : (a.syncErrorThrowable = !0, a.destination = new Oe(a, t));
          break;
        }
      default:
        a.syncErrorThrowable = !0, a.destination = new Oe(a, t, n, o);
        break;
    }
    return a;
  }
  return e.prototype[at] = function() {
    return this;
  }, e.create = function(t, n, o) {
    var a = new e(t, n, o);
    return a.syncErrorThrowable = !1, a;
  }, e.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, e.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this));
  }, e.prototype._next = function(t) {
    this.destination.next(t);
  }, e.prototype._error = function(t) {
    this.destination.error(t), this.unsubscribe();
  }, e.prototype._complete = function() {
    this.destination.complete(), this.unsubscribe();
  }, e.prototype._unsubscribeAndRecycle = function() {
    var t = this._parentOrParents;
    return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this;
  }, e;
}(Lr), Oe = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t, n, o, a) {
    var f = r.call(this) || this;
    f._parentSubscriber = t;
    var y, d = f;
    return zt(n) ? y = n : n && (y = n.next, o = n.error, a = n.complete, n !== ot && (d = Object.create(n), zt(d.unsubscribe) && f.add(d.unsubscribe.bind(d)), d.unsubscribe = f.unsubscribe.bind(f))), f._context = d, f._next = y, f._error = o, f._complete = a, f;
  }
  return e.prototype.next = function(t) {
    if (!this.isStopped && this._next) {
      var n = this._parentSubscriber;
      !nr.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable ? this.__tryOrUnsub(this._next, t) : this.__tryOrSetError(n, this._next, t) && this.unsubscribe();
    }
  }, e.prototype.error = function(t) {
    if (!this.isStopped) {
      var n = this._parentSubscriber, o = nr.useDeprecatedSynchronousErrorHandling;
      if (this._error)
        !o || !n.syncErrorThrowable ? (this.__tryOrUnsub(this._error, t), this.unsubscribe()) : (this.__tryOrSetError(n, this._error, t), this.unsubscribe());
      else if (n.syncErrorThrowable)
        o ? (n.syncErrorValue = t, n.syncErrorThrown = !0) : Hr(t), this.unsubscribe();
      else {
        if (this.unsubscribe(), o)
          throw t;
        Hr(t);
      }
    }
  }, e.prototype.complete = function() {
    var t = this;
    if (!this.isStopped) {
      var n = this._parentSubscriber;
      if (this._complete) {
        var o = function() {
          return t._complete.call(t._context);
        };
        !nr.useDeprecatedSynchronousErrorHandling || !n.syncErrorThrowable ? (this.__tryOrUnsub(o), this.unsubscribe()) : (this.__tryOrSetError(n, o), this.unsubscribe());
      } else
        this.unsubscribe();
    }
  }, e.prototype.__tryOrUnsub = function(t, n) {
    try {
      t.call(this._context, n);
    } catch (o) {
      if (this.unsubscribe(), nr.useDeprecatedSynchronousErrorHandling)
        throw o;
      Hr(o);
    }
  }, e.prototype.__tryOrSetError = function(t, n, o) {
    if (!nr.useDeprecatedSynchronousErrorHandling)
      throw new Error("bad call");
    try {
      n.call(this._context, o);
    } catch (a) {
      return nr.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = a, t.syncErrorThrown = !0, !0) : (Hr(a), !0);
    }
    return !1;
  }, e.prototype._unsubscribe = function() {
    var t = this._parentSubscriber;
    this._context = null, this._parentSubscriber = null, t.unsubscribe();
  }, e;
}(Ir);
function Go(r) {
  for (; r; ) {
    var e = r, t = e.closed, n = e.destination, o = e.isStopped;
    if (t || o)
      return !1;
    n && n instanceof Ir ? r = n : r = null;
  }
  return !0;
}
function Ko(r, e, t) {
  if (r) {
    if (r instanceof Ir)
      return r;
    if (r[at])
      return r[at]();
  }
  return !r && !e && !t ? new Ir(ot) : new Ir(r, e, t);
}
var Zo = /* @__PURE__ */ function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Jo(r) {
  return r;
}
function Qo(r) {
  return r.length === 0 ? Jo : r.length === 1 ? r[0] : function(t) {
    return r.reduce(function(n, o) {
      return o(n);
    }, t);
  };
}
var De = /* @__PURE__ */ function() {
  function r(e) {
    this._isScalar = !1, e && (this._subscribe = e);
  }
  return r.prototype.lift = function(e) {
    var t = new r();
    return t.source = this, t.operator = e, t;
  }, r.prototype.subscribe = function(e, t, n) {
    var o = this.operator, a = Ko(e, t, n);
    if (o ? a.add(o.call(a, this.source)) : a.add(this.source || nr.useDeprecatedSynchronousErrorHandling && !a.syncErrorThrowable ? this._subscribe(a) : this._trySubscribe(a)), nr.useDeprecatedSynchronousErrorHandling && a.syncErrorThrowable && (a.syncErrorThrowable = !1, a.syncErrorThrown))
      throw a.syncErrorValue;
    return a;
  }, r.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (t) {
      nr.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t), Go(e) ? e.error(t) : console.warn(t);
    }
  }, r.prototype.forEach = function(e, t) {
    var n = this;
    return t = Me(t), new t(function(o, a) {
      var f;
      f = n.subscribe(function(y) {
        try {
          e(y);
        } catch (d) {
          a(d), f && f.unsubscribe();
        }
      }, a, o);
    });
  }, r.prototype._subscribe = function(e) {
    var t = this.source;
    return t && t.subscribe(e);
  }, r.prototype[Zo] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return e.length === 0 ? this : Qo(e)(this);
  }, r.prototype.toPromise = function(e) {
    var t = this;
    return e = Me(e), new e(function(n, o) {
      var a;
      t.subscribe(function(f) {
        return a = f;
      }, function(f) {
        return o(f);
      }, function() {
        return n(a);
      });
    });
  }, r.create = function(e) {
    return new r(e);
  }, r;
}();
function Me(r) {
  if (r || (r = nr.Promise || Promise), !r)
    throw new Error("no Promise impl found");
  return r;
}
var Xo = /* @__PURE__ */ function() {
  function r() {
    return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this;
  }
  return r.prototype = /* @__PURE__ */ Object.create(Error.prototype), r;
}(), Pr = Xo, ra = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t, n) {
    var o = r.call(this) || this;
    return o.subject = t, o.subscriber = n, o.closed = !1, o;
  }
  return e.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.closed = !0;
      var t = this.subject, n = t.observers;
      if (this.subject = null, !(!n || n.length === 0 || t.isStopped || t.closed)) {
        var o = n.indexOf(this.subscriber);
        o !== -1 && n.splice(o, 1);
      }
    }
  }, e;
}(Lr), ta = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t) {
    var n = r.call(this, t) || this;
    return n.destination = t, n;
  }
  return e;
}(Ir), gn = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e() {
    var t = r.call(this) || this;
    return t.observers = [], t.closed = !1, t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return e.prototype[at] = function() {
    return new ta(this);
  }, e.prototype.lift = function(t) {
    var n = new $e(this, this);
    return n.operator = t, n;
  }, e.prototype.next = function(t) {
    if (this.closed)
      throw new Pr();
    if (!this.isStopped)
      for (var n = this.observers, o = n.length, a = n.slice(), f = 0; f < o; f++)
        a[f].next(t);
  }, e.prototype.error = function(t) {
    if (this.closed)
      throw new Pr();
    this.hasError = !0, this.thrownError = t, this.isStopped = !0;
    for (var n = this.observers, o = n.length, a = n.slice(), f = 0; f < o; f++)
      a[f].error(t);
    this.observers.length = 0;
  }, e.prototype.complete = function() {
    if (this.closed)
      throw new Pr();
    this.isStopped = !0;
    for (var t = this.observers, n = t.length, o = t.slice(), a = 0; a < n; a++)
      o[a].complete();
    this.observers.length = 0;
  }, e.prototype.unsubscribe = function() {
    this.isStopped = !0, this.closed = !0, this.observers = null;
  }, e.prototype._trySubscribe = function(t) {
    if (this.closed)
      throw new Pr();
    return r.prototype._trySubscribe.call(this, t);
  }, e.prototype._subscribe = function(t) {
    if (this.closed)
      throw new Pr();
    return this.hasError ? (t.error(this.thrownError), Lr.EMPTY) : this.isStopped ? (t.complete(), Lr.EMPTY) : (this.observers.push(t), new ra(this, t));
  }, e.prototype.asObservable = function() {
    var t = new De();
    return t.source = this, t;
  }, e.create = function(t, n) {
    return new $e(t, n);
  }, e;
}(De), $e = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t, n) {
    var o = r.call(this) || this;
    return o.destination = t, o.source = n, o;
  }
  return e.prototype.next = function(t) {
    var n = this.destination;
    n && n.next && n.next(t);
  }, e.prototype.error = function(t) {
    var n = this.destination;
    n && n.error && this.destination.error(t);
  }, e.prototype.complete = function() {
    var t = this.destination;
    t && t.complete && this.destination.complete();
  }, e.prototype._subscribe = function(t) {
    var n = this.source;
    return n ? this.source.subscribe(t) : Lr.EMPTY;
  }, e;
}(gn), Ne = /* @__PURE__ */ function(r) {
  Ar(e, r);
  function e(t) {
    var n = r.call(this) || this;
    return n._value = t, n;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype._subscribe = function(t) {
    var n = r.prototype._subscribe.call(this, t);
    return n && !n.closed && t.next(this._value), n;
  }, e.prototype.getValue = function() {
    if (this.hasError)
      throw this.thrownError;
    if (this.closed)
      throw new Pr();
    return this._value;
  }, e.prototype.next = function(t) {
    r.prototype.next.call(this, this._value = t);
  }, e;
}(gn);
let ea = Symbol("clean"), wr = [], na = (r) => {
  let e, t = [], n = {
    lc: 0,
    value: r,
    set(o) {
      n.value = o, n.notify();
    },
    get() {
      return n.lc || n.listen(() => {
      })(), n.value;
    },
    notify(o) {
      e = t;
      let a = !wr.length;
      for (let f = 0; f < e.length; f++)
        wr.push(e[f], n.value, o);
      if (a) {
        for (let f = 0; f < wr.length; f += 3)
          wr[f](wr[f + 1], wr[f + 2]);
        wr.length = 0;
      }
    },
    listen(o) {
      return t === e && (t = t.slice()), n.lc = t.push(o), () => {
        t === e && (t = t.slice());
        let a = t.indexOf(o);
        ~a && (t.splice(a, 1), n.lc--, n.lc || n.off());
      };
    },
    subscribe(o) {
      let a = n.listen(o);
      return o(n.value), a;
    },
    off() {
    }
  };
  return {}.NODE_ENV !== "production" && (n[ea] = () => {
    t = [], n.lc = 0, n.off();
  }), n;
};
const ia = na({});
class oa {
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
      const o = e[n];
      if (o == null) {
        this.collection.delete(n), this.removeCb(n);
        continue;
      }
      const a = this.collectionClass ? new this.collectionClass(o, n) : o;
      this.collection.has(n) || this.addCb(n, a), this.collection.set(n, a), t[n] = a;
    }
    return t;
  }
}
class aa {
  constructor(e, t) {
    this.id = t, Object.assign(this, e);
  }
  isMe() {
    return Jt.userId == this.id;
  }
}
const wn = class {
  constructor() {
    this.obs$ = new Ne({}), this.users = new oa(aa);
  }
  get value() {
    return this.obs$.asObservable();
  }
  join(r) {
    this.socket.emit(":join", r);
  }
  input(r, e) {
    return this.socket.emit(":input", { prop: r, value: e }), {
      catchError: (t) => this.socket.once(":error", t)
    };
  }
  action(r, e) {
    return this.socket.emit(":action", { name: r, value: e }), {
      catchError: (t) => this.socket.once(":error", t)
    };
  }
  listen(r, e) {
    return this.socket = r, this.socket.on("uid", (t) => {
      wn.userId = t;
    }), this.socket.on("w", (t) => {
      const n = new Uint8Array(t), o = mr.decode(n), [a, f, y] = o, d = this.obs$.value.roomId;
      let p = {};
      d == a ? (y.join = !1, p = Lo({ ...this.obs$.value.data || {} }, y, (c, l) => {
        if (typeof l == "object" && l != null && Object.values(l).length == 0)
          return {};
      })) : p = y, y.users && (p.users = this.users.detectChanges(p.users)), this.obs$.next({
        roomId: a,
        data: p,
        partial: y,
        time: f
      }), ia.set({ ...p });
    }), this;
  }
  reset() {
    this.obs$ = new Ne({});
  }
};
let Jt = wn;
Jt.userId = null;
const sa = new Jt();
export {
  sa as World,
  ia as room
};
