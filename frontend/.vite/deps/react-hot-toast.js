"use client";
import {
  require_react
} from "./chunk-TVFQMRVC.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-hot-toast/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);
var l2 = __toESM(require_react(), 1);

// node_modules/goober/dist/goober.modern.js
var e = { data: "" };
var t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
var l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
var a = /\/\*[^]*?\*\/|  +/g;
var n = /\n+/g;
var o = (e2, t2) => {
  let r = "", l3 = "", a2 = "";
  for (let n2 in e2) {
    let c3 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r = n2 + " " + c3 + ";" : l3 += "f" == n2[1] ? o(c3, n2) : n2 + "{" + o(c3, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c3 ? l3 += o(c3, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c3 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c3) : n2 + ":" + c3 + ";");
  }
  return r + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l3;
};
var c = {};
var s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r in e2) t2 += r + s(e2[r]);
    return t2;
  }
  return e2;
};
var i = (e2, t2, r, i2, p2) => {
  let u3 = s(e2), d2 = c[u3] || (c[u3] = ((e3) => {
    let t3 = 0, r2 = 11;
    for (; t3 < e3.length; ) r2 = 101 * r2 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r2;
  })(u3));
  if (!c[d2]) {
    let t3 = u3 !== e2 ? e2 : ((e3) => {
      let t4, r2, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); ) t4[4] ? o2.shift() : t4[3] ? (r2 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r2] = o2[0][r2] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o2[0];
    })(e2);
    c[d2] = o(p2 ? { ["@keyframes " + d2]: t3 } : t3, r ? "" : "." + d2);
  }
  let f3 = r && c.g ? c.g : null;
  return r && (c.g = c[d2]), ((e3, t3, r2, l3) => {
    l3 ? t3.data = t3.data.replace(l3, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r2 ? e3 + t3.data : t3.data + e3);
  })(c[d2], t2, i2, f3), d2;
};
var p = (e2, t2, r) => e2.reduce((e3, l3, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l3 + (null == n2 ? "" : n2);
}, "");
function u(e2) {
  let r = this || {}, l3 = e2.call ? e2(r.p) : e2;
  return i(l3.unshift ? l3.raw ? p(l3, [].slice.call(arguments, 1), r.p) : l3.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r.p) : t2), {}) : l3, t(r.target), r.g, r.o, r.k);
}
var d;
var f;
var g;
var b = u.bind({ g: 1 });
var h = u.bind({ k: 1 });
function m(e2, t2, r, l3) {
  o.p = t2, d = e2, f = r, g = l3;
}
function j(e2, t2) {
  let r = this || {};
  return function() {
    let l3 = arguments;
    function a2(n2, o2) {
      let c3 = Object.assign({}, n2), s2 = c3.className || a2.className;
      r.p = Object.assign({ theme: f && f() }, c3), r.o = / *go\d+/.test(s2), c3.className = u.apply(r, l3) + (s2 ? " " + s2 : ""), t2 && (c3.ref = o2);
      let i2 = e2;
      return e2[0] && (i2 = c3.as || e2, delete c3.as), g && i2[0] && g(c3), d(i2, c3);
    }
    return t2 ? t2(a2) : a2;
  };
}

