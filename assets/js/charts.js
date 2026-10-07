/*
	Tiny SVG chart helpers. No dependencies.

	Usage: <div class="chart" data-chart='{"type":"bars","data":[...]}'></div>
	Every element with [data-chart] is rendered on load and re-rendered on resize,
	so labels stay readable at any width. Colors come from CSS variables
	(.s1 … .s5).

	Types: bars, columns, donut, scatter, funnel.
	Synthetic data ("gen") is only for visuals labeled "Illustrative" in the page.
*/
(function () {
	"use strict";

	var NS = "http://www.w3.org/2000/svg";

	function make(tag, attrs, parent) {
		var n = document.createElementNS(NS, tag);
		for (var k in attrs) if (attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
		if (parent) parent.appendChild(n);
		return n;
	}
	function text(parent, x, y, str, attrs) {
		var t = make("text", Object.assign({ x: x, y: y }, attrs || {}), parent);
		t.textContent = str;
		return t;
	}
	function fmt(v, d) {
		return Number(v).toLocaleString("en-US", { maximumFractionDigits: d || 0, minimumFractionDigits: d || 0 });
	}

	/* ---------- Tooltip ---------- */
	var tip;
	function ensureTip() {
		if (!tip) {
			tip = document.createElement("div");
			tip.className = "chart-tip";
			tip.setAttribute("role", "status");
			document.body.appendChild(tip);
		}
		return tip;
	}
	function bindTip(node, html) {
		node.classList.add("mark");
		node.addEventListener("mousemove", function (e) {
			var t = ensureTip();
			t.innerHTML = html;
			t.classList.add("show");
			var x = e.clientX + 14, y = e.clientY + 14;
			var r = t.getBoundingClientRect();
			if (x + r.width > window.innerWidth - 8) x = e.clientX - r.width - 14;
			if (y + r.height > window.innerHeight - 8) y = e.clientY - r.height - 14;
			t.style.left = x + "px";
			t.style.top = y + "px";
		});
		node.addEventListener("mouseleave", function () { ensureTip().classList.remove("show"); });
	}

	/* ---------- Seeded random (deterministic illustrative data) ---------- */
	function rng(seed) {
		var a = seed >>> 0;
		return function () {
			a |= 0; a = (a + 0x6D2B79F5) | 0;
			var t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}
	function gauss(r) {
		var u = 1 - r(), v = r();
		return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
	}

	var generators = {
		/* k Gaussian blobs: {centers:[[x,y],...], n, spread, seed} */
		clusters: function (c) {
			var r = rng(c.seed || 7), pts = [];
			c.centers.forEach(function (ctr, g) {
				for (var i = 0; i < (c.n || 60); i++) {
					pts.push({ x: ctr[0] + gauss(r) * (c.spread || 1), y: ctr[1] + gauss(r) * (c.spread || 1), g: g });
				}
			});
			return pts;
		},
		/* predicted vs actual days-to-pay with MAE close to c.mae */
		predActual: function (c) {
			var r = rng(c.seed || 11), pts = [], sigma = (c.mae || 1.86) / 0.7979;
			for (var i = 0; i < (c.n || 160); i++) {
				var a = Math.round(2 + r() * 38);
				pts.push({ x: a, y: Math.max(0, a + gauss(r) * sigma), g: 0 });
			}
			return pts;
		},
		/* histogram of prediction errors (days) */
		errorHist: function (c) {
			var r = rng(c.seed || 11), sigma = (c.mae || 1.86) / 0.7979, bins = {};
			for (var b = -7; b <= 7; b++) bins[b] = 0;
			for (var i = 0; i < (c.n || 1200); i++) {
				var e = Math.round(gauss(r) * sigma);
				if (e >= -7 && e <= 7) bins[e]++;
			}
			return Object.keys(bins).map(Number).sort(function (a, b) { return a - b; })
				.map(function (k) { return { l: (k > 0 ? "+" : "") + k, v: bins[k], s: Math.abs(k) <= 2 ? 1 : 2 }; });
		}
	};

	/* ---------- Renderers ---------- */
	var R = {};

	/* Horizontal bars: data [{l, v, d?, s?}] */
	R.bars = function (svg, c, W) {
		var data = c.data, rowH = 36, labelW = Math.min(c.labelWidth || 190, W * 0.42), pad = 64;
		var H = data.length * rowH + 4;
		var max = c.max || Math.max.apply(null, data.map(function (d) { return d.v; }));
		var bw = W - labelW - pad;
		svg.setAttribute("viewBox", "0 0 " + W + " " + H);
		data.forEach(function (d, i) {
			var y = i * rowH;
			text(svg, 0, y + rowH / 2 + 4, d.l, { class: "lbl" });
			make("rect", { x: labelW, y: y + 8, width: bw, height: rowH - 16, rx: 5, fill: "var(--surface-3)" }, svg);
			var w = Math.max(3, (d.v / max) * bw);
			var bar = make("rect", { x: labelW, y: y + 8, width: w, height: rowH - 16, rx: 5, class: "s" + (d.s || 1) }, svg);
			bindTip(bar, "<b>" + (d.d || fmt(d.v)) + "</b> · " + d.l);
			text(svg, labelW + w + 8, y + rowH / 2 + 4, d.d || fmt(d.v), { class: "val" });
		});
	};

	/* Vertical columns: data [{l, v, s?}], c.yLabel, c.xLabel */
	R.columns = function (svg, c, W) {
		var data = c.gen ? generators[c.gen](c) : c.data;
		var H = c.height || 240, m = { t: 12, r: 8, b: 40, l: 36 };
		var iw = W - m.l - m.r, ih = H - m.t - m.b;
		var max = Math.max.apply(null, data.map(function (d) { return d.v; })) * 1.1;
		svg.setAttribute("viewBox", "0 0 " + W + " " + H);
		for (var g = 0; g <= 4; g++) {
			var gy = m.t + ih - (g / 4) * ih;
			make("line", { x1: m.l, x2: W - m.r, y1: gy, y2: gy, class: "gridline" }, svg);
		}
		var step = iw / data.length;
		data.forEach(function (d, i) {
			var h = (d.v / max) * ih, x = m.l + i * step + step * 0.15;
			var bar = make("rect", { x: x, y: m.t + ih - h, width: step * 0.7, height: h, rx: 3, class: "s" + (d.s || 1) }, svg);
			bindTip(bar, (c.xLabel ? c.xLabel + " " : "") + "<b>" + d.l + "</b>" + (c.showValues === false ? "" : ": " + fmt(d.v)));
			if (data.length <= 16 && (W > 420 || i % 2 === 0)) {
				text(svg, x + step * 0.35, H - m.b + 16, d.l, { "text-anchor": "middle" });
			}
		});
		if (c.xLabel) text(svg, m.l + iw / 2, H - 4, c.xLabel, { "text-anchor": "middle" });
		if (c.yLabel) text(svg, 0, m.t + 4, c.yLabel, {});
	};

	/* Donut: data [{l, v}], c.center {v, l} */
	R.donut = function (svg, c, W) {
		var data = c.data, size = Math.min(W, 260), r = size / 2 - 6, ir = r * 0.62;
		var total = data.reduce(function (s, d) { return s + d.v; }, 0);
		svg.setAttribute("viewBox", "0 0 " + W + " " + size);
		var cx = W / 2, cy = size / 2, a0 = -Math.PI / 2;
		data.forEach(function (d, i) {
			var a1 = a0 + (d.v / total) * Math.PI * 2, gap = 0.012;
			var s = a0 + gap, e = a1 - gap, large = e - s > Math.PI ? 1 : 0;
			var p = [
				"M", cx + r * Math.cos(s), cy + r * Math.sin(s),
				"A", r, r, 0, large, 1, cx + r * Math.cos(e), cy + r * Math.sin(e),
				"L", cx + ir * Math.cos(e), cy + ir * Math.sin(e),
				"A", ir, ir, 0, large, 0, cx + ir * Math.cos(s), cy + ir * Math.sin(s), "Z"
			].join(" ");
			var path = make("path", { d: p, class: "s" + ((i % 5) + 1), "stroke-width": 0 }, svg);
			bindTip(path, "<b>" + d.l + "</b>" + (c.showValues === false ? "" : " · " + Math.round((d.v / total) * 100) + "%"));
			a0 = a1;
		});
		if (c.center) {
			text(svg, cx, cy + 2, c.center.v, { "text-anchor": "middle", class: "val", style: "font-size:22px" });
			text(svg, cx, cy + 20, c.center.l, { "text-anchor": "middle" });
		}
	};

	/* Scatter: points [{x,y,g}] or gen; c.groups labels; c.diag draws y = x */
	R.scatter = function (svg, c, W) {
		var pts = c.gen ? generators[c.gen](c) : c.points;
		var H = c.height || 280, m = { t: 10, r: 10, b: c.xLabel ? 34 : 14, l: c.yLabel ? 40 : 14 };
		var iw = W - m.l - m.r, ih = H - m.t - m.b;
		var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
		var x0 = c.domain ? c.domain[0] : Math.min.apply(null, xs), x1 = c.domain ? c.domain[1] : Math.max.apply(null, xs);
		var y0 = c.domain ? c.domain[0] : Math.min.apply(null, ys), y1 = c.domain ? c.domain[1] : Math.max.apply(null, ys);
		function sx(v) { return m.l + ((v - x0) / (x1 - x0 || 1)) * iw; }
		function sy(v) { return m.t + ih - ((v - y0) / (y1 - y0 || 1)) * ih; }
		svg.setAttribute("viewBox", "0 0 " + W + " " + H);
		for (var g = 0; g <= 4; g++) {
			var gy = m.t + (g / 4) * ih, gx = m.l + (g / 4) * iw;
			make("line", { x1: m.l, x2: W - m.r, y1: gy, y2: gy, class: "gridline" }, svg);
			make("line", { x1: gx, x2: gx, y1: m.t, y2: m.t + ih, class: "gridline" }, svg);
			if (c.ticks) {
				text(svg, gx, H - m.b + 14, fmt(x0 + (g / 4) * (x1 - x0)), { "text-anchor": "middle" });
				text(svg, m.l - 6, m.t + ih - (g / 4) * ih + 4, fmt(y0 + (g / 4) * (y1 - y0)), { "text-anchor": "end" });
			}
		}
		if (c.diag) {
			make("line", { x1: sx(x0), y1: sy(x0), x2: sx(x1), y2: sy(x1), stroke: "var(--text-2)", "stroke-dasharray": "4 4", "stroke-width": 1.2 }, svg);
		}
		pts.forEach(function (p) {
			var dot = make("circle", { cx: sx(p.x), cy: sy(p.y), r: c.r || 3.6, class: "s" + ((p.g % 5) + 1), "fill-opacity": 0.72, "stroke-width": 0 }, svg);
			var label = c.groups ? c.groups[p.g] : "";
			bindTip(dot, c.tip ? c.tip.replace("{x}", fmt(p.x, 1)).replace("{y}", fmt(p.y, 1)) : "<b>" + label + "</b>");
		});
		if (c.xLabel) text(svg, m.l + iw / 2, H - 4, c.xLabel, { "text-anchor": "middle" });
		if (c.yLabel) text(svg, 12, m.t + ih / 2, c.yLabel, { "text-anchor": "middle", transform: "rotate(-90 12 " + (m.t + ih / 2) + ")" });
	};

	/* Funnel: stages [{l, v, d}] widths proportional to v (min width keeps labels legible) */
	R.funnel = function (svg, c, W) {
		var data = c.data, rowH = 58, H = data.length * rowH;
		var max = data[0].v, minW = Math.min(150, W * 0.4);
		svg.setAttribute("viewBox", "0 0 " + W + " " + H);
		data.forEach(function (d, i) {
			var w = Math.max(minW, (d.v / max) * W), x = (W - w) / 2, y = i * rowH;
			var rect = make("rect", { x: x, y: y + 4, width: w, height: rowH - 10, rx: 8, class: "s" + (d.s || i + 1), "fill-opacity": 0.9 }, svg);
			bindTip(rect, "<b>" + d.d + "</b> · " + d.l);
			text(svg, W / 2, y + rowH / 2 - 2, d.d, { "text-anchor": "middle", style: "font-family:var(--mono);font-weight:700;font-size:15px;fill:var(--accent-ink)" });
			text(svg, W / 2, y + rowH / 2 + 13, d.l, { "text-anchor": "middle", style: "font-size:11px;fill:var(--accent-ink);opacity:.85" });
		});
	};

	/* ---------- Mount ---------- */
	function legend(el, c) {
		if (!c.legend) return;
		var box = document.createElement("div");
		box.className = "chart-legend";
		c.legend.forEach(function (l, i) {
			var s = document.createElement("span");
			s.innerHTML = '<i style="background:var(--c' + ((i % 5) + 1) + ')"></i>' + l;
			box.appendChild(s);
		});
		el.appendChild(box);
	}

	function render(el) {
		var c;
		try { c = JSON.parse(el.getAttribute("data-chart")); } catch (e) { return; }
		if (!R[c.type]) return;
		el.innerHTML = "";
		var W = Math.max(280, Math.round(el.clientWidth || 600));
		var svg = make("svg", { role: "img", "aria-label": c.alt || c.type + " chart" }, el);
		R[c.type](svg, c, W);
		legend(el, c);
	}

	function renderAll() {
		Array.prototype.forEach.call(document.querySelectorAll("[data-chart]"), render);
	}

	var lastW = 0, timer;
	window.addEventListener("resize", function () {
		if (Math.abs(window.innerWidth - lastW) < 40) return;
		clearTimeout(timer);
		timer = setTimeout(function () { lastW = window.innerWidth; renderAll(); }, 150);
	});

	window.Charts = { render: render, renderAll: renderAll };
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () { lastW = window.innerWidth; renderAll(); });
	} else { lastW = window.innerWidth; renderAll(); }
})();