// node_modules/react-hot-toast/dist/index.mjs
var g2 = __toESM(require_react(), 1);
var T = __toESM(require_react(), 1);
var W = (e2) => typeof e2 == "function";
var f2 = (e2, t2) => W(e2) ? e2(t2) : e2;
var F = /* @__PURE__ */ (() => {
  let e2 = 0;
  return () => (++e2).toString();
})();
var A = /* @__PURE__ */ (() => {
  let e2;
  return () => {
    if (e2 === void 0 && typeof window < "u") {
      let t2 = matchMedia("(prefers-reduced-motion: reduce)");
      e2 = !t2 || t2.matches;
    }
    return e2;
  };
})();
var Y = 20;
var U = (e2, t2) => {
  switch (t2.type) {
    case 0:
      return { ...e2, toasts: [t2.toast, ...e2.toasts].slice(0, Y) };
    case 1:
      return { ...e2, toasts: e2.toasts.map((o2) => o2.id === t2.toast.id ? { ...o2, ...t2.toast } : o2) };
    case 2:
      let { toast: r } = t2;
      return U(e2, { type: e2.toasts.find((o2) => o2.id === r.id) ? 1 : 0, toast: r });
    case 3:
      let { toastId: s2 } = t2;
      return { ...e2, toasts: e2.toasts.map((o2) => o2.id === s2 || s2 === void 0 ? { ...o2, dismissed: true, visible: false } : o2) };
    case 4:
      return t2.toastId === void 0 ? { ...e2, toasts: [] } : { ...e2, toasts: e2.toasts.filter((o2) => o2.id !== t2.toastId) };
    case 5:
      return { ...e2, pausedAt: t2.time };
    case 6:
      let a2 = t2.time - (e2.pausedAt || 0);
      return { ...e2, pausedAt: void 0, toasts: e2.toasts.map((o2) => ({ ...o2, pauseDuration: o2.pauseDuration + a2 })) };
  }
};
var P = [];
var y = { toasts: [], pausedAt: void 0 };
var u2 = (e2) => {
  y = U(y, e2), P.forEach((t2) => {
    t2(y);
  });
};
var q = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 };
var D = (e2 = {}) => {
  let [t2, r] = (0, import_react.useState)(y), s2 = (0, import_react.useRef)(y);
  (0, import_react.useEffect)(() => (s2.current !== y && r(y), P.push(r), () => {
    let o2 = P.indexOf(r);
    o2 > -1 && P.splice(o2, 1);
  }), []);
  let a2 = t2.toasts.map((o2) => {
    var n2, i2, p2;
    return { ...e2, ...e2[o2.type], ...o2, removeDelay: o2.removeDelay || ((n2 = e2[o2.type]) == null ? void 0 : n2.removeDelay) || (e2 == null ? void 0 : e2.removeDelay), duration: o2.duration || ((i2 = e2[o2.type]) == null ? void 0 : i2.duration) || (e2 == null ? void 0 : e2.duration) || q[o2.type], style: { ...e2.style, ...(p2 = e2[o2.type]) == null ? void 0 : p2.style, ...o2.style } };
  });
  return { ...t2, toasts: a2 };
};
var J = (e2, t2 = "blank", r) => ({ createdAt: Date.now(), visible: true, dismissed: false, type: t2, ariaProps: { role: "status", "aria-live": "polite" }, message: e2, pauseDuration: 0, ...r, id: (r == null ? void 0 : r.id) || F() });
var x = (e2) => (t2, r) => {
  let s2 = J(t2, e2, r);
  return u2({ type: 2, toast: s2 }), s2.id;
};
var c2 = (e2, t2) => x("blank")(e2, t2);
c2.error = x("error");
c2.success = x("success");
c2.loading = x("loading");
c2.custom = x("custom");
c2.dismiss = (e2) => {
  u2({ type: 3, toastId: e2 });
};
c2.remove = (e2) => u2({ type: 4, toastId: e2 });
c2.promise = (e2, t2, r) => {
  let s2 = c2.loading(t2.loading, { ...r, ...r == null ? void 0 : r.loading });
  return typeof e2 == "function" && (e2 = e2()), e2.then((a2) => {
    let o2 = t2.success ? f2(t2.success, a2) : void 0;
    return o2 ? c2.success(o2, { id: s2, ...r, ...r == null ? void 0 : r.success }) : c2.dismiss(s2), a2;
  }).catch((a2) => {
    let o2 = t2.error ? f2(t2.error, a2) : void 0;
    o2 ? c2.error(o2, { id: s2, ...r, ...r == null ? void 0 : r.error }) : c2.dismiss(s2);
  }), e2;
};
var K = (e2, t2) => {
  u2({ type: 1, toast: { id: e2, height: t2 } });
};
var X = () => {
  u2({ type: 5, time: Date.now() });
};
var b2 = /* @__PURE__ */ new Map();
var Z = 1e3;
var ee = (e2, t2 = Z) => {
  if (b2.has(e2)) return;
  let r = setTimeout(() => {
    b2.delete(e2), u2({ type: 4, toastId: e2 });
  }, t2);
  b2.set(e2, r);
};
var O = (e2) => {
  let { toasts: t2, pausedAt: r } = D(e2);
  (0, import_react2.useEffect)(() => {
    if (r) return;
    let o2 = Date.now(), n2 = t2.map((i2) => {
      if (i2.duration === 1 / 0) return;
      let p2 = (i2.duration || 0) + i2.pauseDuration - (o2 - i2.createdAt);
      if (p2 < 0) {
        i2.visible && c2.dismiss(i2.id);
        return;
      }
      return setTimeout(() => c2.dismiss(i2.id), p2);
    });
    return () => {
      n2.forEach((i2) => i2 && clearTimeout(i2));
    };
  }, [t2, r]);
  let s2 = (0, import_react2.useCallback)(() => {
    r && u2({ type: 6, time: Date.now() });
  }, [r]), a2 = (0, import_react2.useCallback)((o2, n2) => {
    let { reverseOrder: i2 = false, gutter: p2 = 8, defaultPosition: d2 } = n2 || {}, h2 = t2.filter((m2) => (m2.position || d2) === (o2.position || d2) && m2.height), v = h2.findIndex((m2) => m2.id === o2.id), S = h2.filter((m2, E) => E < v && m2.visible).length;
    return h2.filter((m2) => m2.visible).slice(...i2 ? [S + 1] : [0, S]).reduce((m2, E) => m2 + (E.height || 0) + p2, 0);
  }, [t2]);
  return (0, import_react2.useEffect)(() => {
    t2.forEach((o2) => {
      if (o2.dismissed) ee(o2.id, o2.removeDelay);
      else {
        let n2 = b2.get(o2.id);
        n2 && (clearTimeout(n2), b2.delete(o2.id));
      }
    });
  }, [t2]), { toasts: t2, handlers: { updateHeight: K, startPause: X, endPause: s2, calculateOffset: a2 } };
};
var oe = h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`;
var re = h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`;
var se = h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`;
var k = j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e2) => e2.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var ne = h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
var V = j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e2) => e2.secondary || "#e0e0e0"};
  border-right-color: ${(e2) => e2.primary || "#616161"};
  animation: ${ne} 1s linear infinite;
`;
var pe = h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`;
var de = h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`;
var _ = j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e2) => e2.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var ue = j("div")`
  position: absolute;
`;
var le = j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;
var fe = h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`;
var Te = j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${fe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;
var M = ({ toast: e2 }) => {
  let { icon: t2, type: r, iconTheme: s2 } = e2;
  return t2 !== void 0 ? typeof t2 == "string" ? g2.createElement(Te, null, t2) : t2 : r === "blank" ? null : g2.createElement(le, null, g2.createElement(V, { ...s2 }), r !== "loading" && g2.createElement(ue, null, r === "error" ? g2.createElement(k, { ...s2 }) : g2.createElement(_, { ...s2 })));
};
var ye = (e2) => `
0% {transform: translate3d(0,${e2 * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`;
var ge = (e2) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e2 * -150}%,-1px) scale(.6); opacity:0;}
`;
var he = "0%{opacity:0;} 100%{opacity:1;}";
var xe = "0%{opacity:1;} 100%{opacity:0;}";
var be = j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`;
var Se = j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;
var Ae = (e2, t2) => {
  let s2 = e2.includes("top") ? 1 : -1, [a2, o2] = A() ? [he, xe] : [ye(s2), ge(s2)];
  return { animation: t2 ? `${h(a2)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${h(o2)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
};
var C = l2.memo(({ toast: e2, position: t2, style: r, children: s2 }) => {
  let a2 = e2.height ? Ae(e2.position || t2 || "top-center", e2.visible) : { opacity: 0 }, o2 = l2.createElement(M, { toast: e2 }), n2 = l2.createElement(Se, { ...e2.ariaProps }, f2(e2.message, e2));
  return l2.createElement(be, { className: e2.className, style: { ...a2, ...r, ...e2.style } }, typeof s2 == "function" ? s2({ icon: o2, message: n2 }) : l2.createElement(l2.Fragment, null, o2, n2));
});
m(T.createElement);
var ve = ({ id: e2, className: t2, style: r, onHeightUpdate: s2, children: a2 }) => {
  let o2 = T.useCallback((n2) => {
    if (n2) {
      let i2 = () => {
        let p2 = n2.getBoundingClientRect().height;
        s2(e2, p2);
      };
      i2(), new MutationObserver(i2).observe(n2, { subtree: true, childList: true, characterData: true });
    }
  }, [e2, s2]);
  return T.createElement("div", { ref: o2, className: t2, style: r }, a2);
};
var Ee = (e2, t2) => {
  let r = e2.includes("top"), s2 = r ? { top: 0 } : { bottom: 0 }, a2 = e2.includes("center") ? { justifyContent: "center" } : e2.includes("right") ? { justifyContent: "flex-end" } : {};
  return { left: 0, right: 0, display: "flex", position: "absolute", transition: A() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)", transform: `translateY(${t2 * (r ? 1 : -1)}px)`, ...s2, ...a2 };
};
var De = u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;
var R = 16;
var Oe = ({ reverseOrder: e2, position: t2 = "top-center", toastOptions: r, gutter: s2, children: a2, containerStyle: o2, containerClassName: n2 }) => {
  let { toasts: i2, handlers: p2 } = O(r);
  return T.createElement("div", { id: "_rht_toaster", style: { position: "fixed", zIndex: 9999, top: R, left: R, right: R, bottom: R, pointerEvents: "none", ...o2 }, className: n2, onMouseEnter: p2.startPause, onMouseLeave: p2.endPause }, i2.map((d2) => {
    let h2 = d2.position || t2, v = p2.calculateOffset(d2, { reverseOrder: e2, gutter: s2, defaultPosition: t2 }), S = Ee(h2, v);
    return T.createElement(ve, { id: d2.id, key: d2.id, onHeightUpdate: p2.updateHeight, className: d2.visible ? De : "", style: S }, d2.type === "custom" ? f2(d2.message, d2) : a2 ? a2(d2) : T.createElement(C, { toast: d2, position: h2 }));
  }));
};
var Vt = c2;
export {
  _ as CheckmarkIcon,
  k as ErrorIcon,
  V as LoaderIcon,
  C as ToastBar,
  M as ToastIcon,
  Oe as Toaster,
  Vt as default,
  f2 as resolveValue,
  c2 as toast,
  O as useToaster,
  D as useToasterStore
};
//# sourceMappingURL=react-hot-toast.js.map
